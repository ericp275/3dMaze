class GoodSquareBehavior extends Behavior{
  constructor(){
    super();
    this.speed = 5;

  }
  update(){
    if (keys["a"] || keys["ArrowLeft"]) {
      this.transform.position.x -= this.speed * Time.deltaTime; /// speed is in units/s * s
    }
    if (keys["d"] || keys["ArrowRight"]) {
      this.transform.position.x += this.speed * Time.deltaTime; /// speed is in units/s * s
    }

    if (keys["w"] || keys["ArrowUp"]) {
      this.transform.position.y += this.speed * Time.deltaTime; /// speed is in units/s * s
    }
    if (keys["s"] || keys["ArrowDown"]) {
      this.transform.position.y -= this.speed * Time.deltaTime; /// speed is in units/s * s
    }
  }
  

}