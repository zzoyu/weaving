"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  FolderCheckIcon,
  Search,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landing() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <FolderCheckIcon className="w-8 h-8" />,
      title: "캐릭터와 세계관 설정을\n한 곳에서 통합 관리",
      description:
        "블로그, 클라우드, 메모장에 흩어져 있던\n캐릭터, 세계관 관련 정보를\n위빙 안에서 한 번에 정리하고 관리해보세요.",
      description_pc:
        "블로그, 클라우드, 메모장에 흩어져 있던 캐릭터, 세계관 관련 정보를\n위빙 안에서 한 번에 정리하고 관리해보세요.",
      image: "/assets/images/about/book-icon.png",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "검색과 분류 기능으로 깔끔하게 정리",
      description:
        "테마색, 이름, 해시태그 기반으로\n캐릭터를 빠르게 검색할 수 있어\n프로필 수가 많아도 문제 없어요.",
      description_pc:
        "테마색, 이름, 해시태그 기반으로 캐릭터를 빠르게 검색할 수 있어\n프로필 수가 많아도 문제 없어요.",
      image: "/assets/images/about/palette-icon.png",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "관계도에서 만나보는 친구의 캐릭터",
      description:
        "팔로우한 친구의 캐릭터를 선택하여\n내 캐릭터와의 관계를 설정하고\n관계도 형태로 시각화할 수 있어요.",
      description_pc:
        "팔로우한 친구의 캐릭터를 선택하여 내 캐릭터와의 관계를 설정하고\n관계도 형태로 시각화할 수 있어요.",
      image: "/assets/images/about/character-icon.png",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "커미션이나 협업도 링크 하나로 해결",
      description:
        "사진과 주요 정보가 담긴 캐릭터 프로필 페이지를\n링크로 간편하게 전달할 수 있어요.",
      description_pc:
        "사진과 주요 정보가 담긴 캐릭터 프로필 페이지를\n링크로 간편하게 전달할 수 있어요.",
      image: "/assets/images/about/share-icon.png",
    },
  ];

  const targetUsers = [
    {
      image: "/assets/images/about/book-icon.png",
      title: "만화, 시나리오 작가 등\n서사 기반 창작자",
    },
    {
      image: "/assets/images/about/palette-icon.png",
      title: "캐릭터 정보를 시각화하는\n디자이너, 일러스트레이터",
    },
    {
      image: "/assets/images/about/character-icon.png",
      title: "오리지널 캐릭터를 만드는\n모든 크리에이터",
    },
  ];

  const faqs = [
    {
      question: "위빙은 무료로 사용할 수 있나요?",
      answer:
        "네, 현재 누구나 무료로 이용하실 수 있습니다.\n각 30개의 캐릭터 프로필 슬롯과 세계관 슬롯을 기본 제공합니다.\n향후 더 많은 슬롯이나 고급 기능이 필요한 경우, 유료 플랜을 통해 확장하실 수 있도록 준비 중입니다.",
    },
    {
      question: "캐릭터를 비공개로 등록할 수 있나요?",
      answer:
        "가능합니다.\n모든 캐릭터는 공개 여부를 개별 설정하실 수 있으며, 비밀글 기능을 통해 특정 사용자에게만 공유할 수 있는 옵션도 제공됩니다.",
    },
    {
      question: "친구의 캐릭터와 관계도를 만들려면?",
      answer:
        "친구 신청을 통해 연결되면, 서로의 공개 캐릭터를 확인하고 캐릭터 간 관계도를 만들 수 있습니다.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 font-pretendard">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav
            className="flex items-center justify-between"
            role="navigation"
            aria-label="메인 내비게이션"
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/logos/logo_text_horizontal_color.svg"
                alt="위빙 로고"
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-[120px] md:w-[200px] dark:hidden"
              />
              <Image
                src="/assets/logos/logo_text_horizontal_color_white.svg"
                alt="위빙 로고"
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-[120px] md:w-[200px] hidden dark:block"
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section
          className="py-12 md:py-20 lg:py-24"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1
                id="hero-heading"
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                창작자를 위한
                <br />
                <span className="bg-gradient-to-r from-[#97E6AB] to-[#68E7FA] bg-clip-text font-extrabold text-transparent">
                  캐릭터 & 세계관 관리 플랫폼
                </span>
              </h1>

              <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                지금, 당신만의 캐릭터와 세계관을{" "}
                <br className="block md:hidden" />
                정리하고 연결해보세요.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-[#97E6AB] to-[#68E7FA] hover:from-[#97E6AB] hover:to-[#68E7FA] text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:from-green-700 dark:to-cyan-700 dark:text-white"
                asChild
              >
                <Link href="/signin">위빙 시작하기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Target Users Section */}
        <section id="users" className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                모든 창작자를 위해
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {targetUsers.map((user, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 dark:text-white"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">
                      <Image
                        priority
                        unoptimized
                        src={user.image}
                        alt={user.title}
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 whitespace-pre-line">
                      {user.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 bg-gradient-to-br from-green-50 to-cyan-50 dark:from-gray-900 dark:to-gray-900"
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                id="features-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                흩어지지 않게, 연결되게
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                서사를 만들다 보면 자꾸 흩어지는 정보들,{" "}
                <br className="block md:hidden" />
                위빙에서 정리하세요.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <article
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4 flex justify-center lg:justify-start">
                      <div
                        className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md"
                        role="img"
                        aria-label={`${feature.title} 아이콘`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 whitespace-pre-line md:whitespace-normal">
                      {feature.title}
                    </h3>
                    {feature.description_pc ? (
                      <>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line md:block hidden">
                          {feature.description_pc}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line block md:hidden">
                          {feature.description}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line md:whitespace-normal">
                        {feature.description}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      {/* 스마트폰 목업 */}
                      <div className="w-full h-full">
                        {/* 앱 콘텐츠 */}
                        <div className="p-4 h-full bg-gradient-to-br bg-transparent to-cyan-50 dark:bg-transparent dark:to-gray-900">
                          {index === 0 && (
                            <Image
                              unoptimized
                              src="/assets/images/about/mockup-list.png"
                              alt="list"
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="object-contain w-3/4 h-full mx-auto ml-[17%] md:ml-0"
                            />
                          )}

                          {index === 1 && (
                            <Image
                              unoptimized
                              src="/assets/images/about/mockup-filter.png"
                              alt="filter"
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="object-contain w-4/5 h-full mx-auto ml-[15%] md:ml-0"
                            />
                          )}

                          {index === 2 && (
                            <Image
                              unoptimized
                              src="/assets/images/about/mockup-relationships.png"
                              alt="relationships"
                              width={0}
                              height={0}
                              className="object-contain w-full h-full ml-[3%] md:ml-0"
                            />
                          )}

                          {index === 3 && (
                            <Image
                              unoptimized
                              src="/assets/images/about/mockup-og.png"
                              alt="opengraph"
                              width={0}
                              height={0}
                              className="object-contain w-full h-full ml-[5%] md:ml-0"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
          aria-labelledby="faq-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
              >
                자주 묻는 질문
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-sm dark:bg-gray-800 dark:text-white"
                  >
                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() =>
                          setOpenFaq(openFaq === index ? null : index)
                        }
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">
                          Q. {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 dark:text-gray-300 transition-transform ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            A. {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog CTA Section */}
        <section
          className="py-16 bg-gradient-to-br from-green-50 to-cyan-50 dark:from-gray-900 dark:to-gray-900"
          aria-labelledby="blog-cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2
                id="blog-cta-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10"
              >
                캐릭터 창작을 위한
                <br />
                다양한 인사이트를 만나보세요
              </h2>

              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/blog">아티클 보기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-16 bg-gradient-to-r from-[#97E6AB] to-[#68E7FA] dark:from-green-700 dark:to-cyan-700"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2
                id="cta-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-10"
              >
                여러분의 특별한 세상을
                <br />
                위빙에서 공유해보세요
              </h2>

              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/signin">위빙 시작하기</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-8 bg-gray-900 text-white dark:bg-black"
        role="contentinfo"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 flex-col gap-4">
            <Image
              src="/assets/logos/logo_text_horizontal_color_white.svg"
              alt="위빙 로고"
              width={0}
              height={0}
              sizes="100vw"
              className="object-contain w-[100px]"
            />
            <nav
              className="flex flex-row gap-4"
              role="navigation"
              aria-label="푸터 내비게이션"
            >
              <Link
                href="/privacy"
                className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
              >
                개인정보 처리방침
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
              >
                이용약관
              </Link>
              <Link
                href="/guideline"
                className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
              >
                콘텐츠 가이드라인
              </Link>
            </nav>

            <div className="flex flex-row divide-x divide-gray-500 dark:divide-gray-400 gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Finding Benjamin
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 pl-2">
                Contact: loom@weavv.in
              </span>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} weaving. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
