import { Pair } from "../maze/pair";

export class AlgoResult {
    visitOrder: Array<Pair>;
    visited: boolean[][];
    shortestPath: Array<Pair>;
    pathFound = false;

    constructor(vo: Array<Pair>, visited: boolean[][], shortestPath: Array<Pair>, pathFound: boolean){
        this.visitOrder = vo;
        this.visited = visited;
        this.shortestPath = shortestPath;
        this.pathFound = pathFound;
    }
}