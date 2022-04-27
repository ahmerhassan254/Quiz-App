import React, { useState, useEffect } from "react";
import CheckAnswers from "./Components/CheckAnswers";
import Question from "./Components/Question";
import "./App.css";
const App = () => {
  const [questionsResponse, setQuestionsResponse] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(10).fill(-1, 0, 10)
  );
  const [shouldStart, setShouldStart] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswers, setSelectedAsnwers] = useState(
    new Array(10).fill("", 0, 10)
  );
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [shouldCheckAnswer, setShouldCheckAnswer] = useState(false);
  //
  //
  //
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((str) => setQuestionsResponse(str.results));
  }, []);

  useEffect(() => {
    const temp = [];
    const temp2 = [];

    questionsResponse.forEach((res) => {
      temp2.push(res.correct_answer);
      temp.push(
        [...res.incorrect_answers, res.correct_answer].sort(
          () => Math.random() - 0.5
        )
      );
    });
    setShuffledOptions([...temp]);
    setCorrectAnswers([...temp2]);
  }, [questionsResponse]);

  //
  //
  //
  function quizGenerate() {
    return questionsResponse.map((item, index) => (
      <Question
        key={index}
        ques_NO={index}
        correctAnswer={item.correct_answer}
        question={item.question}
        shuffledOptions={shuffledOptions[index]}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAsnwers}
      />
    ));
  }
  function reset() {
    setSelectedOptions(new Array(10).fill(-1, 0, 10));
  }

  return (
    <div className="App">
      <div className="top" />
      <div className="bottom" />
      <div>
        {shouldStart ? (
          <div className="question-container">{quizGenerate()}</div>
        ) : (
          <>
            {shouldCheckAnswer ? null : (
              <>
                <h3 className="heading">Quizzical</h3>
                <p className="desc">Test your Computer Science Knowledge</p>
                {questionsResponse.length > 0 ? (
                  <button className="start-quiz" onClick={setShouldStart}>
                    Start Quiz
                  </button>
                ) : (
                  <p className="load">Loading...</p>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div>
        {selectedOptions.some((e) => e !== -1) && !shouldCheckAnswer ? (
          <button className="reset" onClick={reset}>
            Reset
          </button>
        ) : null}
        <div>
          {selectedOptions.includes(-1) || shouldCheckAnswer ? null : (
            <button
              className="check"
              onClick={() => {
                setShouldCheckAnswer(true);
                setShouldStart(false);
              }}
            >
              Check Answers
            </button>
          )}
        </div>
      </div>

      {shouldCheckAnswer ? (
        <CheckAnswers
          questionsResponse={questionsResponse}
          selectedAnswers={selectedAnswers}
          selectedOptions={selectedOptions}
          correctAnswers={correctAnswers}
          shuffledOptions={shuffledOptions}
          shouldCheckAnswer={shouldCheckAnswer}
        />
      ) : null}
    </div>
  );
};

export default App;
