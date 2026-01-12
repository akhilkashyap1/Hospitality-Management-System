"use client";
import { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", 
          margin: 0,
          userSelect: "none"
        }}
      >
          {/* Header / Navigation */}
          <Navbar />

          {/* Page content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1, 
              px: 2,
              py: 2,
            }}
          >
            {children}
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 2,
              textAlign: "center",
              borderTop: "1px solid #ddd",
              backgroundColor: "#f5f5f5",
            }}
          >
            © 2026 My Clinic
          </Box>
      </body>
    </html>
  );
}
