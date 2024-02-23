import React, { useState } from 'react';
import { CButton, CCard, CCollapse, CCardBody, CFormInput, CFormSelect } from '@coreui/react';

const ParentComponent = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestionNumber = questions.length + 1;
    setQuestions([...questions, newQuestionNumber]);
  };

  return (
    <form>
      <div>
        {questions.map((questionNumber) => (
          <QuestionsInput key={questionNumber} questionNumber={questionNumber} />
        ))}
        <button onClick={addQuestion}>Add a question</button>
      </div>
    </form>
  );
};

const QuestionsInput = ({ questionNumber }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <CButton onClick={() => setVisible(!visible)}>Question {questionNumber}</CButton>
      <CCollapse visible={visible}>
        <CCard className="mt-3">
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
      </CCollapse>
    </div>
  );
};

export default ParentComponent;
