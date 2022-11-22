import React from "react";

function Card(props) {
  const answers = props.all.sort(() => Math.random() - 0.5);
  return (
    <div className="w-[80%] max-w-7xl mx-auto py-5  border-b-2  border-b-btnHover">
      <h1 className="text-3xl text-textBlue font-karla font-bold">
        {props.question}
      </h1>
      <div className="space-x-5 mt-4">
        {answers.map((answer) => {
          return (
            <button
              type="button"
              className="border border-textBlue px-5 rounded-lg font-Inter hover:bg-btnHover"
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
