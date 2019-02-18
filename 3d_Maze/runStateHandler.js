var runStateHandler = {
      start() {
        updateListeners.push(this); 
		this.zoom = 1.15;
		this.zoomIncrease = 0;
		this.energy = Math.floor(1.5 * mapSize * mapSize);
		this.health = 2 * mapSize;
		let energyLabel = document.getElementById("energy");
		energyLabel.innerHTML = "Energy: " + this.energy;
		let healthLabel = document.getElementById("health");
		healthLabel.innerHTML = "Health: " + this.health;
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
		  case "step":
		  if( this.hallwayDepth() == 1){
		  this.rotateForward();
		  this.zoom = 1.15;
		  } else{
            this.zoomIncrease = .05;
			let energyLabel = document.getElementById("energy");
			this.energy -= 1;
			energyLabel.innerHTML = "Energy: " + this.energy;
			if( this.energy == 0){
				
				state = END_STATE;
				updateListeners.splice(updateListeners.indexOf(this), 1);
				updateStateHandler();
			}
			}
            break;
			case "rotate":
			//console.log(map);
            map = this.rotateRight();
			//console.log(map);
			//console.log(player);
            break;
			case "rotateL":
			//console.log(map);
            map = this.rotateLeft();
			//console.log(map);
			//console.log(player);
            break;

        }
      },
      update(){
        this.canvas = document.getElementById("canv");
        this.ctx = this.canvas.getContext("2d");
        this.width = 640;
        this.height = 640;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
		this.xDir = 0;
		this.yDir = 0;
		document.getElementById("floor").innerHTML = "Floor " + (playerOnMap.z + 1);
		win = false;
		this.wall = 1;
		if (this.zoomIncrease > .12){
			this.zoomIncrease = 0;
			player.x += 1;
			switch(orientation.forward){
				case 0:
					playerOnMap.z += 1;
					break;
				case 1:
					playerOnMap.y += 1;
					break
				case 2:
					playerOnMap.x += 1;
					break;
				case 3:
					playerOnMap.z -= 1;
					break;
				case 4:
					playerOnMap.y -= 1;
					break
				case 5:
					playerOnMap.x -= 1;
					break;
			}
			this.zoom = 1.15;
			
			//console.log(player);
			console.log(playerOnMap);
			//player falls
			if (player.z > 0){
				while(map[player.z- 1][player.y][player.x] == 1 ||
						map[player.z- 1][player.y][player.x] == 4){
					player.z -= 1;
					switch(orientation.base){
				case 0:
					playerOnMap.z += 1;
					break;
				case 1:
					playerOnMap.y += 1;
					break
				case 2:
					playerOnMap.x += 1;
					break;
				case 3:
					playerOnMap.z -= 1;
					break;
				case 4:
					playerOnMap.y -= 1;
					break
				case 5:
					playerOnMap.x -= 1;
					break;
			}
					this.zoom = 1.15;
					let healthLabel = document.getElementById("health");
					this.health -= 1;
					healthLabel.innerHTML = "Health: " + this.health;
					if( this.health == 0){
					win = false;
					state = END_STATE;
					updateListeners.splice(updateListeners.indexOf(this), 1);
					updateStateHandler();
					}
					if(player.z == 0){break;}
				}
			}
			if (map[player.z][player.y][player.x] == 4){
						win = true;
						state = END_STATE;
						updateListeners.splice(updateListeners.indexOf(this), 1);
						updateStateHandler();
			}
		} 
		if (this.zoomIncrease > 0) {
			this.zoom += this.zoomIncrease;
			this.zoomIncrease += .015;
			}
			
			
        let ctx = this.ctx;

        ctx.fillStyle = "silver";
        ctx.fillRect(0, 0, this.width, this.height); 
		ctx.scale(this.width, this.height)
		ctx.translate(1 / 2, 1 / 2);
		ctx.save()
		{
                
        ctx.scale(this.zoom, this.zoom);
        
		let jmax = this.hallwayDepth() * 3;
		
		//bottom
		ctx.fillRect( -.5, 0, 1, 1);
		ctx.fillStyle = "steelblue";
		for(i = jmax / 3; i > -1; i--){
			if(player.z> 0) {
				if (map[player.z - 1][player.y][player.x + i] == 1 || map[player.z - 1][player.y][player.x + i] == 4){
						this.wall = 0;
				} else {
					this.wall = 1;
				}
			}
			if( this.wall == 1) {
				if ( orientation.base == 0){
					ctx.fillStyle = floorColor;
				} else {
					ctx.fillStyle = "#FF9800";
				}
			} else {
				ctx.fillStyle = "steelblue";
			}
				let region = new Path2D();
				region.moveTo(-3 / (i * 6 + 10), 3 / (i * 6 + 10));
				region.lineTo(-1, 1);
				region.lineTo(1, 1);
				region.lineTo(3 / (i * 6 + 10), 3 / (i * 6 + 10));
				region.closePath();
				ctx.fill(region, 'nonzero');
			
		}
		
		//top
		ctx.fillRect( -.5, 0, 1, -1);
		ctx.fillStyle = "steelblue";
		for(i = jmax / 3 - 1; i > -1; i--){
			if(player.z< mapSize - 1) {
			if (map[player.z + 1][player.y][player.x + i] == 1 || map[player.z + 1][player.y][player.x +  i] == 4 ){
						this.wall = 0;
				} else {
					this.wall = 1;
				}
			}
			if( this.wall == 1) {
				if ( orientation.base == 0){
						ctx.fillStyle = floorColor;
				} else {
				ctx.fillStyle = "#FF9800";
				}
			} else {
				ctx.fillStyle = "steelblue";
			}
				let region = new Path2D();
				region.moveTo(-3 / (i * 6 + 10), -3 / (i * 6 + 10));
				region.lineTo(-1, -1);
				region.lineTo(1, -1);
				region.lineTo(3 / (i * 6 + 10), -3 / (i * 6 + 10));
				region.closePath();
				ctx.fill(region, 'nonzero');
		}
		
		//left
		this.wall = 1;
		for(i = jmax / 3 - 1; i > -1; i -= 1){
			if( player.y > 0) {
				if (map[player.z][player.y - 1][player.x + i] == 1 || map[player.z][player.y - 1][player.x+ i] == 4){
					this.wall = 0;
				} else {
					this.wall = 1;
				}
			}
			if( this.wall == 1) {
				if ( orientation.base == 1  && orientation.forward == 2 ||
					orientation.base == 2  && orientation.forward == 4 ||
					orientation.base == 4  && orientation.forward == 5 ||
					orientation.base == 5  && orientation.forward == 1 ){
						ctx.fillStyle = floorColor;
				} else {
				ctx.fillStyle = "orange";
				}
			} else {
				ctx.fillStyle = "steelblue";
			}
			let region = new Path2D();
			region.moveTo(-1, -1);
			region.lineTo(-3 / (i * 6 + 10),  -3 / (i * 6 + 10));
			region.lineTo(-3 / (i * 6 + 10), 3 / (i * 6 + 10));
			region.lineTo(-1, 1);
			region.closePath();

			ctx.fill(region, 'nonzero');

			/*
			let xStart = -1 / (2 * (i + 1));
			let yStart = -1 / (2 * (i + 1));
			let blockWidth =  -1 / ( 6 * i * i + 10 * i + 4);
			let blockHeight =  1 /  (i + 1);
						
			//ctx.fillRect( xStart, yStart, blockWidth, blockHeight);
						
			let parts = gfxQuality
			for(part = 0; part < parts; part++){
				ctx.fillRect( xStart + blockWidth * part / parts, yStart + blockWidth * part / parts, 
				blockWidth / parts, blockHeight - 2 * blockWidth * part / parts);
			}
			//ctx.fillRect( -1 / (2 * (i + 1)), -1 / (2 * (i + 1)), -1 / (2 * (i + .66)) + 1 / (2 * (i + 1)),2 * 1 / (2 * (i + 1)) );
			*/
		}
			
			//right
		this.wall = 1;
		for(i = jmax / 3 - 1; i > -1; i -= 1){
			if(player.y < mapSize - 1) {
				if (map[player.z][player.y + 1][player.x+  i] == 1 || map[player.z][player.y + 1][player.x+  i] == 4){
				this.wall = 0;
				} else {
				this.wall = 1;
				}
			}
			
			if( this.wall == 1) {
				if ( orientation.base == 2  && orientation.forward == 1 ||
					orientation.base == 4  && orientation.forward == 2 ||
					orientation.base == 5  && orientation.forward == 4 ||
					orientation.base == 1  && orientation.forward == 5 ){
					ctx.fillStyle = floorColor;
				} else {
				ctx.fillStyle = "orange";
				}
			} else {
				ctx.fillStyle = "steelblue";
			}
			let region = new Path2D();
			region.moveTo(3 / (i * 6 + 10),  -3 / (i * 6 + 10));
			region.lineTo(1, -1);
			region.lineTo(1, 1);
			region.lineTo(3 / (i * 6 + 10), 3 / (i * 6 + 10));
			region.closePath();
			ctx.fill(region, 'nonzero');
			/*
			let xStart = 1 / (2 * (i + 1));
				let yStart = -1 / (2 * (i + 1));
				let blockWidth =  1 / ( 6 * i * i + 10 * i + 4);
				let blockHeight =  1 /  (i + 1);
						
			//ctx.fillRect( xStart, yStart, blockWidth, blockHeight);
						
				let parts = gfxQuality
				for(part = 0; part < parts; part++){
					ctx.fillRect( xStart + blockWidth * part / parts, yStart - blockWidth * part / parts, 
					blockWidth / parts, blockHeight + 2 * blockWidth * part / parts);
				}
			//ctx.fillRect( 1 / (2 * (i + 1)), -1 / (2 * (i + 1)), 1 / (2 * (i + .66)) -1 / (2 * (i + 1)), 2  / (2 * (i + 1)));
			*/
		}
		if (orientation.forward == 3){
			ctx.fillStyle = floorColor;
		} else {
			ctx.fillStyle = "peru";
		}
		jmax -= 1;
		ctx.fillRect( -1 / (2 * (jmax / 3 + 1)), -1 / (2 * (jmax / 3 + 1)), 1 /  (jmax / 3 + 1), 1 /  (jmax / 3 + 1));
		if( map[player.z][player.y][player.x - 1 + this.hallwayDepth()] == 4) {
			ctx.fillStyle = "green";
			ctx.fillRect( -.4 / (2 * (jmax / 3 + 1)), -.4 / (2 * (jmax / 3 + 1)), 1 /  (jmax / 3 + 1) * .4, 1 /  (jmax / 3 + 1) * .4);
		}
		}
		ctx.restore();
		ctx.fillStyle = "black";
		ctx.fillRect(.27, .27, .23, .23);
		;
		let squareSize = .22 / mapSize;
		for(i = 0; i < mapSize; i++){
			for(j = 0; j < mapSize; j++){
				if( mapCopy[playerOnMap.z][i][j] == 1 || mapCopy[playerOnMap.z][i][j] == 4) {
				ctx.fillStyle = "steelblue";
				} else {
				ctx.fillStyle = "orange";
				}
				ctx.fillRect((.28 + squareSize * i), (.28 + squareSize * (mapSize - 1 - j)), squareSize, squareSize);
				if(mapCopy[playerOnMap.z][i][j] == 4) {
				ctx.fillStyle = "green";
				ctx.fillRect(.28 + squareSize * (i + .25), .28 + squareSize * ( mapSize - .75 - j), squareSize * .5, squareSize * .5);
				}
			}
		}
		switch(orientation.forward){
			case 1:
				this.xDir = .1 * (16 / mapSize);
				this.yDir = 0;
				break;
			case 3:
				this.xDir = 0;
				this.yDir = 0;
				break;
			case 5:
				this.xDir = 0;
				this.yDir = .1 * (16 / mapSize);
				break;
			case 4:
				this.xDir = -.1 * (16 / mapSize);
				this.yDir = 0;
				break;
			case 0:
				this.xDir = 0;
				this.yDir = 0;
				break;
			case 2:
				this.xDir = 0;
				this.yDir = -.1 * (16 / mapSize);
				break;
		}
		ctx.fillStyle = "red";
		ctx.fillRect(.28 + squareSize * (playerOnMap.y + .25) + this.zoomIncrease * this.xDir, 
						.28 + squareSize * ( mapSize - .75 - playerOnMap.x) + this.zoomIncrease * this.yDir, squareSize * .5, squareSize * .5);
		
		ctx.save();
		},
      
	  
	  hallwayDepth(){
		var depth = 1; 
		while(true){
			if(player.x + depth > mapSize){break;}
			if(map[player.z][player.y][player.x + depth] == 1 || map[player.z][player.y][player.x + depth] == 4){
				depth += 1;
			} else {
				break;
			}
		}
		return depth;
	  },
	  
	  rotateLeft(){
		
		newMap = [];
		newMapCopy = [];
		//console.log(map);
		newposition = {z: player.z, y: player.x, x: mapSize - 1 - player.y};
		player = newposition;
		//newposition = {z: player.z, y: playerOnMap.x, x: mapSize - 1 - playerOnMap.y};
		//playerOnMap = newposition;
		
		for( i = 0; i < mapSize; i++){
		var mapx = []
		//var mapcx = []
		for( j = 0; j < mapSize; j++){
			var mapy = []
			//var mapcy = []
			for( k = 0; k < mapSize; k++){
			
				mapy.push(map[i][mapSize - 1 - k][j]);
				//mapcy.push(mapCopy[i][mapSize - 1 - k][j]);
				
			}
			mapx.push(mapy);
			//mapcx.push(mapcy);
		}
		newMap.push(mapx);
		//newMapCopy.push(mapcx);
		}
		//mapCopy = newMapCopy;
		this.changeOrientation(false)
		console.log(orientation);
		return newMap;
				
	  },
	  rotateRight(){
	  
		newMap = [];
		newMapCopy = []
		//console.log(map);
		newposition = {z: player.z, y: mapSize - 1 - player.x, x: player.y};
		player = newposition;
		//newposition = {z: player.z, y: mapSize - 1 - playerOnMap.x, x: playerOnMap.y};
		//playerOnMap = newposition;
		
		
		for( i = 0; i < mapSize; i++){
		var mapx = []
		//var mapcx = []
		for( j = 0; j < mapSize; j++){
			var mapy = []
			//var mapcy = []
			for( k = 0; k < mapSize; k++){
			
				mapy.push(map[i][k][mapSize - 1 - j]);
				//mapcy.push(mapCopy[i][k][mapSize - 1 - j]);
			}
			mapx.push(mapy);
			//mapcx.push(mapcy);
		}
		newMap.push(mapx);
		//newMapCopy.push(mapcx);
		}
		//mapCopy = newMapCopy;
		this.changeOrientation(true);
		console.log(orientation);
		return newMap;
				
	  },
	  rotateForward(){
	 
		newMap = [];
		newposition = {z: mapSize - 1 - player.x, y: player.y, x: player.z};
		player = newposition;
		
		
		for(i = 0; i < mapSize; i++){
			newMapx = []
			for(j = 0; j < mapSize; j++){
				newMapy = []
				for(k = 0; k < mapSize; k++){
					newMapy.push(map[k][j][mapSize - 1 - i]);
					
				}
				newMapx.push(newMapy);
			}
			newMap.push(newMapx);
		}
		map = newMap;
		let temp = orientation.forward;
		orientation.forward = (orientation.base + 3) % 6;
		orientation.base = temp;
		//console.log(map);
		//console.log(player);
		console.log(orientation);
	  },
			
			changeOrientation(right){
				var i = 0;
				while(directionMatrix[orientation.base][i] != orientation.forward){
					i++
				}
				if (right){
					orientation.forward = directionMatrix[orientation.base][i + 1];
				} else {
					if (i == 0) {i = 4;}
					orientation.forward = directionMatrix[orientation.base][i - 1];
				}
			}
			
	 };