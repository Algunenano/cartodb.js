var _ = require('underscore');
var Search = require('../../geo/ui/search/search');
var Template = require('../../core/template');

var SearchOverlay = function (data, opts) {
  if (!opts.mapView) throw new Error('mapView is required');
  if (!opts.mapModel) throw new Error('mapModel is required');

  var searchOpts = _.extend(data, {
    mapView: opts.mapView,
    model: opts.mapModel
  });

  if (data.template) {
    searchOpts.template = Template.compile(data.template, data.templateType || 'mustache');
  }

  var search = new Search(searchOpts);
  return search.render();
};

module.exports = SearchOverlay;
