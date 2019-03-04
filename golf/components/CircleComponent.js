class CircleComponent extends Geometry{
  constructor(circle){
    super();
    
    //If we received a parameter, use that circle
    if (circle)
      this.Geometry = circle;
    //Otherwise, create a new circle
    else
      this.Geometry = new Circle();
  }
}