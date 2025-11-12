import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import phoneMain from '../assets/phone-main.png';
import p0 from '../assets/phone-main.png';
import p1 from '../assets/phone-main.png';
import p3 from '../assets/phone-main.png';
import heroBg from '../assets/bg.png';
import Heading from './Heading';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainPhoneRef = useRef<HTMLImageElement | null>(null);
  const phonesRef = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null!);

  const phoneImages = [p0, p1, p3];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Reset all starting states
    gsap.set(mainPhoneRef.current, { opacity: 0, scale: 0.5, y: 100 });
    gsap.set(phonesRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(textRef.current, { opacity: 0, y: 40 });

    // Step 1: Main phone comes in large and scales down
    introTl
      .to(mainPhoneRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
      })
      .to(mainPhoneRef.current, {
        scale: 0.6,
        duration: 0.8,
        delay: 0.3,
      })
      .to(mainPhoneRef.current, {
        opacity: 0,
        duration: 0.4,
      });

    // Step 2: Split into 3 phones appearing closer together
    introTl.to(
      phonesRef.current,
      {
        opacity: 1,
        scale: (i: number) => (i === 1 ? 1 : 0.95),
        x: (i: number) => [-80, 0, 80][i],
        duration: 1.2,
        stagger: 0.2,
      },
      '-=0.5'
    );

    // Step 3: Text appears
    introTl.to(textRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.2');

    // === Scroll-triggered part ===
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: '+=1200',
        scrub: true,
        pin: true,
      },
    });

    // Merge phones
    scrollTl.to(
      phonesRef.current[0],
      { x: 200, scale: 0.95, duration: 1, ease: 'power2.inOut' },
      0
    );
    scrollTl.to(
      phonesRef.current[2],
      { x: -200, scale: 0.95, duration: 1, ease: 'power2.inOut' },
      0
    );

    // Fade out side phones
    scrollTl.to(
      [phonesRef.current[0], phonesRef.current[2]],
      { opacity: 0, duration: 0.5, ease: 'power1.inOut' },
      '>-=0.3'
    );

    // Center phone moves down into next section
    scrollTl.to(
      phonesRef.current[1],
      {
        y: window.innerHeight,
        scale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      '>'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={containerRef} id="hero" className="hero-main-container">
        {/* Main phone (for initial load only) */}
        <Box
          component="img"
          ref={mainPhoneRef}
          src={phoneMain}
          alt="main phone"
          sx={{
            width: { xs: '200px', md: '900px' },
            position: 'absolute',
            zIndex: 3,
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
          }}
          className="hero-container"
        >
          <Heading
            title="Find trusted services, instantly"
            description="Connect with trusted, verified professionals near you. Book fast, stay updated, and pay securely—without stress or uncertainty."
            textRef={textRef}
          />

          {/* 3 split phones */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 6,
              position: 'relative',
              zIndex: 5,
            }}
          >
            {phoneImages.map((img, i) => (
              <Box
                key={i}
                component="img"
                ref={(el: HTMLImageElement | null) => {
                  phonesRef.current[i] = el;
                }}
                src={img}
                alt={`phone-${i}`}
                sx={{
                  width: { xs: '150px', md: '400px' },
                  position: 'relative',
                  mx: { xs: 1, md: 3 },
                  ...(i === 0 && { left: '150px' }),
                  ...(i === 2 && { right: '150px' }),
                  zIndex: i === 1 ? 2 : 1,
                }}
              />
            ))}
          </Box>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
