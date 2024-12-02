import { redirect } from "next/navigation";
import { deleteNotificationById } from "./actions";

export default async function NotificationPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = params;
  // remove the notification and redirect to the page

  await deleteNotificationById(id);
  const { to } = await searchParams;

  redirect(`${to ? decodeURIComponent(String(to)) : "/"}`);
}
