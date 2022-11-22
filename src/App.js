import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import blob from "./assests/blob.svg";
import blob1 from "./assests/blob-1.svg";
import Card from "./components/Card";
function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((error) => console.log(error));
  }, []);

  const dataCollection = data.map((quesObj) => {
    return (
      <Card
        question={quesObj.question}
        correct={quesObj.correct_answer}
        incorrect={quesObj.incorrect_answers}
        all={[...quesObj.incorrect_answers, quesObj.correct_answer]}
      />
    );
  });

  return (
    <>
      <img
        className="w-[600px] absolute -z-10 pointer-events-none bottom-0 left-[-300px] "
        src={blob}
        alt="blob"
      />
      <img
        className="w-[600px] absolute -z-10 pointer-events-none right-[-10%] top-[-300px] "
        src={blob1}
        alt="blob"
      />
      {isLanding ? (
        <main className="bg-dark flex flex-col justify-center items-center h-screen gap-8">
          <h1 className="text-5xl font-karla font-semibold text-textBlue">
            Quizzical
          </h1>
          <button
            type="button"
            className="bg-btnBlue px-10 py-4 text-white font-light font-karla rounded-lg hover:bg-textBlue"
            onClick={() => setIsLanding(false)}
          >
            Start Quiz
          </button>
        </main>
      ) : (
        <>
          <Nav />
          <div className="container mx-auto py-4">{dataCollection}</div>
        </>
      )}
    </>
  );
}

export default App;
