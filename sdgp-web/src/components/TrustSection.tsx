import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phoneMain from '../assets/phone-main.png'; // ✅ your image path
import SubSectionHeading from './SubSectionHeading';

gsap.registerPlugin(ScrollTrigger);

const TrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]); // ✅ This works

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const graph = graphRef.current;

    if (!section || !phone || !graph) return;

    // Set initial states
    gsap.set(phone, { opacity: 0, y: -100, xPercent: -50, left: '50%' });
    gsap.set(graph, { opacity: 0 });
    nodesRef.current.forEach((n) => gsap.set(n, { opacity: 0, y: 30 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: true,
      },
    });

    // Step 1: Phone appears and moves to center
    tl.to(phone, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });

    // Step 2: Move phone to left
    tl.to(phone, {
      left: '25%',
      xPercent: -50,
      duration: 1,
      ease: 'power2.inOut',
    });

    // Step 3: Show graph and animate nodes
    tl.to(graph, { opacity: 1, duration: 0.5, ease: 'power1.out' });
    nodesRef.current.forEach((node, i) => {
      tl.to(node, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    });

    // Step 4: Hide graph + move phone to bottom
    tl.to(graph, { opacity: 0, duration: 0.6, ease: 'power2.in' });
    tl.to(phone, {
      top: '80%',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
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
        backgroundColor: '#0e141b',
        color: '#fff',
        overflow: 'hidden',
        padding: '120px 0',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <SubSectionHeading
          title="  Why People Trust Us"
          description=" We combine AI, verified identities, privacy protection and safety-first design to create
          the most secure service ecosystem for locals."
        />
        {/* 📱 Phone */}
        <Box
          ref={phoneRef}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 180, md: 240 },
            height: { xs: 340, md: 420 },
            backgroundImage: `url(${phoneMain})`, // ✅ your imported image
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: 3,
          }}
        />

        {/* 📊 Graph + Nodes */}
        <Box
          ref={graphRef}
          sx={{
            position: 'relative',
            ml: { md: '50%', xs: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 5,
            mt: { xs: 15, md: 0 },
            pl: { md: 8, xs: 0 },
          }}
        >
          {graphNodes.map((text, i) => (
            <Box
              key={i}
              ref={(el) => {
                if (el) nodesRef.current[i] = el;
              }}
              sx={{
                position: 'relative',
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                minWidth: { xs: 'auto', md: 280 },
                textAlign: 'left',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '-32px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#00b4d8',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {text}
              </Typography>
            </Box>
          ))}

          {/* Connecting line */}
          <Box
            sx={{
              position: 'absolute',
              left: '-26px',
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: '#00b4d8',
              opacity: 0.5,
            }}
          />
        </Box>
      </Container>
    </section>
  );
};

export default TrustSection;
