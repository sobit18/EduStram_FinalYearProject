import React, { useEffect, useState } from "react";
import { getUserApi } from "../api/user.api";
import Scheduletable from "./Scheduletable";

const Dashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await getUserApi();
        console.log("tecaherData details",res)
        setTeacherData(res?.user|| null);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, []);

  if (loading) return <div>Loading teacher data...</div>;
  if (!teacherData) return <div>Teacher not found</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {teacherData.fullName}!</h2>
        <p className="text-gray-600">Here's what's happening with your classes today.</p>
      </div>

      {/* Schedule Table */}
      <Scheduletable teacherId={teacherData?._id} />
    </div>
  );
};

export default Dashboard;
