import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InputPassword from "../../../[id]/components/input-password";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return (
    <form
      className="flex flex-col w-full h-full"
      action={async (formData) => {
        "use server";
        const cookie = await cookies();
        const password = formData.get("password");
        if (typeof password === "string") {
          cookie.set(`${params.slug}-${params.id}`, password);
        }
        redirect(`/u/${params.slug}/${params.id}`);
      }}
    >
      <InputPassword />
    </form>
  );
}
