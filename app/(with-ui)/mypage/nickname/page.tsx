import { redirect } from "next/navigation";
import { fetchMyProfileNickname } from "../actions";
import NicknameTemplate from "./components/nickname-template";

export default async function NicknamePage() {
  let nickname = "";
  let lastChangedAt = undefined;

  try {
    ({ nickname, lastChangedAt } = await fetchMyProfileNickname());
    console.log(nickname);
  } catch (error) {
    console.error("Failed to fetch nickname:", error);
    redirect("/mypage");
  }

  return (
    <div className="w-full md:max-w-[40rem] mx-auto h-full">
      <NicknameTemplate nickname={nickname} lastChangedAt={lastChangedAt} />
    </div>
  );
}
