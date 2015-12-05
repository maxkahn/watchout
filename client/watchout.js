// start slingin' some d3 here.
var enemy_arr = [50, 100, 300];
//create canvas, then attach elements
var canvas = d3.selectAll("body")
				.append("svg")
				.attr("height", 500)
				.attr("width", 500);

//create circle
	//make into class
// var circle = canvas.append("circle")
// 					.attr("cx", 100)
// 					.attr("cy", 100)
// 					.attr("r", 75)
// 					.attr("fill", "red")
// 					.attr("class", "enemy");

var update = function(data){

//BIND DATA TO DOM
	var enemies = canvas.selectAll('.enemy')
					.data(data, function(d){ return d; });


//ENTER	
	enemies.enter().append('circle')
		.attr("cx", 100)
		.attr("cy", 100)
		.attr("r", 13)
		.attr("fill", "red")
		.attr("class", "enemy");
		//transform
		//update cx and cy randomly

//ENTER + UPDATE
	enemies.transition()
		.attr('cx', function(d){ return d*Math.random()} )
		.attr('cy', function(d){ return d*Math.random()} )
		.duration(1000);


//EXIT
	enemies.exit().remove();
}

//INITIALIZE

setInterval(function(){
update(enemy_arr);
}, 1000);
					