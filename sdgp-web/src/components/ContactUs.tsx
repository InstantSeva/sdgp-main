import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger);

const ContactUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_r4gapx7",
        "template_p1036sv",
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "Et3AjbOAI5dZ-yuas"
      )
      .then(
        () => {
          setSuccess(true);
          setOpen(true);
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        () => {
          setSuccess(false);
          setOpen(true);
        }
      );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: isSmallScreen ? 6 : 10,
        backgroundColor: "#0E0E0E",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          backgroundColor: "#121212",
          borderRadius: 3,
          color: "white",
          width: "100%",
          maxWidth: "940px",
          px: isSmallScreen ? 3 : 6,
          py: isSmallScreen ? 4 : 6,
          gap: isSmallScreen ? 4 : 6,
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 320 }}>
          <Typography
            variant={isSmallScreen ? "h4" : "h3"}
            sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#B0B0B0",
              lineHeight: 1.7,
              mb: 4,
              fontSize: isSmallScreen ? 14 : 16,
            }}
          >
            For any inquiries regarding our services or support, please fill out the form below. Our team strives to respond within one business day.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                sx={{
                  backgroundColor: "#1C1C1C",
                  color: "white",
                  width: 48,
                  height: 48,
                  "&:hover": { backgroundColor: "#2A2A2A" },
                }}
              >
                <EmailIcon />
              </IconButton>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
                  contact@example.com
                </Typography>
            </Box>

            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, textAlign: "left" }}>
              <IconButton
                sx={{
                  backgroundColor: "#1C1C1C",
                  color: "white",
                  width: 48,
                  height: 48,
                  "&:hover": { backgroundColor: "#2A2A2A" },
                }}
              >
                <PhoneIcon />
              </IconButton>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
                  +92 312 1234567
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          ref={formRef}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            minWidth: 320,
            backgroundColor: "#181818",
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            name="name"
            label="Name"
            variant="filled"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "#000",
                color: "white",
                borderRadius: 1,
              },
            }}
            InputLabelProps={{ sx: { color: "#888" } }}
          />
          <TextField
            name="email"
            label="Email"
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "#000",
                color: "white",
                borderRadius: 1,
              },
            }}
            InputLabelProps={{ sx: { color: "#888" } }}
          />
          <TextField
            name="phone"
            label="Phone"
            variant="filled"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "#000",
                color: "white",
                borderRadius: 1,
              },
            }}
            InputLabelProps={{ sx: { color: "#888" } }}
          />
          <TextField
            name="message"
            label="Message"
            variant="filled"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "#000",
                color: "white",
                borderRadius: 1,
              },
            }}
            InputLabelProps={{ sx: { color: "#888" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#17BBEF",
              color: "#ffffffff",
              borderRadius: 2,
              fontWeight: 600,
              py: 1.2,
              "&:hover": { backgroundColor: "#0D9BC7" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={success ? "success" : "error"}
          variant="filled"
        >
          {success
            ? "Message sent successfully! We’ll get back to you soon."
            : "Failed to send message. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
