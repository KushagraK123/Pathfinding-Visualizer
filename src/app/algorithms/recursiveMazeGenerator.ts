import { MazeComponent } from "../maze/maze.component";

export class RecursiveMazeGenerator {
    ans: number[][] = [];
    visited: boolean[][] = [];
    count = 0;
    constructor() {
    }

    generateMaze(rows: number, columns: number, board: number[][]) {
        this.ans = board;
        this.visited = [];
        for(var i: number = 0; i < rows; i++) {
            this.visited[i] = [];
            for(var j: number = 0; j< columns; j++) {
                this.visited[i][j] = false;
            }
        }
        for(var i: number = 0; i < rows; i++) {
            for(var j: number = 0; j< columns; j++) {
                if(board[i][j] == 0)
                board[i][j] = 3;
            }
        }
        this.generateMazeHelper(rows, columns, 0, 0);
        return this.ans;
    }
    
    private generateMazeHelper(rows: number, columns: number, r: number, c: number) {
        this.count++;
        //console.log("Here inside gmh " + this.count);
        this.visited[r][c] = true;
  
        let random:number = Math.floor(Math.random() * (2) ) ;
        if(random == 0) {
            if(this.ans[r][c] == 3)
            this.ans[r][c] = 0;
        }
        
        if(r+1 < rows && !this.visited[r+1][c])
            this.generateMazeHelper(rows, columns, r+1, c);
        
        if(c+1 < columns && !this.visited[r][c+1])
           this.generateMazeHelper(rows, columns, r, c+1);   
        
        if(r-1 >= 0 && !this.visited[r-1][c])
            this.generateMazeHelper(rows, columns, r-1, c);

        if(c-1 >=0  && !this.visited[r][c-1])
            this.generateMazeHelper(rows, columns, r, c-1);
        
        
    }

} 
