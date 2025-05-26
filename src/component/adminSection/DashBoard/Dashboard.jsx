import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Quick Stats</h2>
          <div className="space-y-2">
            <p>Total Students: 1,245</p>
            <p>Active Courses: 35</p>
            <p>Faculty Members: 68</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Recent Activities</h2>
          <div className="space-y-2">
            <p>New course added: Advanced Data Structures</p>
            <p>4 new faculty members joined</p>
            <p>Upcoming event: Career Fair 2025</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Notifications</h2>
          <div className="space-y-2">
            <p>3 new applications pending review</p>
            <p>System maintenance scheduled for next week</p>
            <p>End of semester exams starting soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
