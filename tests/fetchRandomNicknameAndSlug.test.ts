import { fetchRandomNicknameAndSlug } from "@/app/(content-only)/onboarding/actions";
import { describe, expect, it, vi } from "vitest";
import { generateProviderId } from "./generateProviderId";

// stub a metadata type
type TwitterMetadata = { provider_id: string | number };

// import the function under test

// mock supabase client used inside the function
vi.mock("../utils/supabase/server", () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            // default: no existing slug
            then: (cb: any) => cb([]),
          }),
        }),
      }),
    }),
  }),
}));

describe("충돌 테스트", () => {
  it("충돌이 발생하지 않아야 한다", async () => {
    const seenNicknames = new Set<string>();
    const seenSlugs = new Set<string>();
    const total = 5000;
    for (let i = 0; i < total; i++) {
      const provider_id = generateProviderId(); // 19자리 숫자 문자열 생성
      const { nickname, slug } = await fetchRandomNicknameAndSlug({
        provider_id: provider_id,
      } as any);
      if (seenNicknames.has(nickname) || seenSlugs.has(slug)) {
        // print detailed debug info before letting the test fail
        console.log(`Collision at iteration ${i}`);
        console.log(`provider_id: ${provider_id}`);
        console.log(`nickname: ${nickname}`);
        console.log(`slug: ${slug}`);
      }
      expect(seenNicknames.has(nickname)).toBe(false);
      expect(seenSlugs.has(slug)).toBe(false);
      seenNicknames.add(nickname);
      seenSlugs.add(slug);
    }
    expect(seenNicknames.size).toBe(total);
    expect(seenSlugs.size).toBe(total);
  });
});
