"use client";

import { createProfile } from "@/app/profile/create/actions";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSurveyResponse } from "../actions";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

interface OnboardingProps extends React.HTMLAttributes<HTMLFormElement> {
  id: string;
  user: TwitterMetadata;
  defaultProfile?: {
    nickname: string;
    slug: string;
  };
}

export default function Onboarding({
  id,
  user,
  defaultProfile,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileToCreate, setProfileToCreate] = useState<Profile>({
    user_id: id,
    nickname: defaultProfile?.nickname || "",
    slug: defaultProfile?.slug || "",
    profile_image: user?.picture as string,
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const router = useRouter();

  const steps = [
    <Step1
      key="step1"
      profile={profileToCreate}
      onNext={(nickname: string) => {
        console.log("닉네임:", nickname);
        setProfileToCreate((prev) => ({ ...prev, nickname }));
        handleNextStep();
      }}
    />,
    <Step2
      key="step2"
      onNext={async (choices: string[]) => {
        if (choices.length > 0) {
          const { error } = await createSurveyResponse(choices);
          if (error) {
            Sentry.captureException(error);
          }
        }
        const { success } = await createProfile(profileToCreate);
        if (!success) {
          const err = new Error("프로필 생성에 실패했습니다.");
          Sentry.captureException(err);
          return;
        }
        handleNextStep();
      }}
    />,
    <Step3
      key="step3"
      nickname={profileToCreate.nickname}
      onNext={() => {
        router.replace("/u/" + profileToCreate.slug);
      }}
    />,
  ];

  return (
    <div className="w-full md:max-w-md h-full mx-auto pt-10">
      {steps[currentStep]}
    </div>
  );
}
