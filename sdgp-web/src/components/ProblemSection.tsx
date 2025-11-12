import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMain from '../assets/phone-main.png';
import SubSectionHeading from './SubSectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface ProblemSectionProps {
  onPhoneLeave?: () => void;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ onPhoneLeave }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const heading = headingRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    // Reset all elements to initial state
    gsap.set(phone, { y: -200, opacity: 0, scale: 0.8 });
    gsap.set(heading, { opacity: 0, y: 40 });
    gsap.set([leftCard, rightCard], { opacity: 0, x: -60 });
    gsap.set(rightCard, { x: 60 });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        scrub: true,
        markers: false,
        anticipatePin: 1, // ✅ helps prevent scroll jumps
        onLeave: () => {
          onPhoneLeave?.(); // ✅ still notify parent safely
        },
      },
    });

    // STEP 1: Phone enters from top to center
    tl.to(phone, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    })

      // STEP 2: Heading fades in
      .to(
        heading,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      )

      // STEP 3: Cards slide in from sides
      .to(
        [leftCard, rightCard],
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // STEP 4: Content fades out first (heading and cards)
      .to(
        [heading, leftCard, rightCard],
        {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=0.3' // Reduced pause
      )

      // STEP 5: Phone moves down and hides below the section
      .to(
        phone,
        {
          y: 300, // Reduced distance
          opacity: 0,
          scale: 0.9,
          duration: 1.2, // Reduced duration
          ease: 'power2.inOut',
        },
        '-=0.8' // Start phone animation earlier
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onPhoneLeave]);

  return (
    <section ref={sectionRef} className="problem-page-container">
      {/* Heading */}
      <div ref={headingRef}>
        <SubSectionHeading
          title="The Real Problem Today"
          description="Trust is missing. Visibility is missing. We are solving the problem at both ends."
        />
      </div>

      <div className="problem-content-wrapper">
        {/* Left Card */}
        <div ref={leftCardRef} className="problem-card left-card">
          <h3>For Customers</h3>
          <ul>
            <li>It's hard to find trustworthy skilled workers locally.</li>
            <li>You don't know who is actually certified.</li>
            <li>You get people from social media – most are unverified.</li>
            <li>You risk scams, poor quality jobs, and time wasted.</li>
            <li>You don't know how to compare who is best.</li>
          </ul>
        </div>

        {/* Phone in center */}
        <Box
          ref={phoneRef}
          component="img"
          src={phoneMain}
          alt="featured phone"
          className="phone-container"
        />

        {/* Right Card */}
        <div ref={rightCardRef} className="problem-card right-card">
          <h3>For Service Providers</h3>
          <ul>
            <li>Good skilled workers don't get enough exposure.</li>
            <li>They have no platform to build a "professional profile".</li>
            <li>Most jobs come through random personal contacts.</li>
            <li>No fair rating system to prove talent.</li>
            <li>Hard to maintain career growth consistently.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
