import { Box, Typography } from '@mui/material';
import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
  textRef?: React.RefObject<HTMLDivElement>;
}
export default function Heading({ title, description, textRef }: HeadingProps) {
  return (
    <Box className="heading-container" ref={textRef}>
      <h1 className="main-heading">{title}</h1>
      <div className="main-description">{description}</div>
    </Box>
  );
}
