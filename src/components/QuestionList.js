import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteItem, onUpdateItem }) {
  function onAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdateItem(updatedQuestion);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((item) => (
          <QuestionItem
            key={item.id}
            question={item}
            onDelete={onDeleteItem}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
