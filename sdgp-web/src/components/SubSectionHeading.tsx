import { Box, Typography } from '@mui/material';
import React from 'react';

interface SubSectionHeadingProps {
  title: string;
  description: string;
  textRef?: React.RefObject<HTMLDivElement>;
}
export default function SubSectionHeading({ title, description, textRef }: SubSectionHeadingProps) {
  return (
    <Box className="heading-container" ref={textRef}>
      <h1 className="sub-heading">{title}</h1>
      <div className="sub-description">{description}</div>
    </Box>
  );
}
