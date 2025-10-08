"use client";

import { Notification } from "@/types/notification";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { deleteNotificationById } from "../[id]/actions";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const handleDeleteAlert = async () => {
    await deleteNotificationById(String(notification.id));
  };
  return (
    <div className="flex flex-row gap-2 p-4 border-b border-gray-200 justify-between">
      <Link
        passHref={true}
        href={`notifications/${String(notification.id)}?to=${encodeURIComponent(
          String(notification?.landing_url)
        )}`}
      >
        {notification.content}
      </Link>
      <button className="p-1" onClick={handleDeleteAlert}>
        <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
}
