"use client";
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from "@mui/material";
import doctorsData from "../JSON/doctors.json"; // your local JSON file

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

  // Table headers
  const headers = ["ID", "Name", "Specialization", "Contact", "Email", "Availability", "Actions"];

  // Fetch doctors from JSON
  useEffect(() => {
    if (doctorsData.status === "success") {
      setDoctorsList(doctorsData.doctors_data);
    } else {
      console.error("Failed to fetch doctors data");
    }
  }, []);

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <Typography variant="h5" mt={2} mb={2} px={2} sx={{ fontWeight: 600 }}>
          All Doctors
        </Typography>
        <Divider sx={{mb: "2"}} />
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
                {doctorsList.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.id}</TableCell>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.contact_number}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.availability}</TableCell>
                    <TableCell>
                      {/* Example action button; you can add View/Edit */}
                      <Button variant="contained" color="primary" disabled>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DoctorsPage;
