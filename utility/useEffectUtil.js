export const updateBoard = (white, black) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const pieceName = [];
  const pieceLocation = [];
  for (const oneWhite of white) {
    pieceName.push(oneWhite.image);
    pieceLocation.push(oneWhite.position);
  }
  for (const oneBlack of black) {
    pieceName.push(oneBlack.image);
    pieceLocation.push(oneBlack.position);
  }
  for (const rowVal of rows) {
    for (const colsVal of cols) {
      const targetDiv = document.getElementById(`${rowVal}${colsVal}`);
      targetDiv.innerHTML = "";
      const index = pieceLocation.findIndex(
        (idCheck) => idCheck === `${rowVal}${colsVal}`
      );
      if (index !== -1) {
        targetDiv.innerHTML = `<img className="h-20 w-20" src="/assets/${pieceName[index]}" alt="${pieceName[index]}"/>`;
      }
    }
  }
  // const eligibleLocArray = checkForPromotions(white, black);
  // if (eligibleLocArray.length > 0) setShowPromotionDiv(true);
  // setEligibleForPro(eligibleLocArray);
};

// const checkForPromotions = (white, black) => {
//   let eligiblePosArray = [];
//   const whiteNameArray = Object.keys(white);
//   const blackNameArray = Object.keys(black);
//   whiteNameArray.forEach((val) => {
//     const loc = white[val];
//     if (val.split("_")[1] === "pawn" && loc[0] === "1") {
//       eligiblePosArray.push(white[val]);
//     }
//   });
//   blackNameArray.forEach((val) => {
//     const loc = black[val];
//     if (val.split("_")[1] === "pawn" && loc[0] === "8") {
//       eligiblePosArray.push(black[val]);
//     }
//   });
//   return eligiblePosArray;
// };
