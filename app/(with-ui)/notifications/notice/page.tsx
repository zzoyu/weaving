import { TabHeader } from "@/app/(with-ui)/u/[slug]/components/tab-header";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { fetchHasNotificationsByProfileId } from "../actions";
import ButtonBack from "../components/button-back";
import { fetchNoticeList } from "./actions";

export default async function NoticePage() {
  const noticeList = await fetchNoticeList();
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const profileResponse = await fetchProfileByUserId(data?.user?.id as string);
  const { hasNotifications } = (await fetchHasNotificationsByProfileId(
    profileResponse?.id
  )) ?? { hasNotifications: false };

  return (
    <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
      <div className="fixed top-0 w-full flex p-4">
        <h2 className="flex gap-2 items-center text-xl">
          <ButtonBack />
          공지사항
        </h2>
      </div>
      <div className="p-4">
        {profileResponse?.id && (
          <TabHeader
            activeIndex={1}
            data={[
              {
                title: "활동",
                href: "/notifications",
                isNew: hasNotifications,
              },
              { title: "공지", href: "/notifications/notice", isNew: true },
            ]}
          />
        )}
        <div className="pt-6 md:pt-10 px-2 md:px-4">
          <div className="flex flex-col">
            {noticeList &&
              noticeList.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notifications/notice/${notice.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="px-2 py-4 border-b border-gray-200">
                    <h3 className="text-sm md:text-base font-semibold">{notice.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {new Date(notice.created_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
