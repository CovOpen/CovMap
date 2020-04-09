// tslint:disable

declare const PRODUCTION: boolean;
declare const VERSION: string;
declare const COMMIT_HASH: string;
declare const COMMIT_HASH_LONG: string;

declare module "*.svg" {
  const content: string;
  export default content;
}