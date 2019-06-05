
var rating = function(minPrice, maxPrice, parks, minSAT, schools, zipcodeData){

	var output = 0.0;

	if(minPrice > zipcodeData.MedGrossRent || 
		maxPrice < zipcodeData.MedGrossRent || 
		minSAT > zipcodeData.avgSAT){
		return 0.0;
	}

	var value = 0.0;

	if(parks == 1){
		value += zipcodeData.parks;
	}

	if(schools == 1){
		value += zipcodeData.schools;
	}

	value += ( zipcodeData.avgSAT * 10 / 2400 ); /* arbitrary multiplier of 10 */

	try{
		if(zipcodeData.MedGrossRent != null && zipcodeData.MedGrossRent > 0){
			output = value / zipcodeData.MedGrossRent; /* Value per Dollar */
		}
	}
	catch(err){
		return 0.0;
	}

	return output;
}
