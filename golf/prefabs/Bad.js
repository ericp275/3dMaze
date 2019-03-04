class Bad extends GameObject {
  constructor(){
    super();    

    var myGeometry = new Circle(1);
    var myGeometryComponent = new GeometryComponent(myGeometry);
    this.components.push(myGeometryComponent);

    var myRenderer = new GeometryRendererComponent("red", myGeometry);
    this.components.push(myRenderer);
    this.renderer = myRenderer;
  }
 
  
}