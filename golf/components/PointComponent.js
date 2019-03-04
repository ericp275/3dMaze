class PointComponent extends GeometryComponent{
  constructor(point){
    super();
    
    //If we received a parameter, use that point
    if (point)
      this.Geometry = point;
    //Otherwise, create a new Vector2
    else
      this.Geometry = new Vector2();
  }
}