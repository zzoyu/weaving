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
import { useRef } from "react";

const carouselImages = [
  "/assets/images/about/b3-4-1.png",
  "/assets/images/about/b3-4-2.png",
  "/assets/images/about/b3-4-3.png",
  "/assets/images/about/b3-4-4.png",
  "/assets/images/about/b3-4-5.png",
  "/assets/images/about/b3-4-6.png",
];

function CarouselCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["center end", "end start"] });
  // 전체 캐러셀의 x 위치를 스크롤에 따라 이동, 조금 느리게
  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // 카드 개수
  const mid = Math.floor(carouselImages.length / 2);

  return (
    <div ref={ref} className="relative w-[400px] h-[220px] flex items-center justify-center overflow-visible">
      <motion.div style={{ x }} className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
        {carouselImages.map((src, i) => {
          // 중앙 카드와의 거리
          const offset = i - mid;
          // scale, rotate, zIndex 계산
          const scale = offset === 0 ? 1 : 0.8 - Math.abs(offset) * 0.1;
          const rotate = offset * 18;
          const zIndex = 10 - Math.abs(offset);
          const translateX = offset * 80;
          return (
            <motion.div
              key={src}
              className="absolute top-1/2 left-1/2 w-[180px] h-[180px] rounded-xl shadow-lg bg-white flex items-center justify-center"
              style={{
                x: `calc(-50% + ${translateX}px)`,
                y: "-50%",
                scale,
                zIndex,
                boxShadow: offset === 0 ? "0 8px 32px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.08)",
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'
              }}
              animate={{
                scale,
                x: `calc(-50% + ${translateX}px)`
              }}
              transition={{ duration: 0.5 }}
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
    </div>
  );
}

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <article className="flex flex-col gap-4 px-4 max-w-3xl mx-auto md:px-8">
      <motion.div 
        className="flex flex-col items-center w-full h-svh justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-center font-black text-2xl mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          창작자를 위한
          <br />
          캐릭터 & 세계관 관리 플랫폼
        </motion.h1>
        <motion.p 
          className="text-center text-text-dark mb-7 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          지금, 당신만의 캐릭터와 세계관을 정리하고 연결해보세요.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="py-2.5 px-9">위빙 시작하기</Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full h-svh flex flex-col justify-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-left mb-4 font-extrabold text-lg"
          variants={fadeInUp}
        >
          모든 창작자를 위해
        </motion.h2>
        <motion.ul 
          className="flex gap-4 justify-between"
          variants={staggerContainer}
        >
          <motion.li 
            className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4"
            variants={scaleIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Image
              src="/assets/images/about/b2_1.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              만화, 시나리오 작가 등<br />
              서사 기반 창작자
            </p>
          </motion.li>
          <motion.li 
            className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4"
            variants={scaleIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Image
              src="/assets/images/about/b2_2.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              캐릭터 정보를 시각화하는
              <br />
              디자이너, 일러스트레이터
            </p>
          </motion.li>
          <motion.li 
            className="flex flex-col items-center justify-center gap-2 w-1/3 bg-background-muted rounded-lg p-4"
            variants={scaleIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Image
              src="/assets/images/about/b2_3.png"
              alt="creator-1"
              width={100}
              height={100}
            />
            <p className="text-xs text-center">
              오리지널 캐릭터를 만드는
              <br />
              모든 크리에이터
            </p>
          </motion.li>
        </motion.ul>
      </motion.div>

      <motion.div 
        className="w-full h-svh flex flex-col gap-4 justify-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-left mb-2 font-extrabold text-lg"
          variants={fadeInUp}
        >
          흩어지지 않게, 연결되게
        </motion.h2>
        <motion.p 
          className="text-text-dark text-sm mb-4"
          variants={fadeInUp}
        >
          서사를 만들다 보면 자꾸 흩어지는 정보들, 위빙에서 정리하세요.
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full h-svh flex flex-col gap-4 justify-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="w-full h-svh flex flex-col gap-4">
          <motion.div 
            className="flex gap-4 mb-12"
            variants={fadeInUp}
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-left mb-2 font-bold text-sm">
                캐릭터와 세계관 설정을<br/>한 곳에서 통합 관리
              </h3>
              <p className="text-text-dark text-sm">
                블로그, 클라우드, 메모장에 흩어져 있던 캐릭터·세계관·관계도를 위빙
                안에서 한 번에 정리하고 관리해보세요.
              </p>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center">
              <CarouselCard />
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-4 mb-12"
            variants={fadeInUp}
          >
            <motion.div 
              className="flex flex-col flex-1"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col flex-1">
                <Image
                  src="/assets/images/about/b3_2.png"
                  alt="creator-1"
                  width={100}
                  height={100}
                />
              </div>
            </motion.div>
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
            className="flex gap-4 mb-12"
            variants={fadeInUp}
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
            <motion.div 
              className="flex flex-1"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <Image
                  src="/assets/images/about/b3_3.png"
                  alt="creator-1"
                  width={100}
                  height={100}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-1 gap-4"
            variants={fadeInUp}
          >
            <div className="flex flex-col flex-1">
            </div>
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
      </motion.div>

      <motion.div 
        className="w-full h-svh flex flex-col gap-4 justify-center items-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-left mb-2 font-extrabold text-lg"
          variants={fadeInUp}
        >
          여러분의 특별한 세상을 위빙에서 공유해보세요.
        </motion.h2>
      </motion.div>

      <motion.div 
        className="w-full h-svh flex flex-col gap-4 justify-center items-start"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-left mb-2 font-extrabold text-lg"
          variants={fadeInUp}
        >
          FAQ
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Q. 위빙은 무료로 사용할 수 있나요?</AccordionTrigger>
              <AccordionContent>
              A. 네, 현재 누구나 무료로 이용하실 수 있습니다. 
  각 30개의 캐릭터 프로필 슬롯과 세계관 슬롯을 기본 제공합니다.
  향후 더 많은 슬롯이나 고급 기능이 필요한 경우, 유료 플랜을 통해 확장하실 수 있도록 준비 중입니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Q. 등록한 캐릭터를 비공개로 설정할 수 있나요?</AccordionTrigger>
              <AccordionContent>
              A.  가능합니다. 모든 캐릭터는 공개 여부를 개별 설정하실 수 있으며, 
  비밀글 기능을 통해 특정 사용자에게만 공유할 수 있는 옵션도 제공됩니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
              Q. 관계도에 친구 캐릭터를 추가하려면 어떻게 하나요?
              </AccordionTrigger>
              <AccordionContent>
              A. 친구 신청을 통해 연결되면, 서로의 공개 캐릭터를 확인하고 캐릭터 간 관계도를 만들 수 있습니다. 
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </motion.div>
    </article>
  );
}
