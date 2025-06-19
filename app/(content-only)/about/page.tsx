import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return <div className="font-pretendard">
    <div>
    <h1 className="text-center">창작자를 위한 캐릭터 & 세계관 관리 플랫폼</h1>
    <p className="text-center">
      지금, 당신만의 캐릭터와 세계관을 정리하고 연결해보세요.
    </p>
    <div className="flex justify-center">
      <Button variant="outline"
      >
        위빙 시작하기
      </Button>
    </div>
    </div>
    <div>
      <h2>모든 창작자를 위해</h2>
      <ul>
        <li>
          만화, 시나리오 작가 등 서사 기반 창작자
        </li>
        <li>
          캐릭터 정보를 시각화하는 디자이너, 일러스트레이터
        </li>
        <li>
          오리지널 캐릭터를 만드는 모든 크리에이터
        </li>
      </ul>
    </div>
    <div>
      <h2>흩어지지 않게, 연결되게</h2>
      <p>서사를 만들다 보면 자꾸 흩어지는 정보들, 위빙에서 정리하세요.</p>
      <div>

        <h3>캐릭터와 세계관 설정을 한 곳에서 통합 관리</h3>
        <p>
        블로그, 클라우드, 메모장에 흩어져 있던 
캐릭터·세계관·관계도를
위빙 안에서 한 번에 정리하고 관리해보세요.
        </p>
      </div>
      <div>
        <h3>검색과 분류 기능으로 깔끔하게 정리</h3>
        <p>테마색, 이름, 해시태그 기반으로 캐릭터를 정렬·검색할 수 있어 프로필 수가 많아도 문제 없어요.</p>
      </div>
      <div>
        <h3>관계도에서 만나보는
        친구의 캐릭터</h3>
        <p>팔로우한 친구의 캐릭터를 선택하여
내 캐릭터와의 관계를 설정하고, 
관계도 형태로 시각화할 수 있어요.</p>
      </div>
      <div>
        <h3>커미션이나 협업도 링크 하나로 해결</h3>
        <p>사진과 주요 정보가 담긴 캐릭터 프로필 페이지를 링크로 간편하게 전달할 수 있어요.</p>
      </div>
    </div>
    <div>
      <h2>여러분의 특별한 세상을 위빙에서 공유해보세요.</h2>
    </div>
    <div>
      <h2>FAQ</h2>
    </div>
  </div>;
}