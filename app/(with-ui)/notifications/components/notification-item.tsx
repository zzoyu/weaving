"use client";

import { Notification } from "@/types/notification";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <Link
      passHref={true}
      href={`notifications/${String(notification.id)}?to=${encodeURIComponent(String(notification?.landing_url))}`}
      className="flex flex-col gap-2 p-4 border-b border-gray-200"
    >
      {notification.content}
    </Link>
  );
}
