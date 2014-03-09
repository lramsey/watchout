// start slingin' some d3 here.
var svg = d3.select(".container").append("svg");
var board = {
  "height":window.innerHeight,
  "width": window.innerWidth,
  "enemiesCount": 14,
  "enemiesVariableLength": 500,
  "enemiesMinLength": 20,
  "heroVariableLength": 35,
  "heroMinLength": 15
};
var makeHero = function(){
  svg.selectAll("image.hero")
    .data([board.heroMinLength + board.heroVariableLength/(Math.log(board.enemiesCount + 1))])
    .enter()
    .append('svg:image')
    .attr("class", "hero")
    .attr("xlink:href","hero.png")
    .attr("x", board.width/2)
    .attr("y", board.height/2)
    .attr("width", function(d) { return d; })
    .attr("height", function(d) { return d; });
};

var makeEnemies = function () {
  var enemies = [];
  for (var i = 0; i < board.enemiesCount; i++) {
    enemies.push(board.enemiesVariableLength/(2*Math.log(board.enemiesCount +1)));
  }
  svg.selectAll("image.enemy")
    .data(enemies)
    .enter()
    .append("svg:image")
    .attr("class", "enemy")
    .attr("xlink:href","enemy.gif")
    .attr("width", function(d) { return Math.random() * d +  board.enemiesMinLength; })
    .attr("height", function(d) { return Math.random() * d + board.enemiesMinLength; })
    .attr("x", function() { return Math.random() * board.width; })
    .attr("y", function() { return Math.random() * board.height; });
};

var moveEnemies = function(enemy) {
  enemy.transition()
  .duration(1700).delay(Math.random()*1000)
  .attr("x", function() { return Math.random() * board.width; })
  .attr("y", function() { return Math.random() * board.height; })
  .attr("width", function(d) { return Math.random() * d + board.enemiesMinLength;})
  .attr("height", function(d) { return Math.random() * d + board.enemiesMinLength; });
  setTimeout(function() { moveEnemies(enemy); }, 1500);
};

var drag = d3.behavior.drag()
 .on("drag", function() {
    svg.selectAll('image.hero')
    .attr("x", function() { return d3.mouse(this)[0]; } )
    .attr("y", function() { return d3.mouse(this)[1]; } );
  });
var i = 0;
var collisionCheck = function () {
  var heroR = parseFloat(d3.select('image.hero').datum())/2;
  var heroX = parseFloat(d3.select('image.hero').attr('x')) + heroR;
  var heroY = parseFloat(d3.select('image.hero').attr('y')) + heroR;
  var enemies = d3.selectAll('image.enemy');
  var didCollide = false;
  enemies.each(function() {
    var enemyR = parseFloat(d3.select(this).attr("height"))/2;
    var enemyX = parseFloat(d3.select(this).attr("x")) + enemyR;
    var enemyY = parseFloat(d3.select(this).attr("y")) + enemyR;
    if (Math.sqrt(Math.pow(heroX - enemyX, 2) + Math.pow(heroY - enemyY, 2)) < heroR + enemyR) {
      didCollide = true;
      return;
    }
  });
  if(didCollide){
    onCollision();
    setTimeout(function() {
      collisionCheck();
    }, 1000);
  } else {
    setTimeout(function() {
      collisionCheck();
    }, 20);
  }
};

var scoreboardCounter = function(){
  var high = d3.select(".high").select("span");
  var current = d3.select(".current").select("span").text();
  current++;
  d3.select(".current").select("span").text(current);
  if(current > high.text()){
    high.text(current);
  }
};

var onCollision = function() {
  var totalCollisions = d3.select(".collisions").select("span").text();
  totalCollisions++;
  d3.select(".collisions").select("span").text(totalCollisions);
  d3.select(".current").select("span").text(0);
};

userInput = parseFloat(prompt("How many enemies should there be?"));

if(!isNaN(userInput) && userInput%1 === 0 && userInput > 0 && userInput <= 500){
  board.enemiesCount = userInput;
} else{
  alert("That is not a valid enemy count. Let's try " + board.enemiesCount + ".");
}
makeEnemies();
d3.selectAll("image.enemy").each(function(){
  moveEnemies(d3.select(this));
});
makeHero();
svg.selectAll('image.hero').call(drag);
collisionCheck();
d3.timer(scoreboardCounter, 25);
