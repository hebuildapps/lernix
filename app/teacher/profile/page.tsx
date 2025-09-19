'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { mockTeacher, mockSessions } from '../data/mockTeacherData';
import { checkAuth } from '../../utils/auth';

export default function TeacherProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: mockTeacher.name,
    email: mockTeacher.email,
    employeeId: mockTeacher.employeeId,
    department: mockTeacher.department,
    phone: '+91 98765 43210',
    address: '123, Teacher Colony, Pune, Maharashtra - 411001',
    qualification: 'Ph.D. in Computer Science',
    experience: '12 years',
    specialization: 'Data Structures, Algorithms, Machine Learning',
    joinedDate: mockTeacher.joinedDate,
    office: 'Room 205, CS Department',
    officeHours: 'Monday-Friday, 2:00 PM - 4:00 PM'
  });

  const [academicData] = useState({
    totalSubjects: mockTeacher.subjects.length,
    totalStudents: 120,
    totalSessions: mockSessions.length,
    averageAttendance: 82.4,
    publications: 15,
    researchProjects: 3,
    awards: ['Best Teacher Award 2023', 'Research Excellence Award 2022'],
    courses: mockTeacher.subjects
  });

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated || userRole !== 'teacher') {
      router.push('/login');
      return;
    }
  }, [router]);

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    const currentPassword = prompt('Enter current password:');
    if (currentPassword) {
      const newPassword = prompt('Enter new password:');
      if (newPassword) {
        console.log('Password change requested');
        alert('Password updated successfully!');
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your profile information and academic details
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="text-lg font-bold text-gray-900">{profileData.employeeId}</p>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">PS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-lg text-gray-600">{profileData.department}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.qualification}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                  {profileData.experience} Experience
                </span>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {academicData.totalSubjects} Subjects
                </span>
                <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                  {academicData.totalStudents} Students
                </span>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Cancel Edit' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg m-6 mb-0">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👤 Personal Information
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'academic'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎓 Academic Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚙️ Account Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Information */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <p className="text-gray-900 font-medium">{profileData.employeeId}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <p className="text-gray-900 font-medium">{profileData.department}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Office</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.office}
                        onChange={(e) => setProfileData({...profileData, office: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.office}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.address}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.officeHours}
                        onChange={(e) => setProfileData({...profileData, officeHours: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profileData.officeHours}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Academic Profile */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Academic Profile</h3>

                {/* Academic Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{academicData.totalSessions}</p>
                      <p className="text-sm text-blue-900">Sessions Conducted</p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{academicData.averageAttendance}%</p>
                      <p className="text-sm text-green-900">Avg Attendance</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{academicData.publications}</p>
                      <p className="text-sm text-purple-900">Publications</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{academicData.researchProjects}</p>
                      <p className="text-sm text-orange-900">Research Projects</p>
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Educational Background</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Highest Qualification</p>
                      <p className="font-medium text-gray-900">{profileData.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Teaching Experience</p>
                      <p className="font-medium text-gray-900">{profileData.experience}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Specialization</p>
                      <p className="font-medium text-gray-900">{profileData.specialization}</p>
                    </div>
                  </div>
                </div>

                {/* Current Courses */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Current Courses</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {academicData.courses.map((course, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-medium text-gray-900">{course}</h5>
                        <p className="text-sm text-gray-600 mt-1">Active Course</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards & Recognition */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Awards & Recognition</h4>
                  <div className="space-y-2">
                    {academicData.awards.map((award, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-yellow-500 text-xl">🏆</div>
                        <span className="font-medium text-gray-900">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>

                {/* Security Settings */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Security</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h5 className="font-medium text-gray-900">Change Password</h5>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h5 className="font-medium text-gray-900">Two-Factor Authentication</h5>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h5 className="font-medium text-gray-900">Email Notifications</h5>
                        <p className="text-sm text-gray-600">Receive email updates about student activities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h5 className="font-medium text-gray-900">SMS Notifications</h5>
                        <p className="text-sm text-gray-600">Get text messages for urgent updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Account Actions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h5 className="font-medium text-gray-900">Export Data</h5>
                        <p className="text-sm text-gray-600">Download your teaching data and analytics</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Export Data
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                      <div>
                        <h5 className="font-medium text-red-900">Delete Account</h5>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}