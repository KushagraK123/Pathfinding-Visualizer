import { Component, OnInit } from '@angular/core';
import { AlgoResult } from '../algorithms/algoResult';
import { Astar } from '../algorithms/aStar';
import { BFS } from '../algorithms/bfs';
import { DFS } from '../algorithms/dfs';
import { GreedyBestFirstSearch } from '../algorithms/greedyBestFirst';

import { RecursiveDivision } from '../algorithms/recursiveDivisionMaze';
import { Pair } from './pair';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  columns = 52;
  rows = 19;
  
  EMPTY_BOX = 0;
  START_POINT = 1;
  END_POINT = 2;
  WALL = 3;
  VISITED = 4;
  SHORTEST_PATH = 5;
  START_POINT_VISITED = 6;
  END_POINT_VISITED = 7;
  START_POINT_SHORTEST_PATH = 8;
  END_POINT_SHORTEST_PATH = 9;



  isMouseDownWalls = false;
  isMouseDownStartPoint = false;
  isMouseDownEndPoint = false;
  pathFound: boolean = false;
  visualizing: boolean = false;
  startPoint = new Pair(10, 12);
  endPoint = new Pair(10, 40);
  board: number[][] = [];
  visitOrder: Array<Pair> = new Array<Pair>();
  speed = 25;

  algorithmDetails="Please choose an algorithm to VISUALIZE!";
  bfsId = "bfs";
  astarId = "astar";
  dfsId = "dfs";
  gbfsId = "gbfs";

  pathfindingAlgorithms = [
    {
      id : this.bfsId,
      name: "Breadth First Search",
    }, 
    {
      id : this.astarId,
      name: "A* Search"
     
    }, 
    {
      id : this.dfsId,
      name: "Depth First Search"
    }, 
    {
      id: "gbfs",
      name: "Greedy Best First Search"
    }
  ];


  selectedAlgoId = "none";

  setSpeed(speed: number) {
    this.speed = speed;
  }

  algoSelected(id: string){
    this.selectedAlgoId = id;

    switch(this.selectedAlgoId) {
      case this.bfsId:
        this.algorithmDetails = "Breadth First Search is a non-weighted graph search algorithm, which guarentees the SHORSTEST PATH.";
        break;
      
      case this.astarId:
        this.algorithmDetails =  "A* Search is a weighted graph search algorithm, which guarentees the SHORSTEST PATH."
        break;
      
        case this.dfsId:
          this.algorithmDetails = "Depth First Search is a non-weighted graph search algorithm, which does not guarentee the SHORSTEST PATH.";
        break

        case this.gbfsId:
          this.algorithmDetails = "Greedy Best First Search is a weighted graph search algorithm, which does not guarentee the SHORTEST PATH.";
          break;
      
        default:
        break;
    }

  }

  constructor() {

    document.body.addEventListener("mouseup", () => { 
      this.onMouseUp(); 
    });

    this.clear();
   }
  ngOnInit(): void {

  }

  counter(i: number) {
    return new Array(i);
  }
  isStartPoint(x:number, y: number) {
    return (this.board[x][y] == this.START_POINT);
  }

  isEndPoint(x:number, y: number) {
    return (this.board[x][y] == this.END_POINT);
  }

  onBoxClicked(x: number, y: number) {
    if(this.board[x][y] == this.EMPTY_BOX) {
      this.board[x][y] = this.WALL;
    }else if(this.board[x][y] == this.WALL) {
      this.board[x][y] = this.EMPTY_BOX;
    }
  }

  isWall(x: number, y: number) {
    return this.board[x][y] == this.WALL;
  }

  isShortestPath(x: number, y: number) {
    return this.board[x][y] == this.SHORTEST_PATH;
  }

  isVisited(x: number, y: number) {
    return this.board[x][y] == this.VISITED;
  }

  isStartPointVisited(x: number, y: number) {
    return this.board[x][y] == this.START_POINT_VISITED;
  }


  isEndPointVisited(x: number, y: number) {
    return this.board[x][y] == this.END_POINT_VISITED;
  }

  isStartPointShortestPath(x: number, y: number) {
    return this.board[x][y] == this.START_POINT_SHORTEST_PATH;
  }

  isEndPointShortestPath(x: number, y: number) {
    return this.board[x][y] == this.END_POINT_SHORTEST_PATH;
  }


  isSimpleBox(x:number, y:number){
    return this.board[x][y] == this.EMPTY_BOX;
  }


  findPath() {
    this.clearPath();
    this.pathFound= false;
    this.visualizing = true;
    switch(this.selectedAlgoId) {
      case this.bfsId: 
      let bfs = new BFS();
      let bfsResult: AlgoResult =  bfs.bfs(this.rows, this.columns, this.startPoint, this.endPoint, this.board);
      this.displayPath(bfsResult);
      break;
        
      case this.astarId:
        let astar = new Astar();
        let astarResult: AlgoResult =  astar.aStar(this.rows, this.columns, this.startPoint, this.endPoint, this.board);
        this.displayPath(astarResult);
        break;
      case this.dfsId:
        let dfs = new DFS();
        let dfsResult = dfs.dfs(this.rows, this.columns, this.startPoint, this.endPoint, this.board);
        this.displayPath(dfsResult);
        break
      case this.gbfsId:

        let gbfs = new GreedyBestFirstSearch();
        let gbfsResult = gbfs.gbfs(this.rows, this.columns, this.startPoint, this.endPoint, this.board);
        this.displayPath(gbfsResult);

        break;
      default:

        this.visualizing = false;
        this.showError();
        break;
    }
  }

  showError() {
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x!.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 3000);
  }

  showPathNotFound() {
    var x = document.getElementById("snackbar2");
    // Add the "show" class to DIV
    x!.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 3000);
  }

  displayPath(result: AlgoResult) {
    let count=0;
    let n = result.visitOrder.length;
    for(let pair of result.visitOrder){
      count++;
      setTimeout( () => { 
        if(this.board[pair.x][pair.y] == this.EMPTY_BOX) {
          this.board[pair.x][pair.y] = this.VISITED;
        }else if(pair.equals(this.startPoint)){
          this.board[pair.x][pair.y] = this.START_POINT_VISITED;
        }else if(pair.equals(this.endPoint)){
          this.board[pair.x][pair.y] = this.END_POINT_VISITED;
        }
       }, this.speed *count);
       
    }
    setTimeout( () => { 
      this.visualizing = false;
      if(!result.pathFound) {
        this.showPathNotFound();
      }
    }, (result.visitOrder.length + result.shortestPath.length ) * this.speed);
    for(let pair of result.shortestPath){
      count++;
      setTimeout( () => { 
        if(this.board[pair.x][pair.y] == this.VISITED) {
          this.board[pair.x][pair.y] = this.SHORTEST_PATH;
        }else if(pair.equals(this.startPoint)){
          this.board[pair.x][pair.y] = this.START_POINT_SHORTEST_PATH;
        }else if(pair.equals(this.endPoint)){
          this.board[pair.x][pair.y] = this.END_POINT_SHORTEST_PATH;
        }
      }, this.speed *count);
    }
  }

  generateMaze() {
    this.clear();
    let mazeGenerator = new RecursiveDivision();
    this.board = mazeGenerator.generateMaze(this.rows, this.columns, this.board);
  }


  

  onMouseUp() {
    this.isMouseDownWalls = this.isMouseDownEndPoint = this.isMouseDownStartPoint = false;
  }
  onMouseDown(i: number, j: number) {
    if(this.startPoint.x == i && this.startPoint.y == j) {
      this.isMouseDownStartPoint =true;
    }else if(this.endPoint.x == i && this.endPoint.y == j) {
      this.isMouseDownEndPoint =true;
      this.isMouseDownStartPoint= this.isMouseDownWalls = false;
    }else{
      
      if(this.board[i][j] == this.EMPTY_BOX) {
        //this.board[i][j] = this.WALL;
      }else if(this.board[i][j] == this.WALL) {
        //this.board[i][j] = this.EMPTY_BOX;
      }      
      this.isMouseDownWalls = true;
    }
  }

  clearPath() {
    this.visitOrder = new Array<Pair>()
    this.isMouseDownWalls = false;
  this.isMouseDownStartPoint = false;
  this.isMouseDownEndPoint = false;
  this.pathFound = false;
      for(var i: number = 0; i < this.rows; i++) {
          for(var j: number = 0; j< this.columns; j++) {
            if( !this.startPoint.equals(new Pair(i, j)) && !this.endPoint.equals(new Pair(i, j)) && !(this.board[i][j] == this.WALL) )
              this.board[i][j] = this.EMPTY_BOX;
            if( (this.board[i][j] == this.START_POINT_VISITED) || ( this.board[i][j] ==  this.START_POINT_SHORTEST_PATH) )
              this.board[i][j] = this.START_POINT;
            
            if( (this.board[i][j] == this.END_POINT_VISITED) || ( this.board[i][j] == this.END_POINT_SHORTEST_PATH) )
              this.board[i][j] = this.END_POINT;
          }
      }
  
  }
  onMouseEnter(i:number, j:number) {
    if(this.isMouseDownWalls){
      if(this.board[i][j] == this.EMPTY_BOX) {
        this.board[i][j] = this.WALL;
      }else if(this.board[i][j] == this.WALL) {
        this.board[i][j] = this.EMPTY_BOX;
      }      
    }else if(this.board[i][j] == this.WALL) {
      return;
    }
    else if(this.isMouseDownStartPoint) {
      this.board[this.startPoint.x][this.startPoint.y] = this.EMPTY_BOX;
      this.startPoint = new Pair(i, j);
    
      this.board[i][j] = this.START_POINT;
    }else if(this.isMouseDownEndPoint) {

      this.board[this.endPoint.x][this.endPoint.y] = this.EMPTY_BOX;
      this.endPoint = new Pair(i, j);
      this.board[i][j] = this.END_POINT;
    }
  }
  
  clear() {


  this.visitOrder = new Array<Pair>()
  this.isMouseDownWalls = false;
  this.isMouseDownStartPoint = false;
  this.isMouseDownEndPoint = false;
  this.pathFound = false;
    this.board = [];
    for(var i: number = 0; i < this.rows; i++) {
        this.board[i] = [];
        for(var j: number = 0; j< this.columns; j++) {
            this.board[i][j] = 0;
        }
    }
    this.startPoint = new Pair(10, 12);
    this.endPoint = new Pair(10, 40);
  this.board[10][12] = this.START_POINT;
  this.board[10][40] = this.END_POINT;

  }

}
