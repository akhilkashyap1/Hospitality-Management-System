"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Divider,
  CircularProgress,
} from "@mui/material";

import patientData from "../JSON/patients.json";
import { Patient } from "@/app/types/PatientDetails";
import TableSkeleton from "../components/table/TableSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updatePatientStatus } from "../store/slices/patientsSLice";

const PatientsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const patientId = Array.isArray(params.id) ? params.id[0] : params.id;

  /* ---------- State ---------- */
  const patientsList = useSelector(
  (state: RootState) => state.patients.patients
);
  const [loading, setLoading] = useState(true); // table content loading
  const [loadingId, setLoadingId] = useState<string | null>(null); // button loading

  /* ---------- Table Headers ---------- */
  const headers = ["ID", "Name", "Age", "Gender", "Contact", "Status", "Actions"];

  /* ---------- Load patients ---------- */
useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    if (patientData.status === "success") {
      const patient = patientsList.find((p) => p.id === patientId);
    } else {
      console.error("Failed to fetch patients data");
    }
    setLoading(false);
  }, 400);

  return () => clearTimeout(timer);
}, [patientsList, patientId]);

  /* ---------- Handle View Button Click ---------- */
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      router.push(`/patients/${id}`);
    }, 400); 
  };

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        {/* Page Title */}
        <Typography
          variant="h4"
          mt={2}
          mb={2}
          px={2}
          textAlign="center"
          sx={{ fontWeight: 600 }}
        >
          Patient Lists
        </Typography>

        <Divider />

        <CardContent>
          <TableContainer>
            <Table>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header} sx={{ fontWeight: 600 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {loading ? (
                  <TableSkeleton rows={5} columns={headers.length} />
                ) : patientsList.length > 0 ? (
                  patientsList.map((patient) => (
                    <TableRow key={patient.id} hover>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.contact}</TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {patient.patient_status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewClick(patient.id)}
                          disabled={!!loadingId} // disable all buttons when any button is loading
                          startIcon={
                            loadingId === patient.id ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : null
                          }
                        >
                          {loadingId === patient.id ? "Loading..." : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length} sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        No patients found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientsPage;