const { readFileSync } = require('fs');
const { WeightedGraph } = require('./dijkstra');
const { calculateHaversineFormula } = require('./helpers/formulaHaversine');
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

            const fetchedLineStationsName = xpath.select(`/Document/Folder[2]/Placemark/Point/coordinates[normalize-space()="${values}"]/parent::Point/parent::Placemark/name/text()`, doc);
            const fetchedLineStationsDescription = xpath.select(`/Document/Folder[2]/Placemark/Point/coordinates[normalize-space()="${values}"]/parent::Point/parent::Placemark/description/text()`, doc);
            const stationName = fetchedLineStationsName.toString();
            const stationDescription = fetchedLineStationsDescription.toString();
            const splitted = values.split(',');


            return {
                stationName,
                stationDescription,
                lat: parseFloat(splitted[0]),
                long: parseFloat(splitted[1])
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


const graph = new WeightedGraph();

const linesDescription = createLinesDescription();

const stationsList = linesDescription.flatMap(item => {
    return item.stations;
});

linesDescription.forEach(item => {
    
    for (let i = 0; i < item.stations.length; i++) {
        graph.addVertex(item.stations[i].stationName.toString());
        
        if (item.stations[i - 1] !== undefined) {
            const prevNode = item.stations[i - 1].stationName;
            const currentNode = item.stations[i].stationName;

            //Get lat and long to calculate the distance between stations
            const currentNodeCoords = stationsList.filter(station => station.stationName === currentNode);
            const prevNodeCoords = stationsList.filter(station => station.stationName === prevNode);
            
            const currentNodeLat = currentNodeCoords[0].lat;
            const currentNodeLong = currentNodeCoords[0].long; 
            
            const prevNodeLat = prevNodeCoords[0].lat;           
            const prevNodeLong = prevNodeCoords[0].long;
            
            const distance = calculateHaversineFormula(currentNodeLat, currentNodeLong, prevNodeLat, prevNodeLong);

            graph.addEdge(prevNode, currentNode, parseFloat(distance));
        }
    }
});

const path = graph.findPathByDijkstra('Aculco', 'Morelos');
console.log(path);


