import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowRight, MessageSquare } from 'lucide-react';
import heroSlides from '../../data/heroSlides';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function HeroSlider() {
  return (
    <section className="relative w-full bg-[var(--color-espresso)] overflow-hidden" aria-label="Featured Showcase">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`,
        }}
        navigation={true}
        className="hero-slider h-[560px] sm:h-[640px] md:h-[720px] w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0">
              <picture>
                <source media="(max-width: 640px)" srcSet={slide.imageMobile || slide.image} />
                <img
                  src={slide.image}
                  alt={slide.headline.replace('\n', ' ')}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-[8000ms] ease-out will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full container-luxury flex flex-col justify-center items-start z-10 text-white">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* Brand kicker */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[var(--color-gold)]" />
                  <span className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[var(--color-gold-muted)]">
                    Radha Swami Furnitures • Handcrafted Luxury
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-[var(--color-ivory)] whitespace-pre-line tracking-tight drop-shadow-sm">
                  {slide.headline}
                </h1>

                {/* Supporting description */}
                <p className="text-sm sm:text-base md:text-lg text-[var(--color-sand)]/90 font-light leading-relaxed max-w-xl">
                  {slide.subheadline}
                </p>

                {/* CTAs */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to={slide.cta.link}
                    className="btn-gold text-xs sm:text-sm px-6 sm:px-8 py-3.5 shadow-lg group"
                  >
                    <span>{slide.cta.text}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {slide.secondaryCta && (
                    <Link
                      to={slide.secondaryCta.link}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-ivory)] border border-white/40 hover:border-white hover:bg-white/10 rounded-sm transition-all duration-300"
                    >
                      <MessageSquare className="w-4 h-4 text-[var(--color-gold)]" />
                      <span>{slide.secondaryCta.text}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
