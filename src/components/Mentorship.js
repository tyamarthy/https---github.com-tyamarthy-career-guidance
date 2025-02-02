import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { 
  collection, 
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import './styles/mentors.css';

const MentorshipPage = () => {
  const [mentors, setMentors] = useState([]);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorsQuery = collection(db, 'mentors');
        const mentorsSnapshot = await getDocs(mentorsQuery);
        const mentorData = [];

        mentorsSnapshot.forEach((doc) => {
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

    const fetchNotes = async () => {
      try {
        const notesQuery = query(
          collection(db, 'meetingNotes'),
          orderBy('timestamp', 'desc')
        );
        const notesSnapshot = await getDocs(notesQuery);
        const notesData = [];

        notesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.content && data.timestamp) {
            notesData.push({
              id: doc.id,
              content: data.content,
              timestamp: data.timestamp?.toDate()
            });
          }
        });

        setSavedNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
    fetchNotes();
  }, []);

  const handleSaveNotes = async () => {
    if (!notes.trim()) {
      alert("Please enter some notes before saving.");
      return;
    }

    try {
      const notesRef = collection(db, 'meetingNotes');
      const newNote = {
        content: notes,
        timestamp: serverTimestamp()
      };

      const docRef = await addDoc(notesRef, newNote);

      setSavedNotes(prevNotes => [{
        id: docRef.id,
        content: notes,
        timestamp: new Date()
      }, ...prevNotes]);

      setNotes('');
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Error saving notes. Please try again.");
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mentorship-page">
      <h1 className="page-header">Mentorship & Networking</h1>

      <div className="page-content">
        {/* Mentor List */}
        <div className="mentor-list">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <div key={mentor.id} className="mentor-card">
                <div className="mentor-info">
                  <h3>{mentor.name}</h3>
                  <p>{mentor.bio}</p>
                  <p><span>Job Title:</span> {mentor.jobTitle} at {mentor.company}</p>
                  <p><span>Email:</span> {mentor.email}</p>
                  <p className="skills"><span>Skills:</span> {mentor.skills}</p>
                  <p className="availability"><span>Availability:</span> {mentor.availability}</p>

                  <button
                    onClick={() => window.location.href = `mailto:${mentor.email}?subject=Booking a Meeting&body=Hi ${mentor.name},%0A%0AI would like to schedule a meeting to discuss mentorship opportunities. Please let me know your availability.%0A%0AThank you.`}
                    className="reach-out-btn"
                  >
                    Reach Out & Book a Meeting!
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-mentors">No mentors available at the moment.</p>
          )}
        </div>

        {/* Notes Sidebar */}
        <div className="notes-sidebar">
          <h2>My Meeting Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your meeting notes here..."
          ></textarea>
          <button onClick={handleSaveNotes} className="save-notes-btn">
            Save Notes
          </button>
          
          <div className="saved-notes-list">
            {loading ? (
              <p>Loading saved notes...</p>
            ) : savedNotes.length > 0 ? (
              savedNotes.map((note) => (
                <div key={note.id} className="saved-note-item">
                  <p className="note-timestamp">{formatDate(note.timestamp)}</p>
                  <p className="note-content">{note.content}</p>
                </div>
              ))
            ) : (
              <p>No saved notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;