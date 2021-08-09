export const updateBoard = (white, black) => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const pieceName = [...Object.keys(white), ...Object.keys(black)];
  const pieceLocation = [...Object.values(white), ...Object.values(black)];
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
};
