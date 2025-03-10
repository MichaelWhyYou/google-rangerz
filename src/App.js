import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Welcome from './components/onboarding/Welcome';
import HowDidYouHear from './components/onboarding/HowDidYouHear';
import WhoIsLearning from './components/onboarding/WhoIsLearning';
import ChildName from './components/onboarding/ChildName';
import ChildAge from './components/onboarding/ChildAge';
import CharacterSelection from './components/onboarding/CharacterSelection';
import InterestSelection from './components/onboarding/InterestSelection';
import StoriesExplorer from './components/main/StoriesExplorer';
import StoryReader from './components/main/StoryReader';
import ProfilePage from './components/profile/ProfilePage';

function App() {
  const [userData, setUserData] = useState({
    userType: '',
    childName: '',
    childAge: '',
    character: '',
    interests: [],
    joinDate: new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }),
    stats: {
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      storiesCompletedToday: 0,
      totalStoriesCompleted: 0
    }
  });

  const updateUserData = (newData) => {
    setUserData(prevData => ({ ...prevData, ...newData }));
  };

  const updateUserStats = (stats) => {
    setUserData(prevData => ({
      ...prevData,
      stats: {
        ...prevData.stats,
        ...stats
      }
    }));
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/how-did-you-hear" element={<HowDidYouHear updateUserData={updateUserData} />} />
          <Route path="/who-is-learning" element={<WhoIsLearning updateUserData={updateUserData} />} />
          <Route path="/child-name" element={<ChildName updateUserData={updateUserData} userData={userData} />} />
          <Route path="/child-age" element={<ChildAge updateUserData={updateUserData} userData={userData} />} />
          <Route path="/character-selection" element={<CharacterSelection updateUserData={updateUserData} userData={userData} />} />
          <Route path="/interest-selection" element={<InterestSelection updateUserData={updateUserData} userData={userData} />} />
          <Route path="/stories" element={<StoriesExplorer userData={userData} />} />
          <Route path="/story/:storyId" element={<StoryReader userData={userData} updateUserStats={updateUserStats} />} />
          <Route path="/profile" element={<ProfilePage userData={userData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;