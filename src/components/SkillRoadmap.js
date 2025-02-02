import React, { useState, useEffect } from 'react';
import './styles/skillmap.css';
import Confetti from 'react-confetti';

const SkillRoadmap = () => {
  const [selectedTrack, setSelectedTrack] = useState("");
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const handleTrackChange = (event) => {
    setSelectedTrack(event.target.value);
    setCheckedSteps([]);  // Reset checked steps when track is changed
  };

  const handleStepChange = (stepIndex) => {
    setCheckedSteps(prev => {
      const updatedSteps = [...prev];
      if (updatedSteps.includes(stepIndex)) {
        updatedSteps.splice(updatedSteps.indexOf(stepIndex), 1);
      } else {
        updatedSteps.push(stepIndex);
      }
      return updatedSteps;
    });
  };

  const handleMouseEnter = (step, event) => {
    setHoveredStep(step);
    const tooltipX = event.clientX;
    const tooltipY = event.clientY;
    setTooltipPosition({ top: tooltipY - 50, left: tooltipX + 10 });
  };

  const handleMouseLeave = () => {
    setHoveredStep(null);
  };

  const tracks = [
    "Backend Developer",
    "Frontend Developer",
    "Data Scientist",
    "AI/ML Engineer",
    "Cybersecurity Specialist",
    "DevOps Engineer",
    "Product Manager"
  ];

  const trackDescriptions = {
    "Frontend Developer": [
      "Learn HTML, CSS, JavaScript",
      "Get familiar with version control (Git)",
      "Dive into frontend frameworks (React, Vue, or Angular)",
      "Learn responsive web design and CSS preprocessors",
      "Explore frontend build tools (Webpack, Babel)",
      "Build projects to practice (personal websites, portfolio, etc.)"
    ],
    "Backend Developer": [
      "Learn backend languages (Node.js, Python, Java, etc.)",
      "Study databases (SQL & NoSQL)",
      "Learn about web servers (Apache, Nginx)",
      "Study RESTful API design and best practices",
      "Learn about cloud platforms (AWS, Azure)",
      "Build backend projects (API services, full-stack apps)"
    ],
    "Data Scientist": [
      "Learn programming in Python or R",
      "Study basic statistics and probability",
      "Learn about data wrangling with Pandas and NumPy",
      "Get familiar with SQL and NoSQL databases",
      "Learn data visualization techniques (Matplotlib, Tableau)",
      "Dive into machine learning concepts (Scikit-learn, TensorFlow)"
    ],
    "AI/ML Engineer": [
      "Master Python and its libraries (Pandas, NumPy, Matplotlib)",
      "Study machine learning algorithms and concepts",
      "Learn a framework like TensorFlow or PyTorch",
      "Understand neural networks and deep learning",
      "Work on projects like sentiment analysis, image classification",
      "Practice securing and testing with hands-on projects"
    ],
    "Cybersecurity Specialist": [
      "Learn networking fundamentals (TCP/IP, DNS, HTTP)",
      "Study ethical hacking and penetration testing",
      "Get familiar with security tools (Wireshark, Kali Linux)",
      "Understand cryptography principles",
      "Learn about firewalls, VPNs, and IDS/IPS systems",
      "Study security frameworks (NIST, CIS)"
    ],
    "DevOps Engineer": [
      "Learn about version control (Git)",
      "Get familiar with cloud computing platforms (AWS, Azure)",
      "Learn automation tools (Ansible, Terraform)",
      "Master containerization (Docker, Kubernetes)",
      "Set up continuous integration and deployment (CI/CD)",
      "Study infrastructure monitoring and logging tools"
    ],
    "Product Manager": [
      "Develop foundational knowledge in business and technology",
      "Learn Agile and Scrum methodologies",
      "Master communication skills",
      "Get hands-on experience with product management tools (Jira, Trello)",
      "Learn basic UX/UI design principles",
      "Build a portfolio by managing small projects"
    ]
  };

  const skillImages = [
    "images/circle1.png",
    "images/circle2.png",
    "images/circle3.png",
    "images/circle4.png",
    "images/circle5.png",
    "images/circle6.png"
  ];

  // Calculate progress based on checked steps
  const progress = (checkedSteps.length / (trackDescriptions[selectedTrack]?.length || 1)) * 100;

  useEffect(() => {
    if (progress === 100) {
      setIsConfettiVisible(true);
      setTimeout(() => setIsConfettiVisible(false), 9000); // Hide confetti after 5 seconds
    }
  }, [checkedSteps, progress]);

  return (
    <div className="skill-roadmap-container">
      {isConfettiVisible && <Confetti />}

      <h1>Skill Roadmap & Progress Tracker</h1>

      <div className="content-container">
        {/* Left side with dropdown, progress bar, and checklist */}
        <div className="left-panel">
          <div className="dropdown-container">
            <label htmlFor="track-select" className="dropdown-label">Choose your track:</label>
            <select
              id="track-select"
              value={selectedTrack}
              onChange={handleTrackChange}
              className="track-dropdown"
            >
              <option value="" disabled>Select a track</option>
              {tracks.map((track, index) => (
                <option key={index} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>

          {/* Progress bar and checklist moved here */}
          {selectedTrack && (
            <div className="tracker-container">
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              {/* Add text showing progress */}
              <div className="progress-percentage">{`${Math.round(progress)}% Completed`}</div>

              <ul className="checklist">
                {trackDescriptions[selectedTrack].map((step, index) => (
                  <li key={index} className="checklist-item">
                    <input
                      type="checkbox"
                      checked={checkedSteps.includes(index)}
                      onChange={() => handleStepChange(index)}
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right side with image */}
        <div className="right-panel">
          <img src="images/roadmap.png" alt="Skill Roadmap" className="roadmap-image" />
        </div>
      </div>

      {/* Tooltip Pop-Up */}
      {hoveredStep && selectedTrack && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.top + 'px',
            left: tooltipPosition.left + 'px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            maxWidth: '200px',
            zIndex: 10
          }}
        >
          <p>{hoveredStep}</p>
        </div>
      )}

      {/* Manually placed images with hover event */}
      <img 
        src={skillImages[0]} 
        alt="Step 1" 
        className="random-skill-image" 
        style={{ top: "75%", left: "34%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[0], e)}
        onMouseLeave={handleMouseLeave}
      />
      
      <img 
        src={skillImages[1]} 
        alt="Step 2" 
        className="random-skill-image" 
        style={{ top: "50%", left: "31%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[1], e)}
        onMouseLeave={handleMouseLeave}
      />

      <img 
        src={skillImages[2]} 
        alt="Step 3" 
        className="random-skill-image" 
        style={{ top: "45%", left: "50%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[2], e)}
        onMouseLeave={handleMouseLeave}
      />

      <img 
        src={skillImages[3]} 
        alt="Step 4" 
        className="random-skill-image" 
        style={{ top: "71%", left: "65%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[3], e)}
        onMouseLeave={handleMouseLeave}
      />

      <img 
        src={skillImages[4]} 
        alt="Step 5" 
        className="random-skill-image" 
        style={{ top: "45%", left: "70%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[4], e)}
        onMouseLeave={handleMouseLeave}
      />

      <img 
        src={skillImages[5]} 
        alt="Step 6" 
        className="random-skill-image" 
        style={{ top: "27%", left: "78%" }} 
        onMouseEnter={(e) => handleMouseEnter(trackDescriptions[selectedTrack]?.[5], e)}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default SkillRoadmap;
