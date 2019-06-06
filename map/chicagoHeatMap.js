

var heatMapVis = function(){
    var newHeatMap = {
        drawMap: function(svg, bottom, top, data){
            
            d3.json("https://dhruvkore.github.io/DataVisualization_FinalProject/map/chicago.json", function(json) {

                //Loads heat map data from csv -- will work with any CSV where zip is first column
                d3.csv("https://dhruvkore.github.io/DataVisualization_FinalProject/map/Avg-SAT-by-Zip-Chi.csv", function(data){
                    var SATdict = {};
                    var rentDict={};
                    var zipcode = {};
                    
                    var sats = [];
                    var rents = [];
                    for(d=0; d < data.length; d++){
                        if(data[d].avgSAT === "null"){}
                        else{sats.push(data[d].avgSAT);}
                        rents.push(data[d].MedGrossRent)
                        SATdict[data[d].zip] = data[d].avgSAT;
                        rentDict[data[d].zip] = data[d].MedGrossRent;
                        zipcode[data[d].zip] = data[d].zip;

                    }

                    var maxSAT = Math.max(...sats);
                    var minSAT = Math.min(...sats);

                    var maxRent = Math.max(...rents);
                    var minRent = Math.min(...rents);

                    console.log(sats)
                    console.log(`MAX SAT: ${maxSAT}`)
                    console.log(`MIN SAT: ${minSAT}`)
                    console.log(`MAX RENT: ${maxRent}`)
                    console.log(`MIN RENT: ${minRent}`)

                // //Width and height
                var width = +svg.attr("width");
                var height = +svg.attr("height");

                // create a first guess for the projection
                var center = d3.geoCentroid(json)
                var scale = 150;
                var projection = d3.geoMercator().scale(scale).center(center);
                //Define path generator
                var path = d3.geoPath()
                                .projection(projection);

                // using the path determine the bounds of the current map and use
                // these to determine better values for the scale and translation
                var bounds = path.bounds(json);
                var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
                var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
                var scale = (hscale < vscale) ? hscale : vscale;
                var offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
                                height - (bounds[0][1] + bounds[1][1]) / 2];

                // new projection
                projection = d3.geoMercator().center(center)
                .scale(scale * 0.9).translate(offset);
                path = path.projection(projection);

                //Create SVG element
                svg = d3.select("#chart")
                        .attr("width", width)
                        .attr("height", height)

                //Creates tool-tip 
                var tool_tip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([20, 120])
                    .html(
                         "<p id='region'></p><div id='tipDiv'><p>Averages:</p></div><div id='tipRent'></div>"
                    );

                svg.call(tool_tip);


                //Bind data and create one path per GeoJSON feature
                svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("id", function(d){
                    return d.properties.ZIP
                })
                .attr("sat", function(d){
                    return SATdict[d.properties.ZIP];
                })
                .attr("fill", function(d){
                    var val = (rentDict[d.properties.ZIP]-minRent)/(maxRent - minRent);
                    if(SATdict[d.properties.ZIP] > top || SATdict[d.properties.ZIP] < bottom){
                        return 'rgb(150,150,150)'
                    }else{
                    var red = (0 * val);
                    var blue = (0 * val);
                    var green = (255 * val);
                    return `rgb(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue)})`;
                    }
                })


                .on("mouseover", function(d) {
                    tool_tip.show();

                    d3.select("p#region")
                        .append("text")
                        .text("Neighborhood: " + zipcode[d.properties.ZIP]);


                    var tipSVG = d3.select("#tipDiv")
                    .append("svg")
                    .attr("width", 150)
                    .attr("height", 100);

                    var tiprent = d3.select("#tipDiv").select("svg");
                 
                   

                // For SATS score bar:
                    tipSVG.append("rect")
                        .attr("fill", "steelblue")
                        .attr("y", 0) //y position of the bar
                        .attr("width", 0) //position of how far the bar starts at
                        .attr("height", 20) //the thickness of the bar
                        .transition() //facilitates the transition from empty canvas to bar
                        .duration(900) //how long it takes for the bar to move
                        .attr("width", function() {
                          
                           return barwidth(SATdict[d.properties.ZIP]);
                        }); 


                    tipSVG.append("text")
                        .text("SAT Score: " + SATdict[d.properties.ZIP])
                        .attr("x", 5)
                        .attr("y", 19)
                        .transition()
                        .duration(1000)
                        .attr("x", 3)

                // For Rent Bar:  
                    tiprent.append("rect")
                        .attr("fill", "red")
                        .attr("y", 20)
                        .attr("width", 0)
                        .attr("height", 20) 
                        .transition() 
                        .duration(900) 
                        .attr("width", function() {
                           return barwidth(rentDict[d.properties.ZIP]);
                        }); 
                    tipSVG.append("text")
                        .text("Rent Price: " + rentDict[d.properties.ZIP])
                        .attr("x", 5)
                        .attr("y", 40)
                        .transition()
                        .duration(1000)
                        .attr("x", 3)


                })
                .on('mouseout', tool_tip.hide)

                //.on("click", function(d){newHeatMap.dispatch.call("selected", {}, SATdict[d.properties.ZIP]);});
        
                });
            });
        },

        dispatch: d3.dispatch("selected")
    }
    return newHeatMap;
}

//determines whether the SATScore is a valid number for the bar length
function barwidth(value) {
    if (value === undefined || isNaN(value) ) {
        return 0;
    }      
    return value *.1;
}

