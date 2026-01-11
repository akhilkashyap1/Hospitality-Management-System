"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dischargePatient } from "../../store/slices/patientsSLice";
import { RootState, AppDispatch } from "../../store/index";
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
  Paper,
  Button,
} from "@mui/material";

const DischargePatientsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const treatedPatients = useSelector((state: RootState) =>
    state.patients.patients.filter((p) => p.patient_status === "treated")
  );

  const handleDischarge = (id: string) => {
    dispatch(dischargePatient(id));
    alert(`Patient ${id} has been discharged!`);
  };

  // Table headers
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
                    <TableCell key={header}>{header}</TableCell>
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
    </Container>
  );
};

export default DischargePatientsPage;
