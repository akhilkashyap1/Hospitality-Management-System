"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import PatientsData from "../../JSON/patients.json";
import { PatientDetails } from "@/app/src/types/PatientDetails";

const DischargePatientsPage = () => {
  const [treatedPatients, setTreatedPatients] = useState<PatientDetails[]>([]);
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setTreatedPatients(PatientsData.patient_data as PatientDetails[]);
  }, []);

  /* ---------- Handle Discharge ---------- */
  const handleDischarge = (id: string) => {
    setTreatedPatients((prev) => prev.filter((patient) => patient.id !== id));

    // ✅ Show notification instead of alert
    setSnackbarMessage(`Patient ${id} has been discharged!`);
    setSnackbarOpen(true);
  };

  const fetchDischargedPatientsData = () => {
    const patient = PatientsData.patient_data.find((p) => p.patient_status === "treated");
  };

  useEffect(() => {
    fetchDischargedPatientsData();
  });

  const headers = ["ID", "Name", "Age", "Gender", "Contact", "Actions"];

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <Typography variant="h4" mt={2} mb={2} px={2}>
          Discharge Patients
        </Typography>

        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header} sx={{ fontWeight: 600 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {treatedPatients.length > 0 ? (
                  treatedPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.contact}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleDischarge(patient.id)}
                        >
                          Discharge
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length} align="center">
                      No patients to discharge
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ---------- Snackbar Notification ---------- */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DischargePatientsPage;
