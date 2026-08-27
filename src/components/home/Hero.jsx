import {
  ArrowRight,
  Heart,
  Landmark,
  MapPin,
} from 'lucide-react'

import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'
import FeatureItem from './FeatureItem'

import heroImage from '../../assets/rila-hero.png'

const FEATURES = [
  {
    id: 'recognition',
    icon: Landmark,
    titleKey: 'hero.features.recognition.title',
    descriptionKey: 'hero.features.recognition.description',
  },
  {
    id: 'heritage',
    icon: Heart,
    titleKey: 'hero.features.heritage.title',
    descriptionKey: 'hero.features.heritage.description',
  },
  {
    id: 'visit',
    icon: MapPin,
    titleKey: 'hero.features.visit.title',
    descriptionKey: 'hero.features.visit.description',
  },
]

function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="
        relative
        min-h-[580px]
        overflow-hidden

        bg-cover
        bg-[position:50%_center]

        sm:min-h-[560px]

        md:min-h-[540px]
        md:bg-center

        lg:h-[550px]
        lg:min-h-0
      "
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[580px]
          w-full
          max-w-main
          flex-col

          px-4
          pb-5
          pt-[92px]

          text-white

          sm:px-6

          md:h-full
          md:px-4
          md:pt-[135px]

          lg:px-5

          xl:px-0
        "
      >
        <div className="max-w-[620px]">
          <h1
            id="hero-title"
            className="
              font-heading
              text-mobile-h1

              [text-shadow:0_2px_8px_rgba(0,0,0,0.65)]

              md:text-h1
            "
          >
            {t('hero.titleFirst')}

            <span
              className="
                mt-1
                block
                text-white
              "
            >
              {t('hero.titleSecond')}
            </span>
          </h1>

          <p
            className="
              mt-4
              max-w-[350px]

              font-body
              text-mobile-body
              text-white/90

              sm:max-w-[430px]

              md:mt-3
              md:max-w-[570px]
              md:text-body-regular
            "
          >
            {t('hero.description')}
          </p>

          <Button
            to="/map"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            iconSize={20}
            className="mt-4 border border-white/70"
          >
            {t('hero.openMap')}
          </Button>
        </div>

        <div
          className="
            mt-6

            flex
            flex-col
            gap-3

            sm:mt-7

            md:mt-auto
            md:max-w-[1080px]
            md:flex-row
            md:gap-6
            md:pb-3

            lg:gap-8
          "
        >
          {FEATURES.map((feature) => (
            <FeatureItem
              key={feature.id}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero