import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [quizInfo, setQuizInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuizInfo(data));
  }, []);

  function handleAddItem(newItem) {
    setQuizInfo([...quizInfo, newItem]);
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = quizInfo.filter((item) => item.id !== id);
        setQuizInfo(updatedQuestions);
      });
  }
  function handleUpdate(newItem) {
    const updatedQuestions = quizInfo.map((q) => {
      if (q.id === parseInt(newItem.id)) return newItem;
      return q;
    });
    setQuizInfo(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddItem={handleAddItem} />
      ) : (
        <QuestionList
          questions={quizInfo}
          onDeleteItem={handleDelete}
          onUpdateItem={handleUpdate}
        />
      )}
    </main>
  );
}

export default App;
