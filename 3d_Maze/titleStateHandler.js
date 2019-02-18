var titleStateHandler = {
      start() {
		console.log("Starting title state handler");
        updateListeners.push(this);
		this.zoom = 100;
		this.dir = 1;
      },
      eventPump(event) {
        switch (event.name) {
		  case "next":
            state = LOAD_STATE;
            updateListeners.splice(updateListeners.indexOf(this), 1);
            updateStateHandler();
            break;
		  case "timer":
			this.update();
			break;
        }
      },
	  update(){
		document.getElementById("cubeSize").innerHTML = "Map Size: " + (mapSize);
        this.canvas = document.getElementById("canv");
        this.ctx = this.canvas.getContext("2d");
        this.width = 640;
        this.height = 640;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
		//if (this.zoom > 120 || this.zoom < 80) {this.dir *= -1;}
		//this.zoom += this.dir;
			
        let ctx = this.ctx;


		ctx.translate(this.width / 2, this.height / 2);
                
        ctx.scale(this.zoom, this.zoom);

        ctx.fillStyle = "darkgreen";
        ctx.fillRect(-4, 1, 10, 10)
		ctx.fillStyle = "blue";
        ctx.fillRect(-4, 1, 10, -10)
		ctx.save()
		{
			ctx.fillStyle = "orange";
			ctx.fillRect(-.5, 1 - .25 * mapSize, .25 *  mapSize, .25 * mapSize)
			ctx.save()
			{
				ctx.translate(-.5,1);
				ctx.fillStyle = "steelblue";
				ctx.fillRect(.05, 0, .25, -.25)
			}
			ctx.restore()
		}
		//map Size Slider
		ctx.fillStyle = "white";
		ctx.fillRect(-1.5, 2, 3.5, .05)
		for(slash = 0; slash < 6; slash++){
			ctx.fillRect(-1.5 + .7 * slash, 1.85, .05, .35)
		}
		ctx.fillStyle = "red";
		ctx.fillRect(-1.55 + .7 * (mapSize - 4), 1.95, .15, .15)
		ctx.fillStyle = "black";
		ctx.font = "1px Arial";

		let string = "3d Maze";

		ctx.fillText(string, -1.8, -1);
		
        ctx.save()
      }
    };