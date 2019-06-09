//TODO: "dataSlider" and "dataSliderSAT" needs to be replaced with actual max and min.
	var dataSlider = [1200, 3500];
	var dataSliderSAT = [400, 1600];




	function init_priceText() {
		d3.select('p#value-range').text("From " + sliderRange
		  	.value()
		   	.map(d3.format('.02s'))
		   	.join(' to ')
		);
	}

//Code for SAT Slider:
// 	var sliderRangeSAT = d3
// 		   .sliderBottom()
// 		   .min(d3.min(dataSliderSAT))
// 		   .max(d3.max(dataSliderSAT))
// 		   .width(250)
// 	       .tickFormat(d3.format('0'))
// 	       .ticks(5)
// 	       .default([1000, 1300])
// 	       .fill('#2196f3')
// 	       .on('onchange', val => {
// 		      d3.select('p#SATtext')
// 		      	.text("From " + val.map(d3.format('.3r'))
// 		      	.join(' to '))
// 		      	SATrange = val.map(d3.format('.3r'));
// 		    });

	//Configues the price range text above slider only at initialization
	function init_SATtext() {
		d3.select('p#SATtext').text("From " + sliderRangeSAT
		   .value()
		   .map(d3.format('.3r'))
		   .join(' to ')
		);
	}


//Code for checkboxes:

	// update(): this gets what boxes have been checked. It sends back what boxes are checked every time a checkbox has been clicked/unclicked
	function update() {
		var choices = [];
		d3.selectAll(".myCheckbox").each(function(d){
          	cb = d3.select(this);
          	if(cb.property("checked")){
          		if (cb.property)
          			choices.push(cb.property("value"));
          		} 

          	//The line of text is for testing: makes sure the right boxes are being triggered
          	d3.select("#textline")
          		.text(choices);

        });
        return choices;
	}

