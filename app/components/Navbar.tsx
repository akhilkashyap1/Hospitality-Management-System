"use client";

import { AppBar, Toolbar, Button } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} href="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} href="/patients">
          Patients
        </Button>
        <Button color="inherit" component={Link} href="/doctors">
          Doctors
        </Button>
        <Button color="inherit" component={Link} href="/patients/DischargePatients">
          Discharge Patients
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
