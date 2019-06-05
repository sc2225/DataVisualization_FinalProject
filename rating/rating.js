
var rating = function(minPrice, maxPrice, parks, minSAT, schools, zipcodeData){

	var output = 0.0;

	if(minPrice > zipcodeData.avgRentPrice || maxPrice < zipcodeData.avgRentPrice){
		return 0.0;
	}

	var value = 0.0;

	value += zipcodeData.parks;

	value += zipcodeData.schools;

	value += ( zipcodeData.avgSATScore * 10 / 2400 ); /* arbitrary multiplier */

	try{
		if(zipcodeData.avgRentPrice != null && zipcodeData.avgRentPrice > 0){
			output = value / zipcodeData.avgRentPrice;
		}
	}
	catch(err){
		return 0.0;
	}

	return output;
}
