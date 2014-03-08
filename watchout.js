// start slingin' some d3 here.
var svg = d3.select(".container").append("svg");
var board = {
  "height": 800,
  "width": 800,
  "paddingX": 200,
  "paddingY": 50,
  "enemies": 50
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
    .attr("fill", "white")
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
    .attr("cx", function() { return Math.random() * board.width + board.paddingX })
    .attr("cy", function() { return Math.random() * board.height + board.paddingY})
    .attr("fill", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    })
};

var moveEnemies = function() {
  svg.selectAll("circle").transition()
  .duration(1700)
  .attr("cx", function() { return Math.random() * board.width + board.paddingX })
  .attr("cy", function() { return Math.random() * board.height + board.paddingY})
  .attr("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .attr("r", function(d) { return Math.random() * 120/board.enemies + 10})
  setTimeout(function() { moveEnemies() }, 1500);
}

var drag = d3.behavior.drag()
 .on("drag", function() {
    svg.selectAll('rect')
    .attr("x", function() { return d3.mouse(this)[0] } )
    .attr("y", function() { return d3.mouse(this)[1] } )
  })
board.enemies = prompt("How many enemies should there be?");
makeEnemies(board.enemies);
moveEnemies();
makeHero();
svg.selectAll('rect').call(drag);
/*
var collisions = function () {
  var heroX = d3.selectAll('rect').attr('x');
  var heroY = d3.selectAll('rect').attr('y');
  vard3.selectAll('circle').attr('cx');
  enemies[0].each(enemy)

  //enemies[0][i].getAttributes('cx'); cx for ith enemy
}
*/


