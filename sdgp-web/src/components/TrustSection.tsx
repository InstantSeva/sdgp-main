import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMain from '../assets/phone-main.png';
import SubSectionHeading from './SubSectionHeading';

gsap.registerPlugin(ScrollTrigger);

const TrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (!section || !phone) return;

    // Initial state setup
    gsap.set(phone, {
      opacity: 0,
      y: -200,
      xPercent: -50,
      left: '50%',
      position: 'absolute',
      top: 0,
    });
    nodesRef.current.forEach((node) => {
      if (node) gsap.set(node, { opacity: 0, x: 50 });
    });

    // Phone animation timeline
    const phoneTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: '+=500',
        scrub: true,
        pin: false,
      },
    });

    // Phone moves from top to center, then slides left
    phoneTl
      .to(phone, {
        opacity: 1,
        y: '30vh',
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(phone, {
        xPercent: 0,
        left: '20%',
        duration: 1,
        ease: 'power3.inOut',
      });

    // Nodes fade in one by one
    const nodesTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

    nodesRef.current.forEach((node, i) => {
      if (node) {
        nodesTl.to(
          node,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          i * 0.2
        );
      }
    });

    return () => {
      phoneTl.kill();
      nodesTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const graphNodes = [
    'Verified & Validated Professionals',
    'Protected Personal Information',
    'AI Reputation & Rating System',
    'Safety Protocols (SOS + Scam Prevention)',
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#0E141B',
        color: '#fff',
        overflow: 'hidden',
        padding: '160px 0',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {/* Heading */}
        <SubSectionHeading
          title="Why People Trust Us"
          description="We combine AI, verified identities, privacy protection and safety-first design to create the most secure service ecosystem for locals."
        />

        {/* Phone */}
        <Box
          ref={phoneRef}
          sx={{
            backgroundImage: `url(${phoneMain})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            width: { xs: 200, md: 260 },
            height: { xs: 380, md: 460 },
            zIndex: 5,
          }}
        />

        {/* Nodes (right side) */}
        <Box
          sx={{
            position: 'relative',
            mt: { xs: 6, md: 0 },
            ml: { md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 3,
            width: { xs: '100%', md: '45%' },
          }}
        >
          {graphNodes.map((text, i) => (
            <Box
              key={i}
              ref={(el: HTMLDivElement | null) => {
                nodesRef.current[i] = el;
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                p: 2,
                width: '100%',
                position: 'relative',
                '&::before': {
                  content: '""',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#00B4D8',
                  flexShrink: 0,
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', md: '1.05rem' },
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default TrustSection;
