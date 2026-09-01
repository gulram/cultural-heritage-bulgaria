import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import Hero from '../components/home/Hero'
import DestinationCard from '../components/home/DestinationCard'
import InteractiveMapBanner from '../components/home/InteractiveMapBanner'

import FeedbackState from '../components/ui/FeedbackState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

import useDestinations from '../hooks/useDestinations'

const ABOUT_ITEMS = [
  {
    titleKey: 'home.goal.title',
    descriptionKey: 'home.goal.description',
  },
  {
    titleKey: 'home.interactiveMap.title',
    descriptionKey: 'home.interactiveMap.description',
  },
  {
    titleKey: 'home.heritage.title',
    descriptionKey: 'home.heritage.description',
  },
  {
    titleKey: 'home.technologies.title',
    descriptionKey: 'home.technologies.description',
  },
]

function AboutItem({
  title,
  description,
}) {
  return (
    <article>
      <h3
        className="
          border-b border-border-light
          pb-2

          font-body
          text-section-small
          uppercase
          tracking-[0.08em]
          text-text-primary
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3

          font-body
          text-mobile-body
          text-text-secondary

          md:text-body-small
        "
      >
        {description}
      </p>
    </article>
  )
}

function HomePage() {
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en' ? 'en' : 'bg'

  const {
    destinations,
    isLoading,
    error,
    retry,
  } = useDestinations(locale)

  useEffect(() => {
    const previousTitle = document.title

    document.title =
      locale === 'en'
        ? 'Cultural Heritage Bulgaria'
        : 'Културно наследство България'

    return () => {
      document.title = previousTitle
    }
  }, [locale])

  useEffect(() => {
    if (!location.hash) return

    const sectionId = location.hash.slice(1)
    const section = document.getElementById(sectionId)

    if (!section) return

    const frame = requestAnimationFrame(() => {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
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
            mx-auto max-w-main
            scroll-mt-20

            px-4 py-6

            sm:px-6

            md:px-4

            lg:px-5

            xl:px-0
          "
        >
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
              {t('home.topFive')}
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
              {t('home.destinationsTitle')}
            </h2>

            <p
              className="
                mt-2 max-w-[720px]

                font-body
                text-mobile-small
                text-text-secondary

                md:text-body-small
              "
            >
              {t('home.selectionNote')}
            </p>

            <div
              aria-hidden="true"
              className="
                mt-3 h-px w-full
                bg-accent-orange/50
              "
            />
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {isLoading ? (
              <LoadingSkeleton />
            ) : error ? (
              <FeedbackState
                variant="error"
                title={t('feedback.error.title')}
                description={t('feedback.error.description')}
                actionLabel={t('feedback.error.retry')}
                onAction={retry}
              />
            ) : destinations.length === 0 ? (
              <FeedbackState
                variant="empty"
                title={t('feedback.noResults.title')}
                description={t('feedback.noResults.description')}
              />
            ) : (
              destinations.map((destination) => (
                <DestinationCard
                  key={destination.slug}
                  number={destination.number}
                  title={destination.title}
                  description={destination.description}
                  location={destination.location}
                  unescoYear={destination.unescoYear}
                  image={destination.image}
                  imageAlt={destination.imageAlt}
                  slug={destination.slug}
                  imagePosition={
                    destination.number % 2 === 0
                      ? 'right'
                      : 'left'
                  }
                />
              ))
            )}
          </div>

          <div className="mt-5">
            <InteractiveMapBanner />
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className="
            scroll-mt-[72px]

            bg-background-primary

            px-4 py-6

            sm:px-6

            md:px-4

            lg:px-5
            lg:py-7

            xl:px-0
          "
        >
          <div className="mx-auto w-full max-w-main">
            <div className="mx-auto max-w-[760px] text-center">
              <p
                className="
                  font-body
                  text-section-small
                  uppercase
                  tracking-[0.12em]
                  text-accent-orange
                "
              >
                {t('home.aboutLabel')}
              </p>

              <h2
                id="about-title"
                className="
                  mt-3

                  font-heading
                  text-mobile-h2
                  text-primary

                  md:text-h2
                "
              >
                {t('home.aboutTitle')}
              </h2>

              <p
                className="
                  mx-auto mt-4
                  max-w-[680px]

                  font-body
                  text-mobile-body
                  text-text-secondary

                  md:text-body-regular
                "
              >
                {t('home.aboutDescription')}
              </p>
            </div>

            <div
              className="
                mx-auto mt-5
                grid max-w-[900px] grid-cols-1

                gap-x-6 gap-y-10

                md:grid-cols-2
              "
            >
              {ABOUT_ITEMS.map((item) => (
                <AboutItem
                  key={item.titleKey}
                  title={t(item.titleKey)}
                  description={t(item.descriptionKey)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default HomePage