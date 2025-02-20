import { getDistance } from "geolib";

const maxDistance = (arr) => {
    const coordinatesArr = arr.map(el => getCoordinates(el));

    const myCoords = getCoordinates(sessionStorage.getItem("location"))
    const distances = coordinatesArr.map(coord => getDistance(myCoords, coord))
    return Math.max(...distances)
}

const getCoordinates = (str) =>{
    const coordinates = {};
        const parts = str.split(',');
        
        parts.forEach(part => {
            const [key, value] = part.split(':');
            if (key == 'lat' || key == 'lon') {
                coordinates[key == 'lat'? 'latitude' : 'longitude'] = Number(value);
            }
        });
        return coordinates
}

export { maxDistance, getCoordinates }