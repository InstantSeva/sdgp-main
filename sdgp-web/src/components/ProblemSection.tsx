import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMain from '../assets/phone-main.png';
import SubSectionHeading from './SubSectionHeading';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !phone || !leftCard || !rightCard) return;

    gsap.set(phone, { y: -150, opacity: 0, scale: 0.9 });
    gsap.set([leftCard, rightCard], { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });

    tl.to(phone, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
      .to(leftCard, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(rightCard, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="problem-page-container">
      <SubSectionHeading
        title="The Real Problem Today"
        description="Trust is missing. Visibility is missing. We are solving it for both customers and service providers."
      />

      <div className="problem-content-wrapper">
        <div ref={leftCardRef} className="problem-card left-card">
          <h3>For Customers</h3>
          <ul>
            <li>Hard to find trustworthy workers locally</li>
            <li>No real verification for skills</li>
            <li>High risk of scams or poor quality jobs</li>
          </ul>
        </div>

        <Box
          component="img"
          src={phoneMain}
          ref={phoneRef}
          alt="Phone mockup"
          className="phone-container"
        />

        <div ref={rightCardRef} className="problem-card right-card">
          <h3>For Service Providers</h3>
          <ul>
            <li>Hard to get exposure</li>
            <li>No proper review or rating system</li>
            <li>Unstable income and visibility</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
