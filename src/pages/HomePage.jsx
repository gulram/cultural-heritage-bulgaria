import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'
import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import InteractiveMapBanner from '../components/InteractiveMapBanner'
import Footer from '../components/Footer'

import rilaImage from '../assets/rila-card.jpeg'
import rilaWatermark from '../assets/rila-watermark.png'

import nessebarImage from '../assets/nessebar-card.png'
import nessebarWatermark from '../assets/nessebar-watermark.png'

import boyanaImage from '../assets/boyana-card.png'
import boyanaWatermark from '../assets/boyana-watermark.png'

import madaraImage from '../assets/madara-card.png'
import madaraWatermark from '../assets/madara-watermark.png'

import kazanlakImage from '../assets/kazanlak-card.png'
import kazanlakWatermark from '../assets/kazanlak-watermark.png'

const DESTINATIONS = [
  {
    number: '1',
    title: 'Рилски манастир',
    description:
      'Най-големият и най-значим православен манастир в България, основан през X век от св. Иван Рилски.',
    location: 'Рила, област Кюстендил',
    unescoYear: '1983',
    image: rilaImage,
    watermark: rilaWatermark,
    slug: 'rila-monastery',
    imagePosition: 'left',
  },
  {
    number: '2',
    title: 'Старият град Несебър',
    description:
      'Един от най-старите градове в Европа, известен със своите средновековни църкви, калдъръмени улици и впечатляваща архитектура.',
    location: 'Несебър, област Бургас',
    unescoYear: '1983',
    image: nessebarImage,
    watermark: nessebarWatermark,
    slug: 'old-nessebar',
    imagePosition: 'right',
  },
  {
    number: '3',
    title: 'Боянска църква',
    description:
      'Средновековна църква, прочута със своите стенописи от XIII век, считани за едни от най-ценните произведения на европейското изкуство.',
    location: 'Бояна, София',
    unescoYear: '1979',
    image: boyanaImage,
    watermark: boyanaWatermark,
    slug: 'boyana-church',
    imagePosition: 'left',
  },
  {
    number: '4',
    title: 'Мадарски конник',
    description:
      'Уникален скален релеф от ранното Средновековие, издълбан на височина в скалите край Мадара и символ на българската история.',
    location: 'Мадара, област Шумен',
    unescoYear: '1979',
    image: madaraImage,
    watermark: madaraWatermark,
    slug: 'madara-rider',
    imagePosition: 'right',
  },
  {
    number: '5',
    title: 'Казанлъшка гробница',
    description:
      'Тракийска гробница от елинистическата епоха, известна със своите изключително добре запазени стенописи.',
    location: 'Казанлък, област Стара Загора',
    unescoYear: '1979',
    image: kazanlakImage,
    watermark: kazanlakWatermark,
    slug: 'kazanlak-tomb',
    imagePosition: 'left',
  },
]

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const sectionId = location.hash.replace('#', '')
    const section = document.getElementById(sectionId)

    if (!section) {
      return
    }

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [location.hash])

  return (
    <>
        <Header />
      <main>
        <Hero />

        <section
          id="destinations"
          aria-labelledby="destinations-title"
          className="
            mx-auto
            max-w-main
            scroll-mt-20
            px-5
            py-16

            lg:px-0
          "
        >
          {/* Section heading */}
          <div>
            <p
              className="
                font-body
                text-section
                uppercase
                tracking-[0.12em]
                text-accent-orange
              "
            >
              ТОП 5
            </p>

            <h2
              id="destinations-title"
              className="
                mt-2
                font-heading
                text-mobile-h2
                text-text-primary

                md:text-h2
              "
            >
              Най-популярните паметници в България
            </h2>

            <div
              aria-hidden="true"
              className="
                mt-3
                h-px
                w-full
                bg-accent-orange/50
              "
            />
          </div>

          {/* Destination cards */}
          <div
            className="
              mt-5
              flex
              flex-col
              gap-12
            "
          >
            {DESTINATIONS.map((destination) => (
              <DestinationCard
                key={destination.slug}
                {...destination}
              />
            ))}
          </div>

          {/* Interactive map CTA */}
          <div className="mt-12">
            <InteractiveMapBanner />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default HomePage