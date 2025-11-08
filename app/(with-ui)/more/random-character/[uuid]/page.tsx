import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import {
  fetchLeftRandomCharacterCountByProfileId,
  fetchRandomCharacterResultByUUID,
} from "../actions";
import Page2 from "../components/page2";

export default async function Page({ params }: { params: { uuid: string } }) {
  const data = await fetchRandomCharacterResultByUUID(params.uuid);
  const user = await (await createClient()).auth.getUser();
  let count = 0;
  if (user.data.user?.id) {
    const profile = await fetchProfileByUserId(user.data.user.id);
    if (profile?.id) {
      count = await fetchLeftRandomCharacterCountByProfileId(profile.id);
    }
  }
  return (
    <div className="w-full lg:max-w-xl mx-auto py-8 px-4">
      <Page2
        resultAdditional={data.resultAdditional}
        resultCommon={data.resultCommon}
        count={count}
        uuid={params.uuid}
      />
    </div>
  );
}
