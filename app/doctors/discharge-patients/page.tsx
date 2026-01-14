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
  Divider,
} from "@mui/material";

import PatientsData from "../../JSON/patients.json";
import TableSkeleton from "../../components/table/TableSkeleton";
import { PatientDetails } from "@/app/src/types/PatientDetails";

const DischargePatientsPage = () => {
  const [treatedPatients, setTreatedPatients] = useState<PatientDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const headers = ["ID", "Name", "Age", "Gender", "Contact", "Actions"];

  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const treated = PatientsData.patient_data.filter(
        (p) => p.patient_status === "treated"
      ) as PatientDetails[];

      setTreatedPatients(treated);
      setLoading(false);
    }, 1000);
  }, []);

  /* ---------- Handle Discharge ---------- */
  const handleDischarge = (id: string) => {
    setTreatedPatients((prev) => prev.filter((patient) => patient.id !== id));

    setSnackbarMessage(`Patient ${id} has been discharged!`);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ mt: 4 }}>
        <Typography variant="h5" mt={2} mb={2} px={2} fontWeight={600}>
          Discharge Patients
        </Typography>

        <Divider />

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
                {loading ? (
                  <TableSkeleton rows={5} columns={headers.length} />
                ) : treatedPatients.length > 0 ? (
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
                          size="small"
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
