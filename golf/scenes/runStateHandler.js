var runStateHandler  = {
  start() {
    updateListeners.push(this);

    this.otherSquare = new Bad();
    this.otherSquare.transform.position.x = 3;
    this.otherSquare.transform.position.y = 4;


    this.square = new Good();
    

    this.hierarchy = [];
    this.hierarchy.push(this.square);
    this.hierarchy.push(this.otherSquare);



    this.cameraZoom = 50;
  },
  eventPump(event) {
    switch (event.name) {
      case "timer":
        this.update();

        for (let i = 0; i < this.hierarchy.length; i++) {
          var gameObject = this.hierarchy[i];
          let components = gameObject.components;
          for(let j = 0; j < gameObject.components.length; j++){
            let component = gameObject.components[j];
            if(component instanceof Behavior){
              if (typeof component.update === "function")
                component.update(gameObject);
            }
          }
          
        }
        this.render();
        break;
      case "mousedown":
        this.aim = new Aimer();
        this.aim.transform.position.x = this.otherSquare.transform.position.x;
        this.aim.transform.position.y = this.otherSquare.transform.position.y;
        force = new Vector2();
        force.x = event.location.x;
        force.y = event.location.y;
        this.aim.force = force;
        this.hierarchy.push(this.otherSquare);
        break;
      case "click":
        if( this.hierarchy[this.hierarchy.length])
        //this.nextScene(); // Temporarily disable moving between scene
        break;
    }
  },
  newSquare() {
    while (this.isInCollision()) {
      this.otherSquare.transform.position.x = (Math.random() * 2 - 1) * 6;
      this.otherSquare.transform.position.y = (Math.random() * 2 - 1) * 6;
    }
  },
  isInCollision() {
    var p1 = this.square.transform.position;
    var p2 = this.otherSquare.transform.position;

    var xDiff = Math.abs(p1.x - p2.x);
    var yDiff = Math.abs(p1.y - p2.y);
    var d = Math.max(xDiff, yDiff);
    if (d < 2)
      return true;
    return false
  },
  nextScene() {
    state = END_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  },
  update() {
    //This is where I update my model. I don't do any rendering here.

    var speed = 5;


    if (this.isInCollision()) {
      this.newSquare();
    }


  },
  render() {
    //This is where I render. I don't update my model here.
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width, height);

    ctx.save(); {
      //Camera transformations
      ctx.translate(width / 2, height / 2);
      ctx.scale(this.cameraZoom, this.cameraZoom);

      ctx.save(); {
        //World transformation
        ctx.scale(1, -1);


        ctx.save(); {


          for (var i = 0; i < this.hierarchy.length; i++) {
            var gameObject = this.hierarchy[i];

            ctx.save(); {
              ctx.translate(gameObject.transform.position.x, gameObject.transform.position.y);
              ctx.scale(gameObject.transform.scale.x, gameObject.transform.scale.y);

              if (typeof gameObject.render === "function")
                gameObject.render(ctx);
            }
            ctx.restore();

          }
        }
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();

    var rDimensions = positionGUI(width, height, .25, 20, .25)

    ctx.fillStyle = "rgba(255, 255, 255, .5)"

    ctx.fillRect(rDimensions.x,
      rDimensions.y,
      rDimensions.width,
      rDimensions.height);


    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    let string = "Click to end the game";

    ctx.fillText(string, rDimensions.x + rDimensions.width / 2 - ctx.measureText(string).width / 2, rDimensions.y + 20);


  }
};