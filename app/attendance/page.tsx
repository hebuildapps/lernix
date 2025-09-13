"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHeatmap from "../components/attendance/AttendanceHeatmap";
import RecentAttendance from "../components/attendance/RecentAttendance";
import { generateMockAttendance } from "../data/mockData";

export default function AttendancePage() {
  const attendanceData = generateMockAttendance();

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl mt-14 font-bold text-gray-900">
            Attendance Tracking
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your class attendance and academic progress
          </p>
        </div>

        <AttendanceStats attendanceData={attendanceData} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <AttendanceHeatmap attendanceData={attendanceData} />
          </div>
          <div>
            <RecentAttendance attendanceData={attendanceData} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
