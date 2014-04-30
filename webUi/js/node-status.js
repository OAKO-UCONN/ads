
$(function() {
    /*
  d3.json("./api/status/store/chk", function(error, json) {
    makeHist(json.histogram);
  });

  d3.json("./api/status/store/ssk", function(error, json) {
    makeHist(json.histogram);
  });
*/
})

function makeHist(data) {

// Generate a Bates distribution of 10 random variables.
//var values = d3.range(1000).map(d3.random.bates(10));

// A formatter for counts.
var formatCount = d3.format(",.0f");

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 452 + margin.left + margin.right,
    height = 128 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d[1]; })])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bar = svg.selectAll(".bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d[0] / 256) + "," + y(d[1]) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", 1)
    .attr("height", function(d) { return height - y(d[1]); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
}
