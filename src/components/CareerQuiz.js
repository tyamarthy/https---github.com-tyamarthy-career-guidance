import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './styles/CareerQuiz.css';

const CareerQuiz = () => {
  const [answers, setAnswers] = useState(new Array(10).fill(0));
  const [showResult, setShowResult] = useState(false);
  const [careerPath, setCareerPath] = useState('');
  const [pastResults, setPastResults] = useState([]);
  const [showPastResults, setShowPastResults] = useState(false);
  const auth = getAuth();

  const questions = [
    {
      question: "Which of these do you enjoy more?",
      options: [
        { text: "I love analyzing data, finding patterns, and solving problems.", points: 5 },
        { text: "I enjoy designing user interfaces and making things visually appealing.", points: 3 }
      ]
    },
    {
      question: "How do you feel about coding?",
      options: [
        { text: "I prefer working with backend systems, databases, and server-side work.", points: 5 },
        { text: "I love designing the frontend and creating user experiences using code.", points: 3 }
      ]
    },
    {
      question: "Which would you rather focus on?",
      options: [
        { text: "Ensuring systems are scalable, automated, and efficient.", points: 5 },
        { text: "Creating new, interactive features for websites and applications.", points: 3 }
      ]
    },
    {
      question: "Would you prefer working on...",
      options: [
        { text: "Security and data protection, finding vulnerabilities, and keeping systems safe.", points: 5 },
        { text: "User-facing experiences, ensuring the designs and features are user-friendly and intuitive.", points: 3 }
      ]
    },
    {
      question: "If you could pick a project, which would you prefer?",
      options: [
        { text: "Developing algorithms, working with large datasets, and building backend solutions.", points: 5 },
        { text: "Designing websites, creating mobile applications, or optimizing user interfaces.", points: 3 }
      ]
    },
    {
      question: "When faced with a problem, how do you prefer to solve it?",
      options: [
        { text: "I prefer tackling complex, technical issues that require deep knowledge of systems and architectures", points: 5 },
        { text: "I prefer addressing user-centric problems, improving usability, and creating intuitive designs.", points: 3 }
      ]
    },
    {
      question: "How do you feel about working with large-scale, complex systems?",
      options: [
        { text: "I thrive when solving problems with large-scale databases, distributed systems, or cloud-based solutions.", points: 5 },
        { text: "I enjoy working on smaller, more focused projects, where I can make the user experience seamless and visually stunning.", points: 3 }
      ]
    },
    {
      question: "Which skill interests you the most?",
      options: [
        { text: "Building scalable infrastructure, automating processes, and managing cloud resources.", points: 5 },
        { text: "Crafting sleek, responsive user interfaces and bringing designs to life with code.", points: 3 }
      ]
    },
    {
      question: "Do you like working with:",
      options: [
        { text: "Data and statistical models to make predictions, uncover trends, or optimize performance.", points: 5 },
        { text: "Designing and building applications that users interact with directly and enjoy using.", points: 3 }
      ]
    },
    {
      question: "How do you feel about collaboration in your role?",
      options: [
        { text: "I enjoy working with technical teams to build complex, back-end systems or machine learning models.", points: 5 },
        { text: "I enjoy collaborating closely with designers, marketing, and other teams to create user-centric products.", points: 3 }
      ]
    }
  ];

  useEffect(() => {
    fetchPastResults();
  }, []);

  const fetchPastResults = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Fetch documents filtered by userId without ordering
        const q = query(
          collection(db, "quizResults"),
          where("userId", "==", user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const results = [];
  
        // Loop through each document in the query snapshot
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            careerPath: data.careerPath,
            timestamp: data.timestamp,  // Firestore Timestamp object
            userId: data.userId,
          });
        });
  
        // Sort results by timestamp in descending order
        results.sort((a, b) => b.timestamp - a.timestamp);  // Sort by timestamp
  
        // Queue the results (i.e., store them or process them as needed)
        console.log("Fetched results:", results);
        setPastResults(results);  // This could be your state or queue to display
  
      } else {
        console.log("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleAnswerChange = (index, points) => {
    const newAnswers = [...answers];
    newAnswers[index] = points;
    setAnswers(newAnswers);
  };

  const calculateCareerPath = (totalScore) => {
    if (totalScore >= 47) return 'Backend Developer';
    if (totalScore >= 43) return 'DevOps Engineer';
    if (totalScore >= 40) return 'AI/ML Engineer';
    if (totalScore >= 37) return 'Cybersecurity Specialist';
    if (totalScore >= 33) return 'Data Scientist';
    if (totalScore >= 29) return 'Frontend Developer';
    return 'Product Manager';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalScore = answers.reduce((acc, points) => acc + points, 0);
    const path = calculateCareerPath(totalScore);
    setCareerPath(path);
    setShowResult(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "quizResults"), {
          userId: user.uid,
          careerPath: path,
          timestamp: new Date(), // This will be stored as a Firestore Timestamp
        });
        await fetchPastResults(); // Refresh past results after submitting
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const resetQuiz = () => {
    setAnswers(new Array(10).fill(0));
    setShowResult(false);
    setCareerPath('');
  };

  return (
    <div className="career-quiz-container">
      <div className="quiz-content">
        <h1 className="quizTitle">Tech Career Path Quiz</h1>
        <p className="quiz-description">
          Discover your ideal career path in technology by answering a few questions about your interests and preferences.
        </p>

        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <div className="questions-container">
              {questions.map((q, index) => (
                <div key={index} className="question-box">
                  <p className="question-text">{q.question}</p>
                  <div className="options-container">
                    {q.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option">
                        <input
                          type="radio"
                          id={`question-${index}-option-${optionIndex}`}
                          name={`question-${index}`}
                          onChange={() => handleAnswerChange(index, option.points)}
                        />
                        <label htmlFor={`question-${index}-option-${optionIndex}`}>
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="submit-button">
              Submit Quiz
            </button>
          </form>
        ) : (
          <div className="result-container">
            <h2 className="yourR">Your Results:</h2>
            <div className="career-result">
              <p className="based">Based on your responses, you might excel as a:</p>
              <h3>{careerPath}</h3>
            </div>
            <button onClick={resetQuiz} className="reset-button">
              Take Quiz Again
            </button>
          </div>
        )}

        <button
          className="view-results-button"
          onClick={() => setShowPastResults(!showPastResults)}
        >
          {showPastResults ? 'Hide Past Results' : 'View Past Results'}
        </button>

        {showPastResults && (
          <div className="past-results-container">
            <h3 className="quizPast">My Past Quiz Results:</h3>
            {pastResults.length > 0 ? (
              pastResults.map((result) => (
                <div key={result.id} className="past-result-item">
                  <p className="career-path">{result.careerPath}</p>
                  <p className="timestamp">
                    {result.timestamp?.toDate
                      ? result.timestamp.toDate().toLocaleDateString() // Convert Firestore Timestamp to Date
                      : new Date(result.timestamp.seconds * 1000).toLocaleDateString()} // Fallback for older data
                  </p>
                </div>
              ))
            ) : (
              <p>No past results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerQuiz;