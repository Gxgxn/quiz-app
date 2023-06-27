import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import blob from './assests/blob.svg';
import { decode } from 'html-entities';
import blob1 from './assests/blob-1.svg';
import Card from './components/Card';
import { nanoid } from 'nanoid';
function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [data, setData] = useState([]);
  const [score, setScore] = useState(null);
  const [complete, setComplete] = useState(false);
  const [reload, setReload] = useState(false);
  function shuffleArray(arr) {
    let newArr = arr.map((ele) => {
      return {
        answer: ele,
        isChecked: false,
      };
    });

    return newArr.sort(() => Math.random() - 0.5);
  }
  function restart() {
    setComplete(false);
    setScore(null);
    setReload((prevData) => !prevData);
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        let tempArr = [];
        data.results.forEach((quesObj) => {
          tempArr.push({
            id: nanoid(),
            question: quesObj.question,
            answers: shuffleArray([
              ...quesObj.incorrect_answers,
              quesObj.correct_answer,
            ]),
            correct: quesObj.correct_answer,
            selectAnswer: '',
          });
        });
        setData(tempArr);
      })
      .catch((error) => console.log(error));
  }, [reload]);
  function selectAnswer(event, id) {
    // console.log('this', event.target, id);
    setData((prevData) => {
      return [...prevData].map((e) => {
        if (e.id === id) {
          e.answers.forEach((answerObj) => {
            if (decode(answerObj.answer) === event.target.innerText) {
              answerObj.isChecked = true;
              e.selectAnswer = answerObj.answer;
            } else {
              answerObj.isChecked = false;
            }
          });
        }
        return e;
      });
    });
  }
  function calcScore() {
    let score = {
      correct: 0,
      incorrect: 0,
      unAnswered: 0,
      total: 0,
    };
    data.forEach((e) => {
      if (e.selectAnswer === e.correct) {
        score.correct++;
      } else if (e.selectAnswer !== '') {
        score.incorrect++;
      } else {
        score.unAnswered++;
      }
      score.total++;
    });
    setScore(score);
    setComplete(true);
  }
  const dataCollection = data.map((ques) => {
    return (
      <Card
        id={ques.id}
        complete={complete}
        question={ques.question}
        selectAnswer={ques.selectAnswer}
        correct={ques.correct}
        answers={ques.answers}
        setIsChecked={selectAnswer}
      />
    );
  });

  return (
    <>
      <img
        className='w-[600px] absolute -z-10 pointer-events-none bottom-0 left-[-300px] '
        src={blob}
        alt='blob'
      />
      <img
        className='w-[600px] absolute -z-10 pointer-events-none right-[-10%] top-[-300px] '
        src={blob1}
        alt='blob'
      />
      {isLanding ? (
        <main className='bg-dark flex flex-col justify-center items-center h-screen gap-8'>
          <h1 className='text-5xl font-karla font-semibold text-textBlue'>
            Quizzical
          </h1>
          <button
            type='button'
            className='bg-btnBlue px-10 py-4 text-white font-light font-karla rounded-lg hover:bg-textBlue'
            onClick={() => setIsLanding(false)}
          >
            Start Quiz
          </button>
        </main>
      ) : (
        <>
          <Nav />
          <div className='container mx-auto py-4'>{dataCollection}</div>
          <div className='text-center py-4 font-inter'>
            {score && (
              <div className='text-2xl'>
                Your Score: {score.correct}/{score.total}
              </div>
            )}

            <button
              type='button'
              className='bg-btnBlue  mx-auto px-10 py-4 text-white font-light font-karla rounded-lg hover:bg-textBlue block'
              onClick={!complete ? calcScore : restart}
            >
              {!complete ? 'Calculate' : 'New Questions!'}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
