var endStateHandler = {
      start() {
        updateListeners.push(this);
		let resultMessage = document.getElementById("result");
		if(win){
			resultMessage.innerHTML = "You Won!";
		} else {
			resultMessage.innerHTML = "You died :(";
		}
      },
      eventPump(event) {
        switch (event.name) {
          case "next":
            state = TITLE_STATE;
            updateListeners.splice(updateListeners.indexOf(this), 1);
            updateStateHandler();
            break;
        }
      }
    };