/**
 * Given two crystal balls that will break if dropped from high enough distance, determine the exact spot in which it will break in the most optimized way. (Note: they take 0 damage from each fall, unless they break.)
 */
// This would be a black-box function
function checkIfBallBreaks(floor) {
  return floor > 75 ? true : false;
}

// This is the algorithm
function twoCrystalBalls(buildingHeight) {
  const floor = Math.floor(Math.sqrt(buildingHeight));
  let ballBroken = false;
  let safeFloor = 0;

  // Increment by the square root of the building height
  for (let x = floor; !ballBroken; x += floor) {
    ballBroken = checkIfBallBreaks(x);
    if (ballBroken) {
      console.log("Broke at floor", x);
      break;
    }
    safeFloor = x;
    console.log("Safe:", safeFloor);
  }

  // Backtrack to last known safe floor and increment floor by floor
  ballBroken = false;
  for (let x = safeFloor + 1; !ballBroken; x++) {
    ballBroken = checkIfBallBreaks(x);
    if (ballBroken) {
      console.log("Ball broke on floor", x);
      break;
    }
    safeFloor = x;
    console.log("Floor", safeFloor, "is safe...");
  }

  return safeFloor;
}

const g = twoCrystalBalls(300);
console.log(
  "You can drop crystal balls all day from floor",
  g,
  "without losing any.",
);
