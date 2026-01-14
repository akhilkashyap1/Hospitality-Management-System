"use client";

import React, { useEffect, useState } from "react";
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
} from "@mui/material";

import TableSkeleton from "../../components/table/TableSkeleton";
import doctorsData from "../../JSON/doctors.json";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contact_number: string;
  email: string;
  availability: string;
}

const DoctorsPage: React.FC = () => {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const headers = [
    "ID",
    "Name",
    "Specialization",
    "Contact",
    "Email",
    "Availability",
    "Actions",
  ];

  useEffect(() => {
    setLoading(true);

    if (doctorsData.status === "success") {
      // Simulate API delay
      setTimeout(() => {
        setDoctorsList(doctorsData.doctors_data);
        setLoading(false);
      }, 1000);
    } else {
      console.error("Failed to fetch doctors data");
      setLoading(false);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Card sx={{ mt: 4 }}>
        <Typography variant="h5" mt={2} mb={2} px={2} fontWeight={600}>
          All Doctors
        </Typography>

        <Divider />

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
                {loading ? (
                  <TableSkeleton rows={5} columns={headers.length} />
                ) : (
                  doctorsList.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.id}</TableCell>
                      <TableCell>{doctor.name}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.contact_number}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.availability}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DoctorsPage;
