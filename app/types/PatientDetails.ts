export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  patient_status: string
}
export type PatientStatus = "booked" | "pending" | "treated" | "discharged";
