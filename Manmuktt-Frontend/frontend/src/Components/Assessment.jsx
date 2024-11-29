import React, { useState } from 'react';
import './Assessment.css'; // Adjust the path as necessary


// Define the questions data
const assessmentData = [
    {
      section: "Emotional and Mood Assessment",
      questions: [
        {
          text: "Over the past two weeks, how often have you felt sad, down, or hopeless?",
          options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
          type: "multiple-choice",
        },
        {
          text: "How often have you felt nervous, anxious, or on edge in the past two weeks?",
          options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
          type: "multiple-choice",
        },
        {
          text: "How often have you been bothered by a lack of interest or pleasure in doing things?",
          options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
          type: "multiple-choice",
        },
        {
          text: "On a scale of 1 to 1, how would you rate your overall mood in the past week?",
          options: ["Very low", "Very high"],
          type: "multiple-choice",
        },
      ],
    },
    {
      section: "Thought Patterns and Cognitive Distortions",
      questions: [
        {
          text: "Do you often feel like you are a failure or inadequate?",
          options: ["Yes", "No"],
          type: "yes-no",
        },
        {
          text: "Do you frequently expect the worst to happen in challenging situations?",
          options: ["Yes", "No"],
          type: "yes-no",
        },
        {
          text: "How often do you think in extremes, such as 'If I fail at this, I’m a total failure'?",
          options: ["Never", "Sometimes", "Often", "Always"],
          type: "multiple-choice",
        },
        {
          text: "When faced with a problem, do you feel overwhelmed and helpless?",
          options: ["Yes", "No"],
          type: "yes-no",
        },
      ],
    },
    {
      section: "Behavioral Patterns",
      questions: [
        {
          text: "When you’re feeling stressed, how often do you avoid social situations?",
          options: ["Never", "Rarely", "Sometimes", "Often"],
          type: "multiple-choice",
        },
        {
          text: "Do you engage in any of the following behaviors when you’re feeling down? (Check all that apply)",
          options: [
            "Overeating",
            "Skipping meals",
            "Sleeping more",
            "Avoiding social interactions",
            "Other: _______",
          ],
          type: "checkbox",
        },
        {
          text: "How often do you engage in unhealthy behaviors (e.g., substance use, binge eating) to cope with stress?",
          options: ["Never", "Rarely", "Sometimes", "Often"],
          type: "multiple-choice",
        },
      ],
    },
    {
      section: "Coping Skills and Strategies",
      questions: [
        {
          text: "On a scale of 1 to 1, how effective do you feel your coping skills are for managing stress or anxiety?",
          options: ["Not effective", "Very effective"],
          type: "multiple-choice",
        },
        {
          text: "Which of the following strategies do you use to cope with stress or difficult emotions? (Check all that apply)",
          options: [
            "Talking to friends or family",
            "Physical exercise",
            "Writing or journaling",
            "Meditating or practicing mindfulness",
            "Avoiding the situation",
            "Other: _______",
          ],
          type: "checkbox",
        },
        {
          text: "Do you feel that your coping strategies help in reducing your stress levels?",
          options: ["Yes", "No"],
          type: "yes-no",
        },
      ],
    },
    {
      section: "Physical Symptoms Related to Stress",
      questions: [
        {
          text: "Have you experienced any of the following symptoms frequently over the past month? (Check all that apply)",
          options: [
            "Trouble sleeping",
            "Fatigue or low energy",
            "Changes in appetite (eating more or less)",
            "Headaches or muscle tension",
            "Digestive issues (stomach aches, nausea)",
            "None of the above",
          ],
          type: "checkbox",
        },
        {
          text: "How often do you experience physical symptoms (e.g., headaches, fatigue) during times of stress?",
          options: ["Never", "Rarely", "Sometimes", "Often"],
          type: "multiple-choice",
        },
      ],
    },
    {
      section: "Life Satisfaction and Personal Goals",
      questions: [
        {
          text: "How satisfied are you with the following areas of your life? (Rate on a scale of 1 to 1)",
          options: [
            "Work or career: _______",
            "Relationships : _______",
            "Social life: _______",
            "Physical health: _______",
            "Mental health: _______",
          ],
          type: "open-ended",
        },
        {
          text: "What is one area of your life that you would like to improve through therapy?",
          options: ["_______"],
          type: "open-ended",
        },
        {
          text: "What are your main goals for therapy?",
          options: ["_______"],
          type: "open-ended",
        },
      ],
    },
    {
      section: "Additional Notes (Optional)",
      questions: [
        {
          text: "Is there anything else you would like to share that might help the therapist understand your situation better?",
          options: ["_______"],
          type: "open-ended",
        },
      ],
    },
];
  
  // Question component
// Question component
const Question = ({ question, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState(""); // For single value input
  const [checkboxAnswers, setCheckboxAnswers] = useState([]); // For checkboxes
  const [otherInput, setOtherInput] = useState(""); // For "Other" input in checkbox

  const handleAnswerChange = (value) => {
      setAnswer(value);
  };

  const handleCheckboxChange = (option, checked) => {
      let updatedAnswers = checked
          ? [...checkboxAnswers, option]
          : checkboxAnswers.filter(item => item !== option);
      setCheckboxAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
      if (question.type === "checkbox") {
          const finalAnswers = otherInput ? [...checkboxAnswers, otherInput] : checkboxAnswers;
          onAnswerSubmit(finalAnswers);
      } else {
          onAnswerSubmit(answer);
      }
      setAnswer("");
      setCheckboxAnswers([]);
      setOtherInput("");
  };

  return (
      <div className="question-container">
          <h3>{question.text}</h3>
          {/* Render based on question type */}
          {question.type === "multiple-choice" && (
              <div className="choices">
                  {question.options.map((option, index) => (
                      <label key={index} className={`radio-option-${index + 1}`}>
                          <input
                              type="radio"
                              name="answer"
                              value={option}
                              onChange={() => handleAnswerChange(option)}
                              checked={answer === option}
                          />
                          {option}
                      </label>
                  ))}
              </div>
          )}
          {question.type === "yes-no" && (
              <div className="choices">
                  {question.options.map((option, index) => (
                      <label key={index}>
                          <input
                              type="radio"
                              name="answer"
                              value={option}
                              onChange={() => handleAnswerChange(option)}
                              checked={answer === option}
                          />
                          {option}
                      </label>
                  ))}
              </div>
          )}
          {question.type === "checkbox" && (
              <div className="choices">
                  {question.options.map((option, index) => (
                      <div key={index} className="checkbox-option">
                          <label>
                              <input
                                  type="checkbox"
                                  value={option}
                                  onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                                  checked={checkboxAnswers.includes(option)}
                              />
                              {option.replace(" _______", "")} {/* Removing placeholder text for display */}
                          </label>
                          {/* Check if the option is "Other" or contains "Other" */}
                          {option.includes("Other") && checkboxAnswers.includes(option) && (
                              <input
                                  type="text"
                                  value={otherInput}
                                  onChange={(e) => setOtherInput(e.target.value)}
                                  placeholder="Please specify"
                                  className="ml-2"
                              />
                          )}
                      </div>
                  ))}
              </div>
          )}
          {question.type === "open-ended" && (
              <div>
                  <textarea
                      value={answer}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Please provide your response"
                  />
              </div>
          )}
          <button onClick={handleSubmit} className="mt-4">
              Submit
          </button>
      </div>
  );
};

  
  // Main Assessment Component
  const Assessment = () => {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false); // Track completion status
  
    const handleAnswerSubmit = (answer) => {
      setAnswers([...answers, { question: assessmentData[currentSectionIndex].questions[currentQuestionIndex].text, answer }]);
      
      if (currentQuestionIndex < assessmentData[currentSectionIndex].questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSectionIndex < assessmentData.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        // All sections completed
        setIsCompleted(true); // Set completion status
        alert('Assessment Complete!'); // Show alert before displaying summary
      }
    };
  
    return (
      <div className="assessment-container">
        {isCompleted ? ( // Check if assessment is completed
          <div className="summary">
            <h3>Thank you for completing the assessment!</h3>
            <ul>
              {answers.map((answerObj, index) => (
                <li key={index}>
                  <strong>Question:</strong> {answerObj.question} <br />
                  <strong>Answer:</strong> {Array.isArray(answerObj.answer) ? answerObj.answer.join(', ') : answerObj.answer}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <h2>{assessmentData[currentSectionIndex].section}</h2>
            <Question
              question={assessmentData[currentSectionIndex].questions[currentQuestionIndex]}
              onAnswerSubmit={handleAnswerSubmit}
            />
          </>
        )}
      </div>
    );
  };
  
  export default Assessment;
  