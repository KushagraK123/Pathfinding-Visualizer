import { Pair } from "../maze/pair";
import { AlgoResult } from "./algoResult";

export class BFS {
    WALL = 3;
    visitOrder: Array<Pair> = new Array<Pair>()
    path: Array<Pair> = new Array<Pair>()

    queue: Array<Pair>;
    constructor() {
        this.queue = new Array<Pair>();
    }
    bfs(rows: number, columns: number,  startPoint: Pair, endPoint: Pair, board: number[][]) {
        this.queue.push(startPoint);
        let visited: boolean[][] =[];

        for(var i: number = 0; i < rows; i++) {
            visited[i] = [];
            for(var j: number = 0; j< columns; j++) {
                visited[i][j] = false;
            }
        }

        let parent: Pair[][] = []
        for(var i: number = 0; i < rows; i++) {
          parent[i] = [];
          for(var j: number = 0; j< columns; j++) {
              parent[i][j] = new Pair(0, 0);
          }
      }

        while(this.queue.length > 0) {
            let current = this.queue[0];
            let shortestPath: Array<Pair> = new Array<Pair>();
            if(current.x == endPoint.x && current.y == endPoint.y) {
                let curr = endPoint;
                while (!curr.equals(startPoint)) {
                  shortestPath.push(curr);
                  curr = parent[curr.x][curr.y];
                }
                shortestPath.push(startPoint);
                shortestPath.reverse();
                return new AlgoResult(this.visitOrder, visited, shortestPath, true);
            }
            this.visitOrder.push(current);
            this.queue.shift();
            let r = current.x;let c = current.y;

            if(visited[r][c]) {
              continue;
            }

            visited[r][c] = true;
         
            if(r > 0 && !visited[r-1][c] && !(board[r-1][c] == this.WALL)){
                parent[r-1][c] = new Pair(r,c);
                this.queue.push(new Pair(r-1, c));
              }
              if(c+1 < columns && !visited[r][c+1] && !(board[r][c+1] == this.WALL)){
                parent[r][c+1] = new Pair(r,c);
                this.queue.push(new Pair(r, c+1));
              }
              if(r+1 < rows && !visited[r+1][c] && !(board[r+1][c] == this.WALL )){
                parent[r+1][c] = new Pair(r,c);
                this.queue.push(new Pair(r+1, c));
              }
              
              if(c > 0 && !visited[r][c-1] && !(board[r][c-1] == this.WALL)){
                parent[r][c-1] = new Pair(r,c);
                this.queue.push(new Pair(r, c-1));
              }
        }
        return new AlgoResult(this.visitOrder, visited, new Array<Pair>(), false);
        

    }
}