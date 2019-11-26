import data from './data';
import {distanceCalculate, diffTimeCalculate, paceCalculate, speedCalculate} from './Coordinates';

const extractPoints = () => {    
    
    var convert = require('xml-js');
    var options = {compact: true};
    var result = convert.xml2json(data, options);

    var coordinates = JSON.parse(result).gpx.trk.trkseg.trkpt;

    var points = [];

    var lat, lon, time;

    var distanceSum = 0.0
    
    coordinates.map((value, index) => {

        if(index !== 0){
            
            var dist = distanceCalculate(value._attributes.lat,value._attributes.lon,lat,lon,'K');
            var diffTime = diffTimeCalculate(value.time._text,time,'m');
            
            distanceSum = distanceSum + parseFloat(dist);

            var point = {
                lat,
                lon,
                time,
                distance: dist,
                distanceTotal: distanceSum,
                diffTime: diffTime,
                pace: paceCalculate(dist,diffTime),
                speed: speedCalculate(dist,diffTime)
            }

            points.push(point);
        }
        
        lat = value._attributes.lat;
        lon = value._attributes.lon;
        time = value.time._text; 
        
    });

    return points;
}

export default extractPoints;