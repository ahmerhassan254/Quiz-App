import React from "react";

export default function CheckAnswers({
  questionsResponse,
  selectedAnswers,
  selectedOptions,
  correctAnswers,
  shuffledOptions,
  shouldCheckAnswer,
}) {
  const [marks, setMarks] = React.useState(0);

  const handleCheck = () => {
    let temp = 0;

    for (let index = 0; index < selectedAnswers.length; index++) {
      if (selectedAnswers[index] === correctAnswers[index]) {
        temp++;
      }
    }
    setMarks(temp);
  };

  const getBtnBgColor = (qIndex, i) => {
    let temp = "rgba(0,0,0,0)";
    if (shuffledOptions[qIndex][i] === selectedAnswers[qIndex]) {
      temp = "rgba(0,0,255,0.2)";
    }
    //
    //

    if (shuffledOptions[qIndex][i] === correctAnswers[qIndex]) {
      temp = "rgba(0,255,0,0.2)";
    }
    //
    //
    else if (
      shuffledOptions[qIndex][i] === selectedAnswers[qIndex] &&
      selectedAnswers[qIndex] !== correctAnswers[qIndex]
    ) {
      temp = "rgba(255,0,0,0.2)";
    }
    return temp;
  };
  const renderEverything = () => {
    if (!shouldCheckAnswer) {
      return <p>i am a hard stuck Gold3 Player</p>;
    }

    return questionsResponse.map((item, qIndex) => {
      return (
        <div key={qIndex}>
          <div>
            <h3>
              {qIndex + 1} - {item.question}
            </h3>
            {[0, 1, 2, 3].map((i) => {
              return (
                <button
                  key={qIndex + i}
                  style={{
                    backgroundColor: getBtnBgColor(qIndex, i),
                  }}
                >
                  {shuffledOptions[qIndex][i]}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  React.useEffect(() => {
    handleCheck();
  }, []);
  return (
    <>
      <div className="question-container">{renderEverything()}</div>
      <p className="score">You have scored {marks}/10</p>
    </>
  );
}
