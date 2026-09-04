"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const letters = [
  {
    char: "L",
    initial: { x: -650, y: -350, rotate: -55, scale: 0.35 },
  },
  {
    char: "U",
    initial: { x: 650, y: -320, rotate: 55, scale: 0.35 },
  },
  {
    char: "X",
    initial: { x: -700, y: 80, rotate: -60, scale: 0.3 },
  },
  {
    char: "O",
    initial: { x: 700, y: 60, rotate: 60, scale: 0.3 },
  },
  {
    char: "R",
    initial: { x: -600, y: 380, rotate: -50, scale: 0.35 },
  },
  {
    char: "A",
    initial: { x: 600, y: 360, rotate: 50, scale: 0.35 },
  },
];

/* =========================================================
   EXISTING 5 IMAGES
========================================================= */

const backgroundImages = [
  {
    src: "/images/instagram/7.jpg",
    position:
      "left-[2%] top-[16%] h-[27%] w-[19%] md:left-[4%] md:top-[14%] md:h-[31%] md:w-[18%]",
    rotate: "-rotate-3",
  },
  {
    src: "/images/instagram/8.jpg",
    position:
      "right-[2%] top-[16%] h-[27%] w-[19%] md:right-[4%] md:top-[14%] md:h-[31%] md:w-[18%]",
    rotate: "rotate-3",
  },
  {
    src: "/images/instagram/10.jpg",
    position:
      "left-[2%] bottom-[16%] h-[27%] w-[19%] md:left-[4%] md:bottom-[14%] md:h-[31%] md:w-[18%]",
    rotate: "rotate-3",
  },
  {
    src: "/images/instagram/11.jpg",
    position:
      "right-[2%] bottom-[16%] h-[27%] w-[19%] md:right-[4%] md:bottom-[14%] md:h-[31%] md:w-[18%]",
    rotate: "-rotate-3",
  },
  {
    src: "/images/instagram/12.jpg",
    position:
      "left-1/2 top-[4%] h-[12%] w-[17%] -translate-x-1/2 md:top-[5%] md:h-[15%] md:w-[13%]",
    rotate: "rotate-1",
  },
];

const particles = Array.from({ length: 55 });

export default function LuxuryIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const enterWebsite = () => {
    setEntering(true);

    setTimeout(() => {
      setShowIntro(false);
    }, 1100);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={
            entering
              ? {
                  opacity: 0,
                  scale: 1.08,
                  filter: "blur(18px)",
                }
              : {
                  opacity: 1,
                  scale: 1,
                }
          }
          transition={{
            duration: 1.1,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#e7c4cf] text-[#351f29]"
        >
          {/* =====================================================
              PREMIUM ROSY PINK BACKGROUND
          ===================================================== */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#fffafc_0%,#f9e8ed_20%,#f1d0d9_42%,#dcaeba_67%,#b98291_100%)]" />

          {/* Soft blush atmosphere */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [0, 0.7, 0.35, 0.55],
              scale: [0.4, 1, 1.25, 1.1],
            }}
            transition={{
              duration: 3.2,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[43%] h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d88a9a]/45 blur-[155px]"
          />

          {/* Rose pink glow */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              opacity: [0, 0.75, 0.35, 0.58],
              scale: [0.3, 1, 1.3, 1],
            }}
            transition={{
              duration: 3,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[46%] h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8a0b2]/45 blur-[145px]"
          />

          {/* Soft blush left */}

          <div className="absolute left-[-10%] top-[18%] h-[450px] w-[450px] rounded-full bg-[#f4c7d3]/55 blur-[135px]" />

          {/* Dusty rose right */}

          <div className="absolute right-[-10%] bottom-[12%] h-[480px] w-[480px] rounded-full bg-[#c98296]/35 blur-[145px]" />

          {/* Champagne luxury glow */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0.18],
            }}
            transition={{
              duration: 3,
              delay: 1.2,
            }}
            className="absolute left-1/2 top-[44%] h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8c7a8]/25 blur-[100px]"
          />

          {/* Bottom rosy atmosphere */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.65, 0.35],
            }}
            transition={{
              duration: 2.8,
              delay: 1,
            }}
            className="absolute bottom-[-18%] left-1/2 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#b96f82]/20 via-[#d88a9a]/40 to-[#b96f82]/20 blur-[120px]"
          />

          {/* Cinematic vignette */}

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(71,35,45,0.20)_100%)]" />

          {/* =====================================================
              TOP LINE
          ===================================================== */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "78%",
              opacity: 1,
            }}
            transition={{
              duration: 1.6,
              delay: 0.3,
            }}
            className="absolute left-1/2 top-[3.5%] h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b96f82]/70 to-transparent shadow-[0_0_18px_rgba(185,111,130,0.55)]"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.1,
              duration: 0.8,
            }}
            className="absolute left-1/2 top-[6%] z-40 -translate-x-1/2 text-center"
          >
            <p className="whitespace-nowrap text-[8px] uppercase tracking-[0.5em] text-[#4a2934]/60 sm:text-[9px]">
              The Art Of Modern Luxury
            </p>
          </motion.div>

          {/* =====================================================
              EXISTING 5 IMAGES
          ===================================================== */}

          {backgroundImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{
                opacity: 0,
                scale: 1.12,
                y: index % 2 === 0 ? -20 : 20,
              }}
              animate={{
                opacity: index === 4 ? 0.38 : 0.62,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1.3,
                delay: 0.25 + index * 0.13,
              }}
              className={`absolute z-10 overflow-hidden rounded-sm border border-white/50 shadow-[0_25px_80px_rgba(86,40,54,0.24)] ${image.position} ${image.rotate}`}
            >
              <img
                src={image.src}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-[#f1b8c6]/10 to-[#7c4352]/25" />

              <div className="absolute inset-0 ring-1 ring-inset ring-white/35" />
            </motion.div>
          ))}

          {/* =====================================================
              CORNERS
          ===================================================== */}

          <div className="absolute left-[2.5%] top-[4%] h-12 w-12 border-l border-t border-[#b96f82]/55" />

          <div className="absolute right-[2.5%] top-[4%] h-12 w-12 border-r border-t border-[#b96f82]/55" />

          <div className="absolute bottom-[4%] left-[2.5%] h-12 w-12 border-b border-l border-[#b96f82]/55" />

          <div className="absolute bottom-[4%] right-[2.5%] h-12 w-12 border-b border-r border-[#b96f82]/55" />

          {/* =====================================================
              LARGE STORE IMAGE
              
              👇 APNI STORE PIC YAHAN LAGANI HAI
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 0.42,
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              delay: 0.8,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[44%] z-[12] h-[38%] w-[82%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/30 shadow-[0_30px_100px_rgba(83,37,53,0.30)] md:h-[43%] md:w-[64%]"
          >
            {/* =================================================
                CHANGE ONLY THIS IMAGE PATH
            ================================================= */}

            <img
              src="/images/luxora-store.jpg"
              alt="LUXORA luxury store"
              className="h-full w-full object-cover"
            />

            {/* Dark rose overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-[#5b3040]/35 via-[#8a4b5d]/25 to-[#3e2630]/55" />

            {/* Pink luxury wash */}

            <div className="absolute inset-0 bg-[#d88a9a]/20 mix-blend-screen" />

            {/* Slight blur */}

            <div className="absolute inset-0 backdrop-blur-[2px]" />

            {/* Glass shine */}

            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#b96f82]/20" />
          </motion.div>

          {/* =====================================================
              CENTRAL GLASS FRAME
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.3,
              delay: 0.4,
            }}
            className="absolute left-1/2 top-1/2 z-[14] h-[58%] w-[72%] -translate-x-1/2 -translate-y-1/2 border border-white/30 bg-white/[0.06] shadow-[inset_0_0_100px_rgba(255,255,255,0.10)] backdrop-blur-[5px] md:h-[62%] md:w-[58%]"
          />

          {/* =====================================================
              CINEMATIC PINK LIGHT BEHIND LUXORA
          ===================================================== */}

          {/* Main dusty rose glow */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.12,
            }}
            animate={{
              opacity: [0, 1, 0.5, 0.78],
              scale: [0.12, 0.7, 1.25, 1],
            }}
            transition={{
              duration: 2.7,
              delay: 1,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[44%] z-[20] h-[300px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d88a9a]/75 blur-[105px]"
          />

          {/* Soft rose pink */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: [0, 0.9, 0.4, 0.65],
              scale: [0.2, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 2.5,
              delay: 1.25,
            }}
            className="absolute left-1/2 top-[45%] z-[21] h-[250px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8a0b2]/55 blur-[95px]"
          />

          {/* Blush inner glow */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: [0, 0.75, 0.3, 0.55],
              scale: [0.2, 0.8, 1.05, 1],
            }}
            transition={{
              duration: 2.4,
              delay: 1.45,
            }}
            className="absolute left-1/2 top-[45%] z-[22] h-[170px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4c7d3]/35 blur-[80px]"
          />

          {/* Champagne subtle highlight */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.45, 0.18],
            }}
            transition={{
              duration: 2.5,
              delay: 1.6,
            }}
            className="absolute left-1/2 top-[44%] z-[23] h-[100px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8c7a8]/25 blur-[65px]"
          />

          {/* =====================================================
              PINK CINEMATIC ENERGY BEAM
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              width: "0%",
            }}
            animate={{
              opacity: [0, 1, 0.55, 0.8],
              width: ["0%", "55%", "88%", "72%"],
            }}
            transition={{
              duration: 2.3,
              delay: 1.35,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[44%] z-[30] h-[2px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c9788e] via-[#f0b4c2] to-transparent shadow-[0_0_22px_rgba(201,120,142,0.95),0_0_50px_rgba(216,138,154,0.75)]"
          />

          {/* Champagne highlight beam */}

          <motion.div
            initial={{
              opacity: 0,
              width: "0%",
            }}
            animate={{
              opacity: [0, 0.8, 0.25],
              width: ["0%", "45%", "68%"],
            }}
            transition={{
              duration: 2,
              delay: 1.6,
            }}
            className="absolute left-1/2 top-[44%] z-[31] h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f4c7d3] to-transparent shadow-[0_0_15px_rgba(244,199,211,0.9)]"
          />

          {/* Vertical rose light */}

          <motion.div
            initial={{
              opacity: 0,
              height: "0%",
            }}
            animate={{
              opacity: [0, 0.55, 0.18],
              height: ["0%", "48%", "62%"],
            }}
            transition={{
              duration: 2.2,
              delay: 1.55,
            }}
            className="absolute left-1/2 top-[44%] z-[25] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#d88a9a] to-transparent shadow-[0_0_18px_rgba(216,138,154,0.85)]"
          />

          {/* =====================================================
              FLOATING PINK PARTICLES
          ===================================================== */}

          <div className="absolute inset-0 z-[32]">
            {particles.map((_, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0],
                  y: [0, -25 - (index % 7) * 12],
                }}
                transition={{
                  duration: 2.2 + (index % 5) * 0.4,
                  delay: 1 + (index % 15) * 0.12,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className={`absolute left-1/2 top-1/2 h-[2px] w-[2px] rounded-full ${
                  index % 3 === 0
                    ? "bg-[#d88a9a] shadow-[0_0_10px_rgba(216,138,154,1)]"
                    : index % 3 === 1
                      ? "bg-[#f4c7d3] shadow-[0_0_10px_rgba(244,199,211,1)]"
                      : "bg-[#f0b4c2] shadow-[0_0_10px_rgba(240,180,194,1)]"
                }`}
                style={{
                  transform: `translate(
                    ${(index % 11) * 62 - 310}px,
                    ${(index % 13) * 46 - 260}px
                  )`,
                }}
              />
            ))}
          </div>

          {/* =====================================================
              LUXORA STORE NAME
          ===================================================== */}

          <div className="absolute left-1/2 top-[44%] z-[40] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="flex items-center">
              {letters.map((letter, index) => (
                <motion.span
                  key={letter.char}
                  initial={{
                    ...letter.initial,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.55,
                    delay: 0.45 + index * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative font-serif text-[14vw] font-medium leading-none tracking-[-0.08em] text-[#422630] sm:text-[11vw] md:text-[8vw] lg:text-[7vw]"
                  style={{
                    textShadow:
                      "0 0 6px rgba(255,255,255,0.6), 0 0 15px rgba(244,199,211,0.95), 0 0 32px rgba(216,138,154,0.95), 0 0 65px rgba(185,111,130,0.65)",
                  }}
                >
                  {letter.char}

                  {/* Moving shine */}

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: "-130%",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: "130%",
                    }}
                    transition={{
                      duration: 1.15,
                      delay: 2 + index * 0.12,
                    }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  />
                </motion.span>
              ))}
            </div>
          </div>

          {/* =====================================================
              BEAUTY • FASHION • LIFESTYLE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 2.75,
              duration: 1,
            }}
            className="absolute left-1/2 top-[53.5%] z-[50] -translate-x-1/2 text-center"
          >
            <motion.p
              animate={{
                textShadow: [
                  "0 0 5px rgba(216,138,154,0.25)",
                  "0 0 12px rgba(216,138,154,0.75)",
                  "0 0 22px rgba(232,160,178,0.85)",
                  "0 0 7px rgba(216,138,154,0.3)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.42em] text-[#4a2934] sm:text-[10px] md:text-[11px]"
            >
              Beauty
              <span className="mx-2 text-[#c9788e]">•</span>
              Fashion
              <span className="mx-2 text-[#d88a9a]">•</span>
              Lifestyle
            </motion.p>

            {/* Glow line */}

            <motion.div
              animate={{
                opacity: [0.3, 0.9, 0.3],
                width: ["35%", "75%", "35%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="mx-auto mt-2 h-px bg-gradient-to-r from-transparent via-[#d88a9a] to-transparent shadow-[0_0_12px_rgba(216,138,154,0.9)]"
            />
          </motion.div>

          {/* =====================================================
              PROFESSIONAL ENTER BUTTON
          ===================================================== */}

          <motion.button
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.88,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 3.05,
              duration: 0.85,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.07,
              boxShadow:
                "0 18px 55px rgba(185,111,130,0.35), 0 0 40px rgba(232,160,178,0.45)",
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={enterWebsite}
            className="absolute left-1/2 top-[58.5%] z-[55] flex -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full border border-[#c9788e]/60 bg-white/35 px-8 py-3.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#452630] shadow-[0_15px_45px_rgba(96,42,55,0.20),0_0_25px_rgba(216,138,154,0.20)] backdrop-blur-xl transition-all duration-500 hover:border-[#b96f82] hover:bg-white/55"
          >
            {/* Moving button shine */}

            <motion.span
              animate={{
                x: ["-150%", "150%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="pointer-events-none absolute inset-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/75 to-transparent"
            />

            <Sparkles
              size={13}
              strokeWidth={1.5}
              className="relative z-10 text-[#c9788e]"
            />

            <span className="relative z-10">
              Enter LUXORA
            </span>

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="relative z-10 text-[#b96f82]"
            />
          </motion.button>

          {/* =====================================================
              BOTTOM DECORATION
          ===================================================== */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "78%",
              opacity: 1,
            }}
            transition={{
              duration: 1.8,
              delay: 1,
            }}
            className="absolute bottom-[3.5%] left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b96f82]/60 to-transparent shadow-[0_0_14px_rgba(185,111,130,0.55)]"
          />

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 3.1,
            }}
            className="absolute bottom-[5.7%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[7px] uppercase tracking-[0.4em] text-[#4a2934]/40"
          >
            Crafted For Those Who Appreciate Elegance
          </motion.p>

          {/* =====================================================
              FINAL VIGNETTE
          ===================================================== */}

          <div className="pointer-events-none absolute inset-0 z-[60] bg-[radial-gradient(circle_at_center,transparent_32%,rgba(71,35,45,0.16)_100%)]" />

          {/* =====================================================
              EXIT FLASH
          ===================================================== */}

          {entering && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
              }}
              className="absolute inset-0 z-[100] bg-[#fff5f8]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}