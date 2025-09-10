import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">MyApp</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        </li>
        <li>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
