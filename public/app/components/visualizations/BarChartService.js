angular.module('app')
.factory('Barchart', function() {
	var barchartservice = {};
	var barcharts = d3.select('#barcharts');
	var linegraph = d3.select('#linegraphs');
	
	var margin = {
		top : 20,
		right : 20,
		bottom : 80,
		left: 80
	}
	var barchartHeight = $('#barchartsdiv').height() - margin.top - margin.bottom;
	var barchartWidth = $('#barchartsdiv').width() - margin.left - margin.right;
	console.log(barchartHeight);

	var x = d3.scale.ordinal()
			.rangeRoundBands([0, barchartWidth], 0.1);

	var y = d3.scale.linear().range([barchartHeight, 0]);

	var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

	var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.ticks(5, 'K');

	var svg = d3.select('#barcharts').append('svg')
				.attr('width', barchartWidth + margin.left + margin.right)
				.attr('height', barchartHeight + margin.bottom + margin.top)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	barchartservice.loadChart = function(data) {
		x.domain(data.map(function(d) {
			return d.date;
		}));

		y.domain([0, d3.max(data, function(d){
			return d.listvalue;
		})]);

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + barchartHeight + ')')
			.call(xAxis)
				.selectAll('text')
				.attr('transform', function(d) {
					return 'rotate(-65)';
				})
				.style('text-anchor', 'end');

		svg.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('List Value');

		svg.selectAll('.bar')
			.data(data)
			.enter().append('rect')
			.attr('class', 'bar')
			.attr('x', function(d) {
				return x(d.date);
			})

			.attr('width', x.rangeBand())
			.attr('y', function(d) {
				return y(d.listvalue);
			})
			.attr('height', function(d) {
				return barchartHeight - y(d.listvalue);
			});
	}

	return barchartservice;
});