class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  addPoint(point){
    this.points.push(point);
  } 
  
  addSegment(segment){
    this.segments.push(segment);
  }

  reset(){
    this.points.length = 0;
    this.segments.length = 0;
  }
}
