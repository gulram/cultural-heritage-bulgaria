import {
  ArrowRight,
  Heart,
  Landmark,
  MapPin,
} from 'lucide-react'

import Button from './Button'
import FeatureItem from './FeatureItem'

import heroImage from '../assets/rila-hero.png'

const FEATURES = [
  {
    id: 'recognition',
    icon: Landmark,
    title: 'Световно признание',
    description:
      'Обекти с изключителна универсална стойност.',
  },
  {
    id: 'heritage',
    icon: Heart,
    title: 'Културна гордост',
    description:
      'Открий наследството, което пазим през вековете.',
  },
  {
    id: 'visit',
    icon: MapPin,
    title: 'Планирай посещение',
    description:
      'Всичко необходимо за едно вдъхновяващо пътуване.',
  },
]

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="
        relative
        min-h-[530px]
        overflow-hidden
        bg-cover
        bg-[position:58%_center]

        lg:h-[550px]
        lg:min-h-0
        lg:bg-center
      "
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-black/40

          md:bg-black/30
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10
          mx-auto flex
          w-full max-w-main
          flex-col
          px-5
          pb-4
          pt-[92px]
          text-white

          md:h-full
          md:px-0
          md:pt-[135px]
        "
      >
        {/* Main content */}
        <div className="max-w-[620px]">
          {/* Title */}
          <h1
            id="hero-title"
            className="
              font-heading
              text-mobile-h1

              md:text-h1
            "
          >
            Пет места. Пет истории.

            <span
              className="
                mt-1 block
                text-accent-orange
              "
            >
              Едно наследство
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-[350px]
              font-body
              text-mobile-body
              text-white/90

              md:mt-3
              md:max-w-[570px]
              md:text-body-regular
            "
          >
            Дигитален пътеводител към ПЕТ от най-ценните
            български обекти, включени в Списъка на
            световното културно наследство на ЮНЕСКО.
          </p>

          {/* CTA */}
          <Button
            to="/map"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            iconSize={20}
            className="mt-4 border border-white/70"
          >
            Отвори интерактивната карта
          </Button>
        </div>

        {/* Features */}
        <div
          className="
            mt-5
            flex
            flex-col
            gap-3

            md:mt-auto
            md:max-w-[1080px]
            md:flex-row
            md:gap-8
            md:pb-3
          "
        >
          {FEATURES.map((feature) => (
            <FeatureItem
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero