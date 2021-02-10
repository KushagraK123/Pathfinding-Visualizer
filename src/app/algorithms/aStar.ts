import { Pair } from "../maze/pair";
import { AlgoResult } from "./algoResult";

export class Astar {
    WALL = 3;

    heap: Array<Pair>;
    visitOrder: Array<Pair> = new Array<Pair>();
    path: Array<Pair> = new Array<Pair>();
    g: number[][] = [];
    constructor() {
        this.heap = new Array<Pair>();
    }
    aStar(rows: number, columns: number,  startPoint: Pair, endPoint: Pair, board: number[][]) {
        this.heap.push(startPoint);
        console.log(startPoint.x + " " + startPoint.y);
        let visited: boolean[][] =[];

        for(var i: number = 0; i < rows; i++) {
            visited[i] = [];
            for(var j: number = 0; j< columns; j++) {
                visited[i][j] = false;
            }
        }

        for(var i: number = 0; i < rows; i++) {
          this.g[i] = [];
          for(var j: number = 0; j< columns; j++) {
              this.g[i][j] = 10000000;
          }
        }
        this.g[startPoint.x][startPoint.y] = 0;

        let parent: Pair[][] = []
        for(var i: number = 0; i < rows; i++) {
          parent[i] = [];
          for(var j: number = 0; j< columns; j++) {
              parent[i][j] = new Pair(0, 0);
          }
        }

        while(this.heap.length > 0) {
            let minIndex = 0;
            let minF = 10000000;
            
            for(let i=0; i<this.heap.length; i++){
              let currPair = this.heap[i];
              console.log("Here1")
              let currH = this.getG(currPair.x, currPair.y) + this.getH(currPair, endPoint);
              if( currH < minF) {
                minF = currH;
                minIndex = i;
              }
            }
            console.log("Here");
            let curr = this.heap[minIndex];
            this.visitOrder.push(curr);
            this.heap.splice(minIndex, 1);

            let r =curr.x, c = curr.y;
            if(r == endPoint.x && c == endPoint.y) {
              let shortestPath: Array<Pair> = new Array<Pair>();
                curr = endPoint;
                while (!curr.equals(startPoint)) {
                  shortestPath.push(curr);
                  curr = parent[curr.x][curr.y];
                }
                shortestPath.push(startPoint);
                shortestPath.reverse();
                return new AlgoResult(this.visitOrder, visited, shortestPath, true);
          
            }


            if(r > 0 && this.g[r-1][c] > (this.g[curr.x][curr.y] +1 ) && !(board[r-1][c] == this.WALL)){
              this.g[r-1][c] = (this.g[curr.x][curr.y] +1 );
              parent[r-1][c] = new Pair(r,c);
              this.heap = [new Pair(r-1, c)].concat(this.heap);
            }
            if(c+1 < columns && this.g[r][c+1] > (this.g[curr.x][curr.y] +1 ) && !(board[r][c+1] == this.WALL)){
              this.g[r][c+1] = (this.g[curr.x][curr.y] +1 );
              parent[r][c+1] = new Pair(r,c);
              this.heap = [new Pair(r, c+1)].concat(this.heap);
            }

            if(r+1 < rows && this.g[r+1][c] > (this.g[curr.x][curr.y] +1 ) && !(board[r+1][c] == this.WALL)){
              this.g[r+1][c] = (this.g[curr.x][curr.y] +1 );
              parent[r+1][c] = new Pair(r,c);
              this.heap = [new Pair(r+1, c)].concat(this.heap);
            }
            if(c > 0 && this.g[r][c-1] > (this.g[curr.x][curr.y] +1 ) && !(board[r][c-1] == this.WALL)){
              this.g[r][c-1] = (this.g[curr.x][curr.y] +1 );
              parent[r][c-1] = new Pair(r,c);
              this.heap = [new Pair(r, c-1)].concat(this.heap);
            }
          }

     return new AlgoResult(this.visitOrder, visited, new Array<Pair>(), false);

    }
    private getH(a: Pair, b: Pair) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    private getG(x: number, y: number) {
      return this.g[x][y];
    }
}