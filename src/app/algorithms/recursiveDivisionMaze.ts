import { ɵBrowserDomAdapter } from "@angular/platform-browser";
import { MazeComponent } from "../maze/maze.component";

export class RecursiveDivision {
    ans: number[][] = [];
    WALL = 3;
    count = 0;
    rowsLeft: Set<number> = new Set();
    columnsLeft: Set<number> = new Set();

    constructor() {
    }

    generateMaze(rows: number, columns: number, board: number[][]) {
        this.ans = board;
        for(let i=1; i < rows-2; i++)
            this.rowsLeft.add(i);

        for(let i=1; i < columns-2; i++)
            this.columnsLeft.add(i);

        this.generateMazeHelper(1, rows-2, 1, columns-2);
        return this.ans;
    }
    
    private generateMazeHelper(rStart: number, rEnd: number, cStart: number, cEnd: number) {
        if(rEnd <= rStart || cEnd <= cStart) {
            return;
        }
        if(rEnd - rStart <= 2 && cEnd - cStart == 2)
            return;
        let horizontal:boolean
        if(rEnd - rStart == 2) {
            horizontal = false;
        }else if(cEnd - cStart == 2) {
            horizontal = true;
        }else {
            horizontal = (0 == Math.floor(Math.random() * (2) ) );   
        }

       
        if(horizontal) {
            let row = Math.floor(Math.random() * (rEnd - rStart)) + rStart;
            if(!this.rowsLeft.has (row)) {
                let rowFound = false;
                for(let x=rStart;x<=rEnd; x++) {
                    if(this.rowsLeft.has(x)) {
                        row = x;
                        rowFound = true;
                    }
                }
                if(!rowFound)return;
            }
                          
            
            let columnToLeave = Math.floor(Math.random() * (cEnd - cStart)) + cStart;

            this.rowsLeft.delete(row);
            this.rowsLeft.delete(row-1);
            this.rowsLeft.delete(row+1);

            for(let i=cStart; i<=cEnd; i++) {
                if(this.ans[row][i] == 0 && i != columnToLeave) {
                    this.ans[row][i] = 3;
                }
            }
            this.generateMazeHelper(row+1, rEnd, cStart, cEnd);
            this.generateMazeHelper(rStart, row-1, cStart, cEnd);
            
        }else {
            let column = Math.floor(Math.random() * (cEnd - cStart)) + cStart;
            if(!this.columnsLeft.has (column)) {
                let colFound = false;
                for(let x=cStart;x<=cEnd; x++) {
                    if(this.columnsLeft.has(x)) {
                        column = x;
                        colFound = true;
                    }
                }
                if(!colFound)return;
            }
          
            let rowToLeave = Math.floor(Math.random() * (rEnd - rStart)) + rStart;


            this.columnsLeft.delete(column);
            this.columnsLeft.delete(column-1);
            this.columnsLeft.delete(column+1);

            for(let i=rStart; i<=rEnd; i++) {
                if(this.ans[i][column] == 0 && i != rowToLeave) {
                    this.ans[i][column] = 3;
                }
            }


            this.generateMazeHelper(rStart, rEnd, cStart, column -1);
            this.generateMazeHelper(rStart, rEnd, column+1, cEnd);

        }
        
    }

} 
