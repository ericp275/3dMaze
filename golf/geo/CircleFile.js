console.log("In circle");
class Circle extends Geometry {
  constructor(a) {
    super();
    this.radius = 1;

    // Handle constructor arguments
    // There are three cases we check for
    // No arguments -> use default values
    // One argument + argument is a number -> treat argument as the new radius
    // One argument + argument is another circle -> treat constructor as a copy constructor

    if (!a) {
      //use default values
      return;
    }
    //If we get here, we have an argument
    if (a instanceof Circle) {
      this.radius = a.radius;
      return;
    }
    if (typeof a == "number") {
      this.radius = a;
      return;
    }
    // If we get here, we had one parameter, but was of the wrong type
    throw "Bad parameter type in circle constructor";
  }
}

console.log("Circle file");