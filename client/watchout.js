// start slingin' some d3 here.

//create canvas, then attach elements
var canvas = d3.selectAll("body")
				.append("svg")
				.attr("height", 500)
				.attr("width", 500);

//create circle
	//make into class
var circle = canvas.append("circle")
					.attr("cx", 100)
					.attr("cy", 100)
					.attr("r", 75)
					.attr("fill", "red");