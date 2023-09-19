import React, { useState,useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((fetchData) => setQuestions(fetchData))
    .catch((error) => {console.error("Fetch unsuccessful",error)})
  },[])

  function handleNewQuestion(addedQuestion){
    setQuestions([...questions,addedQuestion])
  }

  function handleQuestionDelete(deletedQuestion){
    const filteredQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(filteredQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={handleNewQuestion} /> : <QuestionList questions={questions} removeQuestion={handleQuestionDelete}/>}
    </main>
  );
}

export default App;
