class PriorityQueue {
    
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((prev, next) => prev.priority - next.priority);
    }
}

class WeightedGraph {

    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});        
    }

    findPathByDijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];

        let smallest;

        // Set initial state
        for (const vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        // As long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;

            if (smallest === finish) {
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break; // break outer loop    
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (const neighbor in this.adjacencyList[smallest]) {
                    
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }


        const description = {
            'Estacion de origen': start,
            'Estacion de destino': finish,
            'numero de estaciones': path.length + 1,
            ruta: path.concat(smallest).reverse() 
        };

        return description
    }
}


module.exports = {
    WeightedGraph
};