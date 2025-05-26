import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UtilityBar from "../component/Naviagtion/UtilityBar";
import NavBar from "../component/Naviagtion/NavBar";
import Footer from "../component/footer/Footer";

const LecturerDashboard = () => {
  const navigate = useNavigate();  const [lecturer, setLecturer] = useState({
    email: '',
    role: '',
    status: 0
  });
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('lecturerAuth') === 'true';
    const lecturerStatus = Number(localStorage.getItem('lecturerStatus'));
    const lecturerEmail = localStorage.getItem('lecturerEmail');
    const lecturerRole = localStorage.getItem('lecturerRole');

    if (!isAuthenticated) {
      navigate('/', { state: { openLoginModal: true } });
      return;
    }

    // If admin (status 1), redirect to admin dashboard
    if (lecturerStatus === 1) {
      navigate('/admin/dashboard');
      return;
    }    setLecturer({
      email: lecturerEmail,
      role: lecturerRole,
      status: lecturerStatus
    });
  }, [navigate]);

  return (
    <>
      <UtilityBar />
      <NavBar />
      
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Lecturer Dashboard</h1>              <p className="text-gray-600 mt-1">
                Welcome {lecturer.email} • {lecturer.role}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border shadow-sm">
                <h2 className="font-bold text-lg mb-2">My Courses</h2>
                <ul className="space-y-2">
                  <li className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">Advanced Database Systems</p>
                    <p className="text-sm text-gray-600">Tuesday, 10:00 - 12:00</p>
                  </li>
                  <li className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">Web Programming</p>
                    <p className="text-sm text-gray-600">Monday, 14:00 - 16:00</p>
                  </li>
                  <li className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">Data Structures</p>
                    <p className="text-sm text-gray-600">Wednesday, 09:00 - 11:00</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border shadow-sm">
                <h2 className="font-bold text-lg mb-2">Upcoming Classes</h2>
                <ul className="space-y-2">
                  <li className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">Web Programming</p>
                    <p className="text-sm text-gray-600">Today, 14:00 - 16:00</p>
                    <p className="text-xs text-gray-500">Lab 3B</p>
                  </li>
                  <li className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">Data Structures</p>
                    <p className="text-sm text-gray-600">Tomorrow, 09:00 - 11:00</p>
                    <p className="text-xs text-gray-500">Room 205</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border shadow-sm">
                <h2 className="font-bold text-lg mb-2">Notifications</h2>
                <ul className="space-y-2">
                  <li className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-500">
                    <p className="font-medium">Faculty Meeting</p>
                    <p className="text-sm text-gray-600">Friday, 13:00 in Conference Room</p>
                  </li>
                  <li className="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-500">
                    <p className="font-medium">Grade Submission</p>
                    <p className="text-sm text-gray-600">Due next Monday for all courses</p>
                  </li>
                  <li className="bg-white p-3 rounded shadow-sm border-l-4 border-green-500">
                    <p className="font-medium">Professional Development</p>
                    <p className="text-sm text-gray-600">Workshop available next month</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-bold text-lg mb-4">Recent Activities</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 25, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Assignment Graded</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Web Programming</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 24, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Lecture Delivered</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Data Structures</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 20, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Quiz Created</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Advanced Database Systems</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default LecturerDashboard;
