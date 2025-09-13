"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import AcademicHub from "../components/academic/AcademicHub";
import { mockAcademicContent, mockSubjects } from "../data/mockData";

export default function AcademicPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mt-14 text-gray-900">
            Academic Content Hub
          </h1>
          <p className="text-gray-600 mt-1">
            Access your courses, assignments, and study materials
          </p>
        </div>

        <AcademicHub content={mockAcademicContent} subjects={mockSubjects} />
      </div>
    </Layout>
  );
}
