import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import FileInput from '../components/FileInput.js';
import { CFormInput, CFormSelect, CInputGroup, CInputGroupText, CFormSwitch, CButton, CContainer, CNav,CNavItem,CTabPane,CTabContent,CNavLink, CFormCheck, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CForm,  } from '@coreui/react';
import TextBox from '../components/TextBox.js';

import '../styles/formDesign.css'
import Sidebar from '../components/Sidebar.js';

const Assesment = () => {
  const [validated, setValidated] = useState(false);
  const [activeKey, setActiveKey] = useState(1)
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    assessmentId: '',
    assessmentCode: '',
    category: '',
    trainingContent: '',
    certificate: '',
    credits: '',
    score: '',
    hours: '',
    minutes: '',
    creditVisibility: false,
    scoreVisibility: false
  });

  const [secureUrl, setSecureUrl] = useState('');
  const handleImageUrlUpdate = (url) => {
    setSecureUrl(url); // Update secureUrl state
    setFormData({ ...formData, imgLink: url }); // Update imgLink state in the formData
  };
  
//activity radiobox

  
  const handleCreditVisibilityChange = (e) => {
    setFormData({ ...formData, creditVisibility: e.target.checked });
    
  };
  const handlescoreVisibilityChange = (e) => {
    
    setFormData({ ...formData, scoreVisibility: e.target.checked });
  };
  //Questions tab

  const [formQuestions, setFormQuestions] = useState({
    question : '',
    questionType: '',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
      score: '',
      answer: ''
  })
  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      questionType: '',
     
      score: '',
      answer: ''
    };
    setQuestions([...questions, newQuestion]);
  };
  const handleQuestionChange = (id, field, value) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return { ...question, [field]: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleOptionChange = (questionId, selectedOption) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return { ...question, selectedOption };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  
  const handleNewQuestion = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // If the answer is not valid, show an alert and return without adding the question


      axios.post('http://localhost:3031/questions', formQuestions)
        .then((response) => {
          alert('Data stored successfully');
          console.log('Response:', response.data);
          // Optionally, you can handle any other logic such as resetting form fields
          setValidated(false);
        })
        .catch((error) => {
          console.error('Error storing data:', error);
          alert('An error occurred while storing data. Please try again.');
        });
  }

  const handleRemoveQuestion = (questionIdToRemove) => {
    // Filter out the question with the provided ID
    const updatedQuestions = questions.filter(question => question.id !== questionIdToRemove);
    // Update the state with the filtered questions
    setQuestions(updatedQuestions);
  };
  
  const generateAccordionItems = () => {
    return questions.map(question => (
      <CAccordionItem key={question.id}>
        <CAccordionHeader>{`Question: ${question.id}`}</CAccordionHeader>
        <CAccordionBody>
          <CContainer>
            <span>Question : </span>
            <CFormInput
  type="text"
  value={question.question}
  onChange={e => {
    handleQuestionChange(question.id, 'question', e.target.value);
    setFormQuestions({...formQuestions, question: e.target.value}); // Update formData to formsQuestion and assessmentId to question
  }}
  floatingClassName="mb-3"
  floatingLabel="Question"
  placeholder="Question"
/>
            <span>Question type : </span>
            <CFormSelect
              value={question.questionType}
              onChange={e => {
                handleQuestionChange(question.id, 'questionType', e.target.value);
                setFormQuestions(prevState => ({
                  ...prevState,
                  questionType: e.target.value,
                  // Reset options to empty strings if questionType is "Fill in the blanks"
                  option1: e.target.value === 'Fill in the blanks' ? '' : prevState.option1,
                  option2: e.target.value === 'Fill in the blanks' ? '' : prevState.option2,
                  option3: e.target.value === 'Fill in the blanks' ? '' : prevState.option3,
                  option4: e.target.value === 'Fill in the blanks' ? '' : prevState.option4
                }));
              }}
            >
              <option>Select categories</option>
              <option>MCQ</option>
              <option>Fill in the blanks</option>
            </CFormSelect>

            {question.questionType === 'MCQ' && (
              <div>
                <span>Options:</span>
                <CFormInput
                  type="text"
                  value={question.option1}
                  onChange={e => {handleOptionChange(question.id, 'option1', e.target.value);setFormQuestions({...formQuestions, option1 : e.target.value})}}
                  placeholder="Option 1"
                />
                <CFormInput
                  type="text"
                  value={question.option2}
                  onChange={e => {handleOptionChange(question.id, 'option2', e.target.value);setFormQuestions({...formQuestions, option2 : e.target.value})}}
                  placeholder="Option 2"
                />
                <CFormInput
                  type="text"
                  value={question.option3}
                  onChange={e => {handleOptionChange(question.id, 'option3', e.target.value);setFormQuestions({...formQuestions, option3 : e.target.value})}}
                  placeholder="Option 3"
                />
                <CFormInput
                  type="text"
                  value={question.option4}
                  onChange={e => {handleOptionChange(question.id, 'option4', e.target.value);setFormQuestions({...formQuestions, option4 : e.target.value})}}
                  placeholder="Option 4"
                />
              </div>
            )}


            <span>Score per question : </span>
            <CFormInput
              type="text"
              value={question.score}
              onChange={e => {handleQuestionChange(question.id, 'score', e.target.value);
              setFormQuestions({...formQuestions, score: e.target.value})}}
              floatingClassName="mb-3"
              floatingLabel="Score"
              placeholder="Enter Score per question"
            />
            <span>Answer :  </span>
            <CFormInput
              type="text"
              value={question.answer}
              onChange={e =>{ handleQuestionChange(question.id, 'answer', e.target.value);
              setFormQuestions({...formQuestions, answer: e.target.value})}}
              floatingClassName="mb-3"
              floatingLabel="Answer"
              placeholder="Enter answer"
            />
            <CContainer>
            <CButton color='primary' onClick={handleNewQuestion}>Add</CButton>
            <CButton style={{marginLeft:10}} color='danger' onClick={() => handleRemoveQuestion(question.id)}>Remove</CButton> 
            </CContainer>
          </CContainer>
        </CAccordionBody>
      </CAccordionItem>
    ));
  };

  //For activities posting
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    


    // Post data using axios
    axios.post('http://localhost:3031/activities', formData)
      .then((response) => {
        alert('Data stored successfully');
        console.log('Response:', response.data);
        // Optionally, you can handle any other logic such as resetting form fields
        setFormData({
          assessmentId: '',
          assessmentCode: '',
          category: '',
          trainingContent: '',
          certificate: '',
          credits: '',
          score: '',
          hours: '',
          minutes: '',
          creditVisibility: false,
          scoreVisibility: false
        })
        setActiveKey(2)
        setValidated(false);
      })
      .catch((error) => {
        console.error('Error storing data:', error);
        alert('An error occurred while storing data. Please try again.');
      });
  };
  // for settings
  const [settingsData, setSettingsData] = useState({
    passingToggle : false,
    passingMarks :'',
    randomizeQuestions: false,
    displayQuestions: 'listView',
    enableOptionByToggling1: false,
    attempts: '',
    enableOptionByToggling2: false,
    quizLengthHours: '',
    quizLengthMinutes: '',
    postQuiz:''
  })
  const [isPassingMarksEnabled, setIsPassingMarksEnabled] = useState(false);
  const handlePassingMarksToggle = (e) => {
    setIsPassingMarksEnabled(!isPassingMarksEnabled);
    setSettingsData({ ...settingsData, passingToggle: e.target.checked });
  };
  const [isRandomizeQuestionsEnabled, setIsRandomizeQuestionsEnabled] = useState(false);
const handleRandomizeQuestionsToggle = (e) => {
   setIsRandomizeQuestionsEnabled(!isRandomizeQuestionsEnabled);
  setSettingsData({ ...settingsData, randomizeQuestions: e.target.checked });
};

const [isOption1Enabled, setIsOption1Enabled] = useState(false);

const handleOption1Toggle = (e) => {
  
  setIsOption1Enabled(!isOption1Enabled);
  setSettingsData({ ...settingsData, enableOptionByToggling1: e.target.checked });
};

const [isOption2Enabled, setIsOption2Enabled] = useState(false);

const handleOption2Toggle = (e) => {
 
  setIsOption2Enabled(!isOption2Enabled);
  setSettingsData({ ...settingsData, enableOptionByToggling2: e.target.checked });
};

const handleSettingsSubmit = (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  if (form.checkValidity() === false) {
    event.stopPropagation();
    setValidated(true);
    return;
  }

  // Post data using axios
  axios.post('http://localhost:3031/settings', settingsData)
    .then((response) => {
      alert('Settings updated successfully');
      console.log('Response:', response.data);
      // Optionally, you can handle any other logic such as resetting form fields
      setSettingsData({
        passingToggle : false,
        passingMarks :'',
        randomizeQuestions: false,
        displayQuestions: 'listView',
        enableOptionByToggling1: false,
        attempts: '',
        enableOptionByToggling2: false,
        quizLengthHours: '',
        quizLengthMinutes: '',
        postQuiz:''
      })
      setActiveKey(3)
      setValidated(false);
    })
    .catch((error) => {
      console.error('Error storing data:', error);
      alert('An error occurred while storing data. Please try again.');
    });
};


  
  return (
    <div style={{margin:0, padding:0,display:'flex'}}>
      <CContainer style={{padding:0,width:'fit-content'}}>
        <Sidebar />
      </CContainer>
      <CContainer >
      <h1>Assesment</h1>
      <CNav variant="tabs" style={{margin:0, padding:0}}>
            <CNavItem>
              <CNavLink
                href="#"
                style={{color:'black'}}
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Activities
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                style={{color:'black'}}
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Settings
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#"
                style={{color:'black'}}
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Questions
              </CNavLink>
            </CNavItem>

          </CNav>
          <CTabContent style={{backgroundColor:'white'}}>
            <CTabPane visible={activeKey === 1}>
            <CContainer>
            <CForm onSubmit={handleSubmit}>
  <CContainer className='container'>
    <CContainer className='tab-content-container'>
      <CContainer className='section'>
        <label htmlFor="AssessmentId">Assessment Id : </label>
        <CFormInput
          type="text"
          id="AssessmentId"
          floatingClassName="mb-3"
          floatingLabel=""
          placeholder=""
          required
          onChange={e => setFormData({...formData, assessmentId: e.target.value})}
        />
      </CContainer>
      <CContainer className='section'>
        <label htmlFor="Assessment_code">Assessment code : </label>
        <CFormInput
          type="text"
          id="Assessment_code"
          floatingClassName="mb-3"
          floatingLabel=""
          placeholder=""
          required
          onChange={e => setFormData({...formData, assessmentCode: e.target.value})}
        />
      </CContainer>
    </CContainer>
    
    <TextBox />
    <CContainer className='tab-content-container'>
      <CContainer className='section'>
        <label htmlFor="Categories">Categories :</label>
        <CFormSelect
          required
          onChange={e => setFormData({...formData, category: e.target.value})}
        >
          <option>Select categories</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </CFormSelect>
      </CContainer>
      <CContainer className="section">
        <label htmlFor="Training_content">Training content :</label>
        <CFormSelect
          required
          onChange={e => setFormData({...formData, trainingContent: e.target.value})}
        >
          <option>Select categories</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </CFormSelect>
      </CContainer>
      <CContainer className="section">
        <label htmlFor="Certificate">Certificate :</label>
        <CFormSelect
          required
          onChange={e => setFormData({...formData, certificate: e.target.value})}
        >
          <option>Select categories</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </CFormSelect>
      </CContainer>
      <CContainer className="section">
        <label htmlFor="Total_time">Total time :</label>
        <CInputGroup>
          <CInputGroupText>Hours and minutes</CInputGroupText>
          <CFormInput type="number" aria-label="Hours" required />
          <CFormInput type="number" aria-label="Minutes" required />
        </CInputGroup>
      </CContainer>
      <CContainer className="section">
        <label htmlFor="Credits">Credits :</label>
        <CFormInput
          type="text"
          id="Credits"
          floatingClassName="mb-3"
          floatingLabel=""
          placeholder=""
          required
          onChange={e => setFormData({...formData, credits: e.target.value})}
        />
      </CContainer>
      <CContainer className="section" style={{display:'flex', justifyContent:'center'}}>
        <CFormSwitch
          label="creditVisibility"
          id="creditVisibilitySwitch"
          onChange={handleCreditVisibilityChange}
          checked={formData.creditVisibility}
        />
      </CContainer>
      <CContainer className="section">
        <label htmlFor="Score">Score :</label>
        <CFormInput
          type="text"
          id="Score"
          floatingClassName="mb-3"
          floatingLabel=""
          placeholder=""
          required
          onChange={e => setFormData({...formData, score: e.target.value})}
        />
      </CContainer>
      <CContainer className="section" style={{display:'flex', justifyContent:'center'}}>
        <CFormSwitch
          label="scoreVisibility"
          id="scoreVisibilitySwitch"
          onChange={handlescoreVisibilityChange}
                          checked={formData.scoreVisibility}
        />
      </CContainer>
      <FileInput onImageUrlUpdate={handleImageUrlUpdate} />
    </CContainer>
    <div className="btn-space" style={{textAlign:'right'}}>
      <CButton type="submit" color="primary">Next</CButton>
    </div>
  </CContainer>
</CForm>

</CContainer>

            </CTabPane>
            <CTabPane visible={activeKey === 2 }>
        
            <CForm onSubmit={handleSettingsSubmit}>
  <CContainer>
    <CContainer className="assesment-section">
      <span>Enter passing marks : </span>
      <CFormSwitch
        label="Toggle"
        id="formSwitchCheckDefault1"
        onChange={handlePassingMarksToggle}
        checked={isPassingMarksEnabled}
      />
      {isPassingMarksEnabled && (
        <CFormInput
          type="text"
          id="passingMarks"
          floatingClassName="mb-3"
          floatingLabel=""
          placeholder="Enter marks"
          disabled={!isPassingMarksEnabled}
          required={isPassingMarksEnabled}
          onChange={(e) => setSettingsData({ ...settingsData, passingMarks: e.target.value })}
        />
      )}
    </CContainer>

    <CContainer className="assesment-section">
      <span>Randomize questions : </span>
      <CFormSwitch
        label="Toggle"
        id="formSwitchCheckDefault2"
        onChange={handleRandomizeQuestionsToggle}
        checked={isRandomizeQuestionsEnabled}
      />
    </CContainer>

    <CContainer className="assesment-section">
      <span>Display questions : </span>
      <CFormCheck
        type="radio"
        name="displayQuestions"
        id="slideView"
        label="Slide view"
        onChange={(e) => setSettingsData({ ...settingsData, displayQuestions: 'slideView' })}
        required
      />
      <CFormCheck
        type="radio"
        name="displayQuestions"
        id="listView"
        label="List view"
        defaultChecked
        onChange={(e) => setSettingsData({ ...settingsData, displayQuestions: 'listView' })}
      />
    </CContainer>

    <CContainer className="assesment-section">
      <span>Enable option by toggling : </span>
      <CFormSwitch
        label="Toggle"
        id="formSwitchCheckDefault3"
        onChange={handleOption1Toggle}
        checked={isOption1Enabled}
      />
    </CContainer>

    <CContainer className="attempts-sec">
      <span>No of attempts : </span>
      <CFormInput
        type="text"
        id="attempts"
        floatingClassName="mb-3"
        floatingLabel=""
        placeholder="Enter here"
        onChange={(e) => setSettingsData({ ...settingsData, attempts: e.target.value })}
        required
      />
    </CContainer>

    {/* Add other sections similarly */}

    <CContainer className="assesment-section">
      <span>Quiz length : </span>
      <CInputGroup>
        <CInputGroupText>Hours and minutes</CInputGroupText>
        <CFormInput
          type="number"
          aria-label="Hours"
          onChange={(e) => setSettingsData({ ...settingsData, quizLengthHours: e.target.value })}
          required
        />
        <CFormInput
          type="number"
          aria-label="Minutes"
          onChange={(e) => setSettingsData({ ...settingsData, quizLengthMinutes: e.target.value })}
        />
      </CInputGroup>
    </CContainer>
      <CContainer style={{textAlign:'right'}}>

    <CButton type="submit" color="primary">
      Next
    </CButton>
      </CContainer>
  </CContainer>
</CForm>

    

            </CTabPane>
            <CTabPane visible={activeKey === 3}>
              <CContainer style={{marginTop:15, }}>

            <CAccordion>
        {generateAccordionItems()}
      </CAccordion>
              </CContainer>
      <CContainer style={{textAlign:'center',padding:'1rem'}}>

      <CButton color="primary" onClick={handleAddQuestion}>Add Question</CButton>
      </CContainer>
            </CTabPane>
          </CTabContent>
      </CContainer>
    </div>
  )
}

export default Assesment
