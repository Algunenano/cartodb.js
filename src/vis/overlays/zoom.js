var Zoom = require('../../geo/ui/zoom/zoom-view');

var ZoomOverlay = function (data, opts) {
  if (!opts.mapModel) throw new Error('mapModel is required');

  var zoom = new Zoom({
    model: opts.mapModel
  });

  return zoom.render();
};

module.exports = ZoomOverlay;
