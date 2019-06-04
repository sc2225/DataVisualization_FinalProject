var heatMapVis = function(){
    var newHeatMap = {
        drawMap: function(svg, bottom, top){
            //Load in GeoJSON data
            
            d3.json("https://dhruvkore.github.io/DataVisualization_FinalProject/chicago.json", function(json) {

                // //Width and height
                var width = 900;
                var height = 450;

                // create a first guess for the projection
                var center = d3.geo.centroid(json)
                var scale = 150;
                var projection = d3.geo.mercator().scale(scale).center(center);
                //Define path generator
                var path = d3.geo.path()
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
                projection = d3.geo.mercator().center(center)
                .scale(scale * 0.9).translate(offset);
                path = path.projection(projection);

                //Create SVG element
                svg = d3.select(".chart")
                        .attr("width", width)
                        .attr("height", height)
                        

                //Bind data and create one path per GeoJSON feature
                svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "zipcode")
                .attr("fill", function(d){
                    var val = Math.random();
                    if(val > bottom || val < top){
                        return 'rgb(150,150,150)'
                    }else{
                    var red = (43 * val);
                    var blue = (43 * val);
                    var green = (216 * val);
                    return `rgb(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue)})`;
                    }
                })

            });
        }
    }
    return newHeatMap;
}