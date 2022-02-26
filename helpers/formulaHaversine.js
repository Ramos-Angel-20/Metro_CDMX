const toRad = (value) => {
    return value * Math.PI / 180;
}

const calculateHaversineFormula = (lat1, long1, lat2, long2) => {
    
    const earthRadius = 6371; //km
    
    const differenceLat = lat1 - lat2;
    const differenceLatRad = toRad(differenceLat);
    
    const differenceLong = long1 - long2;
    const differenceLongRad = toRad(differenceLong);

    const a = ( Math.sin(differenceLatRad/2) * Math.sin(differenceLatRad/2) ) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * ( Math.sin(differenceLongRad / 2) * Math.sin(differenceLongRad / 2) );
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    return d.toFixed(2);
} 

module.exports = {
    calculateHaversineFormula
};