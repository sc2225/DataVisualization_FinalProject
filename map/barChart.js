var drawBarChart = function(svgTitle, svg, zipcode, d, SATdict, rentDict){
	svgTitle.selectAll("*").remove();

    svgTitle
        .append("text")
        .text("Neighborhood: " + zipcode[d.properties.ZIP]);

    svg.selectAll("*").remove();

    var barChartSVG = svg
    .append("svg")
    .attr("width", 150)
    .attr("height", 100);

    var barChartRentSVG = svg.select("svg");
 
   

// For SATS score bar:
    barChartSVG.append("rect")
        .attr("fill", "steelblue")
        .attr("y", 0) //y position of the bar
        .attr("width", 0) //position of how far the bar starts at
        .attr("height", 20) //the thickness of the bar
        .transition() //facilitates the transition from empty canvas to bar
        .duration(900) //how long it takes for the bar to move
        .attr("width", function() {
          
           return barwidth(SATdict[d.properties.ZIP]);
        }); 


    barChartSVG.append("text")
        .text("SAT Score: " + SATdict[d.properties.ZIP])
        .attr("x", 5)
        .attr("y", 19)
        .transition()
        .duration(1000)
        .attr("x", 3)

// For Rent Bar:  
    barChartRentSVG.append("rect")
        .attr("fill", "red")
        .attr("y", 20)
        .attr("width", 0)
        .attr("height", 20) 
        .transition() 
        .duration(900) 
        .attr("width", function() {
           return barwidth(rentDict[d.properties.ZIP]);
        }); 

    barChartRentSVG.append("text")
        .text("Rent Price: " + rentDict[d.properties.ZIP])
        .attr("x", 5)
        .attr("y", 40)
        .transition()
        .duration(1000)
        .attr("x", 3)	
};
