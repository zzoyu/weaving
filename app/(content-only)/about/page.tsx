"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const carouselImages = [
  "/assets/images/about/b3-4-1.png",
  "/assets/images/about/b3-4-2.png",
  "/assets/images/about/b3-4-3.png",
  "/assets/images/about/b3-4-4.png",
  "/assets/images/about/b3-4-5.png",
  "/assets/images/about/b3-4-6.png",
];

const relationshipImages = [
  "/assets/images/about/b3-4-2-1.png",
  "/assets/images/about/b3-4-2-2.png",
  "/assets/images/about/b3-4-2-3.png",
  "/assets/images/about/b3-4-2-4.png",
  "/assets/images/about/b3-4-2-5.png",
  "/assets/images/about/b3-4-2-6.png",
];
function CarouselCard1() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  // 모바일에서 x 이동량을 줄이기 위한 함수
  const getX = (i: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return `${i * 20}px`;
    }
    return `${i * 40}px`;
  };

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="w-full h-full relative"
      layoutId="carousel-card"
    >
      <motion.div className="w-full h-full flex flex-col items-center justify-center sticky">
        {carouselImages.map((src, i) => {
          return (
            <motion.div
              key={src}
              className="absolute w-[50vw] max-w-[160px] h-[50vw] max-h-[160px] flex items-center justify-center sm:w-[160px] sm:h-[160px]"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                x: getX(i),
                transition: {
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <Image
                src={src}
                alt={`carousel-${i}`}
                width={160}
                height={160}
                className="object-contain rounded-xl"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function CarouselCard2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 모바일에서 x 이동량을 줄이기 위한 함수
  const getX = (i: number, offset: number = 0) => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return `${i * 20 + offset}px`;
    }
    return `${i * 40 + offset}px`;
  };

  return (
    <motion.div ref={ref} className="w-full h-full" layoutId="carousel-card">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {carouselImages.map((src, i) => {
          return (
            <motion.div
              key={src}
              className="absolute w-[50vw] max-w-[160px] h-[50vw] max-h-[160px] flex items-center justify-center sm:w-[160px] sm:h-[160px]"
              initial={{ opacity: 1, x: getX(i), y: 0 }}
              whileInView={
                i % 2 === 0
                  ? {
                      x: getX(i, -100),
                      y: 0,
                      opacity: 0,
                      transition: {
                        duration: 0.6,
                        delay: i * 0.2,
                        ease: "easeOut",
                      },
                    }
                  : {
                      x: getX(i),
                      y: 0,
                      opacity: 1,
                    }
              }
              viewport={{ once: false, amount: 0.1 }}
            >
              <Image
                src={src}
                alt={`carousel-${i}`}
                width={160}
                height={160}
                className="object-contain rounded-xl"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function calculatePosition(i: number) {
  const angle = (i * 360) / relationshipImages.length;
  const x = Math.cos((angle * Math.PI) / 180) * 100;
  const y = Math.sin((angle * Math.PI) / 180) * 100;
  return { x, y };
}

function RelationshipCard() {
  return (
    <div className="w-20 h-20 rounded-full bg-background-muted object-cover object-bottom flex items-center justify-center overflow-visible">
      <motion.div
        className="w-20 h-20 rounded-full bg-background-muted object-cover object-bottom overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, y: 0, x: 0, scale: 0.8, rotate: 0, z: 999 }}
        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1.2, rotate: 0, z: 999 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          animation: {
            type: "spring",
          },
        }}
      >
        <Image
          src="/assets/images/about/b3-4-2-1.png"
          alt="creator-1"
          width={100}
          height={100}
          className="mb-2"
        />
      </motion.div>
      {relationshipImages.map((src, i) => {
        if (i === 0) return null;
        const { x, y } = calculatePosition(i);
        return (
          <motion.div
            key={src}
            className="absolute w-20 h-20 rounded-full bg-background-muted object-cover object-bottom overflow-hidden flex items-center justify-center"
            initial={{
              opacity: 0,
              y: 0,
              x: 0,
              scale: 0.8,
              rotate: 0,
              rotateX: 0,
              rotateY: 0,
            }}
            whileInView={{
              opacity: 1,
              y,
              x,
              scale: 1,
              rotate: 0,
              rotateX: 0,
              rotateY: 0,
              transition: {
                duration: 0.4 + i * 0.2,
                ease: "easeInOut",
                delay: i * 0.2,
              },
            }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Image
              src={src}
              alt={`relationship-${i}`}
              width={100}
              height={100}
              className="absolute w-20 h-20 rounded-full bg-background-muted object-cover object-bottom overflow-hidden flex items-center justify-center"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function ParallaxSection() {
  return (
    <div className="w-full py-40 relative mb-40">
      <motion.div
        className="flex gap-40 items-center mb-96 relative z-10 w-full flex-col md:flex-row justify-center md:justify-between"
        initial={{ opacity: 0, y: 100, x: 0 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col flex-1">
          <h3 className="text-left mb-2 font-bold text-sm">
            캐릭터와 세계관 설정을
            <br />한 곳에서 통합 관리
          </h3>
          <p className="text-text-dark text-sm">
            블로그, 클라우드, 메모장에 흩어져 있던 캐릭터·세계관·관계도를 위빙
            안에서 한 번에 정리하고 관리해보세요.
          </p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center w-full h-full relative">
          <div className="sticky w-full h-full top-0 left-0">
            <CarouselCard1 />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-40 items-center mb-96 relative z-10 w-full flex-col md:flex-row justify-center md:justify-between"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex flex-col flex-1 items-center justify-center">
          <CarouselCard2 />
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="text-left mb-2 font-bold text-sm">
            검색과 분류 기능으로 깔끔하게 정리
          </h3>
          <p className="text-text-dark text-sm">
            테마색, 이름, 해시태그 기반으로 캐릭터를 정렬·검색할 수 있어 프로필
            수가 많아도 문제 없어요.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-40 items-center mb-96 relative z-10 w-full flex-col md:flex-row justify-center md:justify-between"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <div className="flex flex-col flex-1">
          <h3 className="text-left mb-2 font-bold text-sm">
            관계도에서 만나보는 친구의 캐릭터
          </h3>
          <p className="text-text-dark text-sm">
            팔로우한 친구의 캐릭터를 선택하여 내 캐릭터와의 관계를 설정하고,
            관계도 형태로 시각화할 수 있어요.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <RelationshipCard />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-1 gap-4"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.2,
          delay: 0.6,
        }}
      >
        <div className="flex flex-col flex-1"></div>
        <div className="flex flex-col flex-1">
          <h3 className="text-left mb-2 font-bold text-sm">
            커미션이나 협업도 링크 하나로 해결
          </h3>
          <p className="text-text-dark text-sm">
            사진과 주요 정보가 담긴 캐릭터 프로필 페이지를 링크로 간편하게
            전달할 수 있어요.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.7, ease: "easeOut" },
  };
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
  };
  const scaleIn = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.92 },
    transition: { duration: 0.7, ease: "easeOut" },
  };
  const staggerContainer = {
    initial: {},
    animate: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="h-dvh overflow-y-scroll scroll-smooth w-full">
      <article className="flex flex-col gap-4 px-4 max-w-3xl mx-auto md:px-8 w-full">
        <motion.div
          className="flex flex-col items-center w-full h-dvh justify-center"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-center font-black text-2xl mb-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            창작자를 위한
            <br />
            캐릭터 & 세계관 관리 플랫폼
          </motion.h1>
          <motion.p
            className="text-center text-text-dark mb-7 text-sm"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            지금, 당신만의 캐릭터와 세계관을 정리하고 연결해보세요.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Button className="py-2.5 px-9 rounded-full" asChild>
              <Link href="/">위빙 시작하기</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full h-dvh flex flex-col justify-center mb-40"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-left mb-4 font-extrabold text-lg"
            variants={fadeInUp}
          >
            모든 창작자를 위해
          </motion.h2>
          <motion.ul
            className="flex flex-col gap-4 justify-between md:flex-row w-full items-center mb-40"
            variants={staggerContainer}
          >
            {[0, 1, 2].map((i, index) => (
              <motion.li
                key={i}
                className="flex flex-col items-center justify-center gap-2 w-2/3 bg-background-muted rounded-lg p-4 shadow-md"
                variants={fadeInUp}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
                initial="initial"
                whileInView="animate"
                exit="exit"
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.4,
                }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <Image
                  src={`/assets/images/about/b2_${i + 1}.png`}
                  alt={`creator-${i + 1}`}
                  width={100}
                  height={100}
                />
                <p className="text-xs text-center">
                  {i === 0 && (
                    <>
                      만화, 시나리오 작가 등<br />
                      서사 기반 창작자
                    </>
                  )}
                  {i === 1 && (
                    <>
                      캐릭터 정보를 시각화하는
                      <br />
                      디자이너, 일러스트레이터
                    </>
                  )}
                  {i === 2 && (
                    <>
                      오리지널 캐릭터를 만드는
                      <br />
                      모든 크리에이터
                    </>
                  )}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <ParallaxSection />

        <motion.div
          className="w-full h-dvh flex flex-col gap-4 justify-center mb-40"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-left mb-2 font-extrabold text-lg"
            variants={fadeInUp}
          >
            흩어지지 않게, 연결되게
          </motion.h2>
          <motion.p className="text-text-dark text-sm mb-4" variants={fadeInUp}>
            서사를 만들다 보면 자꾸 흩어지는 정보들, 위빙에서 정리하세요.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full h-dvh flex flex-col gap-4 justify-center items-center mb-40 mt-40"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-left mb-20 font-extrabold text-lg"
            variants={fadeInUp}
          >
            여러분의 특별한 세상을 위빙에서 공유해보세요.
          </motion.h2>
          <motion.h2
            className="text-left mb-2 font-extrabold text-lg place-self-start"
            variants={fadeInUp}
          >
            FAQ
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Q. 위빙은 무료로 사용할 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  A. 네, 현재 누구나 무료로 이용하실 수 있습니다. <br />
                  각 30개의 캐릭터 프로필 슬롯과 세계관 슬롯을 기본 제공합니다.
                  <br />
                  향후 더 많은 슬롯이나 고급 기능이 필요한 경우, 유료 플랜을
                  통해 확장하실 수 있도록 준비 중입니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Q. 등록한 캐릭터를 비공개로 설정할 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  A. 가능합니다. 모든 캐릭터는 공개 여부를 개별 설정하실 수
                  있으며, <br />
                  비밀글 기능을 통해 특정 사용자에게만 공유할 수 있는 옵션도
                  제공됩니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Q. 관계도에 친구 캐릭터를 추가하려면 어떻게 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  A. 친구 신청을 통해 연결되면, 서로의 공개 캐릭터를 확인하고
                  캐릭터 간 관계도를 만들 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
        <Button
          className="w-full max-w-md mx-auto mb-20"
          variant={"link"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          맨 위로 가기
        </Button>
      </article>
    </div>
  );
}
