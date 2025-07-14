// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Title from "../components/Title";
// import { Users, UserCheck, UserX, CalendarClock } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [data, setData] = useState({
//     totalEmployees: 0,
//     presentToday: 0,
//     absentToday: 0,
//     totalLeavesPending: 0,
//     recentAttendance: [],
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const emphandleclick = () => {
//     navigate("/admin/manage-employees");
//   };

//   const dashboardCards = [
//     {
//       onclick: emphandleclick,
//       title: "Total Employees",
//       value: data.totalEmployees,
//       icon: <Users className="text-blue-600 w-5 h-5" />,
//     },
//     {
//       title: "Present Today",
//       value: data.presentToday,
//       icon: <UserCheck className="text-green-600 w-5 h-5" />,
//     },
//     {
//       title: "Absent Today",
//       value: data.absentToday,
//       icon: <UserX className="text-red-500 w-5 h-5" />,
//     },
//     {
//       title: "Pending Leave Requests",
//       value: data.totalLeavesPending,
//       icon: <CalendarClock className="text-yellow-500 w-5 h-5" />,
//     },
//   ];

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/dashboard");
//         setData(res.data);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   if (loading) return <SkeletonDashboard />;

//   return (
//     <div className="px-6 pt-10 md:px-15 flex-2 ">
//       {/* Title */}
//       <Title
//         title="Admin Dashboard"
//         subTitle="Monitor attendance, employees and leave activity in real-time"
//       />

//       {/* Dashboard Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-5xl ">
//         {dashboardCards.map((card, index) => (
//           <div
//             onClick={card.onclick}
//             key={index}
//             className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor bg-white shadow-sm h-40 cursor-pointer"
//           >
//             <div className="text-5xl flex flex-col">
//               <h1 className="m-0 text-base text-gray-500">{card.title}</h1>
//               <p className="text-2xl font-semibold">{card.value}</p>
//             </div>
//             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Attendance */}
//       <div className="bg-white p-4 rounded-md border border-borderColor shadow-sm max-w-3xl">
//         <h2 className="text-md font-semibold mb-4">Recent Check-ins</h2>
//         <div className="divide-y text-sm text-gray-700">
//           {data.recentAttendance.map((att, idx) => (
//             <div key={idx} className="py-2 flex justify-between">
//               <span>{att.empName}</span>
//               <span className="text-sm text-gray-500">
//                 {att.time} ({att.status})
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SkeletonDashboard = () => (
//   <div className="px-6 pt-10 md:px-15 flex-2 animate-pulse">
//     <Title
//       title="Admin Dashboard"
//       subTitle="Monitor attendance, employees and leave activity in real-time"
//     />
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-5xl">
//       {Array(4)
//         .fill(0)
//         .map((_, i) => (
//           <div
//             key={i}
//             className="h-40 p-4 rounded-md border border-borderColor bg-white shadow-sm flex justify-between items-center"
//           >
//             <div className="space-y-2">
//               <div className="h-4 w-24 bg-gray-200 rounded" />
//               <div className="h-6 w-16 bg-gray-300 rounded" />
//             </div>
//             <div className="w-12 h-12 bg-gray-200 rounded-full" />
//           </div>
//         ))}
//     </div>

//     <div className="bg-white p-4 rounded-md border border-borderColor shadow-sm max-w-3xl">
//       <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
//       <div className="space-y-3">
//         {Array(3)
//           .fill(0)
//           .map((_, i) => (
//             <div key={i} className="flex justify-between">
//               <div className="h-4 w-32 bg-gray-200 rounded" />
//               <div className="h-4 w-20 bg-gray-200 rounded" />
//             </div>
//           ))}
//       </div>
//     </div>
//   </div>
// );

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // custom axios with baseURL
import Title from "../components/Title";
import { Users, UserCheck, UserX, CalendarClock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/"); // redirect to login
  };

  const fetchUserDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err.message);
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDashboard();
  }, []);

  if (loading) return <SkeletonDashboard />;

  const { user, profile } = data || {};

  return (
    <div className="px-6 pt-10 md:px-15 flex-2">
      {/* Title */}
      <div className="flex justify-between items-start">
        <Title
          title={`Welcome ${user?.name || "User"}`}
          subTitle="This is your personal dashboard"
        />
        <button
          onClick={handleLogout}
          className="text-red-500 border px-3 py-1 rounded-md border-red-500 hover:bg-red-100"
        >
          <LogOut className="inline-block w-4 h-4 mr-1" /> Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-md border shadow-sm mb-6 max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">Profile Info</h2>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        {profile && (
          <>
            <p>
              <strong>Phone:</strong> {profile?.phone}
            </p>
            <p>
              <strong>DOB:</strong> {profile?.dob}
            </p>
            <p>
              <strong>Address:</strong> {profile?.address}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const SkeletonDashboard = () => (
  <div className="px-6 pt-10 md:px-15 flex-2 animate-pulse">
    <Title
      title="Loading Dashboard..."
      subTitle="Please wait while we fetch your data"
    />
    <div className="h-40 bg-gray-200 rounded-md mb-6" />
    <div className="h-24 bg-gray-200 rounded-md" />
  </div>
);

export default Dashboard;
