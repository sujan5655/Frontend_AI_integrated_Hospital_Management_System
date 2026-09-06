import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPatientDashboard } from "../features/patientDashboardSlice";

export default function PatientDashboard() {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector(
    (state) => state.patientDashboard,
  );

  useEffect(() => {
    dispatch(fetchPatientDashboard());
  }, [dispatch]);

  if (loading) {
    return <div>Loading patient dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No dashboard data available.</div>;
  }

  return (
    <div>
      <h1>Patient Dashboard</h1>

      <hr />

      <h2>Patient Information</h2>

      <p>
        <strong>Name:</strong> {data.patient?.first_name}{" "}
        {data.patient?.last_name}
      </p>

      <p>
        <strong>Email:</strong> {data.patient?.email}
      </p>

      <hr />

      <h2>Dashboard Summary</h2>

      <p>
        <strong>Appointments:</strong> {data.appointments_count ?? 0}
      </p>

      <p>
        <strong>Medical Reports:</strong> {data.medical_reports_count ?? 0}
      </p>

      <hr />

      <h2>Raw Dashboard Data</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
