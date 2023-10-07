import { useQuery } from "react-query";

type Board = number[][];

type GameData = {
  drawNumbers: number[];
  boards: Board[];
};

const fetchGameDataFromAPI = async (): Promise<GameData> => {
  const response = await fetch("/api/gameData");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useGameData = () => {
  return useQuery("gameData", fetchGameDataFromAPI);
};

export default useGameData;
