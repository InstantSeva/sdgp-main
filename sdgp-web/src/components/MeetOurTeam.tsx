import React, { useRef, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const people = [
  { fullName: "Nilupul Suramya", image: "https://picsum.photos/id/1015/1000/800" },
  { fullName: "Kithmi Hettiarachchi", image: "https://picsum.photos/id/1016/1000/800" },
  { fullName: "Danilka Thotapoladeniya", image: "https://picsum.photos/id/1018/1000/800" },
  { fullName: "Sewwandi Madushika", image: "https://picsum.photos/id/1020/1000/800" },
  { fullName: "Dilshan Thotapoladeniya", image: "https://picsum.photos/id/1024/1000/800" },
  { fullName: "Shehan Dissanayake", image: "https://picsum.photos/id/1035/1000/800" },
];

const MeetOurTeam: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const verticalNameRefs = useRef<HTMLDivElement[]>([]);
  const horizontalNameRefs = useRef<HTMLDivElement[]>([]);
  const iconRefs = useRef<HTMLButtonElement[]>([]);

  // Scroll-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        const verticalName = verticalNameRefs.current[i];
        const horizontalName = horizontalNameRefs.current[i];
        const icon = iconRefs.current[i];

        const tl = gsap.timeline({ paused: true });

        tl.to(card, { width: 300, duration: 0.4, ease: "power2.out" }, 0)
          .to(verticalName, { opacity: 0, duration: 0.2, ease: "power1.out" }, 0)
          .to(horizontalName, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.1")
          .to(icon, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, "-=0.2");

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        height: 400,
        padding: 2,
        overflow: "hidden",
      }}
    >
      {people.map((person, index) => {
        const [firstName, ...rest] = person.fullName.split(" ");
        const lastName = rest.join(" ");

        return (
          <Box
            key={index}
            // ref={(el) => {
            //   if (el) cardRefs.current[index] = el;
            // }}
            sx={{
              position: "relative",
              width: 150,
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              cursor: "pointer",
              flexShrink: 0,
              backgroundColor: "#000",
            }}
          >
            <img
              src={person.image}
              alt={person.fullName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />

            {/* Vertical first name (visible initially) */}
            <Box
              // ref={(el) => {
              //   if (el) verticalNameRefs.current[index] = el;
              // }}
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                color: "white",
                transform: "rotate(-90deg) translateY(100%)",
                transformOrigin: "bottom left",
                whiteSpace: "nowrap",
                fontWeight: 700,
                fontSize: 22,
                opacity: 1,
              }}
            >
              {firstName}
            </Box>

            {/* Horizontal full name + LinkedIn icon (hidden initially) */}
            <Box
              // ref={(el) => {
              //   if (el) horizontalNameRefs.current[index] = el;
              // }}
              sx={{
                position: "absolute",
                bottom: 30,
                left: 30,
                color: "white",
                opacity: 0,
                transform: "translateY(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, lineHeight: 1, textAlign: "left" }}
              >
                {firstName}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1, textAlign: "left" }}>
                {lastName}
              </Typography>
            </Box>

            {/* LinkedIn Icon (appears on hover) */}
            <IconButton
              ref={(el) => {
                if (el) iconRefs.current[index] = el;
              }}
              sx={{
                position: "absolute",
                bottom: 30,
                right: 20,
                color: "white",
                opacity: 0,
                transform: "translateX(-10px)",
                transition: "color 0.3s ease",
                "&:hover": { color: "#0A66C2" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.linkedin.com", "_blank");
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default MeetOurTeam;
