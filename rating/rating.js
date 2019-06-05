
var rating = function(minPrice, maxPrice, parks, minSAT, schools, zipcodeData){

	var output = 0.0;

	if(minPrice > zipcodeData.avgRentPrice || maxPrice < zipcodeData.avgRentPrice){
		return 0.0;
	}

	var value = 0.0;

	if(parks == 1){
		value += zipcodeData.parks;
	}

	if(schools == 1){
		value += zipcodeData.schools;
	}

	value += ( zipcodeData.avgSATScore * 10 / 2400 ); /* arbitrary multiplier of 10 */

	try{
		if(zipcodeData.avgRentPrice != null && zipcodeData.avgRentPrice > 0){
			output = value / zipcodeData.avgRentPrice; /* Value per Dollar */
		}
	}
	catch(err){
		return 0.0;
	}

	return output;
}
