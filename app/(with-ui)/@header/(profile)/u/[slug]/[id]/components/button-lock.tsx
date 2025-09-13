"use client";

import OverlayLoading from "@/components/overlay-loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { setCharacterPassword } from "../actions";

export function DialogLock({ characterId }: { characterId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="context-menu-item" onClick={() => setIsOpen(true)}>
          캐릭터 잠금
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={(formData) => {
            setCharacterPassword(formData)
              .then(() => {
                toast({
                  description: "캐릭터가 잠금 처리되었습니다.",
                });
              })
              .finally(() => {
                setIsOpen(false);
                setIsSubmitting(false);
              });
          }}
          onSubmit={(e) => {
            if (isSubmitting) {
              e.preventDefault();
              return;
            }
            setIsSubmitting(true);
          }}
        >
          <input type="hidden" name="character_id" value={characterId} />
          <DialogHeader>
            <DialogTitle>캐릭터 잠금</DialogTitle>
            <DialogDescription>
              캐릭터를 잠그면 로그인 하지 않은 사용자는 비밀번호를 입력해야
              열람이 가능합니다. 친구로 등록된 유저는 비밀번호를 입력하지 않고도
              열람이 가능합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                비밀번호
              </Label>
              <Input
                id="password"
                name="password"
                className="col-span-3"
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              잠그기
            </Button>
          </DialogFooter>
          {isSubmitting ? (
            <OverlayLoading message="잠금 처리 중입니다..." />
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ButtonLock({ characterId }: { characterId: number }) {
  return <DialogLock characterId={characterId} />;
}
