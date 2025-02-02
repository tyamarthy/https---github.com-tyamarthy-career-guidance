import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import './styles/mentors.css';  

const MentorshipPage = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const q = collection(db, 'mentors');
        const querySnapshot = await getDocs(q);
        const mentorData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          mentorData.push({
            id: doc.id,
            name: data.Name,
            bio: data.Bio,
            jobTitle: data['Job Title'],
            company: data.Company,
            email: data.Email,
            skills: data['Skills '] ? data['Skills '].split(',').map(skill => skill.trim()).join(', ') : 'No skills listed',
            availability: data['Availability '] ? data['Availability '].replace(/"/g, '').split(',').map(avail => avail.trim()).join(', ') : 'No availability listed',
          });
        });

        setMentors(mentorData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors(); // Call to fetch data
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="mentorship-page">
      <h1>Mentorship & Networking</h1>

      <div className="mentor-list">
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <div className="mentor-info">
                <h3>{mentor.name}</h3>
                <p>{mentor.bio}</p>
                <p><span>Job Title:</span> {mentor.jobTitle} at {mentor.company}</p>
                <p><span>Email:</span> {mentor.email}</p>
                <p className="skills"><span>Skills:</span> {mentor.skills}</p>
                <p className="availability"><span>Availability:</span> {mentor.availability}</p>

                {/* Button to send email */}
                <a 
                  href={`mailto:${mentor.email}?subject=Booking a Meeting&body=Hi ${mentor.name},%0A%0AI would like to schedule a meeting to discuss mentorship opportunities. Please let me know your availability.%0A%0AThank you.`}
                  className="send-email-btn"
                >
                  Reach Out & Book a Meeting!
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="no-mentors">No mentors available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default MentorshipPage;
