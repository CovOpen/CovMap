#!/bin/bash

# What does this file do?
# - Download Openmaptiles
# - Setup your nginx config
# - Setup letsencrypt certificates

# How should this command be used?
# - Interactively Just run ./setup.sh
# - Supply the variables via Environment Variables aswell
# - Supply them as .env file next to the script



if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

export $(egrep -v '^#' .env | xargs)

# State all required variables here
requiredVariables=(
  OPENMAPTILES_ACCESS_KEY # Key for OpenMaptileDownload
  LETSENCRYPT_EMAIL # Adding a valid address is strongly recommended
  LETSENCRYPT_STAGING # Set to 1 if you're testing your setup to avoid hitting request limits
  BASE_DOMAIN # Base Domain of the website e.g. example.com
  OPENMAP_DOMAIN # Base Domain of the website e.g. example.com
  )

path=./data/


# Variables defined as required will error if not supplied
for i in "${requiredVariables[@]}"
do
  # Error if variable is not defined
  if [[ -z ${!i} ]]; then
    read -p "${i}:" $i
  fi
done


# Download OpenMapTiles
path_openmaptiles="${path}openmaptiles"
mkdir -p $path_openmaptiles
cp -r ./openmaptiles ./data

tile_file="osm-2017-07-03-v3.6.1-europe_germany.mbtiles"

[ -f ${path_openmaptiles}/${tile_file} ] && echo "Data File already exist." || wget -O ${path_openmaptiles}/${tile_file} https://openmaptiles.com/download/${OPENMAPTILES_ACCESS_KEY}/${tile_file}?usage=open-source



path_nginx="${path}nginx"
mkdir -p $path_nginx
cp -r ./nginx ./data
# Write Variables to NGINX files
for i in "${requiredVariables[@]}"
do
  # Inform if a variable is not defined
  if [[ -z ${!i} ]]; then
    echo 'INFO: Variable "'$i'" not defined.'
  else
    # Escape special characters, for URLs
    replaceString=$(echo ${!i} | sed -e 's/[\/&]/\\&/g')

    # Get all files including the environment variable (and ending with '.html') substitute the placeholder with its content
    if [ "$DEBUG" = true ]
    then
      # If DEBUG=true in order to log the replaced files
      grep -rl --include \*.conf "$i" "$path_nginx" | xargs sed -i "s/\${""$i""}/$replaceString/Ig;w /dev/stdout"
    else
      # If DEBUG=false do it without logging
      grep -rl --include \*.conf "$i" "$path_nginx" | xargs sed -i "s/\${""$i""}/$replaceString/Ig"
    fi
  fi
done



domains=($BASE_DOMAIN $OPENMAP_DOMAIN)
echo "Requesting Certificates for: "
echo ${domains[@]}
rsa_key_size=4096
data_path_certbot="${path}certbot"

if [ -d "$data_path_certbot" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


if [ ! -e "$data_path_certbot/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path_certbot/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path_certbot/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path_certbot/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path_certbot/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path_certbot/conf/live/$domains"
docker-compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:1024 -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
docker-compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
docker-compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo


echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate LETSENCRYPT_EMAIL arg
case "$LETSENCRYPT_EMAIL" in
  "") LETSENCRYPT_EMAIL_arg="--register-unsafely-without-LETSENCRYPT_EMAIL" ;;
  *) LETSENCRYPT_EMAIL_arg="--email $LETSENCRYPT_EMAIL" ;;
esac

# Enable LETSENCRYPT_STAGING mode if needed
if [ $LETSENCRYPT_STAGING != "0" ]; then LETSENCRYPT_STAGING_arg="--staging"; fi

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $LETSENCRYPT_STAGING_arg \
    $LETSENCRYPT_EMAIL_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker-compose exec nginx nginx -s reload
