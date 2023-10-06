import create from "zustand";

type State = {
  boards: number[][][];
  drawnNumbers: number[];
  currentBoardIndex: number;
  setCurrentBoardIndex: (index: number) => void;
};

export const useStore = create<State>((set) => ({
  boards: [],
  drawnNumbers: [],
  currentBoardIndex: 0,
  setCurrentBoardIndex: (index: number) => set({ currentBoardIndex: index }),
}));
