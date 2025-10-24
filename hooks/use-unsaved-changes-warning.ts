import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useUnsavedChangesWarning(isDirty: boolean) {
  const router = useRouter();
  const preventNavigation = useRef(false);
  const originalPush = useRef<typeof router.push>();
  const originalReplace = useRef<typeof router.replace>();

  useEffect(() => {
    if (!isDirty) {
      preventNavigation.current = false;
      return;
    }

    preventNavigation.current = true;

    // 브라우저 새로고침, 탭 닫기 등을 감지
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?";
      return e.returnValue;
    };

    // 브라우저 뒤로가기 버튼을 감지
    const handlePopState = (e: PopStateEvent) => {
      if (preventNavigation.current) {
        const shouldLeave = confirm(
          "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?"
        );
        if (!shouldLeave) {
          // 뒤로가기를 취소하고 현재 페이지로 다시 이동
          window.history.pushState(null, "", window.location.href);
          e.preventDefault();
        } else {
          preventNavigation.current = false;
        }
      }
    };

    // Link 컴포넌트 클릭을 가로채기
    const handleLinkClick = (e: MouseEvent) => {
      if (!preventNavigation.current) return;

      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;

      if (link && link.href && link.href !== window.location.href) {
        // 외부 링크가 아닌 내부 링크인지 확인
        const isInternalLink =
          link.href.startsWith(window.location.origin) ||
          link.getAttribute("href")?.startsWith("/");

        if (isInternalLink) {
          e.preventDefault();
          e.stopPropagation();

          const shouldLeave = confirm(
            "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?"
          );
          if (shouldLeave) {
            preventNavigation.current = false;
            // 네비게이션 실행
            if (link.getAttribute("href")?.startsWith("/")) {
              router.push(link.getAttribute("href")!);
            } else {
              window.location.href = link.href;
            }
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick, true); // capture phase에서 처리

    // Next.js 라우터의 push/replace 메서드를 오버라이드
    if (!originalPush.current) {
      originalPush.current = router.push;
      router.push = (...args: Parameters<typeof router.push>) => {
        if (preventNavigation.current) {
          const shouldLeave = confirm(
            "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?"
          );
          if (shouldLeave) {
            preventNavigation.current = false;
            return originalPush.current!(...args);
          }
          return Promise.resolve();
        }
        return originalPush.current!(...args);
      };
    }

    if (!originalReplace.current) {
      originalReplace.current = router.replace;
      router.replace = (...args: Parameters<typeof router.replace>) => {
        if (preventNavigation.current) {
          const shouldLeave = confirm(
            "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?"
          );
          if (shouldLeave) {
            preventNavigation.current = false;
            return originalReplace.current!(...args);
          }
          return Promise.resolve();
        }
        return originalReplace.current!(...args);
      };
    }

    // popstate 이벤트가 발생할 때 현재 상태를 유지하기 위해 히스토리에 상태 추가
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick, true);

      // 원래 메서드 복원
      if (originalPush.current) {
        router.push = originalPush.current;
      }
      if (originalReplace.current) {
        router.replace = originalReplace.current;
      }
      preventNavigation.current = false;
    };
  }, [isDirty, router]);
}
