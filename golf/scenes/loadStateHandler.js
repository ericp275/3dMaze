var loadStateHandler = {
  start() {
    updateListeners.push(this);
    this.timeCount = 0;
  },
  eventPump(event) {
    switch (event.name) {      
      case "timer":
        this.update();
        this.render();
        break;
    }
  },
  nextScene() {
    state = RUN_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  },
  update() {
    //This is where I update my model. I don't do any rendering here.
    this.timeCount++;
    if (this.timeCount > 30) {
      this.nextScene();
    }
    
  },
  render() {
    //This is where I render. I don't update my model here.   

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    var rDimensions = positionGUI(width, height, .25, 20, .25)

    ctx.fillStyle = "rgba(255, 255, 255, .5)"

    ctx.fillRect(rDimensions.x,
      rDimensions.y,
      rDimensions.width,
      rDimensions.height);


    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    let string = "Loading";

    ctx.fillText(string, rDimensions.x + rDimensions.width / 2 - ctx.measureText(string).width / 2, rDimensions.y + 20);
  }
};
