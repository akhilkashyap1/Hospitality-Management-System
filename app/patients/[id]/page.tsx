"use client";

/* ===================== Imports ===================== */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { RootState, AppDispatch } from "../../store";
import { updatePatientStatus } from "../../store/slices/patientsSLice";
import { PatientStatus } from "@/app/types/PatientDetails";

/* ===================== Component ===================== */
const PatientPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  /* ---------- Redux State ---------- */
  const patient = useSelector((state: RootState) =>
    state.patients.patients.find((p) => p.id === id)
  );

  /* ---------- Local State ---------- */
  const [status, setStatus] = useState<PatientStatus>(
    (patient?.patient_status as PatientStatus) ?? "booked"
  );
  const [loading, setLoading] = useState(false);

  /* ---------- Snackbar State ---------- */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /* ---------- Handlers ---------- */
  const handlePatientsStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as PatientStatus);
  };

  const patientDetailsSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patient) return;

    setLoading(true);
    dispatch(updatePatientStatus({ id: patient.id, status }));

    setTimeout(() => {
      setSnackbarMessage(`Patient ${patient.name} status updated to "${status}"`);
      setSnackbarOpen(true);
      setLoading(false);
    }, 1200);
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
      {/* Header */}
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        Patient Details
      </Typography>

      {/* Card */}
      <Card elevation={4} sx={{ p: 2, borderRadius: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={patientDetailsSubmitHandler}>
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
              <Select value={status} onChange={handlePatientsStatusChange}  label="Status" >
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
