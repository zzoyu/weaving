import { useEffect } from "react";

export function useUnsavedChangesWarning(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return;

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("popstate", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", handleWindowClose);
    };
  }, [isDirty]);
}
