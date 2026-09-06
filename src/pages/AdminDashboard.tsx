import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access");
    navigate("/login");
  };
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <p>Welcome {user?.email}</p>

      <p>Role: {user?.role}</p>

      <hr />

      <h2>Administration</h2>

      <div>Manage Users</div>

      <div>Approve Doctors</div>

      <div>Manage Patients</div>

      <div>Manage Appointments</div>

      <div>View Reports</div>
    </div>
  );
}
