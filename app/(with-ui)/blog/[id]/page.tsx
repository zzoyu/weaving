import { ArrowLeftIcon } from "lucide-react";
import { marked } from "marked";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { fetchBlogItem } from "../actions";

function StructuredData({
  post,
}: {
  post: {
    title: string;
    summary: string;
    thumbnail: string;
    publishedAt: string;
  };
}) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          image: post.thumbnail,
          author: { "@type": "Person", name: "위빙" },
          datePublished: post.publishedAt,
        }),
      }}
    />
  );
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchBlogItem(parseInt(id));

  if (!data) {
    notFound();
  }

  const img = data.content.match(/<img[^>]+src="([^">]+)"/)?.[1];
  const description = data.content
    .replace(/<img[^>]*>/g, "")
    .replace(/[#*_`~]/g, "")
    .substring(0, 160);

  return {
    title: data.title,
    description,
    openGraph: {
      type: "article",
      title: data.title,
      description,
      images: img ? [img] : undefined,
      publishedTime: data.created_at,
      authors: ["위빙"],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the blog by ID
  const { id } = params;
  const blogItem = await fetchBlogItem(Number(id));
  if (!blogItem) {
    notFound();
  }

  const parsedMarkdown = await marked.parse(blogItem.content, {
    breaks: true,
  });

  return (
    <main className="flex flex-col justify-start pt-4 lg:pt-10 w-full lg:max-w-[40rem] mx-auto">
      <StructuredData
        post={{
          title: blogItem.title,
          summary: blogItem.content
            .replace(/<img[^>]*>/g, "")
            .replace(/[#*_`~]/g, "")
            .substring(0, 160),
          thumbnail:
            blogItem.content.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
            "/assets/logo_color.svg",
          publishedAt: blogItem.created_at,
        }}
      />
      <div className="fixed top-0 w-full flex p-4 z-10">
        <h2 className="flex gap-2 items-center text-xl">
          <Link href="/blog" className="transition-colors">
            <ArrowLeftIcon fill="none" stroke="currentColor" /> 블로그
          </Link>
        </h2>
      </div>
      <div className="px-4 py-2 pt-16">
        <div className="pt-6 lg:pt-10 px-2 lg:px-4">
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-xl lg:text-2xl font-bold mb-2">
                {blogItem?.title}
              </h1>
              <p className="text-gray-500 text-sm">
                {new Date(blogItem?.created_at || "").toLocaleDateString(
                  "ko-KR",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}
              </p>
            </div>
            <article
              className="prose prose-stone prose-h1:font-pretendard prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-p:text-base dark:prose-invert max-w-none break-words mb-20"
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
