import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowBackIosNew, ArrowForwardIos, Star } from '@mui/icons-material';
import SubSectionHeading from './SubSectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
}

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: 'Verified Certificates',
      description:
        'We validate uploaded professional documents so you always hire real certified experts.',
      backgroundImage: 'https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg',
    },
    {
      id: 2,
      title: 'Background Checks',
      description:
        'Comprehensive verification of service providers for your safety and peace of mind.',
      backgroundImage: 'https://i.redd.it/tc0aqpv92pn21.jpg',
    },
    {
      id: 3,
      title: 'Real Reviews',
      description: 'Genuine feedback from previous customers to help you make informed decisions.',
      backgroundImage: 'https://wharferj.files.wordpress.com/2015/11/bio_north.jpg',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const carousel = carouselRef.current;

    if (!section || !heading || !description || !carousel) return;

    // Initial states
    gsap.set([heading, description, carousel], { opacity: 0, y: 40 });

    // ✨ Fade-in animation
    const fadeInTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
      },
    });

    fadeInTl
      .to(heading, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(description, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(carousel, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    // 🎬 Fade-out and move up as user scrolls past
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'bottom 75%', // start fading before leaving viewport
        end: 'bottom top', // until it fully leaves
        scrub: 1,
      },
    });

    fadeOutTl.to(section, {
      opacity: 0,
      y: -100,
      duration: 1.2,
      ease: 'power3.out',
    });

    return () => {
      fadeInTl.kill();
      fadeOutTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const item = carouselItems[currentSlide];

  return (
    <section className="features-section" ref={sectionRef}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <div ref={headingRef}>
          <SubSectionHeading
            title="Powerful Features Designed for Trust, Safety & Easy Service Hiring"
            description="Everything you need — in one platform built to protect customers, grow professionals, and deliver reliable results."
          />
        </div>
        <Box className="carousel-card" ref={carouselRef}>
          <Box className="carousel-text">
            <Box className="title-with-icon">
              <Star className="title-icon" />
              <Typography variant="h4" className="carousel-title">
                {item.title}
              </Typography>
            </Box>

            <Typography variant="body1" className="carousel-description">
              {item.description}
            </Typography>
          </Box>

          <Box
            className="carousel-image"
            style={{ backgroundImage: `url(${item.backgroundImage})` }}
          />

          <Box className="carousel-bottom">
            <Typography className="carousel-progress">
              {String(currentSlide + 1).padStart(2, '0')} –{' '}
              {String(carouselItems.length).padStart(2, '0')}
            </Typography>

            <Box className="carousel-arrows">
              <IconButton className="arrow-btn" onClick={prevSlide}>
                <ArrowBackIosNew fontSize="small" />
              </IconButton>
              <IconButton className="arrow-btn" onClick={nextSlide}>
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default FeaturesSection;
