import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactIcon from '../assests/React-icon.svg.png';
import ReactNativeIcon from '../assests/React-icon.svg.png';
import SpringBootIcon from '../assests/spring-boot.png';
import FigmaIcon from '../assests/Figma-Logo.png';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: 'React',
    icon: ReactIcon,
    description: 'Modern, component-based frontend framework for scalable web applications.',
  },
  {
    name: 'React Native',
    icon: ReactNativeIcon,
    description: 'Cross-platform mobile framework to build native apps for iOS and Android.',
  },
  {
    name: 'Spring Boot',
    icon: SpringBootIcon,
    description: 'Enterprise-grade backend framework for building REST APIs and microservices.',
  },
  {
    name: 'Figma',
    icon: FigmaIcon,
    description: 'Collaborative UI/UX design platform for creating seamless user experiences.',
  },
];

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="techStack"
      ref={containerRef}
      sx={{
        margin: '0 auto',
        py: 10,
        px: 3,
        textAlign: 'center',
        backgroundColor: '#0e141b',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // ← subtle bottom line
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: 28, md: 36 },
        }}
      >
        Our Development Stack
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#B0B0B0',
          maxWidth: '650px',
          mx: 'auto',
          mb: 6,
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        We use a modern and powerful stack of technologies to build fast, scalable, and visually
        stunning web and mobile applications.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '36px',
        }}
      >
        {techStack.map((tech, index) => (
          <Card
            key={index}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            sx={{
              backgroundColor: '#181818',
              borderRadius: '12px',
              width: '100%',
              maxWidth: 230,
              height: 220,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease',
              padding: '12px',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 0 25px rgba(255,255,255,0.15)',
              },
            }}
          >
            <Box
              component="img"
              src={tech.icon}
              alt={tech.name}
              sx={{ width: 60, height: 60, mb: 2 }}
            />
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#fff' }}>
                {tech.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#A0A0A0', fontSize: 14, lineHeight: 1.4 }}>
                {tech.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TechStack;
