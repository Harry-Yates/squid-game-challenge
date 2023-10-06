# Squid Game Challenge 🦑

## Approach & Progress:

- [x] **Project Setup**: Install Next, Typescript and React Query in line with Krea frontend tech stack.
- [x] **Data Preparation - Test Data**: Analyse input and decide on efficient data structures as per Krea brief. Store test data in JSON files.
- [x] **Data Fetching with React Query**:
  - Set up React Query to fetch game data from local API routes.
  - Create a custom hook (`useGameData`) to abstract data fetching logic and handle loading, error, and data states.
- [x] **State Management with Zustand**:
  - Set up Zustand for global state management.
  - Create a store to hold and update game state across components.
- [x] **Component Development**:
  - [x] **BingoCard Component**: Display the numbers and mark cells when drawn.
  - [x] **Game Component**: Handle the game logic and use multiple `BingoCard` components.
- [x] **Test - Test Data**: Ensure logic with test data is correct and handles all cases.
- [x] **Data Preparation - Actual Data**: Once confident with test data results, integrate actual data.
- [x] **Test - Actual Data**: Verify logic correctness with actual data.
- [x] **POST Request Validation**: Score sent via Insomnia and verified `"is_correct_answer": true`.
- [ ] **Review / Optimise / Refactor**: Refine code, ensuring it's clean and efficient.
- [ ] **Final Submission**: Submit GitHub solution for review with Krea.
