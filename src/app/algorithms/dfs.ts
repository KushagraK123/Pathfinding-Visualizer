import { Pair } from "../maze/pair";
import { AlgoResult } from "./algoResult";

export class DFS {
    visited: boolean[][] = [];
    WALL = 3;
    board: number[][] = [];
    parent: Pair[][] = []
    visitOrder: Array<Pair> = new Array<Pair>();
    path: Array<Pair> = new Array<Pair>();
    count = 0;
    pathFound = false;
    constructor() {
    }

    dfs(rows: number, columns: number, startPoint: Pair, endPoint: Pair, board: number[][]) {
        this.board = board;
        this.visited = [];
        this.parent = [];
        for(var i: number = 0; i < rows; i++) {
          this.parent[i] = [];
          for(var j: number = 0; j< columns; j++) {
              this.parent[i][j] = new Pair(0, 0);
          }
        }
        for(var i: number = 0; i < rows; i++) {
            this.visited[i] = [];
            for(var j: number = 0; j< columns; j++) {
                this.visited[i][j] = false;
            }
        }
        this.dfsHelper(rows, columns, startPoint.x, startPoint.y ,endPoint);
        if(this.pathFound) {
            let curr: Pair = endPoint;
                while (!curr.equals(startPoint)) {
                  this.path.push(curr);
                  if(this.parent[curr.x][curr.y] instanceof Pair) {
                    console.log("here was ");
                    curr = this.parent[curr.x][curr.y];
                  }else {
                      console.log("not ");
                      break;
                  }
                }
                this.path.push(startPoint);
                this.path.reverse();      

            return new AlgoResult(this.visitOrder, this.visited, this.path, true);
        }else {
            return new AlgoResult(this.visitOrder, this.visited, new Array<Pair>(), true);
        }
   
    }
    
    private dfsHelper(rows: number, columns: number, r: number, c: number, endPoint: Pair) {
        // this.count++;
        //console.log("Here inside gmh " + this.count);
        if(this.pathFound) return;
        this.visited[r][c] = true;
        this.visitOrder.push(new Pair(r, c));
        if(endPoint.equals(new Pair(r, c))) {
            console.log("Found path");
            this.pathFound = true;
            return;
        }

        if(r+1 < rows && !this.visited[r+1][c] && !(this.board[r+1][c] == this.WALL) ){
            this.dfsHelper(rows, columns, r+1, c, endPoint);
            this.parent[r+1][c] = new Pair(r,c);
        }
        
        if(c+1 < columns && !this.visited[r][c+1] && !(this.board[r][c+1] == this.WALL)){
           this.dfsHelper(rows, columns, r, c+1, endPoint); 
           this.parent[r][c+1] = new Pair(r,c);


        }
        
        if(r-1 >= 0 && !this.visited[r-1][c] && !(this.board[r-1][c] == this.WALL)){
            this.dfsHelper(rows, columns, r-1, c, endPoint);
            this.parent[r-1][c] = new Pair(r,c);

        }

        if(c-1 >=0  && !this.visited[r][c-1] && !(this.board[r][c-1] == this.WALL)){
            this.dfsHelper(rows, columns, r, c-1, endPoint);
            this.parent[r][c-1] = new Pair(r,c);
        }
    }

} 
