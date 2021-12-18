const rows = [1, 2, 3, 4, 5, 6, 7, 8];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

//pr test

export const calculatePosibleMovementLocations = (
  current,
  activeSide,
  white,
  black,
  setallowedPos,
  castlingInfo,
  setCastlingInfo,
  castleAllowedLoc,
  setCastleAllowedLoc,
  showCastleButton,
  setShowCastleButton
) => {
  const opponents = activeSide === "white" ? black : white;
  const me = activeSide === "white" ? white : black;
  setShowCastleButton({
    whiteRook1: false,
    whiteRook2: false,
    blackRook1: false,
    blackRook2: false,
  });
  setCastleAllowedLoc([]);

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
    const rookMovementResp = calculateRookMovement(
      current,
      activeSide,
      myPiece,
      myPiecesLocArray,
      oppPiecesLocArray,
      castlingInfo
    );
    setallowedPos(rookMovementResp.allowedPosArray);
    setCastleAllowedLoc(rookMovementResp.allowedCastlingLocArray);
    setShowCastleButton(rookMovementResp.castlingButtonState);
  } else if (myPiece.split("_")[1] === "bishop") {
    finalAllowedPos = calculateBishopMovement(
      current,
      myPiecesLocArray,
      oppPiecesLocArray
    );
    setallowedPos(finalAllowedPos);
  } else if (myPiece.split("_")[1] === "king.svg") {
    const kingResponse = calculateKingMovement(
      current,
      activeSide,
      myPiecesLocArray,
      oppPiecesLocArray,
      castlingInfo
    );
    setallowedPos(kingResponse.allowedPosArray);
    setCastleAllowedLoc(kingResponse.allowedCastleArray);
    setShowCastleButton(kingResponse.castlingButtonState);
  } else if (myPiece.split("_")[1] === "queen.svg") {
    finalAllowedPos = [
      ...calculateRookMovement(
        current,
        activeSide,
        myPiece,
        myPiecesLocArray,
        oppPiecesLocArray,
        castlingInfo
      ).allowedPosArray,
      ...calculateBishopMovement(current, myPiecesLocArray, oppPiecesLocArray),
    ];
    setallowedPos(finalAllowedPos);
  }
};

export const handleCastling = (
  rookPos,
  activeSide,
  setactiveSide,
  white,
  setWhite,
  black,
  setBlack,
  setallowedPos,
  setactivePiece,
  castlingInfo,
  setCastlingInfo,
  setCastleAllowedLoc,
  showCastleButton,
  setShowCastleButton
) => {
  if (activeSide === "white") {
    setWhite({ ...white });
  }
  const findPieceData = (current, allPositionsObj) => {
    const nameArray = Object.keys(allPositionsObj);
    const posArray = Object.values(allPositionsObj);
    const index = posArray.findIndex((val) => val === current);
    return nameArray[index];
  };

  const myPieceName = findPieceData(
    rookPos,
    activeSide === "white" ? white : black
  );
  switch (myPieceName.split(".")[0]) {
    case "white_rook_1":
      setWhite({ ...white, "white_king.svg": "8b", "white_rook_1.svg": "8c" });
      setCastlingInfo({
        ...castlingInfo,
        whiteKing: true,
        whiteRook1: true,
        whiteRook2: true,
      });
      break;

    case "white_rook_2":
      setWhite({ ...white, "white_king.svg": "8f", "white_rook_2.svg": "8e" });
      setCastlingInfo({
        ...castlingInfo,
        whiteKing: true,
        whiteRook1: true,
        whiteRook2: true,
      });
      break;

    case "black_rook_1":
      setBlack({ ...black, "black_king.svg": "1b", "black_rook_1.svg": "1c" });
      setCastlingInfo({
        ...castlingInfo,
        blackKing: true,
        blackRook1: true,
        blackRook2: true,
      });
      break;

    case "black_rook_2":
      setBlack({ ...black, "black_king.svg": "1f", "black_rook_2.svg": "1e" });
      setCastlingInfo({
        ...castlingInfo,
        blackKing: true,
        blackRook1: true,
        blackRook2: true,
      });
      break;

    default:
      break;
  }
  setallowedPos([]);
  setactiveSide(activeSide === "white" ? "black" : "white");
  setactivePiece();
  setCastleAllowedLoc([]);
  setShowCastleButton({
    whiteRook1: false,
    whiteRook2: false,
    blackRook1: false,
    blackRook2: false,
  });
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
  setactivePiece,
  castlingInfo,
  setCastlingInfo,
  setCastleAllowedLoc,
  setShowCastleButton,
  refresh,
  setRefresh,
  setShowCheckDiv
) => {
  if (allowedPos.includes(id)) {
    const mySideObj = activeSide === "white" ? white : black;
    const oppSideObj = activeSide === "white" ? black : white;
    const myPos = Object.values(mySideObj);
    const myPieces = Object.keys(mySideObj);
    const oppPos = Object.values(oppSideObj);
    const oppPieces = Object.keys(oppSideObj);
    const myTargetPieceIndex = myPos.findIndex((val) => val === activePiece);
    const myTargetPieceName = myPieces[myTargetPieceIndex];
    const whiteCopy = white;
    const blackCopy = black;
    const oppTargetPieceIndex = oppPos.findIndex((val) => val === id);
    const oppTargetPieceName = oppPieces[oppTargetPieceIndex];
    let continueExecution = true;
    if (activeSide === "white") {
      if (oppPos.includes(id)) delete blackCopy[oppTargetPieceName];
      whiteCopy[myTargetPieceName] = id;
      const myKingUnderCheck = checkForCheck(
        "white",
        whiteCopy,
        blackCopy,
        castlingInfo
      );
      const oppKingUnderCheck = checkForCheck(
        "black",
        whiteCopy,
        blackCopy,
        castlingInfo
      );
      if (myKingUnderCheck === false) {
        setBlack(blackCopy);
        setWhite(whiteCopy);
        setRefresh(!refresh);
        setShowCheckDiv({
          black: oppKingUnderCheck,
          white: myKingUnderCheck,
          whiteLoc: myKingUnderCheck ? whiteCopy["white_king.svg"] : undefined,
          blackLoc: oppKingUnderCheck ? blackCopy["black_king.svg"] : undefined,
        });
      } else {
        continueExecution = false;
      }
    } else {
      if (oppPos.includes(id)) delete whiteCopy[oppTargetPieceName];
      blackCopy[myTargetPieceName] = id;
      const myKingUnderCheck = checkForCheck(
        "black",
        whiteCopy,
        blackCopy,
        castlingInfo
      );
      const oppKingUnderCheck = checkForCheck(
        "white",
        whiteCopy,
        blackCopy,
        castlingInfo
      );
      if (myKingUnderCheck === false) {
        setBlack(blackCopy);
        setWhite(whiteCopy);
        setRefresh(!refresh);
        setShowCheckDiv({
          white: oppKingUnderCheck,
          black: myKingUnderCheck,
          whiteLoc: oppKingUnderCheck ? whiteCopy["white_king.svg"] : undefined,
          blackLoc: myKingUnderCheck ? blackCopy["black_king.svg"] : undefined,
        });
      } else {
        continueExecution = false;
      }
    }
    if (!continueExecution) return;
    console.log("latest state of pieces", whiteCopy, blackCopy);

    switch (myTargetPieceName.split(".")[0]) {
      case "white_king":
        setCastlingInfo({ ...castlingInfo, whiteKing: true });
        break;
      case "black_king":
        setCastlingInfo({ ...castlingInfo, blackKing: true });
        break;
      case "white_rook_1":
        setCastlingInfo({ ...castlingInfo, whiteRook1: true });
        break;
      case "white_rook_2":
        setCastlingInfo({ ...castlingInfo, whitrRook2: true });
        break;
      case "black_rook_1":
        setCastlingInfo({ ...castlingInfo, blackRook1: true });
        break;
      case "black_rook_2":
        setCastlingInfo({ ...castlingInfo, blackRook2: true });
        break;
      default:
        break;
    }
    setallowedPos([]);
    setactiveSide(activeSide === "white" ? "black" : "white");
    setactivePiece();
    setCastleAllowedLoc([]);
    setShowCastleButton({
      whiteRook1: false,
      whiteRook2: false,
      blackRook1: false,
      blackRook2: false,
    });
  }
};
//this commment was added with github web editor
export const handlePromotions = (
  selectedPromotion,
  target,
  activeSide,
  targetSide,
  setTargetSide,
  promotionsAdded,
  setPromotionsAdded
) => {
  switch (selectedPromotion) {
    case "rook":
      const pawnName = findPieceData(target, targetSide);
      let targetCopy = targetSide;
      delete targetCopy[pawnName];
      targetCopy = {
        ...targetCopy,
        [`${targetSide + `_rook_${3 + promotionsAdded[activeSide].rook}.svg`}`]:
          target,
      };
      setPromotionsAdded({
        ...promotionsAdded,
        [activeSide]: {
          ...[activeSide],
          rook: promotionsAdded[activeSide].rook + 1,
        },
      });
      setTargetSide(targetCopy);
      break;

    case "bishop":
      const pawnName = findPieceData(target, targetSide);
      let targetCopy = targetSide;
      delete targetCopy[pawnName];
      targetCopy = {
        ...targetCopy,
        [`${
          targetSide + `_bishop_${3 + promotionsAdded[activeSide].bishop}.svg`
        }`]: target,
      };
      setPromotionsAdded({
        ...promotionsAdded,
        [activeSide]: {
          ...[activeSide],
          rook: promotionsAdded[activeSide].bishop + 1,
        },
      });
      setTargetSide(targetCopy);
      break;

    case "horse":
      const pawnName = findPieceData(target, targetSide);
      let targetCopy = targetSide;
      delete targetCopy[pawnName];
      targetCopy = {
        ...targetCopy,
        [`${
          targetSide + `_horse_${3 + promotionsAdded[activeSide].horse}.svg`
        }`]: target,
      };
      setPromotionsAdded({
        ...promotionsAdded,
        [activeSide]: {
          ...[activeSide],
          rook: promotionsAdded[activeSide].horse + 1,
        },
      });
      setTargetSide(targetCopy);
      break;

    case "queen":
      const pawnName = findPieceData(target, targetSide);
      let targetCopy = targetSide;
      delete targetCopy[pawnName];
      targetCopy = {
        ...targetCopy,
        [`${
          targetSide + `_queen.${1 + promotionsAdded[activeSide].queen}.svg`
        }`]: target,
      };
      setPromotionsAdded({
        ...promotionsAdded,
        [activeSide]: {
          ...[activeSide],
          rook: promotionsAdded[activeSide].queen + 1,
        },
      });
      setTargetSide(targetCopy);
      break;

    default:
      break;
  }
};

export const checkForCheck = (targetSide, white, black, castlingInfo) => {
  let isKingUnderCheck = false;
  const targetKingPos =
    targetSide === "white" ? white["white_king.svg"] : black["black_king.svg"];
  const myPiecesLocArray = Object.values(
    targetSide === "white" ? black : white
  );
  const myPiecesNameArray = Object.keys(targetSide === "white" ? black : white);
  const oppPiecesLocArray = Object.values(
    targetSide === "white" ? white : black
  );
  for (const myPiece of myPiecesNameArray) {
    const reverseTargetSide = targetSide === "white" ? "black" : "white";
    const myPieceLoc = targetSide === "white" ? black[myPiece] : white[myPiece];
    if (myPiece.split("_")[1] === "pawn") {
      const finalAllowedPos = calculatePawnMovement(
        reverseTargetSide,
        myPieceLoc,
        myPiecesLocArray,
        oppPiecesLocArray
      );
      if (finalAllowedPos.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    } else if (myPiece.split("_")[1] === "horse") {
      const finalAllowedPos = calculateHorseMovement(
        myPieceLoc,
        myPiecesLocArray
      );
      if (finalAllowedPos.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    } else if (myPiece.split("_")[1] === "rook") {
      const rookMovementResp = calculateRookMovement(
        myPieceLoc,
        reverseTargetSide,
        myPiece,
        myPiecesLocArray,
        oppPiecesLocArray,
        castlingInfo
      );
      if (rookMovementResp.allowedPosArray.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    } else if (myPiece.split("_")[1] === "bishop") {
      const finalAllowedPos = calculateBishopMovement(
        myPieceLoc,
        myPiecesLocArray,
        oppPiecesLocArray
      );
      if (finalAllowedPos.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    } else if (myPiece.split("_")[1] === "king.svg") {
      const kingResponse = calculateKingMovement(
        myPieceLoc,
        reverseTargetSide,
        myPiecesLocArray,
        oppPiecesLocArray,
        castlingInfo
      );
      if (kingResponse.allowedPosArray.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    } else if (myPiece.split("_")[1] === "queen.svg") {
      const finalAllowedPos = [
        ...calculateRookMovement(
          myPieceLoc,
          reverseTargetSide,
          myPiece,
          myPiecesLocArray,
          oppPiecesLocArray,
          castlingInfo
        ).allowedPosArray,
        ...calculateBishopMovement(
          myPieceLoc,
          myPiecesLocArray,
          oppPiecesLocArray
        ),
      ];
      if (finalAllowedPos.includes(targetKingPos)) {
        isKingUnderCheck = true;
      }
    }
  }
  return isKingUnderCheck;
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
  activeSide,
  myPiece,
  myPiecesLocArray,
  oppPiecesLocArray,
  castlingInfo
) => {
  const allowedPosArray = [];
  const allowedCastlingLocArray = [];
  const castlingButtonState = {
    whiteRook1: false,
    whiteRook2: false,
    blackRook1: false,
    blackRook2: false,
  };
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

  switch (myPiece.split(".")[0]) {
    case "white_rook_1":
      if (
        castlingInfo.whiteKing === false &&
        castlingInfo.whiteRook1 === false
      ) {
        const spaceBetweenLeft = ["8b", "8c"];
        const checkCommonMy = myPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );
        const checkCommonOpp = oppPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );
        if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
          allowedCastlingLocArray.push("8d");
          castlingButtonState.whiteRook1 = true;
        }
      }
      break;
    case "white_rook_2":
      if (
        castlingInfo.whiteKing === false &&
        castlingInfo.whiteRook2 === false
      ) {
        const spaceBetweenLeft = ["8e", "8f", "8g"];
        const checkCommonMy = myPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );
        const checkCommonOpp = oppPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );

        if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
          allowedCastlingLocArray.push("8d");
          castlingButtonState.whiteRook2 = true;
        }
      }
      break;
    case "black_rook_1":
      if (
        castlingInfo.blackKing === false &&
        castlingInfo.blackRook1 === false
      ) {
        const spaceBetweenLeft = ["1b", "1c"];
        const checkCommonMy = myPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );
        const checkCommonOpp = oppPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );

        if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
          allowedCastlingLocArray.push("1d");
          castlingButtonState.blackRook1 = true;
        }
      }
      break;
    case "black_rook_2":
      if (
        castlingInfo.blackKing === false &&
        castlingInfo.blackRook2 === false
      ) {
        const spaceBetweenLeft = ["1e", "1f", "1g"];
        const checkCommonMy = myPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );
        const checkCommonOpp = oppPiecesLocArray.filter((val) =>
          spaceBetweenLeft.includes(val)
        );

        if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
          allowedCastlingLocArray.push("1d");
          castlingButtonState.blackRook2 = true;
        }
      }
      break;

    default:
      break;
  }
  return { allowedPosArray, allowedCastlingLocArray, castlingButtonState };
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

const calculateKingMovement = (
  current,
  activeSide,
  myPiecesLocArray,
  oppPiecesLocArray,
  castlingInfo
) => {
  const allowedPosArray = [];
  const allowedCastleArray = [];
  const castlingButtonState = {
    whiteRook1: false,
    whiteRook2: false,
    blackRook1: false,
    blackRook2: false,
  };
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
  if (activeSide === "white") {
    if (castlingInfo.whiteKing === false && castlingInfo.whiteRook1 === false) {
      const spaceBetweenLeft = ["8b", "8c"];
      const checkCommonMy = myPiecesLocArray.filter((val) =>
        spaceBetweenLeft.includes(val)
      );
      const checkCommonOpp = oppPiecesLocArray.filter((val) =>
        spaceBetweenLeft.includes(val)
      );

      if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
        allowedCastleArray.push("8a");
        castlingButtonState.whiteRook1 = true;
      }
    }
    if (castlingInfo.whiteKing === false && castlingInfo.whiteRook2 === false) {
      const spaceBetweenRight = ["8e", "8f", "8g"];
      const checkCommonMy = myPiecesLocArray.filter((val) =>
        spaceBetweenRight.includes(val)
      );
      const checkCommonOpp = oppPiecesLocArray.filter((val) =>
        spaceBetweenRight.includes(val)
      );

      if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
        allowedCastleArray.push("8h");
        castlingButtonState.whiteRook2 = true;
      }
    }
  } else {
    if (castlingInfo.blackKing === false && castlingInfo.blackRook1 === false) {
      const spaceBetweenLeft = ["1b", "1c"];
      const checkCommonMy = myPiecesLocArray.filter((val) =>
        spaceBetweenLeft.includes(val)
      );
      const checkCommonOpp = oppPiecesLocArray.filter((val) =>
        spaceBetweenLeft.includes(val)
      );
      if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
        allowedCastleArray.push("1a");
        castlingButtonState.blackRook1 = true;
      }
    }
    if (castlingInfo.blackKing === false && castlingInfo.blackRook2 === false) {
      const spaceBetweenRight = ["1e", "1f", "1g"];
      const checkCommonMy = myPiecesLocArray.filter((val) =>
        spaceBetweenRight.includes(val)
      );
      const checkCommonOpp = oppPiecesLocArray.filter((val) =>
        spaceBetweenRight.includes(val)
      );

      if ([...checkCommonMy, ...checkCommonOpp].length === 0) {
        allowedCastleArray.push("1h");
        castlingButtonState.blackRook2 = true;
      }
    }
  }
  return { allowedPosArray, allowedCastleArray, castlingButtonState };
};
