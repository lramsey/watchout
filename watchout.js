// start slingin' some d3 here.
var svg = d3.select(".container").append("svg");
var board = {
  "height":window.innerHeight,
  "width": window.innerWidth,
  "enemies": 14
};
var makeHero = function(){
  svg.selectAll("image.hero")
    .data([25])
    .enter()
    .append('svg:image')
    .attr("class", "hero")
    .attr("xlink:href","hero.png")
    .attr("x", board.width/2)
    .attr("y", board.height/2)
    .attr("width", function(d) { return d })
    .attr("height", function(d) { return d })
    .attr("fill", "white")
}

var makeEnemies = function (num) {
  var enemies = [];
  for (var i = 0; i < num; i++) {
    enemies.push(i);
  }
  svg.selectAll("image.enemy")
    .data(enemies)
    .enter()
    .append("svg:image")
    .attr("class", "enemy")
    .attr("")
    .attr("r", function(d) { return Math.random() * 100/num + 10 })
    .attr("cx", function() { return Math.random() * board.width })
    .attr("cy", function() { return Math.random() * board.height })
    .attr("fill", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    })
};

var moveEnemies = function() {
  svg.selectAll("image.enemy").transition()
  .duration(1700)
  .attr("cx", function() { return Math.random() * board.width })
  .attr("cy", function() { return Math.random() * board.height })
  .attr("fill", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  })
  .attr("r", function(d) { return Math.random() * 120/board.enemies + 10})
  setTimeout(function() { moveEnemies() }, 1500);
}

var drag = d3.behavior.drag()
 .on("drag", function() {
    svg.selectAll('image.hero')
    .attr("x", function() { return d3.mouse(this)[0] } )
    .attr("y", function() { return d3.mouse(this)[1] } )
  })

var collisionCheck = function () {
  var heroX = d3.selectAll('image.hero').attr('x');
  var heroY = d3.selectAll('image.hero').attr('y');
  var enemies = d3.selectAll('image.enemy');
  var didCollide = false;
  enemies.each(function() {
    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    var enemyR = parseInt(d3.select(this).attr("r"));
    if (Math.sqrt(Math.pow(heroX - enemyX, 2) + Math.pow(heroY - enemyY, 2)) < enemyR + 100) {
      onCollision();

      setTimeout(function() { collisionCheck(); }, 1000);
      didCollide = true;
      return;
    }
  })
  if (!didCollide) {
    setTimeout(function() {
      collisionCheck();
    }, 20)
  }
}

var scoreboardCounter = function(){
  var high = d3.select(".high").select("span");
  var current = d3.select(".current").select("span").text();
  current++;
  d3.select(".current").select("span").text(current);
  if(current > high.text()){
    high.text(current);
  }
}

var onCollision = function() {
  var totalCollisions = d3.select(".collisions").select("span").text();
  totalCollisions++;
  d3.select(".collisions").select("span").text(totalCollisions);
  d3.select(".current").select("span").text(0);
}
board.enemies = prompt("How many enemies should there be?");
makeEnemies(board.enemies);
//moveEnemies();
makeHero();
svg.selectAll('image.hero').call(drag);
collisionCheck()
d3.timer(scoreboardCounter, 25);

