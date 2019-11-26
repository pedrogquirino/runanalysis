export const distanceCalculate = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit==="K") { dist = dist * 1.609344 }
		if (unit==="N") { dist = dist * 0.8684 }
		return dist.toFixed(6);
	}
}

export const diffTimeCalculate = (t1, t2, u) => {

    if((t1 === '' || t2 === '') || t1 === t2)
        return 0;

    var time1 = new Date(t1);
    var time2 = new Date(t2);

    var unit;    

    if(u === 'h') { unit = 3600000 } 
    
    else if(u === 'm') { unit = 60000 }
    
    else if(u === 's') { unit = 1000 }
    
    else if(u === null) { unit = 1 }    
    
    else { return 0 }
    
    return (Math.abs(time1 - time2) / unit).toFixed(4);
}

export const speedCalculate = (distance,diffTime) => {
	return (distance / (diffTime / 60)).toFixed(2)
}

export const paceCalculate = (distance,time) => {

	var value = (time / distance); 

	var number = String(value).split(".");

	var digits = (String(number[1]).substring(0,2) * 0.6).toFixed(0).padStart(2, "0");

	var pace = String(number[0]) + "." + String(digits);

	return pace;
}

export const filterByDistance = (data,distanceParameter) => {

	if(distanceParameter === 0){
		return data;
	}

	var distanceParameterSum = distanceParameter;

	var dataFiltered = [];

	data.map(coordinate => {

		if(coordinate.distanceTotal > distanceParameterSum){
			dataFiltered.push(coordinate);
			distanceParameterSum = distanceParameterSum + distanceParameter;			
		};

	});

	return dataFiltered;

}

export const calculatePaceAverage = (data) => {

	return (data.reduce( (acc, cur) => {
		return parseFloat(acc) + parseFloat(cur.pace);
	}, 0)/ data.length).toFixed(2);
}

export const calculateSpeedAverage = (data) => {

	return (data.reduce( (acc, cur) => {
		return parseFloat(acc) + parseFloat(cur.speed);
	}, 0)/ data.length).toFixed(2);
}