import { useEffect, useState } from "react";
import {
  calculatePosibleMovementLocations,
  doMovementThings,
  handleMovement,
} from "../utility/movementUtility";
import { innitializeBoard } from "../utility/useEffectUtil";

export default function Home() {
  const [activeSide, setactiveSide] = useState("white");
  const [white, setWhite] = useState({
    "white_pawn_1.svg": "7a",
    "white_pawn_2.svg": "7b",
    "white_pawn_3.svg": "7c",
    "white_pawn_4.svg": "7d",
    "white_pawn_5.svg": "7e",
    "white_pawn_6.svg": "7f",
    "white_pawn_7.svg": "7g",
    "white_pawn_8.svg": "7h",
    "white_rook_1.svg": "8a",
    "white_horse_1.svg": "8b",
    "white_bishop_1.svg": "8c",
    "white_king.svg": "8d",
    "white_queen.svg": "8e",
    "white_bishop_2.svg": "8f",
    "white_horse_2.svg": "8g",
    "white_rook_2.svg": "8h",
  });
  const [black, setBlack] = useState({
    "black_pawn_1.svg": "2a",
    "black_pawn_2.svg": "2b",
    "black_pawn_3.svg": "2c",
    "black_pawn_4.svg": "2d",
    "black_pawn_5.svg": "2e",
    "black_pawn_6.svg": "2f",
    "black_pawn_7.svg": "2g",
    "black_pawn_8.svg": "2h",
    "black_rook_1.svg": "1a",
    "black_horse_1.svg": "1b",
    "black_bishop_1.svg": "1c",
    "black_king.svg": "1d",
    "black_queen.svg": "1e",
    "black_bishop_2.svg": "1f",
    "black_horse_2.svg": "1g",
    "black_rook_2.svg": "1h",
  });
  const [activePiece, setactivePiece] = useState();
  const [allowedPos, setallowedPos] = useState([]);

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  useEffect(() => {
    innitializeBoard(white, black, rows, cols);
  }, []);

  const boardClicked = (id) => {
    const allPiecePosArray = Object.values(
      activeSide === "white" ? white : black
    );
    if (allPiecePosArray.includes(id)) {
      setactivePiece(id);
      calculatePosibleMovementLocations(
        id,
        activeSide,
        white,
        black,
        setallowedPos
      );
    } else {
      doMovementThings(
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
      );
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {cols.map((colVal, colIndex) => (
        <div className="flex flex-col bg-blue-100">
          {rows.map((rowVal, rowIndex) => (
            <div
              className={`h-24 w-24 ${
                rowIndex % 2 === 0 && colIndex % 2 === 0 ? "bg-blue-300" : ""
              } 
              ${rowIndex % 2 !== 0 && colIndex % 2 !== 0 ? "bg-blue-300" : ""} 
               ${
                 activePiece === `${rowVal + colVal}`
                   ? "border border-3 border-red-500"
                   : ""
               } flex`}
            >
              <div
                onClick={() => {
                  boardClicked(`${rowVal + colVal}`);
                }}
                className={`flex items-center justify-center h-full w-full ${
                  allowedPos.includes(`${rowVal + colVal}`)
                    ? "bg-red-200 border border-3 border-white"
                    : ""
                }`}
                id={`${rowVal + colVal}`}
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
