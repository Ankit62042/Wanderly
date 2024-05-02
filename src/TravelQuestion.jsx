import React, { useState } from 'react';
import './TravelQuestion.css'; // Import CSS file

const TravelQuestionnaire = () => {


    const [submitted, setSubmitted] = useState(false);
    const [travelPlan, setTravelPlan] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const answers = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('/submit-answers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        });
  
        const data = await response.json();
        setTravelPlan(data);
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting answers:', error);
        // Handle errors appropriately (e.g., display error message to user)
      }
    };
  


  const questions = [
    {
      question: "Where are you starting from?",
      inputType: "text" // For input field
    },
    {
      question: "Where would you like to go?",
      inputType: "text"
    },
    {
      question: "How many days?",
      inputType: "number"
    },
    {
      question: "How many people are you traveling with?",
      inputType: "number"
    },
    {
      question: "Enter your Exact Dates or Tentative Dates?",
      inputType: "date" // For date input field
    },
    {
      question: "Mode of Transportation?",
      inputType: "dropdown", // For dropdown options
      options: ["Car", "Train", "Flight", "Bus"]
    },
    {
      question: "What is your budget per person?",
      inputType: "number"
    },
    {
      question: "What kind of activities do you want to do during your travel? Indoor/Outdoor/Mix",
      inputType: "text"
    },
    {
      question: "Do you want to go on Adventure or Relax?",
      inputType: "dropdown",
      options: ["Adventure", "Relax"]
    },
    {
      question: "Are you Night Owl or Early riser?",
      inputType: "dropdown",
      options: ["Night Owl", "Early Riser"]
    },
    {
      question: "How do you like to travel? Luxury travel or economy?",
      inputType: "dropdown",
      options: ["Luxury Travel", "Economy"]
    },
    // Add more questions similarly
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(prevQuestion => prevQuestion - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  return (
    <div className="questionnaire-container">
      <h1>Travel Questionnaire</h1>
      <div className="question-card">
        <h2>{questions[currentQuestion].question}</h2>
        {questions[currentQuestion].inputType === "dropdown" ? (
          <select name={`answer-${currentQuestion}`} onChange={handleDropdownChange}>
            {questions[currentQuestion].options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input 
            type={questions[currentQuestion].inputType}
            name={`answer-${currentQuestion}`}
            onChange={handleInputChange}
            value={answers[`answer-${currentQuestion}`] || ""}
          />
        )}
      </div>
      <div className="navigation-buttons">
        {currentQuestion !== 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {currentQuestion !== questions.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
      <br></br>

      <button type="submit" id='submit' onClick={handleSubmit}>Submit</button>
      {submitted && travelPlan && (
        <div className="travel-plan">
          <h2>Your Personalized Travel Plan</h2>
          {/* Display travel plan details and recommendations from backend */}
          <p>Start Location: {travelPlan.startLocation}</p>
          <p>Destination: {travelPlan.destination}</p>
          {/* ... display other travel plan properties and recommendations */}
          {/* Conditionally display recommendations from Vertex AI and Gemini AI (if available) */}
          {travelPlan.vertexAiRecommendations && (
            <div>
              <h3>Vertex AI Recommendations:</h3>
              <ul>
                <li>Suggested Activities: {travelPlan.vertexAiRecommendations.suggestedActivities.join(', ')}</li>
                <li>Accommodation Options: {travelPlan.vertexAiRecommendations.accommodationOptions.join(', ')}</li>
              </ul>
            </div>
          )}
          {/* ... display recommendations from Gemini AI (if available) */}
        </div>
      )}

    </div>
  );
};

export default TravelQuestionnaire;
