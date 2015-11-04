describe('widgets/histogram/content_view', function() {

  beforeEach(function() {

    this.dataModel = new cdb.geo.ui.Widget.HistogramModel({
      id: 'widget_3',
      title: 'Howdy',
      options: {
        columns: ['cartodb_id', 'title']
      }
    });

    this.viewModel = new cdb.core.Model({
      sync: true
    });

    this.filter = new cdb.core.Model({
      min: 0,
      max: 100
    });

    this.view = new cdb.geo.ui.Widget.Histogram.Content({
      viewModel: this.viewModel,
      dataModel: this.dataModel,
      filter: this.filter
    });
  });

  it('should render the histogram', function() {
    spyOn(this.view, 'render').and.callThrough();
    this.dataModel._data.reset(genHistogramData(20));
    this.dataModel.trigger('change:data');
    expect(this.view.render).toHaveBeenCalled();
    expect(this.view.$('h3').text()).toBe('Howdy');
  });

  it('should update stats', function() {
    expect(this.view.viewModel.get('min')).toBe(undefined);
    expect(this.view.viewModel.get('max')).toBe(undefined);
    expect(this.view.viewModel.get('avg')).toBe(undefined);
    expect(this.view.viewModel.get('total')).toBe(undefined);

    this.dataModel._data.reset(genHistogramData(20));
    this.dataModel.trigger('change:data');

    expect(this.view.viewModel.get('min')).not.toBe(0);
    expect(this.view.viewModel.get('max')).not.toBe(0);
    expect(this.view.viewModel.get('avg')).not.toBe(0);
    expect(this.view.viewModel.get('total')).not.toBe(0);
  });

});

function genHistogramData(n) {
  n = n || 1;
  var arr = [];
  _.times(n, function(i) {
    var start = (100 * i) + Math.round(Math.random() * 1000);
    var end = start + 100;
    var obj = {
      bin: i,
      freq: Math.round(Math.random() * 10),
      start: start,
      end: end,
      max: end,
      min: start
    };
    arr.push(obj);
  });
  return arr;
}