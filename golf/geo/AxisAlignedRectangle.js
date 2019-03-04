class AxisAlignedRectangle extends Geometry {
  constructor(a, b, ) {
    super();
    this.widthHeight;

    // JS doesn't allow multiple constructors, so we'll examine the constructor arguments to see what we should do.
    // Cases:
    // No parameters -> create a default rectangle
    // One parameter -> Expect either another AxisAlignedRectangle (copy constructor) or Vector2 (widthHeight) 
    // Two parameters -> Expect two floats as width, height

    if (!a) {
      //No parameters
      this.widthHeight = new Vector2(1, 1);
      return;
    }
    if (!b) {
      //If we get here, we have exactly one parameter
      if (a instanceof AxisAlignedRectangle) {
        this.widthHeight = a.widthHeight;
        return;
      }
      if (b instanceof Vector2) {
        this.widthHeight = new Vector2(a);
        return;
      }
      //If we get here, we have one argument but of the wrong type
      throw "Bad parameter type in AxisAlignedRectangle constructor";
    }
    //If we get here we have two arguments
    if (!typeof a === "number" || !typeof b === "number")
      throw "Bad parameter type in AxisAlignedRectangle constructor";
    //If we get here we have two numbers as arguments
    this.widthHeight = new Vector2(a, b);

  }

}