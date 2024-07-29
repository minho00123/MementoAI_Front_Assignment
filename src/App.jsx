import React from "react";
import Board from "./components/Board.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <main>
      <Header
        title={"Drag & Drop Test"}
        content={"cmd/ctrl 키를 사용하여 여러 아이템을 선택하세요."}
      />
      <Board />
    </main>
  );
}

export default App;
