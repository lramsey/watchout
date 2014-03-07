// start slingin' some d3 here.
var svg = d3.select(".container").append("svg");
var circles = svg.selectAll("circle");

svg.attr({"width": 500, "height": 500})
  .style("background-color", "black");

circles
  .data([10,10,10,10,10,10])
  .enter()
  .append("circle")
  .attr("r", function(d) { return d })
  .attr("cx", function() { return Math.random() * 400 })
  .attr("cy", function() { return Math.random() * 400 })
  .style("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .transition()
  .attr("cx", function() { return Math.random() * 400 })
  .attr("cy", function() { return Math.random() * 400 })
  .style("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .attr("r", function(d) { return Math.random() * 35 + 10 })

var moveCircles = function() {
  svg.selectAll("circle").transition()
  .attr("cx", function() { return Math.random() * 400 })
  .attr("cy", function() { return Math.random() * 400 })
  .style("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .attr("r", function(d) { return Math.random() * 35 + 10})
  setTimeout(function() { moveCircles() }, 1000);
}
moveCircles();