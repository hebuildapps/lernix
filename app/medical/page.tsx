"use client";

import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import MedicalLeaveForm from "../components/medical/MedicalLeaveForm";
import MedicalLeaveList from "../components/medical/MedicalLeaveList";
import { mockMedicalLeaves } from "../data/mockData";
import { MedicalLeave } from "../types";

export default function MedicalPage() {
  const [showForm, setShowForm] = useState(false);
  const [leaves, setLeaves] = useState(mockMedicalLeaves);

  const handleSubmit = (
    newLeave: Omit<MedicalLeave, "id" | "submittedDate" | "status">
  ) => {
    const leave: MedicalLeave = {
      ...newLeave,
      id: `ml-${Date.now()}`,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setLeaves([leave, ...leaves]);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl mt-14 font-bold text-gray-900">
              Medical Leave Management
            </h1>
            <p className="text-gray-600 mt-1">
              Submit and track your medical leave applications
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Request
            </button>
          )}
        </div>

        {showForm ? (
          <MedicalLeaveForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <MedicalLeaveList leaves={leaves} />
        )}
      </div>
    </Layout>
  );
}
