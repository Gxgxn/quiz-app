import React from "react";
import Nav from "./components/Nav";
import blob from "./assests/blob.svg";
import blob1 from "./assests/blob-1.svg";
function App() {
  return (
    <>
      <img
        className="w-[700px] absolute -z-10 pointer-events-none top-[300px] left-[-300px] "
        src={blob}
        alt="blob"
      />
      <img
        className="w-[700px] absolute -z-10 pointer-events-none right-[-10%] top-[-300px]"
        src={blob1}
        alt="blob"
      />
      <Nav />
      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  );
}

export default App;
