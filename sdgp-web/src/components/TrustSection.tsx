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
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const heading = headingRef.current;
    if (!section || !phone || !heading) return;

    // Reset initial states
    gsap.set(phone, {
      opacity: 0,
      y: -200,
      xPercent: -50,
      left: '50%',
      top: '10%',
      position: 'absolute',
      transformOrigin: 'center center',
    });

    gsap.set(heading, { opacity: 0, y: 40 });

    nodesRef.current.forEach((node) => {
      if (node) gsap.set(node, { opacity: 0, y: 40 });
    });

    // ---- Define playNodesAnimation before use ----
    function playNodesAnimation() {
      const nodesTl = gsap.timeline();
      nodesRef.current.forEach((node, i) => {
        if (node) {
          nodesTl.to(
            node,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power3.out',
            },
            i * 0.3
          );
        }
      });
    }

    // Heading fade-in
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
        onLeave: () => playNodesAnimation(),
      },
    });

    tl.to(phone, {
      opacity: 1,
      y: '10%',
      duration: 1.2,
      ease: 'power3.out',
    }).to(phone, {
      xPercent: 0,
      left: '-8%',
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: playNodesAnimation,
    });

    return () => {
      tl.kill();
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
        padding: '120px 0',
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
        }}
      >
        {/* Heading */}
        <Box
          ref={headingRef}
          sx={{
            zIndex: 10,
            textAlign: 'center',
            maxWidth: 700,
            mb: 6,
          }}
        >
          <SubSectionHeading
            title="Why People Trust Us"
            description="We combine AI, verified identities, privacy protection, and safety-first design to create the most secure service ecosystem for locals."
          />
        </Box>

        {/* Phone Image */}
        <Box
          ref={phoneRef}
          sx={{
            backgroundImage: `url(${phoneMain})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            width: { xs: 260, md: 600 },
            height: { xs: 480, md: 640 },
            zIndex: 5,
          }}
        />

        {/* Graph Nodes (centered vertically, fade after phone settles) */}
        <Box
          sx={{
            transform: 'translateX(60%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'flex-start',
            zIndex: 4,
          }}
        >
          {graphNodes.map((text, i) => (
            <Box
              key={i}
              ref={(el) => (nodesRef.current[i] = el)}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 2,
                p: 2,
                pl: 3,
                width: { xs: 240, md: 340 },
                backdropFilter: 'blur(6px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '-25px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#00B4D8',
                },
                '&::after':
                  i < graphNodes.length - 1
                    ? {
                        content: '""',
                        position: 'absolute',
                        left: '-17px',
                        top: '50%',
                        width: '2px',
                        height: '80px',
                        backgroundColor: 'rgba(0,180,216,0.4)',
                      }
                    : {},
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', md: '1.1rem' },
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
