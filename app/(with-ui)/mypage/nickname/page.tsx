import { captureException } from "@sentry/nextjs";
import { redirect } from "next/navigation";
import { fetchMyProfileNickname } from "../actions";
import NicknameTemplate from "./components/nickname-template";

export default async function NicknamePage() {
  let nickname = "";
  let lastChangedAt = undefined;

  try {
    ({ nickname, lastChangedAt } = await fetchMyProfileNickname());
  } catch (error) {
    console.error("Failed to fetch nickname:", error);
    captureException(error);
    redirect("/mypage");
  }

  return (
    <div className="w-full lg:max-w-[40rem] mx-auto h-full overflow-auto">
      <NicknameTemplate nickname={nickname} lastChangedAt={lastChangedAt} />
    </div>
  );
}
