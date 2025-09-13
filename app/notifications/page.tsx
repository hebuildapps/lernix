"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import NotificationCenter from "../components/notifications/NotificationCenter";
import { mockNotifications } from "../data/mockData";

export default function NotificationsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl mt-14 font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with important announcements and alerts
          </p>
        </div>

        <NotificationCenter notifications={mockNotifications} />
      </div>
    </Layout>
  );
}
