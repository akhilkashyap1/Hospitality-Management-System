"use client";

import React, { useState, useEffect } from "react";
import PageLoader from "./components/pageLoading/pages";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dashboard from "./JSON/dashboard.json";


/* ------------------ Stat Card ------------------ */
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
 
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: "0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      },
    }}
  >
    <CardContent>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

/* ------------------ Dashboard ------------------ */
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    appointmentsToday: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (dashboard.status === "success") {
        setStats(dashboard.dashboard_data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Overview of today’s activity
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Doctors"
            value={stats.totalDoctors}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            title="Appointments Today"
            value={stats.appointmentsToday}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
