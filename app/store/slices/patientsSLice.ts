import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../types/PatientDetails";
import patientData from "../../JSON/patients.json";

/* ===================== State Type ===================== */
interface PatientsState {
  patients: Patient[];
}

/* ===================== Initial State ===================== */
const initialState: PatientsState = {
  patients: patientData.patient_data as Patient[],
};

/* ===================== Slice ===================== */
const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    /**
     * Mark a patient as discharged by ID
     */
    dischargePatient: (state, action: PayloadAction<string>) => {
      const patientId = action.payload;
      state.patients = state.patients.map((patient) =>
        patient.id === patientId
          ? { ...patient, patient_status: "discharged" }
          : patient
      );
    },

    /**
     * Update the status of a patient by ID
     */
    updatePatientStatus: (
      state,
      action: PayloadAction<{ id: string; status: Patient["patient_status"] }>
    ) => {
      const { id, status } = action.payload;
      state.patients = state.patients.map((patient) =>
        patient.id === id ? { ...patient, patient_status: status } : patient
      );
    },
  },
});

/* ===================== Exports ===================== */
export const { dischargePatient, updatePatientStatus } = patientsSlice.actions;
export default patientsSlice.reducer;
