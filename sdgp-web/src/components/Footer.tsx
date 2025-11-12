import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: React.FC = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0e141b',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '40px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 32,
            fontWeight: 700,
            color: '#17BBEF',
            letterSpacing: '0.5px',
            marginBottom: 4,
          }}
        >
          FIXGO
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              cursor: 'pointer',
              '&:hover': { color: '#17BBEF' },
            }}
          >
            Home
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              cursor: 'pointer',
              '&:hover': { color: '#17BBEF' },
            }}
          >
            About
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              cursor: 'pointer',
              '&:hover': { color: '#17BBEF' },
            }}
          >
            Services
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              cursor: 'pointer',
              '&:hover': { color: '#17BBEF' },
            }}
            onClick={() => handleScroll('techStack')}
          >
            Tech Stack
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              cursor: 'pointer',
              '&:hover': { color: '#17BBEF' },
            }}
            onClick={() => handleScroll('contactUs')}
          >
            Contact Us
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          width: '100%',
          maxWidth: '940px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          margin: '0 auto 20px auto',
        }}
      />

      {/* Social Icons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <IconButton
          sx={{
            color: '#FFFFFF',
            '&:hover': { color: '#17BBEF' },
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          sx={{
            color: '#FFFFFF',
            '&:hover': { color: '#17BBEF' },
          }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          sx={{
            color: '#FFFFFF',
            '&:hover': { color: '#17BBEF' },
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          sx={{
            color: '#FFFFFF',
            '&:hover': { color: '#17BBEF' },
          }}
        >
          <TwitterIcon />
        </IconButton>
      </Box>

      {/* Bottom Text */}
      <Typography
        variant="body2"
        sx={{
          color: '#888',
          fontSize: '14px',
        }}
      >
        © {new Date().getFullYear()} FixGo. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
