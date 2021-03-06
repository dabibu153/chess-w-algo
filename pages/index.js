import { useEffect, useState } from "react";
import {
  calculatePosibleMovementLocations,
  doMovementThings,
  handleCastling,
  handlePromotions,
} from "../utility/movementUtility";
import { updateBoard } from "../utility/useEffectUtil";

export default function Home() {
  const [activeSide, setactiveSide] = useState("white");
  const [castlingInfo, setCastlingInfo] = useState({
    whiteKing: false,
    whiteRook1: false,
    whiteRook2: false,
    blackKing: false,
    blackRook1: false,
    blackRook2: false,
  });
  const [showCastleButton, setShowCastleButton] = useState({
    whiteRook1: false,
    whiteRook2: false,
    blackRook1: false,
    blackRook2: false,
  });
  const [eligibleForPro, setEligibleForPro] = useState([]);
  const [castleAllowedLoc, setCastleAllowedLoc] = useState([]);
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
    "white_queen.svg": "6e",
    "white_bishop_2.svg": "8f",
    "white_horse_2.svg": "8g",
    "white_rook_2.svg": "8h",
  });
  const [black, setBlack] = useState({
    "black_pawn_1.svg": "2a",
    "black_pawn_2.svg": "2b",
    "black_pawn_3.svg": "2c",
    "black_pawn_4.svg": "3e",
    "black_pawn_5.svg": "6d",
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
  const [showCheckDiv, setShowCheckDiv] = useState({
    black: false,
    white: false,
    whiteLoc: undefined,
    blackLoc: undefined,
  });
  const [refresh, setRefresh] = useState(true);
  const [showPromotionDiv, setShowPromotionDiv] = useState(false);
  const [promotionsAdded, setPromotionsAdded] = useState({
    black: { rook: 0, bishop: 0, horse: 0, queen: 0 },
    white: { rook: 0, bishop: 0, horse: 0, queen: 0 },
  });

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  useEffect(() => {
    updateBoard(white, black, setEligibleForPro, setShowPromotionDiv);
  }, [white, black, refresh]);

  const castle = (rookPos) => {
    handleCastling(
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
    );
  };

  const boardClicked = (id) => {
    eligibleForPro.includes(id)
      ? setShowPromotionDiv(true)
      : setShowPromotionDiv(false);
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
        setallowedPos,
        castlingInfo,
        setCastlingInfo,
        castleAllowedLoc,
        setCastleAllowedLoc,
        showCastleButton,
        setShowCastleButton
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
        setactivePiece,
        castlingInfo,
        setCastlingInfo,
        setCastleAllowedLoc,
        setShowCastleButton,
        refresh,
        setRefresh,
        setShowCheckDiv
      );
    }
  };

  const promotionArray = [
    { name: "rook", imageArray: ["white_rook_1.svg", "black_rook_1.svg"] },
    {
      name: "bishop",
      imageArray: ["white_bishop_1.svg", "black_bishop_1.svg"],
    },
    { name: "horse", imageArray: ["white_horse_1.svg", "black_horse_1.svg"] },
    { name: "queen", imageArray: ["white_queen.svg", "black_queen.svg"] },
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div
        className={`${
          showCheckDiv.black ? "fixed" : "hidden"
        } top-0 right-0 m-5 bg-red-300 px-2 font-bold text-xl rounded-lg`}
      >
        Black King Under Check
      </div>
      <div
        className={`${
          showCheckDiv.white ? "fixed" : "hidden"
        } bottom-0 right-0 m-5 bg-red-300 px-2 font-bold text-xl rounded-lg`}
      >
        White King Under Check
      </div>
      <div className="flex relative">
        <div
          onClick={() => castle("1a")}
          className={`${
            showCastleButton.blackRook1 === true ? "absolute" : "hidden"
          } -top-10 left-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("1h")}
          className={`${
            showCastleButton.blackRook2 === true ? "absolute" : "hidden"
          } -top-10 right-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("8a")}
          className={`${
            showCastleButton.whiteRook1 === true ? "absolute" : "hidden"
          } -bottom-10 left-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("8h")}
          className={`${
            showCastleButton.whiteRook2 === true ? "absolute" : "hidden"
          } -bottom-10 right-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg`}
        >
          CASTLE
        </div>
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
                  } ${
                    castleAllowedLoc.includes(`${rowVal + colVal}`)
                      ? "bg-green-200 border-3 border-white"
                      : ""
                  }
                  ${
                    rowVal + colVal === showCheckDiv.whiteLoc ||
                    rowVal + colVal === showCheckDiv.blackLoc
                      ? "bg-yellow-200"
                      : ""
                  }
                  ${
                    eligibleForPro.includes(rowVal + colVal)
                      ? "bg-purple-300"
                      : ""
                  }`}
                  id={`${rowVal + colVal}`}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`${showPromotionDiv ? "fixed" : "hidden"} right-0`}>
        <div>Select Piece</div>
        <div className="flex flex-col">
          {promotionArray.map((onePiece) => (
            <div
              onClick={() =>
                handlePromotions(
                  onePiece.name,
                  activePiece,
                  activeSide,
                  activeSide === "white" ? white : black,
                  activeSide === "white" ? setWhite : setBlack,
                  promotionsAdded,
                  setPromotionsAdded
                )
              }
            >
              <div>{onePiece.toUpperCase()}</div>
              <img
                className="h-8 w-8"
                src={onePiece.imageArray[0]}
                alt="rook"
              />{" "}
              /{" "}
              <img
                className="h-8 w-8"
                src={onePiece.imageArray[1]}
                alt="rook"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// pawn reaches other end
//pawn gets a purple glow
//side rotation happens
//if the same pawn in selected: promotion div becomes visible
//select a upgrade
//change of side?? (needs research)
