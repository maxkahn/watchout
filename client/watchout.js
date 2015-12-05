// start slingin' some d3 here.
var enemy_arr = []; 
var score = 0;
var highScore = 0;
var collisionCount = 0;
var reset = false;
//create canvas, then attach elements
var canvas = d3.selectAll("body")
				.append("svg")
				.attr("height", 500)
				.attr("width", 500);

var numEnemies = 20;
var enemySize = 13;

for (var i = 0; i < numEnemies; i++) {
	enemy_arr.push({i: i,
					x: 500* Math.random(),
					y: 500 * Math.random(),
					r: enemySize});
}

var player1 = [{ 
				 i : 'player1',
				 x : 250, 
				 y : 250,
				 r : 18
			  }];
//player starts at middle of board
var player = canvas.selectAll('.player')
					.data(player1);


var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);


player.enter()
		.append('circle')
		.attr("cx", function(d){ return d.x; })
		.attr("cy", function(d){ return d.y; })
		.attr("r", function(d){ return d.r; })
		.attr("fill", "green")
		.attr("class", "player")
		.call(drag);

//collide(enemy_arr[i])

var collide = function(enemy){

	var ex = enemy.x; 
	var px = player1[0].x;
	var ey = enemy.y; 
	var py = player1[0].y;

	var distance = Math.sqrt((Math.pow((ex-px),2)+Math.pow((ey-py),2)));
	var radSum = enemy.r + player1[0].r;
	console.log(distance<radSum);
	return distance<radSum;

};


//
// player.on( ****, function(){
// 	//reset the score
// 	//
// })


function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  // d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  // d3.select(this).classed("dragging", false);
}

var update = function(data){

//BIND DATA TO DOM
	var enemies = canvas.selectAll('.enemy')
					.data(data, function(d){ return d.i; });


//ENTER	
	enemies.enter().append('circle')
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		})
		.attr("r", function(d) {
			return d.r;
		})
		.attr("fill", "red")
		.attr("class", "enemy");
		//transform
		//update cx and cy randomly

//ENTER + UPDATE
	enemies.transition()
		.attr('cx', function(d){ return d.x *Math.random()} )
		.attr('cy', function(d){ return d.y *Math.random()} )
		.duration(1000);



//EXIT
	enemies.exit().remove();
}

//INITIALIZE

setInterval(function(){
	update(enemy_arr);
	if (!reset) {
		score++;
	}
	else {
		collisionCount++;
		reset = false;
	}
}, 1000);

setInterval(function(){
	for(var i = 0; i < enemy_arr.length; i++){
		if(collide(enemy_arr[i])){
			if(score>highScore){
				highScore = score;
				d3.selectAll(".highscore span")
				  .text(highScore);
			}
			score = 0;
			reset = true;
		} 
	}
	d3.selectAll(".current span")
		.text(score);
	d3.selectAll(".collisions span")
			  .text(collisionCount);
}, 50);

					