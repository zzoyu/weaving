import { marked } from "marked";
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
    throw new Error("Notice not found");
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
    <main className="flex flex-col justify-start pt-4 md:pt-10 w-full md:max-w-[40rem] mx-auto">
      <div className="fixed top-0 w-full flex p-4">
        <h2 className="flex gap-2 items-center">
          <ButtonBack />
          {noticeItem.title}
        </h2>
      </div>
      <div className="p-4">
        <p className="text-gray-500">
          {new Date(noticeItem.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <div className="pt-16 px-4">
          <div className="flex flex-col gap-4">
            <article
              className="prose prose-stone prose-h1:font-pretendard"
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
