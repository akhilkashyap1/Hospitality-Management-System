"use client";

/* ===================== Imports ===================== */
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import patientsData from "../../../JSON/patients.json"; // Default JSON fallback

/* ===================== Types ===================== */
type PatientStatus = "booked" | "pending" | "treated" | "discharged";

interface PatientDetails {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  patient_status: PatientStatus;
}

/* ===================== Helper Functions ===================== */
const getStoredPatients = (): PatientDetails[] => {
  // Try to read from localStorage, fallback to JSON
  const stored = localStorage.getItem("patients");
  return stored ? JSON.parse(stored) : (patientsData.patient_data as PatientDetails[]);
};

const savePatients = (patients: PatientDetails[]) => {
  localStorage.setItem("patients", JSON.stringify(patients));
};

/* ===================== Component ===================== */
const PatientPage = () => {
  const { id } = useParams();

  /* ---------- Local State ---------- */
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [status, setStatus] = useState<PatientStatus>("booked");
  const [loading, setLoading] = useState(false);

  /* ---------- Snackbar State ---------- */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /* ---------- Load patient from localStorage ---------- */
  useEffect(() => {
    const patients = getStoredPatients();
    const foundPatient = patients.find((p) => p.id === id) || null;
    setPatient(foundPatient);
    if (foundPatient) setStatus(foundPatient.patient_status);
  }, [id]);

  /* ---------- Handlers ---------- */
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as PatientStatus);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patient || status === patient.patient_status) return;

    setLoading(true);

    setTimeout(() => {
      const updatedPatient: PatientDetails = { ...patient, patient_status: status };
      setPatient(updatedPatient);

      // Update localStorage
      const patients = getStoredPatients();
      const updatedPatients = patients.map((p) =>
        p.id === updatedPatient.id ? updatedPatient : p
      );
      savePatients(updatedPatients);

      setSnackbarMessage(`Patient "${patient.name}" status updated to "${status}"`);
      setSnackbarOpen(true);
      setLoading(false);
    }, 800); // Slightly faster
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  /* ---------- Guard ---------- */
  if (!patient) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          Patient not found
        </Typography>
      </Container>
    );
  }

  /* ---------- UI ---------- */
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        Patient Details
      </Typography>

      <Card elevation={4} sx={{ p: 2, borderRadius: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            {/* Patient Info */}
            <Box mb={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                ID: <Typography component="span" fontWeight={400}>{patient.id}</Typography>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Name: <Typography component="span" fontWeight={400}>{patient.name}</Typography>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Age: <Typography component="span" fontWeight={400}>{patient.age}</Typography>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Gender: <Typography component="span" fontWeight={400}>{patient.gender}</Typography>
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Contact: <Typography component="span" fontWeight={400}>{patient.contact}</Typography>
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Status Select */}
            <FormControl fullWidth disabled={loading} sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleStatusChange} label="Status">
                <MenuItem value="booked">Booked</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="treated">Treated</MenuItem>
                <MenuItem value="discharged">Discharged</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || status === patient.patient_status}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PatientPage;
