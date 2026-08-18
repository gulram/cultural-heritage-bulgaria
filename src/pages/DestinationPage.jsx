import {
  useEffect,
  useState,
} from 'react'

import { useParams } from 'react-router-dom'

import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Landmark,
  MapPin,
  ScrollText,
  Ticket,
  Trophy,
  Users,
  X,
} from 'lucide-react'

import Header from '../components/Header'
import DestinationHero from '../components/DestinationHero'
import KeyFactCard from '../components/KeyFactCard'
import InfoRow from '../components/InfoRow'
import GalleryHeroImage from '../components/GalleryHeroImage'
import GalleryThumbnail from '../components/GalleryThumbnail'
import RelatedDestinationCard from '../components/RelatedDestinationCard'
import InteractiveMapBanner from '../components/InteractiveMapBanner'
import DestinationMiniMap from '../components/DestinationMiniMap'
import Button from '../components/Button'
import Footer from '../components/Footer'

import rilaHero from '../assets/rila-hero.png'
import rilaImage from '../assets/rila-card.jpeg'

const DESTINATIONS = {
  'rila-monastery': {
    title: 'Рилски манастир',

    heroImage: rilaHero,

    location: 'Рила, област Кюстендил',

    coordinates: [42.133297, 23.340186],

    unescoYear: '1983',

    facts: [
      {
        id: 'largest',
        icon: Trophy,
        value: 'Най-големият',
        description:
          'Православен манастир в България',
      },
      {
        id: 'unesco',
        icon: Landmark,
        value: 'ЮНЕСКО',
        description: 'От 1983 г.',
      },
      {
        id: 'history',
        icon: ScrollText,
        value: '1000+',
        description: 'Години история',
      },
      {
        id: 'iconic',
        icon: Award,
        value: 'Иконично',
        description: 'Стенописите',
      },
    ],

    about:
      'Рилският манастир е най-голямата православна обител в България и един от най-значимите духовни и културни символи на страната. Основан през X век от св. Иван Рилски, той се превръща в център на религиозния, книжовния и обществения живот.',

    history:
      'Рилският манастир е основан през първата половина на X век от свети Йоан Рилски — отшелник и духовник, почитан като небесен закрилник на българския народ. Неговото отшелническо жилище и гроб постепенно се превръщат в свято място, около което възниква манастирският комплекс.',

    historyMore:
      'През вековете манастирът многократно е преустройван и възстановяван. Днешният му архитектурен облик е оформен основно през Българското възраждане и съчетава духовна, художествена и историческа стойност.',

    practicalInfo: [
      {
        id: 'hours',
        icon: Clock3,
        title: 'Работно време',
        lines: [
          'от периода 1 юни – 30 септември:',
          '8:30 – 19:30 ч.',
        ],
      },
      {
        id: 'tickets',
        icon: Ticket,
        title: 'Билети',
        lines: [
          'От 2,50 €',
          'Комбиниран: 12 €',
        ],
      },
      {
        id: 'purchase',
        icon: Info,
        title: 'Закупуване',
        lines: ['Билети само на място'],
      },
      {
        id: 'guide',
        icon: Users,
        title: 'Екскурзовод',
        lines: [
          'BG / EN / FR',
          '≈ 50 мин.',
        ],
      },
    ],

    gallery: [
      {
        id: 'gallery-1',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 1',
      },
      {
        id: 'gallery-2',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 2',
      },
      {
        id: 'gallery-3',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 3',
      },
      {
        id: 'gallery-4',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 4',
      },
      {
        id: 'gallery-5',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 5',
      },
      {
        id: 'gallery-6',
        src: rilaImage,
        alt: 'Рилски манастир – снимка 6',
      },
    ],

    related: [
      {
        title: 'Древният Несебър',
        image: rilaImage,
        slug: 'old-nesebar',
      },
      {
        title: 'Боянска църква',
        image: rilaImage,
        slug: 'boyana-church',
      },
      {
        title: 'Мадарски конник',
        image: rilaHero,
        slug: 'madara-rider',
      },
      {
        title: 'Казанлъшка гробница',
        image: rilaImage,
        slug: 'kazanlak-tomb',
      },
    ],
  },
}

function DestinationPage() {
  const { slug } = useParams()

  const [isHistoryModalOpen, setIsHistoryModalOpen] =
    useState(false)

  const [isGalleryModalOpen, setIsGalleryModalOpen] =
    useState(false)

  const [
    activeGalleryIndex,
    setActiveGalleryIndex,
  ] = useState(0)

  const destination =
    DESTINATIONS[slug] ||
    DESTINATIONS['rila-monastery']

  const galleryLength =
    destination.gallery.length

  const openGallery = (index = 0) => {
    setActiveGalleryIndex(index)
    setIsGalleryModalOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryModalOpen(false)
  }

  const showPreviousImage = () => {
    setActiveGalleryIndex((currentIndex) =>
      currentIndex === 0
        ? galleryLength - 1
        : currentIndex - 1
    )
  }

  const showNextImage = () => {
    setActiveGalleryIndex((currentIndex) =>
      currentIndex === galleryLength - 1
        ? 0
        : currentIndex + 1
    )
  }

  /*
   * HISTORY MODAL
   * - затваряне с Escape
   * - блокиране на scroll-а на страницата
   */
  useEffect(() => {
    if (!isHistoryModalOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsHistoryModalOpen(false)
      }
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [isHistoryModalOpen])

  /*
   * GALLERY MODAL
   * - Escape затваря галерията
   * - ArrowLeft / ArrowRight сменят снимките
   * - блокиране на scroll-а на страницата
   */
  useEffect(() => {
    if (!isGalleryModalOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsGalleryModalOpen(false)
      }

      if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex(
          (currentIndex) =>
            currentIndex === 0
              ? galleryLength - 1
              : currentIndex - 1
        )
      }

      if (event.key === 'ArrowRight') {
        setActiveGalleryIndex(
          (currentIndex) =>
            currentIndex ===
            galleryLength - 1
              ? 0
              : currentIndex + 1
        )
      }
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [
    isGalleryModalOpen,
    galleryLength,
  ])

  return (
    <>
      <Header />

      <main>
        {/* DESTINATION HERO */}
        <DestinationHero
          title={destination.title}
          image={destination.heroImage}
          location={destination.location}
          unescoYear={destination.unescoYear}
        />

        {/* PAGE CONTENT */}
        <div
          className="
            mx-auto
            w-full
            max-w-main

            px-5
            pb-16

            lg:px-0
          "
        >
          {/* KEY FACTS */}
          <section
            aria-label="Ключови факти"
            className="
              mt-6
              w-full
            "
          >
            <div
              className="
                mx-auto
                w-full

                rounded-[16px]
                border
                border-border-light
                bg-background-highlight

                px-5
                py-5

                shadow-default

                sm:px-6

                lg:flex
                lg:h-[130px]
                lg:w-[1003px]
                lg:max-w-none
                lg:items-center
                lg:justify-between
                lg:gap-4
                lg:px-5
                lg:py-5
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5

                  sm:grid-cols-2

                  lg:contents
                "
              >
                {destination.facts.map((fact) => (
                  <KeyFactCard
                    key={fact.id}
                    icon={fact.icon}
                    value={fact.value}
                    description={fact.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT + PRACTICAL INFO */}
          <section
            className="
              mt-12

              grid
              grid-cols-1
              gap-10

              lg:grid-cols-[1fr_450px]
              lg:items-start
              lg:gap-8
            "
          >
            {/* LEFT COLUMN */}
            <div className="min-w-0">
              {/* ABOUT */}
              <section
                aria-labelledby="about-destination-title"
              >
                <h2
                  id="about-destination-title"
                  className="
                    font-heading
                    text-mobile-h2
                    uppercase
                    text-primary

                    md:text-h3
                  "
                >
                  За обекта
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[750px]

                    font-body
                    text-body-regular
                    text-text-secondary
                  "
                >
                  {destination.about}
                </p>
              </section>

              {/* HISTORY */}
              <section
                aria-labelledby="history-title"
                className="
                  mt-6

                  border-t
                  border-border-light

                  pt-6
                "
              >
                <h2
                  id="history-title"
                  className="
                    font-heading
                    text-mobile-h2
                    uppercase
                    text-primary

                    md:text-h3
                  "
                >
                  История
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[750px]

                    font-body
                    text-body-regular
                    text-text-secondary
                  "
                >
                  {destination.history}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  icon={ArrowRight}
                  iconSize={16}
                  className="mt-5"
                  onClick={() =>
                    setIsHistoryModalOpen(true)
                  }
                >
                  Прочети повече
                </Button>
              </section>
            </div>

            {/* PRACTICAL INFORMATION */}
            <aside
              aria-labelledby="practical-info-title"
              className="
                w-full
                self-start

                rounded-[18px]
                border
                border-border-light
                bg-background-card

                px-6
                py-4

                shadow-default

                lg:w-[450px]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >
                <h2
                  id="practical-info-title"
                  className="
                    font-body
                    text-section-small
                    uppercase
                    tracking-[0.12em]
                    text-accent-orange
                  "
                >
                  Практическа информация
                </h2>

                {destination.practicalInfo.map(
                  (item) => (
                    <InfoRow
                      key={item.id}
                      icon={item.icon}
                      title={item.title}
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-1
                        "
                      >
                        {item.lines.map((line) => (
                          <p key={line}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </InfoRow>
                  )
                )}
              </div>
            </aside>
          </section>

          {/* GALLERY */}
          <section
            aria-labelledby="gallery-title"
            className="
              mt-10

              border-t
              border-border-light

              pt-10
            "
          >
            <h2
              id="gallery-title"
              className="
                font-heading
                text-mobile-h2
                uppercase
                text-primary

                md:text-h3
              "
            >
              Галерия
            </h2>

            <div
              className="
                mt-6

                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              {destination.gallery
                .slice(0, 3)
                .map((image) => (
                  <GalleryHeroImage
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    className="
                      h-[180px]

                      lg:h-[160px]
                    "
                  />
                ))}

              {/* VIEW MORE */}
              <button
                type="button"
                onClick={() => openGallery(0)}
                className="
                  flex
                  min-h-[160px]
                  flex-col
                  items-center
                  justify-center
                  gap-3

                  rounded-[12px]

                  border
                  border-border-light

                  bg-background-card

                  px-4

                  shadow-default

                  transition-[border-color,box-shadow]
                  duration-200
                  ease-out

                  hover:border-accent-orange
                  hover:shadow-hover

                  focus-visible:outline-none
                  focus-visible:shadow-focus
                "
              >
                <ImageIcon
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.6}
                  className="text-accent-orange"
                />

                <span
                  className="
                    font-body
                    text-body-small
                    font-medium
                    text-text-primary
                  "
                >
                  Виж всички снимки
                </span>
              </button>
            </div>
          </section>

          {/* DIRECTIONS */}
          <section
            aria-labelledby="directions-title"
            className="
              mt-8
              border-t
              border-border-light

              pt-6
            "
          >
            <h2
              id="directions-title"
              className="
                font-heading
                text-mobile-h2
                text-primary

                md:text-h3
                md:uppercase
              "
            >
              Как да стигнете
            </h2>

            <div
              className="
                mt-5

                grid
                grid-cols-1
                gap-5

                lg:grid-cols-[300px_1fr]
                lg:items-stretch
                lg:gap-6
              "
            >
              {/* LOCATION */}
              <div
                className="
                  flex
                  w-full
                  flex-col

                  rounded-[14px]

                  border
                  border-border-light

                  bg-background-card

                  px-5
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    font-body
                    text-body-small
                    text-text-secondary
                  "
                >
                  <MapPin
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.8}
                    className="
                      shrink-0
                      text-accent-orange
                    "
                  />

                  <span>
                    {destination.location}
                  </span>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates[0]},${destination.coordinates[1]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-3

                    inline-flex
                    h-12
                    w-fit
                    items-center
                    justify-center
                    gap-2

                    rounded-md

                    border
                    border-accent-orange

                    px-4

                    font-body
                    text-button
                    text-accent-orange

                    transition-[border-color,color,box-shadow]
                    duration-200
                    ease-out

                    hover:border-accent-antique
                    hover:text-accent-antique
                    hover:shadow-button
                  "
                >
                  Отвори в Google Maps

                  <ExternalLink
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.8}
                  />
                </a>
              </div>

              {/* REAL INTERACTIVE MAP */}
              <DestinationMiniMap
                position={destination.coordinates}
                title={destination.title}
              />
            </div>
          </section>

          {/* EXPLORE MORE */}
          <section
            aria-labelledby="related-title"
            className="
              mt-10

              rounded-[18px]
              bg-primary

              p-4

              lg:p-5
            "
          >
            <h2
              id="related-title"
              className="
                font-heading
                text-mobile-h2
                text-white

                md:text-h3
                md:uppercase
              "
            >
              Разгледайте още
            </h2>

            <div
              className="
                mt-5

                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              {destination.related.map(
                (relatedDestination) => (
                  <RelatedDestinationCard
                    key={
                      relatedDestination.slug
                    }
                    title={
                      relatedDestination.title
                    }
                    image={
                      relatedDestination.image
                    }
                    slug={
                      relatedDestination.slug
                    }
                  />
                )
              )}
            </div>

            <div className="mt-5">
              <InteractiveMapBanner />
            </div>
          </section>
        </div>
      </main>

      {/* GALLERY MODAL */}
      {isGalleryModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            bg-black/35

            px-4
            py-6
          "
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeGallery()
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            className="
              relative

              w-full
              max-w-[1180px]
              max-h-[92vh]
              overflow-y-auto

              rounded-[18px]

              border
              border-border-light

              bg-background-card

              px-4
              py-4

              shadow-hover

              md:px-6
              md:py-4
            "
          >
            {/* GALLERY HEADER */}
            <div
              className="
                flex
                items-start
                justify-between
                gap-6
              "
            >
              <div>
                <h2
                  id="gallery-modal-title"
                  className="
                    font-heading
                    text-mobile-h2
                    text-text-primary

                    md:text-h3
                  "
                >
                  {destination.title}
                </h2>

                <p
                  className="
                    mt-1

                    font-body
                    text-body-small
                    text-text-secondary
                  "
                >
                  {activeGalleryIndex + 1} от{' '}
                  {galleryLength}
                </p>
              </div>

              {/* CLOSE */}
              <button
                type="button"
                aria-label="Затвори галерията"
                onClick={closeGallery}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  text-text-primary

                  transition-colors
                  duration-200
                  ease-out

                  hover:text-accent-orange

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-orange
                  focus-visible:ring-offset-2
                "
              >
                <X
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.7}
                />
              </button>
            </div>

            {/* ACTIVE IMAGE */}
            <div
              className="
                relative
                mt-4

                overflow-hidden
                rounded-[16px]

                bg-black/5
              "
            >
              <img
                src={
                  destination.gallery[
                    activeGalleryIndex
                  ].src
                }
                alt={
                  destination.gallery[
                    activeGalleryIndex
                  ].alt
                }
                className="
                  h-[250px]
                  w-full
                  object-cover

                  sm:h-[380px]

                  lg:h-[460px]
                "
              />

              {/* PREVIOUS */}
              <button
                type="button"
                aria-label="Предишна снимка"
                onClick={showPreviousImage}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/70

                  bg-black/25
                  text-white

                  backdrop-blur-sm

                  transition-colors
                  duration-200
                  ease-out

                  hover:bg-black/45
                "
              >
                <ChevronLeft
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.7}
                />
              </button>

              {/* NEXT */}
              <button
                type="button"
                aria-label="Следваща снимка"
                onClick={showNextImage}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/70

                  bg-black/25
                  text-white

                  backdrop-blur-sm

                  transition-colors
                  duration-200
                  ease-out

                  hover:bg-black/45
                "
              >
                <ChevronRight
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.7}
                />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div
              className="
                mt-3

                flex
                gap-3
                overflow-x-auto

                pb-1

                lg:justify-center
              "
            >
              {destination.gallery.map(
                (image, index) => (
                  <GalleryThumbnail
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    isSelected={
                      index ===
                      activeGalleryIndex
                    }
                    ariaLabel={`Отвори снимка ${
                      index + 1
                    }`}
                    onClick={() =>
                      setActiveGalleryIndex(
                        index
                      )
                    }
                  />
                )
              )}
            </div>
          </section>
        </div>
      )}

      {/* HISTORY MODAL */}
      {isHistoryModalOpen && (
        <>
          {/* Modal animation */}
          <style>
            {`
              @keyframes historyOverlayFadeIn {
                from {
                  opacity: 0;
                }

                to {
                  opacity: 1;
                }
              }

              @keyframes historyModalMoveIn {
                from {
                  opacity: 0;
                  transform: translateY(32px);
                }

                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          {/* OVERLAY */}
          <div
            className="
              fixed
              inset-0
              z-[100]

              flex
              items-center
              justify-center

              bg-black/25

              px-5
              py-8
            "
            style={{
              animation:
                'historyOverlayFadeIn 300ms ease-out',
            }}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setIsHistoryModalOpen(false)
              }
            }}
          >
            {/* MODAL */}
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="history-modal-title"
              className="
                relative

                w-full
                max-w-[760px]
                max-h-[85vh]
                overflow-y-auto

                rounded-[18px]

                border
                border-border-light

                bg-background-card

                px-7
                py-8

                shadow-hover

                md:px-8
                md:py-11
              "
              style={{
                animation:
                  'historyModalMoveIn 300ms ease-out',
              }}
            >
              {/* MODAL HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >
                {/* TITLE */}
                <h2
                  id="history-modal-title"
                  className="
                    font-heading
                    text-mobile-h2
                    uppercase
                    text-primary

                    md:text-h3
                    md:whitespace-nowrap
                  "
                >
                  История през вековете
                </h2>

                {/* CLOSE */}
                <button
                  type="button"
                  aria-label="Затвори"
                  onClick={() =>
                    setIsHistoryModalOpen(false)
                  }
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    text-accent-orange

                    transition-colors
                    duration-200
                    ease-out

                    hover:text-accent-antique

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent-orange
                    focus-visible:ring-offset-2
                  "
                >
                  <X
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* CONTENT */}
              <div
                className="
                  mt-5
                  w-full

                  flex
                  flex-col
                  gap-5

                  font-body
                  text-body-regular
                  text-text-secondary
                "
              >
                <p>
                  {destination.history}
                </p>

                <p>
                  {destination.historyMore}
                </p>
              </div>
            </section>
          </div>
        </>
      )}

      <Footer />
    </>
  )
}

export default DestinationPage