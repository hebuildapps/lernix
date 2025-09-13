"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import { mockStudent, mockSubjects } from "../data/mockData";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl mt-14. font-bold text-gray-900">
            Student Profile
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and academic details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">SJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {mockStudent.name}
                </h3>
                <p className="text-gray-600">{mockStudent.studentId}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{mockStudent.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <p className="text-sm text-gray-900">
                    {mockStudent.department}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Semester
                  </label>
                  <p className="text-sm text-gray-900">
                    Semester {mockStudent.semester}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joined
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(mockStudent.joinedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Academic Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Subjects
              </h3>
              <div className="space-y-4">
                {mockSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {subject.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {subject.code} • {subject.credits} credits
                      </p>
                      <p className="text-sm text-gray-500">
                        Instructor: {subject.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {subject.schedule.map((schedule, index) => (
                          <div key={index}>
                            {schedule.day} {schedule.startTime}-
                            {schedule.endTime}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Academic Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {mockSubjects.length}
                  </p>
                  <p className="text-sm text-blue-600">Current Subjects</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {mockSubjects.reduce(
                      (sum, subject) => sum + subject.credits,
                      0
                    )}
                  </p>
                  <p className="text-sm text-green-600">Total Credits</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {mockStudent.semester}
                  </p>
                  <p className="text-sm text-purple-600">Semester</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive attendance alerts and updates
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      SMS Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get text messages for urgent notifications
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Weekly Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive weekly attendance summaries
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
