import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchDoctorDashboard } from "../doctor/doctorDashboardThunk";

export default function DoctorDashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDoctorDashboard());
  }, [dispatch]);

  const { dashboard, loading, error } = useAppSelector(
    (state) => state.doctorDashboard,
  );
  console.log(dashboard);
  if (!dashboard) {
    return (
      <div>
        <h2>Doctor Dashboard</h2>
        <p>No dashboard data available.</p>
      </div>
    );
  }
  const {
    statistics,
    doctor,
    today_appointments,
    total_appointments,
    upcoming_appointments,
    completed_appointments,
  } = dashboard;

  if (loading) {
    return (
      <div>
        <h2>Doctor Dashboard</h2>
        <p>Loading doctor dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Doctor Dashboard</h2>
        <p style={{ color: "red" }}>{error}</p>

        <button onClick={() => dispatch(fetchDoctorDashboard())}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>

      {/* Doctor Information */}
      <div>
        <h2>Doctor Information</h2>

        <p>
          <strong>Name:</strong> {doctor?.name ?? "N/A"}
        </p>

        <p>
          <strong>Email:</strong> {doctor?.email ?? "N/A"}
        </p>

        <p>
          <strong>Specialization:</strong> {doctor?.specialization ?? "N/A"}
        </p>

        <p>
          <strong>Phone:</strong> {doctor?.phone ?? "N/A"}
        </p>

        <p>
          <strong>Experience:</strong> {doctor?.experience_years ?? 0} years
        </p>

        <p>
          <strong>Availability:</strong>{" "}
          {doctor?.is_available ? "Available" : "Unavailable"}
        </p>

        <p>
          <strong>Approval:</strong>{" "}
          {doctor?.is_approved ? "Approved" : "Not Approved"}
        </p>
      </div>

      {/* Appointment Statistics */}
      <div>
        <h2>Appointment Statistics</h2>

        <div>
          <h3>Total Appointments</h3>
          <p>{statistics?.total_appointments ?? 0}</p>
        </div>

        <div>
          <h3>Today's Appointments</h3>
          <p>{statistics?.today_appointments ?? 0}</p>
        </div>

        <div>
          <h3>Upcoming Appointments</h3>
          <p>{statistics?.upcoming_appointments ?? 0}</p>
        </div>

        <div>
          <h3>Completed Appointments</h3>
          <p>{statistics?.completed_appointments ?? 0}</p>
        </div>

        <div>
          <h3>Pending Appointments</h3>
          <p>{statistics?.pending_appointments ?? 0}</p>
        </div>

        <div>
          <h3>Cancelled Appointments</h3>
          <p>{statistics?.cancelled_appointments ?? 0}</p>
        </div>
      </div>

      {/* Today's Appointments */}
      <div>
        <h2>Today's Appointments</h2>

        {today_appointments?.today_appointments?.length ? (
          data.today_appointments.map((appointment: any) => (
            <div key={appointment.id}>
              <p>Appointment #{appointment.id}</p>
            </div>
          ))
        ) : (
          <p>No appointments today.</p>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2>Upcoming Appointments</h2>

        {upcoming_appointments?.length ? (
          upcoming_appointments.map((appointment: any) => (
            <div key={appointment.id}>
              <p>Appointment #{appointment.id}</p>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>

      {/* Completed Appointments */}
      <div>
        <h2>Completed Appointments</h2>

        {completed_appointments?.length ? (
          completed_appointments.map((appointment: any) => (
            <div key={appointment.id}>
              <p>Appointment #{appointment.id}</p>
            </div>
          ))
        ) : (
          <p>No completed appointments.</p>
        )}
      </div>
    </div>
  );
}
