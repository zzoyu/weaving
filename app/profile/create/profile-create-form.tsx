"use client";
import OverlayLoading from "@/components/overlay-loading";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProfile } from "./actions";

interface ProfileCreateFormProps {
  user: any;
}

export default function ProfileCreateForm({ user }: ProfileCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const res = await createProfile(formData);
    if (res && res.success) {
      router.push("/profile");
    } else {
      toast({
        description: res?.message || "프로필 생성에 실패했습니다.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input hidden type="text" name="user_id" value={user.id} />
      <input
        hidden
        type="text"
        name="profile_url"
        value={user.user_metadata?.avatar_url}
      />
      <label htmlFor="name">이름</label>
      <input type="text" name="nickname" required className="bg-transparent" />
      <label htmlFor="slug">접근 주소</label>
      <input type="text" name="slug" required className="bg-transparent" />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2"
      >
        작성하기
      </button>
      {isSubmitting ? (
        <OverlayLoading message="프로필을 생성 중입니다..." />
      ) : null}
    </form>
  );
}
