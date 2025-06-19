import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
  return (
    <article className="flex flex-col gap-4 p-4 max-w-3xl mx-auto md:p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-black text-2xl mb-4">
          창작자를 위한
          <br />
          캐릭터 & 세계관 관리 플랫폼
        </h1>
        <p className="text-center text-text-dark mb-7 text-sm">
          지금, 당신만의 캐릭터와 세계관을 정리하고 연결해보세요.
        </p>
        <Button className="py-2.5 px-9">위빙 시작하기</Button>
      </div>
      <div>
        <h2 className="text-left mb-4 font-extrabold text-lg">
          모든 창작자를 위해
        </h2>
        <ul className="flex gap-4 justify-between">
          <li className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4">
            <Image
              src="/assets/images/about/b2_1.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              만화, 시나리오 작가 등<br />
              서사 기반 창작자
            </p>
          </li>
          <li className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4">
            <Image
              src="/assets/images/about/b2_2.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              캐릭터 정보를 시각화하는
              <br />
              디자이너, 일러스트레이터
            </p>
          </li>
          <li className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4">
            <Image
              src="/assets/images/about/b2_3.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              오리지널 캐릭터를 만드는
              <br />
              모든 크리에이터
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-left mb-2 font-extrabold text-lg">
          흩어지지 않게, 연결되게
        </h2>
        <p className=" text-text-dark text-sm mb-4">
          서사를 만들다 보면 자꾸 흩어지는 정보들, 위빙에서 정리하세요.
        </p>
        <div>
          <h3 className="text-left mb-2 font-bold text-sm">
            캐릭터와 세계관 설정을 한 곳에서 통합 관리
          </h3>
          <p className="text-text-dark text-sm">
            블로그, 클라우드, 메모장에 흩어져 있던 캐릭터·세계관·관계도를 위빙
            안에서 한 번에 정리하고 관리해보세요.
          </p>
        </div>
        <div>
          <h3 className="text-left mb-2 font-bold text-sm">
            검색과 분류 기능으로 깔끔하게 정리
          </h3>
          <p className=" text-text-dark text-sm ">
            테마색, 이름, 해시태그 기반으로 캐릭터를 정렬·검색할 수 있어 프로필
            수가 많아도 문제 없어요.
          </p>
        </div>
        <div>
          <h3 className="text-left mb-2 font-bold text-sm">
            관계도에서 만나보는 친구의 캐릭터
          </h3>
          <p className=" text-text-dark text-sm">
            팔로우한 친구의 캐릭터를 선택하여 내 캐릭터와의 관계를 설정하고,
            관계도 형태로 시각화할 수 있어요.
          </p>
        </div>
        <div>
          <h3 className="text-left mb-2 font-bold text-sm">
            커미션이나 협업도 링크 하나로 해결
          </h3>
          <p className=" text-text-dark text-sm">
            사진과 주요 정보가 담긴 캐릭터 프로필 페이지를 링크로 간편하게
            전달할 수 있어요.
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-left mb-2 font-extrabold text-lg">
          여러분의 특별한 세상을 위빙에서 공유해보세요.
        </h2>
      </div>
      <div>
        <h2 className="text-left mb-2 font-extrabold text-lg">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>위빙은 어떤 서비스인가요?</AccordionTrigger>
            <AccordionContent>
              위빙은 창작자들이 캐릭터와 세계관을 통합적으로 관리하고, 서로의
              창작물을 연결할 수 있는 플랫폼입니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>회원가입은 어떻게 하나요?</AccordionTrigger>
            <AccordionContent>
              위빙 홈페이지에서 간단한 회원가입 절차를 통해 가입할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              캐릭터 프로필은 어떻게 만들 수 있나요?
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </article>
  );
}
