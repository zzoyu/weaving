import { marked } from "marked";
import { notFound } from "next/navigation";
import ButtonBack from "../../components/button-back";
import { fetchNoticeItem } from "../actions";

export default async function NoticePage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the notice by ID
  const { id } = params;
  const noticeItem = await fetchNoticeItem(Number(id));
  if (!noticeItem) {
    notFound();
  }

  const markdown = `
# 공지사항
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
`;

  const parsedMarkdown = marked.parse(noticeItem.content, {
    breaks: true,
  });

  return (
    <main className="flex flex-col justify-start pt-4 lg:pt-10 w-full lg:max-w-[40rem] mx-auto">
      <div className="fixed top-0 w-full flex p-4">
        <h2 className="flex gap-2 items-center text-xl">
          <ButtonBack />
          <span className="line-clamp-2">{noticeItem.title}</span>
        </h2>
      </div>
      <div className="px-4 py-2">
        <p className="text-gray-500 text-xs text-right px-4">
          {new Date(noticeItem.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <div className="pt-6 lg:pt-10 px-2 lg:px-4">
          <div className="flex flex-col gap-4">
            <article
              className="prose prose-stone prose-h1:font-pretendard prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-p:text-base dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
