const rows = [1, 2, 3, 4, 5, 6, 7, 8];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const calculatePosibleMovementLocations = (
  current,
  activeSide,
  white,
  black,
  setallowedPos
) => {
  const opponents = activeSide === "white" ? black : white;
  const me = activeSide === "white" ? white : black;

  const myPiece = findPieceData(current, me);
  const myPiecesLocArray = Object.values(me);
  const oppPiecesLocArray = Object.values(opponents);
  let finalAllowedPos;
  if (myPiece.split("_")[1] === "pawn") {
    finalAllowedPos = calculatePawnMovement(
      activeSide,
      current,
      myPiecesLocArray,
      oppPiecesLocArray
    );
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "horse") {
    finalAllowedPos = calculateHorseMovement(current, myPiecesLocArray);
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "rook") {
    finalAllowedPos = calculateRookMovement(
      current,
      myPiecesLocArray,
      oppPiecesLocArray
    );
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "bishop") {
    finalAllowedPos = calculateBishopMovement(
      current,
      myPiecesLocArray,
      oppPiecesLocArray
    );
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "king.svg") {
    finalAllowedPos = calculateKingMovement(current, myPiecesLocArray);
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "queen.svg") {
    finalAllowedPos = [
      ...calculateRookMovement(current, myPiecesLocArray, oppPiecesLocArray),
      ...calculateBishopMovement(current, myPiecesLocArray, oppPiecesLocArray),
    ];
    setallowedPos(finalAllowedPos);
  }
};

export const doMovementThings = (
  id,
  activePiece,
  allowedPos,
  activeSide,
  setactiveSide,
  white,
  setWhite,
  black,
  setBlack,
  setallowedPos,
  setactivePiece
) => {
  console.log("movement was attempted for", id);
  if (allowedPos.includes(id)) {
    const mySideObj = activeSide === "white" ? white : black;
    const oppSideObj = activeSide === "white" ? black : white;
    const myPos = Object.values(mySideObj);
    const myPieces = Object.keys(mySideObj);
    const oppPos = Object.values(oppSideObj);
    const oppPieces = Object.keys(oppSideObj);
    if (oppPos.includes(id)) {
      const oppTargetPieceIndex = oppPos.findIndex((val) => val === id);
      const oppTargetPieceName = oppPieces[oppTargetPieceIndex];
      if (activeSide === "white") {
        const blackCopy = black;
        delete blackCopy[oppTargetPieceName];
        console.log(blackCopy);
        setBlack(blackCopy);
        // const deletedBlock = document.getElementById(id);
        // deletedBlock.innerHTML = "";
      } else {
        const whiteCopy = white;
        delete whiteCopy[oppTargetPieceName];
        setWhite(whiteCopy);
        // const deletedBlock = document.getElementById(id);
        // deletedBlock.innerHTML = "";
      }
    }
    const myTargetPieceIndex = myPos.findIndex((val) => val === activePiece);
    const myTargetPieceName = myPieces[myTargetPieceIndex];
    if (activeSide === "white") {
      setWhite({ ...white, [myTargetPieceName]: id });
      // const originalDiv = document.getElementById(activePiece);
      // originalDiv.innerHTML = "";
      // const targetDiv = document.getElementById(id);
      // targetDiv.innerHTML = `<img className="h-20 w-20" src="/assets/${myTargetPieceName}" alt="${myTargetPieceName}"/>`;
    } else {
      setBlack({ ...black, [myTargetPieceName]: id });
      // const originalDiv = document.getElementById(activePiece);
      // originalDiv.innerHTML = "";
      // const targetDiv = document.getElementById(id);
      // targetDiv.innerHTML = `<img className="h-20 w-20" src="/assets/${myTargetPieceName}" alt="${myTargetPieceName}"/>`;
    }
    setallowedPos([]);
    setactiveSide(activeSide === "white" ? "black" : "white");
    setactivePiece();
  }
};

const findPieceData = (current, allPositionsObj) => {
  const nameArray = Object.keys(allPositionsObj);
  const posArray = Object.values(allPositionsObj);
  const index = posArray.findIndex((val) => val === current);
  return nameArray[index];
};

const calculatePawnMovement = (
  activeSide,
  current,
  myPiecesLocArray,
  oppPiecesLocArray
) => {
  const rowMovementDirection = activeSide === "white" ? -1 : +1;
  const allowedPosArray = [];
  const currentColIndex = cols.findIndex((oneCol) => oneCol === current[1]);
  const leftColVal = cols[currentColIndex - 1];
  const rightColVal = cols[currentColIndex + 1];

  if (
    ![...myPiecesLocArray, ...oppPiecesLocArray].includes(
      `${Number(current[0]) + rowMovementDirection}${current[1]}`
    )
  ) {
    allowedPosArray.push(
      `${Number(current[0]) + rowMovementDirection}${current[1]}`
    );
  }
  if (
    oppPiecesLocArray.includes(
      `${Number(current[0]) + rowMovementDirection}${leftColVal}`
    )
  ) {
    allowedPosArray.push(
      `${Number(current[0]) + rowMovementDirection}${leftColVal}`
    );
  }
  if (
    oppPiecesLocArray.includes(
      `${Number(current[0]) + rowMovementDirection}${rightColVal}`
    )
  ) {
    allowedPosArray.push(
      `${Number(current[0]) + rowMovementDirection}${rightColVal}`
    );
  }
  if (
    activeSide === "white" &&
    current[0] === "7" &&
    !oppPiecesLocArray.includes(`${Number(current[0]) - 1}${current[1]}`) &&
    !oppPiecesLocArray.includes(`${Number(current[0]) - 2}${current[1]}`)
  ) {
    allowedPosArray.push(`${Number(current[0]) - 2}${current[1]}`);
  }
  if (
    activeSide === "black" &&
    current[0] === "2" &&
    !oppPiecesLocArray.includes(`${Number(current[0]) + 1}${current[1]}`) &&
    !oppPiecesLocArray.includes(`${Number(current[0]) + 2}${current[1]}`)
  ) {
    allowedPosArray.push(`${Number(current[0]) + 2}${current[1]}`);
  }
  console.log(allowedPosArray);
  return allowedPosArray;
};

const calculateHorseMovement = (current, myPiecesLocArray) => {
  const movementBluePrint = [
    [+2, +1],
    [+2, -1],
    [-2, +1],
    [-2, -1],
    [+1, +2],
    [+1, -2],
    [-1, +2],
    [-1, -2],
  ];
  const calculateNewPosFromOld = (current, movementArray) => {
    const currentColIndex = cols.findIndex((oneCol) => oneCol === current[1]);
    return `${Number(current[0]) + movementArray[0]}${
      cols[currentColIndex + movementArray[1]]
    }`;
  };
  const innitialAllowedPosArray = [];
  const finalAllowedPosArray = [];
  for (const oneMoveSet of movementBluePrint) {
    innitialAllowedPosArray.push(calculateNewPosFromOld(current, oneMoveSet));
  }
  for (const possibleLoc of innitialAllowedPosArray) {
    if (!myPiecesLocArray.includes(possibleLoc)) {
      finalAllowedPosArray.push(possibleLoc);
    }
  }
  return finalAllowedPosArray;
};

const calculateRookMovement = (
  current,
  myPiecesLocArray,
  oppPiecesLocArray
) => {
  const allowedPosArray = [];
  //up
  for (let i = Number(current[0]) - 1; i > 0; i--) {
    const nextPos = i + current[1];

    if (myPiecesLocArray.includes(nextPos)) {
      break;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      break;
    }
    allowedPosArray.push(nextPos);
  }

  //down
  for (let i = Number(current[0]) + 1; i < 9; i++) {
    const nextPos = i + current[1];

    if (myPiecesLocArray.includes(nextPos)) {
      break;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      break;
    }
    allowedPosArray.push(nextPos);
  }

  const currentColIndex = cols.findIndex((oneCol) => oneCol === current[1]);

  //left
  for (let i = currentColIndex - 1; i > -1; i--) {
    const nextPos = current[0] + cols[i];
    if (myPiecesLocArray.includes(nextPos)) {
      break;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      break;
    }
    allowedPosArray.push(nextPos);
  }

  //right
  for (let i = currentColIndex + 1; i < 8; i++) {
    const nextPos = current[0] + cols[i];
    if (myPiecesLocArray.includes(nextPos)) {
      break;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      break;
    }
    allowedPosArray.push(nextPos);
  }

  return allowedPosArray;
};

const calculateBishopMovement = (
  current,
  myPiecesLocArray,
  oppPiecesLocArray
) => {
  const currentColIndex = cols.findIndex((oneCol) => oneCol === current[1]);
  const allowedPosArray = [];
  const leftArray = [];
  const topArray = [];
  const bottomArray = [];
  const rightArray = [];
  for (let i = Number(current[0]) - 1; i > 0; i--) {
    topArray.push(i);
  }
  for (let i = currentColIndex - 1; i > -1; i--) {
    leftArray.push(cols[i]);
  }
  for (let i = Number(current[0]) + 1; i < 9; i++) {
    bottomArray.push(i);
  }
  for (let i = currentColIndex + 1; i < 8; i++) {
    rightArray.push(cols[i]);
  }

  //topLeft
  const shorterArrayTL =
    leftArray.length > topArray.length ? topArray : leftArray;

  shorterArrayTL.every((elem, index) => {
    const nextPos = topArray[index] + leftArray[index];
    if (myPiecesLocArray.includes(nextPos)) {
      return false;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      return false;
    }
    allowedPosArray.push(nextPos);
    return true;
  });

  //topRight
  const shorterArrayTR =
    rightArray.length > topArray.length ? topArray : rightArray;

  shorterArrayTR.every((elem, index) => {
    const nextPos = topArray[index] + rightArray[index];
    if (myPiecesLocArray.includes(nextPos)) {
      return false;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      return false;
    }
    allowedPosArray.push(nextPos);
    return true;
  });

  //bottomLeft

  const shorterArrayBL =
    leftArray.length > bottomArray.length ? bottomArray : leftArray;

  shorterArrayBL.every((elem, index) => {
    const nextPos = bottomArray[index] + leftArray[index];
    if (myPiecesLocArray.includes(nextPos)) {
      return false;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      return false;
    }
    allowedPosArray.push(nextPos);
    return true;
  });

  //bottomRight

  const shorterArrayBR =
    rightArray.length > bottomArray.length ? bottomArray : rightArray;

  shorterArrayBR.every((elem, index) => {
    const nextPos = bottomArray[index] + rightArray[index];
    if (myPiecesLocArray.includes(nextPos)) {
      return false;
    }
    if (oppPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
      return false;
    }
    allowedPosArray.push(nextPos);
    return true;
  });

  return allowedPosArray;
};

const calculateKingMovement = (current, myPiecesLocArray) => {
  const allowedPosArray = [];
  const movementBluePrint = [
    [+1, -1],
    [+1, +0],
    [+1, +1],
    [+0, -1],
    [+0, +1],
    [-1, -1],
    [-1, +0],
    [-1, +1],
  ];
  const calculateNewPosFromOld = (current, posArray) => {
    const currentColIndex = cols.findIndex((oneCol) => oneCol === current[1]);
    return `${Number(current[0]) + posArray[0]}${
      cols[currentColIndex + posArray[1]]
    }`;
  };

  for (const nextPosArray of movementBluePrint) {
    const nextPos = calculateNewPosFromOld(current, nextPosArray);
    if (!myPiecesLocArray.includes(nextPos)) {
      allowedPosArray.push(nextPos);
    }
  }
  return allowedPosArray;
};
