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
    whiteLeft: true,
    whiteRight: true,
    blackLeft: true,
    blackRight: true,
  });
  const [white, setWhite] = useState([
    { piece: "pawn", image: "white_pawn.svg", position: "60" },
    { piece: "pawn", image: "white_pawn.svg", position: "61" },
    { piece: "pawn", image: "white_pawn.svg", position: "62" },
    { piece: "pawn", image: "white_pawn.svg", position: "63" },
    { piece: "pawn", image: "white_pawn.svg", position: "64" },
    { piece: "pawn", image: "white_pawn.svg", position: "65" },
    { piece: "pawn", image: "white_pawn.svg", position: "66" },
    { piece: "pawn", image: "white_pawn.svg", position: "17" },
    { piece: "rook", image: "white_rook.svg", position: "70", primary: true },
    { piece: "horse", image: "white_horse.svg", position: "71" },
    { piece: "bishop", image: "white_bishop.svg", position: "72" },
    { piece: "king", image: "white_king.svg", position: "74" },
    { piece: "queen", image: "white_queen.svg", position: "73" },
    { piece: "bishop", image: "white_bishop.svg", position: "75" },
    { piece: "horse", image: "white_horse.svg", position: "76" },
    { piece: "rook", image: "white_rook.svg", position: "77", primary: true },
  ]);

  const [black, setBlack] = useState([
    { piece: "rook", image: "black_rook.svg", position: "00", primary: true },
    { piece: "horse", image: "black_horse.svg", position: "01" },
    { piece: "bishop", image: "black_bishop.svg", position: "02" },
    { piece: "king", image: "black_king.svg", position: "04" },
    { piece: "queen", image: "black_queen.svg", position: "03" },
    { piece: "bishop", image: "black_bishop.svg", position: "05" },
    { piece: "horse", image: "black_horse.svg", position: "06" },
    { piece: "rook", image: "black_rook.svg", position: "37", primary: true },
    { piece: "pawn", image: "black_pawn.svg", position: "10" },
    { piece: "pawn", image: "black_pawn.svg", position: "11" },
    { piece: "pawn", image: "black_pawn.svg", position: "12" },
    { piece: "pawn", image: "black_pawn.svg", position: "13" },
    { piece: "pawn", image: "black_pawn.svg", position: "14" },
    { piece: "pawn", image: "black_pawn.svg", position: "15" },
    { piece: "pawn", image: "black_pawn.svg", position: "16" },
    { piece: "pawn", image: "black_pawn.svg", position: "27" },
  ]);
  const [activePiece, setactivePiece] = useState();
  const [allowedPos, setallowedPos] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [whiteKingCheck, setWhiteKingCheck] = useState(false);
  const [blackKingCheck, setBlackKingCheck] = useState(false);

  const [showPromotionBox, setShowPromotionBox] = useState(false);

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    updateBoard(white, black);
  }, [white, black, refresh]);

  const castle = (button) => {
    handleCastling(
      button,
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
      refresh,
      setRefresh,
      whiteKingCheck,
      blackKingCheck
    );
  };

  const boardClicked = (id) => {
    const allPiecePosArray = [];
    for (const onePiece of activeSide === "white" ? white : black) {
      allPiecePosArray.push(onePiece.position);
    }
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
        setactivePiece,
        castlingInfo,
        setCastlingInfo,
        refresh,
        setRefresh,
        whiteKingCheck,
        setWhiteKingCheck,
        blackKingCheck,
        setBlackKingCheck,
        setShowPromotionBox,
        moveCount,
        setMoveCount
      );
    }
  };

  const promotePawn = (obj) => {
    if (activeSide === "white") {
      let blackCopy = [...black];
      const promotionLocs = ["70", "71", "72", "73", "74", "75", "76", "77"];
      const targetObjIdx = blackCopy.findIndex((obj) =>
        promotionLocs.includes(obj.position)
      );
      blackCopy[targetObjIdx].piece = obj;
      blackCopy[targetObjIdx].image = `black_${obj}.svg`;
      setBlack(blackCopy);
    } else {
      let whiteCopy = [...white];
      const promotionLocs = ["00", "01", "02", "03", "04", "05", "06", "07"];
      const targetObjIdx = whiteCopy.findIndex((obj) =>
        promotionLocs.includes(obj.position)
      );
      whiteCopy[targetObjIdx].piece = obj;
      whiteCopy[targetObjIdx].image = `white_${obj}.svg`;
      setWhite(whiteCopy);
      setShowPromotionBox(false);
    }
  };

  const promotionArray = ["queen", "rook", "horse", "bishop"];

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div
        className={`${
          blackKingCheck ? "fixed" : "hidden"
        } top-0 right-0 m-5 bg-red-300 px-2 font-bold text-xl rounded-lg`}
      >
        Black King Under Check
      </div>
      <div
        className={`${
          whiteKingCheck ? "fixed" : "hidden"
        } bottom-0 right-0 m-5 bg-red-300 px-2 font-bold text-xl rounded-lg`}
      >
        White King Under Check
      </div>
      <div className="flex relative">
        <div
          onClick={() => castle("blackLeft")}
          className={`${
            castlingInfo.blackLeft && activeSide === "black"
              ? "absolute"
              : "hidden"
          } -top-10 left-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg cursor-pointer	`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("blackRight")}
          className={`${
            castlingInfo.blackRight && activeSide === "black"
              ? "absolute"
              : "hidden"
          } -top-10 right-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg cursor-pointer	`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("whiteLeft")}
          className={`${
            castlingInfo.whiteLeft && activeSide === "white"
              ? "absolute"
              : "hidden"
          } -bottom-10 left-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg cursor-pointer	`}
        >
          CASTLE
        </div>
        <div
          onClick={() => castle("whiteRight")}
          className={`${
            castlingInfo.whiteRight && activeSide === "white"
              ? "absolute"
              : "hidden"
          } -bottom-10 right-3 z-10 font-bold text-white bg-blue-300 px-2 rounded-lg cursor-pointer	`}
        >
          CASTLE
        </div>
        {cols.map((colVal, colIndex) => (
          <div className="flex flex-col bg-blue-100">
            {rows.map((rowVal, rowIndex) => (
              <div
                className={`relative h-24 w-24 ${
                  rowIndex % 2 === 0 && colIndex % 2 === 0 ? "bg-blue-300" : ""
                } 
              ${rowIndex % 2 !== 0 && colIndex % 2 !== 0 ? "bg-blue-300" : ""} 
               ${
                 activePiece === "" + rowVal + colVal
                   ? "border border-3 border-red-500"
                   : ""
               } flex`}
              >
                <div
                  onClick={() => {
                    boardClicked("" + rowVal + colVal);
                  }}
                  className={` flex items-center justify-center h-full w-full ${
                    allowedPos.includes("" + rowVal + colVal)
                      ? "bg-red-200 border border-3 border-white"
                      : ""
                  } 
                  `}
                  id={"" + rowVal + colVal}
                ></div>
                <div className="absolute top-0 lrft-0">
                  {"" + rowVal + colVal}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className={`${showPromotionBox ? "relative" : "hidden"} z-10`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex">
                  {promotionArray.map((obj) => (
                    <div
                      onClick={() => promotePawn(obj)}
                      className="cursor-pointer h-24 w-24 bg-blue-300 mx-4 flex items-center justify-center transform hover:bg-blue-600 transition duration-500 hover:scale-125"
                    >
                      <img
                        className="h-20 w-20"
                        src={`/assets/${
                          activeSide === "white" ? "black" : "white"
                        }_${obj}.svg`}
                        alt={obj}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
