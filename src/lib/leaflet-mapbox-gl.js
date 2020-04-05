import mapboxgl from 'mapbox-gl';

export function extendLeaflet(Leaflet) {
  Leaflet.MapboxGL = Leaflet.Layer.extend({
    options: {
      updateInterval: 32,
      // How much to extend the overlay view (relative to map size)
      // e.g. 0.1 would be 10% of map view in each direction
      padding: 0.1,
      // whether or not to register the mouse and keyboard
      // events on the mapbox overlay
      interactive: false
    },

    initialize: function (options) {
      Leaflet.setOptions(this, options);

      if (options.accessToken) {
        mapboxgl.accessToken = options.accessToken;
      }

      // setup throttling the update event when panning
      this._throttledUpdate = Leaflet.Util.throttle(this._update, this.options.updateInterval, this);
    },

    onAdd: function (map) {
      if (!this._container) {
        this._initContainer();
      }

      map.getPanes().tilePane.appendChild(this._container);

      this._initGL();

      this._offset = this._map.containerPointToLayerPoint([0, 0]);

      // work around https://github.com/mapbox/mapbox-gl-leaflet/issues/47
      if (map.options.zoomAnimation) {
        Leaflet.DomEvent.on(map._proxy, Leaflet.DomUtil.TRANSITION_END, this._transitionEnd, this);
      }
    },

    onRemove: function (map) {
      if (this._map._proxy && this._map.options.zoomAnimation) {
        Leaflet.DomEvent.off(this._map._proxy, Leaflet.DomUtil.TRANSITION_END, this._transitionEnd, this);
      }

      map.getPanes().tilePane.removeChild(this._container);
      this._glMap.remove();
      this._glMap = null;
    },

    getEvents: function () {
      return {
        move: this._throttledUpdate, // sensibly throttle updating while panning
        zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>
        zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming
        zoomstart: this._zoomStart, // flag starting a zoom to disable panning
        zoomend: this._zoomEnd,
        resize: this._resize
      };
    },

    getMapboxMap: function () {
      return this._glMap;
    },

    getCanvas: function () {
      return this._glMap.getCanvas();
    },

    getSize: function () {
      return this._map.getSize().multiplyBy(1 + this.options.padding * 2);
    },

    getBounds: function () {
      const halfSize = this.getSize().multiplyBy(0.5);
      const center = this._map.latLngToContainerPoint(this._map.getCenter());
      return Leaflet.latLngBounds(
        this._map.containerPointToLatLng(center.subtract(halfSize)),
        this._map.containerPointToLatLng(center.add(halfSize))
      );
    },

    getContainer: function () {
      return this._container;
    },

    _initContainer: function () {
      const container = this._container = Leaflet.DomUtil.create('div', 'leaflet-gl-layer');

      const size = this.getSize();
      const offset = this._map.getSize().multiplyBy(this.options.padding);
      container.style.width  = size.x + 'px';
      container.style.height = size.y + 'px';

      const topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

      Leaflet.DomUtil.setPosition(container, topLeft);
    },

    _initGL: function () {
      const center = this._map.getCenter();

      const options = Leaflet.extend({}, this.options, {
        container: this._container,
        center: [center.lng, center.lat],
        zoom: this._map.getZoom() - 1,
        attributionControl: false
      });

      this._glMap = new mapboxgl.Map(options);

      // allow GL base map to pan beyond min/max latitudes
      this._glMap.transform.latRange = null;

      if (this._glMap._canvas.canvas) {
        // older versions of mapbox-gl surfaced the canvas differently
        this._glMap._actualCanvas = this._glMap._canvas.canvas;
      } else {
        this._glMap._actualCanvas = this._glMap._canvas;
      }

      // treat child <canvas> element like Leaflet.ImageOverlay
      const canvas = this._glMap._actualCanvas;
      Leaflet.DomUtil.addClass(canvas, 'leaflet-image-layer');
      Leaflet.DomUtil.addClass(canvas, 'leaflet-zoom-animated');
      if (this.options.interactive) {
        Leaflet.DomUtil.addClass(canvas, 'leaflet-interactive');
      }
      if (this.options.className) {
        Leaflet.DomUtil.addClass(canvas, this.options.className);
      }
    },

    _update: function (e) {
      // update the offset so we can correct for it later when we zoom
      this._offset = this._map.containerPointToLayerPoint([0, 0]);

      if (this._zooming) {
        return;
      }

      const size = this.getSize(),
        container = this._container,
        gl = this._glMap,
        offset = this._map.getSize().multiplyBy(this.options.padding),
        topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

      Leaflet.DomUtil.setPosition(container, topLeft);

      const center = this._map.getCenter();

      // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0);
      // calling setView directly causes sync issues because it uses requestAnimFrame

      const tr = gl.transform;
      tr.center = mapboxgl.LngLat.convert([center.lng, center.lat]);
      tr.zoom = this._map.getZoom() - 1;

      if (gl.transform.width !== size.x || gl.transform.height !== size.y) {
        container.style.width  = size.x + 'px';
        container.style.height = size.y + 'px';
        if (gl._resize !== null && gl._resize !== undefined){
          gl._resize();
        } else {
          gl.resize();
        }
      } else {
        // older versions of mapbox-gl surfaced update publicly
        if (gl._update !== null && gl._update !== undefined){
          gl._update();
        } else {
          gl.update();
        }
      }
    },

    // update the map constantly during a pinch zoom
    _pinchZoom: function (e) {
      this._glMap.jumpTo({
        zoom: this._map.getZoom() - 1,
        center: this._map.getCenter()
      });
    },

    // borrowed from Leaflet.ImageOverlay
    // https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144
    _animateZoom: function (e) {
      const scale = this._map.getZoomScale(e.zoom);
      const padding = this._map.getSize().multiplyBy(this.options.padding * scale);
      const viewHalf = this.getSize()._divideBy(2);
      // corrections for padding (scaled), adapted from
      // https://github.com/Leaflet/Leaflet/blob/master/src/map/Map.js#L1490-L1508
      const topLeft = this._map.project(e.center, e.zoom)
        ._subtract(viewHalf)
        ._add(this._map._getMapPanePos()
          .add(padding))._round();
      const offset = this._map.project(this._map.getBounds().getNorthWest(), e.zoom)
        ._subtract(topLeft);

      Leaflet.DomUtil.setTransform(
        this._glMap._actualCanvas,
        offset.subtract(this._offset),
        scale
      );
    },

    _zoomStart: function (e) {
      this._zooming = true;
    },

    _zoomEnd: function () {
      const scale = this._map.getZoomScale(this._map.getZoom()),
        offset = this._map._latLngToNewLayerPoint(
          this._map.getBounds().getNorthWest(),
          this._map.getZoom(),
          this._map.getCenter()
        );

      Leaflet.DomUtil.setTransform(
        this._glMap._actualCanvas,
        offset.subtract(this._offset),
        scale
      );

      this._zooming = false;

      this._update();
    },

    _transitionEnd: function (e) {
      Leaflet.Util.requestAnimFrame(function () {
        const zoom = this._map.getZoom();
        const center = this._map.getCenter();
        const offset = this._map.latLngToContainerPoint(
          this._map.getBounds().getNorthWest()
        );

        // reset the scale and offset
        Leaflet.DomUtil.setTransform(this._glMap._actualCanvas, offset, 1);

        // enable panning once the gl map is ready again
        this._glMap.once('moveend', Leaflet.Util.bind(function () {
          this._zoomEnd();
        }, this));

        // update the map position
        this._glMap.jumpTo({
          center: center,
          zoom: zoom - 1
        });
      }, this);
    },

    _resize: function (e) {
      this._transitionEnd(e);
    }
  });

  Leaflet.mapboxGL = function (options) {
    return new Leaflet.MapboxGL(options);
  };
}