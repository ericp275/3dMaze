//Example UI positioning code in clipping space

function positionGUI(canvWidth, canvHeight, xDistance, yDistance, height) {
  var toReturn = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  var xIsBigger = true;
  if (canvHeight > canvWidth) xIsBigger = false;
  var clippingUnit = xIsBigger ? canvHeight / 2 : canvWidth / 2;
  toReturn.x = xDistance * clippingUnit;
  toReturn.y = canvHeight - (yDistance + height * clippingUnit)
  toReturn.width = canvWidth - (2 * (xDistance * clippingUnit));
  toReturn.height = height * clippingUnit;
  return toReturn;
}