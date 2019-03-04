class Aimer extends GameObject {
    constructor(){
      super();
      
      var myGeometry = new Vector3(0,0);
      var myGeometryComponent = new GeometryComponent(myGeometry);
      this.components.push(myGeometryComponent);
  
      var myRenderer = new GeometryRendererComponent("white", myGeometry);
      this.components.push(myRenderer);
      this.renderer = myRenderer;
  
      
    }
    
    
  }