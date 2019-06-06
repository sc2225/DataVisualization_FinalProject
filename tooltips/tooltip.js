var svg = d3.select("body")
  .append("svg")
  .attr("width", 300)
  .attr("height", 300);

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([20, 120])
  .html("<p>This is a SVG inside a tooltip:</p><div id='tipDiv'></div>");

svg.call(tool_tip);

var data = [14, 27, 19, 6, 17];

var circles = svg.selectAll("foo")
  .data(data)
  .enter()
  .append("circle");

circles.attr("cx", 50)
  .attr("cy", function(d, i) {
    return 20 + 50 * i
  })
  .attr("r", function(d) {
    return d
  })
  .attr("fill", "teal")
  .on('mouseover', function(d) {
    tool_tip.show();
    var tipSVG = d3.select("#tipDiv")
      .append("svg")
      .attr("width", 200)
      .attr("height", 50);

    tipSVG.append("rect")
      .attr("fill", "steelblue")
      .attr("y", 10) //y position of the bar
      .attr("width", 300)
      .attr("height", 30)
      .transition()
      .duration(1000)
      .attr("width", d * 6);

    tipSVG.append("text")
      .text(d)
      .attr("x", 10)
      .attr("y", 30)
      .transition()
      .duration(1000)
      .attr("x", 6 + d * 6)
  })
  .on('mouseout', tool_tip.hide);