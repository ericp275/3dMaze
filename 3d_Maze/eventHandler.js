var updateListeners = [];

    function timer() {
      update({name:"timer"})
    }

    function update(event) {
      for (let i = 0; i < updateListeners.length; i++) {
        updateListeners[i].eventPump(event);
      }
    }
	
	function keyUp(e) {
		console.log("keyup");

		if (e.keyCode == '38' || e.key == 'w' ) {
           update({name:'step'});
		}
		else if (e.keyCode == '37'  || e.key == 'a' ) {
			update({name:'rotateL'});
		}
		else if (e.keyCode == '39'  || e.key == 'd' ) {
			update({name:'rotate'});
		}

	}
		
	function changeQuality(e) {
		gfxQuality =  e.path[0].valueAsNumber;
		document.getElementById("gfxSlider").value = gfxQuality;
		console.log(e);
		console.log(e.path[0]);
		console.log(e.path[0].valueAsNumber);
	}
	
	function mouseup(e){
      console.log(e.clientX)
	  console.log(e.clientY)
	  //click on mapSize slider
	  if (e.clientX > 175 && e.clientX < 540 && e.clientY > 510 && e.clientY < 550){
		mapSize = Math.floor((e.clientX - 175) / 63) + 4;
		console.log(mapSize);
	  }
    }