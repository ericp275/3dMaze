class Vector3 extends Geometry {
    constructor(a, b) {
      super();
      this.ball = new Vector2();
      this.force = new Vector2();
  
      //Check that we have the right number of arguments of the right type
      // Zero parameters -> default value
      // One parameter -> Expect another Vector2
      // Two parameters -> Expect two numbers in x,y format
      if (!a) {
        //No parameters, so we are fine with the default values above.
        return;
      }
      if (!b) {
        //Exactly one parameter
        if (!a instanceof Vector2) {
          throw "Wrong parameter types in Vector3 constructor";
        }
        //If we get here, we have one parameter that is a Vector2
        this.force = a;
      }
      //If we get here, we have two parameters
      if (!a instanceof Vector2 || !b instanceof Vector2) {
        throw "wrong parameter types in Vector3 constructor";
      }
      //If we get here, we have two arguments that are both Vector2
      this.ball = a;
      this.force = b;
  
    }
  }