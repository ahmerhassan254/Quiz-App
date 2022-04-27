import React from "react";
export default function Question({
  ques_NO,
  question,
  selectedOptions,
  setSelectedOptions,
  shuffledOptions,
  selectedAnswers,
  setSelectedAnswers,
}) {
  const setOptions = (option_no) => {
    const temp = selectedOptions;
    temp[ques_NO] = option_no;
    setSelectedOptions([...temp]);
  };

  return (
    <>
      <div>
        <h3 className="questions">
          {ques_NO + 1} - {question}
        </h3>
        {shuffledOptions.map((el, index) => {
          return (
            <button
              key={ques_NO + index}
              style={{
                backgroundColor:
                  selectedOptions[ques_NO] !== index + 1
                    ? "rgba(0,0,0,0.0)"
                    : "rgba(214, 219, 245, 1)",
              }}
              onClick={() => {
                setOptions(index + 1);
                const temp = selectedAnswers;
                temp[ques_NO] = el;
                setSelectedAnswers([...temp]);
                // console.log(selectedAnswers);
              }}
            >
              {el}
            </button>
          );
        })}
        <div className="line"></div>
      </div>
    </>
  );
}
