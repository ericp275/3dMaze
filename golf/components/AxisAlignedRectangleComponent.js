class AxisAlignedRectangleComponent extends GeometryComponent {
  constructor(axisAlignedRectangle) {
    super();
    
    //If we received a parameter, use that rectangle
    if (axisAlignedRectangle)
      this.Geometry = axisAlignedRectangle;
    //Otherwise, create a new rectangle
    else
      this.Geometry = new AxisAlignedRectangle();
  }
}