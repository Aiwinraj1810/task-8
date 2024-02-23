import React, { useState } from 'react';
import { CCollapse, CCard, CCardBody, CFormInput, CFormSelect, CButton } from '@coreui/react';

const QuestionsInput = () => {
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = useState(false);

  const addQuestion = () => {
    const newQuestionNumber = questions.length + 1;
    setQuestions([...questions, newQuestionNumber]);
  };

  return (
    <div>
      <CButton onClick={() => setVisible(!visible)}>Add a Question</CButton>
      <CCollapse visible={visible}>
        {questions.map((questionNumber) => (
          <CCard key={questionNumber} className="mt-3">
            <CCardBody>
              <div>
                <span>Question : </span>
                <CFormInput type="text" id={`text${questionNumber}`} floatingClassName="mb-3" floatingLabel="Question" placeholder="Question" />
                <span>Question type : </span>
                <CFormSelect>
                  <option>Select categories</option>
                  <option>MCQ</option>
                  <option>Fill in the blanks</option>
                </CFormSelect>
                <span>Score per question : </span>
                <CFormInput type="text" id={`score${questionNumber}`} floatingClassName="mb-3" floatingLabel="Score" placeholder="Enter Score per question" />
                <span>Answer :  </span>
                <CFormInput type="text" id={`answer${questionNumber}`} floatingClassName="mb-3" floatingLabel="Answer" placeholder="Enter answer" />
                <button>Add</button>
              </div>
            </CCardBody>
          </CCard>
        ))}
        <button onClick={addQuestion}>Add</button>
      </CCollapse>
    </div>
  );
};

export default QuestionsInput;
