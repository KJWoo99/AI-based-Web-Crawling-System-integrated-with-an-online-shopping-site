import React, { useState, useEffect } from 'react';

const QnA = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); 
  const itemsPerPage = 5; 

  useEffect(() => {
    // LocalStorage에 저장된 후기 불러오기(Load existing QnA data from localStorage if available)
    const storedQuestions = JSON.parse(localStorage.getItem('questions'));
    if (storedQuestions) {
      setQuestions(storedQuestions);
    }
  }, []);

  useEffect(() => {
    // // 후기가 변경될 때마다 LocalStorage에 저장(Save updated QnA data to localStorage whenever questions change)
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleQuestionSubmit = () => {
    if (newQuestion.trim() !== '') {
      const newQnA = {
        id: Date.now(),
        question: newQuestion,
        answer: '',
        submissionTime: new Date().toLocaleString(),
      };
      setQuestions([newQnA, ...questions]);
      setNewQuestion('');
    }
  };

  const handleAnswerInputChange = (event) => {
    setAnswerInput(event.target.value);
  };

  const handleAnswerSubmit = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((qna) => (qna.id === id ? { ...qna, answer: answerInput } : qna))
    );
    setAnswerInput(''); // Clear the answer input after submitting the answer
  };

  const handleQuestionDelete = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((qna) => qna.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset the current page to 1 when performing a new search
  };

  // Filter the questions based on the search query
  const filteredQuestions = questions.filter((qna) =>
    qna.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the current page's questions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Questions and Answers</h2>
        <hr style={{ margin: '20px' }} />
        <ul>
          {currentQuestions.map((qna) => (
            <li key={qna.id}>
              <strong style={{ textDecoration: 'underline' }}>Question:</strong> {qna.question}
              <br />
              <em>Submitted: {qna.submissionTime}</em>
              <br />
              {qna.answer ? (
                <>
                  <strong>Answer:</strong> {qna.answer}
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={answerInput}
                    onChange={handleAnswerInputChange}
                    placeholder="Your answer"
                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
                  />
                  <button
                    style={{
                      borderRadius: '5px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      fontSize: '14px',
                    }}
                    onClick={() => handleAnswerSubmit(qna.id)}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
              <br />
              {qna.answer && (
                <button
                  style={{
                   borderRadius: '5px',
                   color: 'red',
                   border: '5px solid #ccc',
                    padding: '5px',
                   fontSize: '15px',
                 }}
                  onClick={() => handleQuestionDelete(qna.id)}
                >
                  *--Delete--*
                </button>
              )}
            </li>
          ))}
        </ul>
        {/* Pagination */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {filteredQuestions.length > itemsPerPage && (
            <div>
              <button
                style={{
                  borderRadius: '5px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  fontSize: '14px',
                  marginRight: '10px',
                }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
              <button
                style={{
                  borderRadius: '5px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  fontSize: '14px',
                }}
                disabled={indexOfLastItem >= filteredQuestions.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ textAlign: 'center', fontSize: '30px' }}>Ask a new question:</h3>
        <hr style={{ margin: '20px' }} />
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Your question"
          style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
        />
        <button
          style={{
            borderRadius: '5px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            padding: '5px',
            fontSize: '18px',
          }}
          onClick={handleQuestionSubmit}
        >
          Submit Question
        </button>
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search questions..."
          style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginTop: '10px' }}
        />
      </div>
    </div>
  );
};

export default QnA;
