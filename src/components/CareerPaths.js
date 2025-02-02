import React, { useState } from "react";
import './styles/CareerPaths.css';

const careerPaths = {
  "Frontend Developer": {
    jobDescription:
      "A frontend developer is responsible for building the user interface (UI) of a website or web application. They ensure that the design and functionality are seamless and user-friendly.",
    skills: [
      "HTML, CSS, JavaScript",
      "Responsive Design (Bootstrap, Flexbox, Grid)",
      "Version Control (Git/GitHub)",
      "Frontend Frameworks (React, Angular, Vue.js)",
      "Web performance optimization",
      "Basic UX/UI principles",
    ],
    salary: "$70,000 - $120,000 per year (US)",
    tools: ["React", "Angular", "Vue.js", "Sass", "LESS", "Webpack", "Babel", "Figma", "Sketch", "Git", "GitHub"],
    responsibilities: [
      "Building and maintaining websites and web applications",
      "Optimizing web pages for performance and speed",
      "Integrating with backend APIs and services",
      "Collaborating with UI/UX designers to implement designs",
      "Ensuring cross-browser compatibility",
    ],
    videoUrl: "https://www.youtube.com/embed/f0kMQF0kqzk?si=yv7RCbOf8QAUpgzZ",
    videoTitle: "Day in the Life of a Front End SWE",
  },
  "Backend Developer": {
    jobDescription:
      "A backend developer works on the server side of a web application. They create and manage the server, database, and application logic that powers the frontend of the application.",
    skills: [
      "Proficiency in server-side languages (Node.js, Python, Java, Ruby, PHP)",
      "Database management (SQL, NoSQL like MongoDB)",
      "APIs and web services (REST, GraphQL)",
      "Server management (Linux, cloud services)",
      "Authentication and security (OAuth, JWT)",
      "Knowledge of frameworks (Django, Express, Spring)",
    ],
    salary: "$80,000 - $130,000 per year (US)",
    tools: [
      "Node.js",
      "Django",
      "Spring",
      "Flask",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Redis",
      "RabbitMQ",
    ],
    responsibilities: [
      "Building and managing backend services",
      "Designing database schemas and queries",
      "Writing APIs to integrate with frontend applications",
      "Ensuring server scalability and uptime",
      "Managing authentication and authorization",
      "Working with cloud infrastructure",
    ],
    videoUrl: "https://www.youtube.com/embed/aRPOYPJPCho?si=mlCMeYzc_xV5svT",
    videoTitle: "Day in the Life of a Back End SWE",
  },
  "DevOps Engineer": {
    jobDescription:
      "A DevOps engineer bridges the gap between software development and IT operations. They automate and streamline the deployment process, ensure system reliability, and monitor performance.",
    skills: [
      "Knowledge of CI/CD pipelines (Jenkins, GitLab CI)",
      "Infrastructure as Code (Terraform, Ansible)",
      "Containerization (Docker, Kubernetes)",
      "Cloud platforms (AWS, Azure, GCP)",
      "Scripting (Bash, Python)",
      "Monitoring tools (Prometheus, Grafana)",
    ],
    salary: "$90,000 - $150,000 per year (US)",
    tools: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CircleCI",
      "GitLab CI",
      "Terraform",
      "Ansible",
      "Chef",
      "AWS",
      "Google Cloud",
      "Azure",
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Nagios",
      "Datadog",
    ],
    responsibilities: [
      "Automating software deployment processes",
      "Managing server infrastructure",
      "Ensuring scalability and performance of applications",
      "Monitoring and logging system performance",
      "Managing cloud resources",
      "Managing system and application upgrades",
    ],
    videoUrl: "https://www.youtube.com/embed/TFH3THol7-c?si=sxJcAaG_A9XIIiHQ",
    videoTitle: "Day in the Life of a DevOps Engineer",
  },
  "Data Scientist": {
    jobDescription:
      "A data scientist analyzes and interprets complex data to help companies make informed business decisions. They use statistical methods, machine learning, and data mining techniques to extract meaningful insights.",
    skills: [
      "Proficiency in programming (Python, R)",
      "Statistical analysis and data modeling",
      "Data visualization (Matplotlib, Tableau, PowerBI)",
      "Machine learning (Scikit-learn, TensorFlow, PyTorch)",
      "SQL and database management",
      "Big Data technologies (Hadoop, Spark)",
    ],
    salary: "$95,000 - $160,000 per year (US)",
    tools: [
      "Python",
      "R",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Jupyter Notebooks",
      "Matplotlib",
      "Seaborn",
      "SQL",
      "MongoDB",
      "Hadoop",
      "Spark",
      "TensorFlow",
      "PyTorch",
    ],
    responsibilities: [
      "Analyzing large datasets to identify trends and patterns",
      "Building predictive models using machine learning",
      "Visualizing data and presenting findings to stakeholders",
      "Cleaning and preparing data for analysis",
      "Developing algorithms to automate decision-making",
      "Working with big data platforms",
    ],
    videoUrl: "https://www.youtube.com/embed/xC-c7E5PK0Y?si=--B8ddYcdFvsvUwD",
    videoTitle: "Day in the Life of a Back End SWE",
  },
  "Cybersecurity Specialist": {
    jobDescription:
      "A cybersecurity specialist ensures the protection of an organization's networks, data, and systems from cyberattacks. They identify vulnerabilities and implement strategies to secure the infrastructure.",
    skills: [
      "Network security (Firewalls, VPNs, IDS/IPS)",
      "Cryptography (SSL/TLS, encryption algorithms)",
      "Penetration testing and vulnerability assessment",
      "Security protocols and risk management",
      "Knowledge of malware and attack vectors",
      "Security frameworks (NIST, ISO 27001)",
    ],
    salary: "$80,000 - $140,000 per year (US)",
    tools: [
      "Wireshark",
      "Metasploit",
      "Burp Suite",
      "Kali Linux",
      "Nmap",
      "Firewalls",
      "VPNs",
      "IDS/IPS",
      "Splunk",
      "ELK Stack",
      "OpenSSL",
      "GPG",
    ],
    responsibilities: [
      "Performing security audits and risk assessments",
      "Implementing and managing firewalls, encryption, and security protocols",
      "Responding to and investigating security breaches",
      "Conducting penetration testing to identify vulnerabilities",
      "Educating the team on best security practices",
      "Ensuring compliance with data protection regulations",
    ],
    videoUrl: "https://www.youtube.com/embed/yki0EnRox6s?si=P_XgKvilijDRvWat",
    videoTitle: "Day in the Life of a Back End SWE",
  },
  "AI/ML Engineer": {
    jobDescription:
      "AI/ML engineers develop machine learning models and artificial intelligence systems. They design algorithms that allow machines to 'learn' from data and make decisions.",
    skills: [
      "Strong programming skills (Python, Java, C++)",
      "Machine learning frameworks (TensorFlow, PyTorch, Scikit-learn)",
      "Mathematical foundations (linear algebra, calculus, statistics)",
      "Data preprocessing and cleaning",
      "Neural networks, deep learning",
      "Natural language processing (NLP)",
    ],
    salary: "$100,000 - $160,000 per year (US)",
    tools: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "OpenCV",
      "Scikit-learn",
      "XGBoost",
      "SpaCy",
      "NLTK",
      "Pandas",
      "NumPy",
      "Jupyter Notebooks",
    ],
    responsibilities: [
      "Building predictive models using machine learning algorithms",
      "Training deep learning models (e.g., neural networks, CNNs)",
      "Implementing NLP models for text analysis",
      "Optimizing algorithms for efficiency",
      "Collaborating with data scientists for model validation",
      "Deploying models to production",
    ],
    videoUrl: " https://www.youtube.com/embed/4kXecGkdw4E?si=C2oqIZBw6SNYcasr",
    videoTitle: "Day in the Life of a Back End SWE",
  },
  "Product Manager": {
    jobDescription:
      "A Product Manager is responsible for the development and lifecycle of a product. They act as the bridge between the technical and business teams, ensuring that products are built in line with customer needs and company objectives.",
    skills: [
      "Strong communication and interpersonal skills",
      "Analytical thinking and problem-solving",
      "Market research and competitive analysis",
      "Product lifecycle management",
      "Agile/Scrum methodologies",
      "Data-driven decision-making",
      "UX/UI design principles",
      "Basic technical knowledge",
    ],
    salary: "$95,000 - $150,000 per year (US)",
    tools: [
      "Jira",
      "Asana",
      "Trello",
      "Monday.com",
      "Figma",
      "Sketch",
      "InVision",
      "Google Analytics",
      "Mixpanel",
      "Optimizely",
      "SurveyMonkey",
      "Typeform",
      "ProductPlan",
      "Aha!",
      "Salesforce",
      "HubSpot",
    ],
    responsibilities: [
      "Defining and communicating the product vision and strategy",
      "Writing detailed product requirements and user stories",
      "Collaborating with engineering teams to ensure product features are built on time",
      "Conducting user research and gathering customer feedback",
      "Creating and managing product roadmaps and release plans",
      "Performing market and competitive analysis",
      "Prioritizing features based on business value",
      "Tracking key performance indicators (KPIs)",
    ],
    videoUrl: " https://www.youtube.com/embed/Dnh0jP-GA0o?si=7YfTuJQxINVEWmc3",
    videoTitle: "Day in the Life of a Back End SWE",
  },
};

const VideoEmbed = ({ url, title }) => {
  return (
    <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-gray-800">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const CareerPaths = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Career Paths in CS</h1>

      <select
        className="w-full p-3 mb-6 text-black rounded-lg"
        onChange={(e) => setSelectedCareer(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select a career path...
        </option>
        {Object.keys(careerPaths).map((path) => (
          <option key={path} value={path}>
            {path}
          </option>
        ))}
      </select>

      {selectedCareer && (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedCareer}</h2>
          
          {/* Video Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Career Overview Video</h3>
            <VideoEmbed 
              url={careerPaths[selectedCareer].videoUrl}
              title={careerPaths[selectedCareer].videoTitle}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Job Description</h3>
              <p className="text-gray-300">{careerPaths[selectedCareer].jobDescription}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Required Skills</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                {careerPaths[selectedCareer].skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Average Salary</h3>
              <p className="text-gray-300">{careerPaths[selectedCareer].salary}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Popular Tools & Technologies</h3>
              <p className="text-gray-300">{careerPaths[selectedCareer].tools.join(", ")}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Typical Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                {careerPaths[selectedCareer].responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPaths;