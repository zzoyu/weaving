import Link from "next/link";
import { fetchBlogList } from "./actions";
import { Pagination } from "./components/pagination";

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);

  try {
    const blogData = await fetchBlogList(currentPage, 5);

    // blogData가 null인 경우 처리
    if (!blogData) {
      return (
        <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
          <div className="fixed top-0 w-full flex p-4 z-10">
            <h2 className="flex gap-2 items-center text-xl">블로그</h2>
          </div>
          <div className="p-4 pt-16">
            <div className="pt-6 md:pt-10 px-2 md:px-4">
              <div className="flex justify-center items-center h-32 text-gray-500">
                블로그 데이터를 불러올 수 없습니다.
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <div className="fixed top-0 w-full flex p-4 z-10">
          <h2 className="flex gap-2 items-center text-xl">블로그</h2>
        </div>
        <div className="p-4 pt-16">
          <div className="pt-6 md:pt-10 px-2 md:px-4">
            <div className="flex flex-col min-h-[400px]">
              {blogData && blogData.articles.length > 0 ? (
                <>
                  {blogData.articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.id}`}
                      className="flex flex-col gap-2 transition-colors"
                    >
                      <div className="px-2 py-4 border-b">
                        <h3 className="text-sm md:text-base font-semibold">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {new Date(article.created_at).toLocaleDateString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* 페이지네이션 */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={blogData.totalPages}
                    basePath="/blog"
                  />
                </>
              ) : (
                <div className="flex justify-center items-center h-32 text-gray-500">
                  블로그 글이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blog page error:", error);
    return (
      <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <div className="fixed top-0 w-full flex p-4 z-10">
          <h2 className="flex gap-2 items-center text-xl">블로그</h2>
        </div>
        <div className="p-4 pt-16">
          <div className="pt-6 md:pt-10 px-2 md:px-4">
            <div className="flex justify-center items-center h-32 text-gray-500">
              서버 오류가 발생했습니다.
            </div>
          </div>
        </div>
      </main>
    );
  }
}
