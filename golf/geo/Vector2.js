//A class that holds an x and y component
class Vector2 extends Geometry {
  constructor(a, b) {
    super();
    this.x = 0;
    this.y = 0;

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
        throw "Wrong parameter types in Vector2 constructor";
      }
      //If we get here, we have one parameter that is another Vector2
      //Treat this as a copy constructor
      this.x = a.x;
      this.y = a.y;
    }
    //If we get here, we have two parameters
    if (!typeof a === "number" || !typeof b == "number") {
      throw "wrong parameter types in Vector2 constructor";
    }
    //If we get here, we have two arguments that are both numbers
    this.x = a;
    this.y = b;

  }
}