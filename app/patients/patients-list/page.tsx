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

import patientData from "../../JSON/patients.json";
import TableSkeleton from "../../components/table/TableSkeleton";
import { PatientDetails } from "../../src/types/PatientDetails";

const PatientsPage = () => {
  const router = useRouter();
  const params = useParams();
  const patientId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [patientsList, setPatientsList] = useState<PatientDetails[]>([]);

  interface ProviderListResponse {
    status: "success" | "error";
    patient_data: PatientDetails[];
  }

  const headers = ["ID", "Name", "Age", "Gender", "Contact", "Status", "Actions"];

  /* ---------- Fetch Patients ---------- */
  const fetchProviderData = () => {
    try {
      // First try localStorage
      const storedPatients = localStorage.getItem("patients");
      if (storedPatients) {
        setPatientsList(JSON.parse(storedPatients));
      } else {
        // If localStorage empty, use JSON
        const patientListsResponse = patientData as ProviderListResponse;
        if (patientListsResponse.status === "success") {
          setPatientsList([...patientListsResponse.patient_data]);
          localStorage.setItem(
            "patients",
            JSON.stringify(patientListsResponse.patient_data)
          );
        } else {
          setPatientsList([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch patients data:", error);
      setPatientsList([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Update Patient Status from localStorage ---------- */
  const updatePatientStatusFromLocalStorage = () => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatientsList(JSON.parse(storedPatients));
    }
  };

  /* ---------- Load Data ---------- */
  useEffect(() => {
    setLoading(true);
    fetchProviderData();
  }, []);

  /* ---------- Listen for updates to localStorage ---------- */
  useEffect(() => {
    // updates the table if status changes in patient detail page
    window.addEventListener("storage", updatePatientStatusFromLocalStorage);
    return () =>
      window.removeEventListener("storage", updatePatientStatusFromLocalStorage);
  }, []);

  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      router.push(`/patients/patients-preview/${id}`);
    }, 400);
  };

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          mt={2}
          mb={2}
          px={2}
          sx={{ fontWeight: 600 }}
        >
          Patient Lists
        </Typography>

        <Divider sx={{mb: "2"}} />

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
                          disabled={!!loadingId}
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
                      No patients found
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
