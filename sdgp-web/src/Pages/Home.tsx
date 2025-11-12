import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import TrustSection from '../components/TrustSection'; // Your new component
import FeaturesSection from '../components/FeaturesSection'; // Your existing carousel
import MeetOurTeam from '../components/MeetOurTeam';
import TechStack from '../components/TechStack';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [phoneInNextSection, setPhoneInNextSection] = useState(false);

  const handlePhoneLeaveProblem = () => {
    setPhoneInNextSection(true);
  };

  return (
    <div>
      <HeroSection />
      {/* <ProblemSection onPhoneLeave={handlePhoneLeaveProblem} />
      <FeaturesSection /> */}
      <TrustSection />
      <MeetOurTeam />
      <TechStack />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
