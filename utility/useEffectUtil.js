export const innitializeBoard = (white, black, rows, cols) => {
  const pieceName = [...Object.keys(white), ...Object.keys(black)];
  const pieceLocation = [...Object.values(white), ...Object.values(black)];
  for (const rowVal of rows) {
    for (const colsVal of cols) {
      const index = pieceLocation.findIndex(
        (idCheck) => idCheck === `${rowVal}${colsVal}`
      );
      if (index !== -1) {
        const targetDiv = document.getElementById(`${rowVal}${colsVal}`);
        targetDiv.innerHTML = `<img className="h-20 w-20" src="/assets/${pieceName[index]}" alt="${pieceName[index]}"/>`;
      }
    }
  }
};
