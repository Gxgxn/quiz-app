import React from 'react';
import { decode } from 'html-entities';
function Card(props) {
  return (
    <div className='w-[80%] max-w-7xl mx-auto py-5  border-b-2  border-b-btnHover'>
      <h1 className='text-3xl text-textBlue font-karla font-bold'>
        {decode(props.question)}
      </h1>
      <div className='space-x-5 mt-4'>
        {props.answers.map((answer, index) => {
          if (props.complete) {
            return (
              <button
                key={index}
                type='button'
                className={`border border-textBlue px-5 rounded-lg font-Inter hover:bg-btnHover ${
                  answer.answer === props.correct && props.selectAnswer
                    ? 'bg-green-500'
                    : props.selectAnswer
                    ? 'bg-red-200'
                    : ''
                }${
                  answer.answer === props.correct && !props.selectAnswer
                    ? 'bg-blue-100'
                    : ''
                }`}
                // id={answer.id}
                onClick={(e) => props.setIsChecked(e, props.id)}
              >
                {decode(answer.answer)}
              </button>
            );
          }

          return (
            <button
              key={index}
              type='button'
              className={`border border-textBlue px-5 rounded-lg font-Inter hover:bg-btnHover ${
                answer.isChecked ? 'bg-btnHover' : ''
              }`}
              // id={answer.id}
              onClick={(e) => {
                return !props.complete ? props.setIsChecked(e, props.id) : null;
              }}
            >
              {decode(answer.answer)}
            </button>
          );
        })}
      </div>
      {props.complete && (
        <div className='ml-auto'>
          {props.selectAnswer === props.correct ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#22CB5C'
              className='w-7 h-7 ml-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#E21717'
              className='w-7 h-7 ml-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
