import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";


const PageLoader = () => {
  const messages = [
    "Preparing your dashboard 📊",
    "Fetching real-time insights ⏳",
    "Almost ready 🚀",
    "Just a moment… 😄",
  ];

  const [message, setMessage] = useState(messages[0]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <CircularProgress size={60} sx={{ color: "#fff", mb: 2 }} />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};


export default PageLoader;