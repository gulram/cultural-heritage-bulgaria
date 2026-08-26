import {
  useEffect,
  useState,
} from 'react'

import {
  useLocation,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import Header from '../components/Header'
import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import InteractiveMapBanner from '../components/InteractiveMapBanner'
import Footer from '../components/Footer'

import FeedbackState from '../components/FeedbackState'
import NoResultsState from '../components/NoResultsState'
import LoadingSkeleton from '../components/LoadingSkeleton'

import {
  getDestinations,
} from '../services/destinationService'

function HomePage() {
  const location = useLocation()

  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en'
      ? 'en'
      : 'bg'

  const [
    destinations,
    setDestinations,
  ] = useState([])

  const [
    error,
    setError,
  ] = useState(null)

  const [
    retryCount,
    setRetryCount,
  ] = useState(0)

  const [
    resolvedRequest,
    setResolvedRequest,
  ] = useState({
    locale: null,
    retryCount: -1,
  })

  const isLoading =
    resolvedRequest.locale !== locale ||
    resolvedRequest.retryCount !==
      retryCount

  useEffect(() => {
    let isCancelled = false

    getDestinations(locale)
      .then((data) => {
        if (isCancelled) {
          return
        }

        setDestinations(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)

        if (isCancelled) {
          return
        }

        setError(err.message)
      })
      .finally(() => {
        if (isCancelled) {
          return
        }

        setResolvedRequest({
          locale,
          retryCount,
        })
      })

    return () => {
      isCancelled = true
    }
  }, [
    locale,
    retryCount,
  ])

  const handleRetry = () => {
    setRetryCount(
      (current) => current + 1
    )
  }

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const sectionId =
      location.hash.replace('#', '')

    const section =
      document.getElementById(sectionId)

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
            py-6

            lg:w-[calc(100%-40px)]
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
                mt-2
                max-w-[720px]

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
              gap-5
            "
          >
            {/* LOADING */}
            {isLoading && (
              <LoadingSkeleton />
            )}

            {/* ERROR */}
            {!isLoading && error && (
              <FeedbackState
                variant="error"
                title={t(
                  'feedback.error.title'
                )}
                description={t(
                  'feedback.error.description'
                )}
                actionLabel={t(
                  'feedback.error.retry'
                )}
                onAction={handleRetry}
              />
            )}

            {/* NO RESULTS */}
            {!isLoading &&
              !error &&
              destinations.length ===
                0 && (
                <NoResultsState />
              )}

            {/* DESTINATIONS */}
            {!isLoading &&
              !error &&
              destinations.length > 0 &&
              destinations.map(
                (destination) => (
                  <DestinationCard
                    key={destination.slug}
                    number={
                      destination.number
                    }
                    title={
                      destination.title
                    }
                    description={
                      destination.description
                    }
                    location={
                      destination.location
                    }
                    unescoYear={
                      destination.unescoYear
                    }
                    image={
                      destination.image
                    }
                    slug={
                      destination.slug
                    }
                    imagePosition={
                      destination.number %
                        2 ===
                      0
                        ? 'right'
                        : 'left'
                    }
                  />
                )
              )}
          </div>

          {/* Interactive map CTA */}
          <div className="mt-5">
            <InteractiveMapBanner />
          </div>
        </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="
          scroll-mt-[72px]
          bg-background-primary

          px-5
          py-6

          md:px-8
          lg:px-0
          lg:py-7
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-main

            lg:w-[calc(100%-40px)]
          "
        >
          {/* SECTION INTRO */}
          <div
            className="
              mx-auto
              max-w-[760px]
              text-center
            "
          >
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
                mx-auto
                mt-4
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

          {/* INFORMATION GRID */}
          <div
            className="
              mx-auto
              mt-5

              grid
              max-w-[900px]
              grid-cols-1
              gap-x-6
              gap-y-10

              md:grid-cols-2
            "
          >
            {/* GOAL */}
            <article>
              <h3
                className="
                  border-b
                  border-accent-gold
                  pb-2

                  font-body
                  text-section-small
                  uppercase
                  tracking-[0.08em]
                  text-text-primary
                "
              >
                {t('home.goal.title')}
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
                {t('home.goal.description')}
              </p>
            </article>

            {/* INTERACTIVE MAP */}
            <article>
              <h3
                className="
                  border-b
                  border-accent-gold
                  pb-2

                  font-body
                  text-section-small
                  uppercase
                  tracking-[0.08em]
                  text-text-primary
                "
              >
                {t(
                  'home.interactiveMap.title'
                )}
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
                {t(
                  'home.interactiveMap.description'
                )}
              </p>
            </article>

            {/* CULTURAL HERITAGE */}
            <article>
              <h3
                className="
                  border-b
                  border-accent-gold
                  pb-2

                  font-body
                  text-section-small
                  uppercase
                  tracking-[0.08em]
                  text-text-primary
                "
              >
                {t('home.heritage.title')}
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
                {t(
                  'home.heritage.description'
                )}
              </p>
            </article>

            {/* TECHNOLOGIES */}
            <article>
              <h3
                className="
                  border-b
                  border-accent-gold
                  pb-2

                  font-body
                  text-section-small
                  uppercase
                  tracking-[0.08em]
                  text-text-primary
                "
              >
                {t(
                  'home.technologies.title'
                )}
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
                {t(
                  'home.technologies.description'
                )}
              </p>
            </article>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}

export default HomePage