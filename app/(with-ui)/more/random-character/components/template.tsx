"use client";

import { additionalGenerators } from "@/hooks/use-random-character";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateRandomCharacter } from "../actions";
import Page1 from "./page1";

export default function Template({ profile_id }: { profile_id: number }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] =
    useState<keyof typeof additionalGenerators>("option-reality");

  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="w-full">
      <Page1
        goToNextPage={async (selected: keyof typeof additionalGenerators) => {
          setSelectedItem(selected);
          const { error, resultAdditional, resultCommon, leftCount, uuid } =
            await generateRandomCharacter(profile_id, selected);
          if (error) {
            toast({
              description: error,
            });
            return;
          }
          router.push(`/more/random-character/${uuid}`);
        }}
      />
    </div>
  );
}
