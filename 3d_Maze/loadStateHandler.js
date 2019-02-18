var loadStateHandler = {
      start() {
        updateListeners.push(this);
		this.zoom = 100;
		this.zoomBuilding = 1;
		this.update();
		this.makeMap();
      },
      eventPump(event) {
        switch (event.name) {
          case "next":
            state = RUN_STATE;
            updateListeners.splice(updateListeners.indexOf(this), 1);
            updateStateHandler();
            break;
		case "timer":
			this.update();
			break;
        }
      },
	  
	  makeMap(){
		//reset variables;
		map = []
		pathLocation = {z: 0, y: 0, x: 0}
		player = {z: 0, y: 0, x: 0};
		playerOnMap = {z: 0, y: 0, x: 0};
		orientation = {forward: 2, base: 3};
		
		for( i = 0; i < mapSize; i++){
			var mapx = []
			for( j = 0; j < mapSize; j++){
				var mapy = []
				for( k = 0; k < mapSize; k++){
					let mapz = 0;
					mapy.push(mapz);
				}
			mapx.push(mapy);
			}
		map.push(mapx);
		}
		map[0][0][0] = 1;
		map[mapSize - 1][mapSize - 1][mapSize - 1] = 4;
		while(true){
			if(pathLocation.z > mapSize - 2 && pathLocation.y > mapSize - 2 && pathLocation.x > mapSize - 3){break;}
			if(pathLocation.z > mapSize - 2 && pathLocation.x > mapSize - 2 && pathLocation.y > mapSize - 3){break;}
			if(pathLocation.x > mapSize - 2 && pathLocation.y > mapSize - 2 && pathLocation.z > mapSize - 3){break;}
			//console.log(map);
			this.nextStep();
			console.log(pathLocation);
		}
		console.log(map);
		pathLocation = path[Math.floor(Math.random() * path.length)];
		console.log("secondPath");
		console.log(pathLocation);
		this.nextStep2()
		mapCopy = map;
		console.log(player);
	  },
	  nextStep(){
	    var possible = this.possiblePaths(pathLocation, false);
		while (possible.length == 0){
			pathLocation = path[Math.floor(Math.random() * path.length)];
			console.log("new location:");
			//console.log(pathLocation);
			possible = this.possiblePaths(pathLocation, true);
			if( map[pathLocation.z][pathLocation.y][pathLocation.x] == 3 &&
				map[pathLocation.z][pathLocation.y][pathLocation.x] == 3 &&
				map[pathLocation.z][pathLocation.y][pathLocation.x] == 3 ){
					map[pathLocation.z][pathLocation.y][pathLocation.x] == 2;
					map[pathLocation.z][pathLocation.y][pathLocation.x] == 2;
					map[pathLocation.z][pathLocation.y][pathLocation.x] == 2;
			}
		}
		let pointsLength = possible.length;
		while(true){
			let choice = Math.floor(Math.random() * pointsLength);
				for(i = 0; i < choice; i++){
					if (map[possible[i].z][possible[i].y][possible[i].x] == 0){
						map[possible[i].z][possible[i].y][possible[i].x] = 2;
					}
				}
			map[possible[choice].z][possible[choice].y][possible[choice].x] = 1;
			pathLocation = {z: possible[choice].z, y: possible[choice].y, x: possible[choice].x};
			path.push(pathLocation);
			//console.log(possible);
				for(i = choice + 1; i < possible.length; i++){
					//console.log(i);
					if (map[possible[i].z][possible[i].y][possible[i].x] == 0){
						map[possible[i].z][possible[i].y][possible[i].x] = 2;
					}
				}
			break;
		}
		},
		
		nextStep2(){
	    var possible = this.possiblePaths(pathLocation, true);
		//console.log(possible);
		while (possible.length > 0){
			let pointsLength = possible.length;
		while(true){
			let choice = Math.floor(Math.random() * pointsLength);
				for(i = 0; i < choice; i++){
					if (map[possible[i].z][possible[i].y][possible[i].x] == 0){
						map[possible[i].z][possible[i].y][possible[i].x] = 2;
					}
				}
			map[possible[choice].z][possible[choice].y][possible[choice].x] = 1;
			pathLocation = {z: possible[choice].z, y: possible[choice].y, x: possible[choice].x};
			console.log(pathLocation);
			possible = this.possiblePaths(pathLocation, false);
			//console.log(possible);
			path.push(pathLocation);
				for(i = choice + 1; i < possible.length; i++){
					//console.log(i);
					if (map[possible[i].z][possible[i].y][possible[i].x] == 0){
						map[possible[i].z][possible[i].y][possible[i].x] = 2;
					}
				}
			break;
			}
		}
		
		},
		
		
		
	  possiblePaths(startSpot, newPath){
	  var points = []
		if(startSpot.z > 0){
			let spot = { z: startSpot.z - 1, y: startSpot.y, x: startSpot.x};
			points.push(spot);
		}
		if(startSpot.y > 0){
			let spot = { z: startSpot.z, y: startSpot.y - 1, x: startSpot.x};
			points.push(spot);
		}
		if(startSpot.x > 0){
			let spot = { z: startSpot.z, y: startSpot.y, x: startSpot.x - 1};
			points.push(spot);
		}
		if(startSpot.z < mapSize - 1){
			let spot = { z: startSpot.z+ 1, y: startSpot.y, x: startSpot.x};
			points.push(spot);
		}
		if(startSpot.y < mapSize - 1){
			let spot = { z: startSpot.z, y: startSpot.y + 1, x: startSpot.x};
			points.push(spot);
		}
		if(startSpot.x < mapSize - 1){
			let spot = { z: startSpot.z, y: startSpot.y, x: startSpot.x + 1};
			points.push(spot);
		}
		goodPoints = [];
		for (i = 0; i < points.length; i++){
			if (map[points[i].z][points[i].y][points[i].x] == 0){
				goodPoints.push(points[i]);
				}
				else if (map[points[i].z][points[i].y][points[i].x] == 1){
				}
				else if (map[points[i].z][points[i].y][points[i].x] == 2){
				this.cleanMap({z: points[i].z, y: points[i].y, x: points[i].x});
				}
			if (map[points[i].z][points[i].y][points[i].x] == 2 && newPath){
				goodPoints.push(points[i]);
			}
		}
		return goodPoints;
	  },
	  
	  cleanMap(startSpot){
		
			var points = []
			if(startSpot.z> 0){
			let spot = { z: startSpot.z - 1, y: startSpot.y, x: startSpot.x};
			points.push(spot);
			}
			if(startSpot.y > 0){
			let spot = { z: startSpot.z, y: startSpot.y - 1, x: startSpot.x};
			points.push(spot);
			}
			if(startSpot.x > 0){
			let spot = { z: startSpot.z, y: startSpot.y, x: startSpot.x - 1};
			points.push(spot);
			}
			if(startSpot.z< mapSize - 1){
			let spot = { z: startSpot.z+ 1, y: startSpot.y, x: startSpot.x};
			points.push(spot);
			}
			if(startSpot.y < mapSize - 1){
			let spot = { z: startSpot.z, y: startSpot.y + 1, x: startSpot.x};
			points.push(spot);
			}
			if(startSpot.x < mapSize - 1){
			let spot = { z: startSpot.z, y: startSpot.y, x: startSpot.x + 1};
			points.push(spot);
			}
			pathPoints = [];
			for (num = 0; num < points.length; num++){
			if (map[points[num].z][points[num].y][points[num].x] == 1){
				pathPoints.push(points[num]);
				}
			}
			if(pathPoints.length > 1){
				map[startSpot.z][startSpot.y][startSpot.x] = 3;
			}
			},
			
	  update(){
		if(this.zoomBuilding > 14) {
			state = RUN_STATE;
            updateListeners.splice(updateListeners.indexOf(this), 1);
            updateStateHandler();
		}
        this.canvas = document.getElementById("canv");
        this.ctx = this.canvas.getContext("2d");
        this.width = 640;
        this.height = 640;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
		this.zoomBuilding *= 1.1;
			
        let ctx = this.ctx;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);       


		ctx.translate(this.width / 2, this.height / 2);
                
        ctx.scale(this.zoom, this.zoom);

        ctx.fillStyle = "darkgreen";
        ctx.fillRect(-4, 1, 10, 10)
		ctx.fillStyle = "blue";
        ctx.fillRect(-4, 1, 10, -10)
		ctx.save()
		{
			ctx.translate(1 / 5, 1 / 10);
			ctx.scale(this.zoomBuilding, this.zoomBuilding);
			ctx.translate(Math.max( -this.width / 2 / this.zoom / this.zoomBuilding, -.015 * this.zoomBuilding),
								Math.min( this.height / 2 / this.zoom / this.zoomBuilding, .012 * this.zoomBuilding));
			ctx.fillStyle = "orange";
			ctx.fillRect(-.5 / this.zoomBuilding, 1 / this.zoomBuilding, .25 *  mapSize, -.25 * mapSize)
			ctx.save()
			{
				ctx.translate(-.5 / this.zoomBuilding, 1 / this.zoomBuilding);
				ctx.fillStyle = "steelblue";
				ctx.fillRect(.05 / this.zoomBuilding, 0, .25, -.25)
			}
			ctx.restore()
		}
		
        ctx.save()
      }
    };