function updateStateHandler() {
  if (state == TITLE_STATE) {
    stateHandler = titleStateHandler;
  } else if (state == LOAD_STATE) {
    stateHandler = loadStateHandler;
  } else if (state == RUN_STATE) {
    stateHandler = runStateHandler;
  } else if (state == END_STATE) {
    stateHandler = endStateHandler;
  }


  
  stateHandler.start();
}