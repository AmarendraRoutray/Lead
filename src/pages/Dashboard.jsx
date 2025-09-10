import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
