import React from "react";

function Header({ title, content }) {
  return (
    <header className="flex flex-col items-center py-5 text-4xl border-b-4">
      <h1>{title}</h1>
      <p className="mt-3 text-lg">{content}</p>
    </header>
  );
}

export default Header;
