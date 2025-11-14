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
  const headingRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const heading = headingRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !phone || !heading || !leftCard || !rightCard) return;

    // Initial states
    gsap.set(phone, { y: '-50vh', opacity: 0, scale: 0.9 });
    gsap.set([heading, leftCard, rightCard], { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
      },
    });

    tl.to(phone, {
      y: '0vh',
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    })
      .to(heading, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '+=0.2')
      .to(leftCard, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(rightCard, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      .to(
        [heading, leftCard, rightCard],
        { opacity: 0, y: 50, duration: 0.8, ease: 'power2.in' },
        '+=0.8'
      )
      .to(
        phone,
        {
          y: '50vh',
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        '-=0.4'
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
  const providers = [
    'Good skilled workers don’t get enough exposure.',
    'They have no platform to build a “professional profile”.',
    'Most jobs come through random personal contacts.',
    'No fair rating system to prove talent.',
    'Hard to maintain career growth consistently.',
  ];

  const customer = [
    'It’s hard to find trustworthy skilled workers locally.',
    'You don’t know who is actually certified.',
    'You get people from social media — but most are unverified.',
    'You risk scams, poor quality jobs, and time wasted.',
    'You don’t know how to compare who is best.',
  ];
  return (
    <section ref={sectionRef} className="problem-page-container">
      <div ref={headingRef}>
        <SubSectionHeading
          title="The Real Problem Today"
          description="Trust is missing. Visibility is missing. We are solving it for both customers and service providers."
        />
      </div>

      <div className="problem-content-wrapper">
        <div ref={leftCardRef} className="problem-card left-card">
          <h3>For Customers</h3>
          <ul>
            {providers.map((i) => (
              <li key={i}>{i}</li>
            ))}
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
            <ul>
              {customer.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
