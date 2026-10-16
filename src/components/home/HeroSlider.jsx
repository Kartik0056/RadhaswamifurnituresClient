import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import heroSlides from '../../data/heroSlides';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="relative w-full bg-[var(--color-espresso)] overflow-hidden select-none"
      aria-label="Featured Showcase"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1200}
        loop={true}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`,
        }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-slider h-[560px] sm:h-[640px] md:h-[720px] w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            {({ isActive }) => (
              <div className="relative w-full h-full">
                {/* Background Image with Synchronized Ken Burns Zoom Animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: 1.12, opacity: 0.8 }}
                    animate={
                      isActive
                        ? { scale: 1, opacity: 1 }
                        : { scale: 1.12, opacity: 0.6 }
                    }
                    transition={{
                      duration: 7,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <picture>
                      <source
                        media="(max-width: 640px)"
                        srcSet={slide.imageMobile || slide.image}
                      />
                      <img
                        src={slide.image}
                        alt={slide.headline.replace('\n', ' ')}
                        className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchpriority={index === 0 ? 'high' : 'auto'}
                      />
                    </picture>
                  </motion.div>

                  {/* Cinematic Luxury Dark Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Text Content with Synchronized Staggered Reveal Animation */}
                <div className="relative h-full container-luxury flex flex-col justify-center items-start z-10 text-white">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`slide-content-${slide.id}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-2xl space-y-4 sm:space-y-6"
                      >
                        {/* 1. Brand Kicker Tag */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: -15 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
                            },
                          }}
                          className="inline-flex items-center gap-2.5"
                        >
                          <span className="w-8 h-[1px] bg-[var(--color-gold)]" />
                          <span className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-gold-muted)]">
                            Radha Swami Furnitures • Handcrafted Luxury
                          </span>
                        </motion.div>

                        {/* 2. Main Headline with Smooth Lift & Reveal */}
                        <motion.h1
                          variants={{
                            hidden: { opacity: 0, y: 35, filter: 'blur(4px)' },
                            visible: {
                              opacity: 1,
                              y: 0,
                              filter: 'blur(0px)',
                              transition: { duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
                            },
                          }}
                          className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] text-[var(--color-ivory)] whitespace-pre-line tracking-tight drop-shadow-md"
                        >
                          {slide.headline}
                        </motion.h1>

                        {/* 3. Supporting Description */}
                        <motion.p
                          variants={{
                            hidden: { opacity: 0, y: 25 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.7, delay: 0.55, ease: 'easeOut' },
                            },
                          }}
                          className="text-sm sm:text-base md:text-lg text-[var(--color-sand)]/95 font-light leading-relaxed max-w-xl drop-shadow-sm"
                        >
                          {slide.subheadline}
                        </motion.p>

                        {/* 4. Action Buttons CTAs */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, delay: 0.75, ease: 'easeOut' },
                            },
                          }}
                          className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4"
                        >
                          <Link
                            to={slide.cta.link}
                            className="btn-gold text-xs sm:text-sm px-6 sm:px-8 py-3.5 shadow-xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,150,62,0.4)]"
                          >
                            <span>{slide.cta.text}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                          </Link>

                          {slide.secondaryCta && (
                            <Link
                              to={slide.secondaryCta.link}
                              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-ivory)] border border-white/40 hover:border-white hover:bg-white/15 backdrop-blur-sm rounded-sm transition-all duration-300"
                            >
                              <MessageSquare className="w-4 h-4 text-[var(--color-gold)]" />
                              <span>{slide.secondaryCta.text}</span>
                            </Link>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
