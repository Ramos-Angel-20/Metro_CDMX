const { readFileSync } = require('fs');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

const createLinesDescription = () => {
    const xml = readFileSync('./map.xml', 'utf-8');
    const doc = new dom().parseFromString(xml);
    
    
    const lines = [];
    const fetchedLineNames = xpath.select('/Document/Folder[1]/Placemark/name/text()', doc); 
    const lineNames = fetchedLineNames.toString().split(',');

    lineNames.forEach(lineName => {
        const fetchedLineStations = xpath.select(`/Document/Folder[1]/Placemark[name="${lineName}"]/LineString/coordinates/text()`, doc);
        const stations = fetchedLineStations.toString().split(/\r\n|\n/);
        
        const trimmedStations = stations.map(list => list.trim());
        const cleanedStationsList = trimmedStations.filter(list => list !== '');
        
        const coordinates = cleanedStationsList.map(values => {
            const splitted = values.split(',');
            return {
                lat: splitted[0],
                long: splitted[1]
            };
        });

        const lineDescription = {
            name: lineName,
            stations: [...coordinates]
        };

        lines.push(lineDescription);
    });

    return lines;
}

const linesDescription = createLinesDescription();
linesDescription.forEach(item => {
    console.log(item);
})