import { useQuery } from "react-query";

const fetchGameData = async (): Promise<any> => {
  const response = await fetch("/api/gameData");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useGameData = () => {
  return useQuery("gameData", fetchGameData);
};

export default useGameData;
