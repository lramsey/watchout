// start slingin' some d3 here.
var svg = d3.select(".container").append("svg");
var board = {
  "height": 600,
  "width": 800,
  "paddingX": 400,
  "paddingY": 200,
  "enemies": 20
};
var makeHero = function(){
  svg.selectAll("rect")
    .data([15])
    .enter()
    .append('rect')
    .attr("x", board.paddingX + board.width/2)
    .attr("y", board.paddingY + board.height/2)
    .attr("width", function(d) { return d })
    .attr("height", function(d) { return d })
    .style("fill", "white")
}

var makeEnemies = function (num) {
  var enemies = [];
  for (var i = 0; i < num; i++) {
    enemies.push(i);
  }
  svg.selectAll("circle")
    .data(enemies)
    .enter()
    .append("circle")
    .attr("r", function(d) { return Math.random() * 100/num + 10 })
    .attr("cx", function() { return Math.random() * board.width + 400 })
    .attr("cy", function() { return Math.random() * board.height + 200})
    .style("fill", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    })
};

var moveEnemies = function() {
  svg.selectAll("circle").transition()
  .duration(1700)
  .attr("cx", function() { return Math.random() * board.width + 400 })
  .attr("cy", function() { return Math.random() * board.height + 200})
  .style("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .attr("r", function(d) { return Math.random() * 120/board.enemies + 10})
  setTimeout(function() { moveEnemies() }, 1500);
}

makeEnemies(board.enemies);
moveEnemies();
makeHero();
