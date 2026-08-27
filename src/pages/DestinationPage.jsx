import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  ExternalLink,
  MapPin,
} from 'lucide-react'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import DestinationHero from '../components/destination/DestinationHero'
import KeyFactCard from '../components/destination/KeyFactCard'
import RelatedDestinationCard from '../components/destination/RelatedDestinationCard'
import DestinationMiniMap from '../components/destination/DestinationMiniMap'
import DestinationGallery from '../components/destination/DestinationGallery'
import DestinationPracticalInfo from '../components/destination/DestinationPracticalInfo'
import HistoryModal from '../components/destination/HistoryModal'

import InteractiveMapBanner from '../components/home/InteractiveMapBanner'

import Button from '../components/ui/Button'
import FeedbackState from '../components/ui/FeedbackState'
import NoResultsState from '../components/ui/NoResultsState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

import {
  getDestinationBySlug,
  getDestinations,
} from '../services/destinationService'

import {
  getHistoryParagraphs,
  getHistoryPreview,
  normalizePracticalInfo,
  normalizeQuickFacts,
} from '../utils/destinationUtils'

function DestinationPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en'
      ? 'en'
      : 'bg'

  const [destination, setDestination] = useState(null)
  const [
    relatedDestinations,
    setRelatedDestinations,
  ] = useState([])
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const [resolvedRequest, setResolvedRequest] =
    useState({
      slug: null,
      locale: null,
      retryCount: -1,
    })

  const [
    isHistoryModalOpen,
    setIsHistoryModalOpen,
  ] = useState(false)

  const isLoading =
    resolvedRequest.slug !== slug ||
    resolvedRequest.locale !== locale ||
    resolvedRequest.retryCount !== retryCount

  useEffect(() => {
    let isCancelled = false

    Promise.all([
      getDestinationBySlug(slug, locale),
      getDestinations(locale),
    ])
      .then(([destinationData, allDestinations]) => {
        if (isCancelled) {
          return
        }

        setError(null)

        if (!destinationData) {
          setDestination(null)
          setRelatedDestinations([])
          return
        }

        setDestination(destinationData)

        setRelatedDestinations(
          allDestinations.filter(
            (item) => item.slug !== slug
          )
        )

        setIsHistoryModalOpen(false)
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
          slug,
          locale,
          retryCount,
        })
      })

    return () => {
      isCancelled = true
    }
  }, [slug, locale, retryCount])

  useEffect(() => {
    if (!destination) {
      return
    }

    const siteName =
      locale === 'en'
        ? 'UNESCO Bulgaria'
        : 'ЮНЕСКО България'

    const pageTitle =
      `${destination.title} | ${siteName}`

    const pageDescription =
      destination.description || ''

    const pageImage =
      destination.image || ''

    const previousTitle = document.title

    document.title = pageTitle

    const setMetaTag = (
      selector,
      attribute,
      attributeValue,
      content
    ) => {
      let element =
        document.querySelector(selector)

      const wasCreated = !element

      if (!element) {
        element = document.createElement('meta')

        element.setAttribute(
          attribute,
          attributeValue
        )

        document.head.appendChild(element)
      }

      const previousContent =
        element.getAttribute('content')

      element.setAttribute('content', content)

      return () => {
        if (wasCreated) {
          element.remove()
          return
        }

        element.setAttribute(
          'content',
          previousContent || ''
        )
      }
    }

    const cleanupDescription = setMetaTag(
      'meta[name="description"]',
      'name',
      'description',
      pageDescription
    )

    const cleanupOgTitle = setMetaTag(
      'meta[property="og:title"]',
      'property',
      'og:title',
      pageTitle
    )

    const cleanupOgDescription = setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      pageDescription
    )

    const cleanupOgImage = setMetaTag(
      'meta[property="og:image"]',
      'property',
      'og:image',
      pageImage
    )

    const cleanupOgType = setMetaTag(
      'meta[property="og:type"]',
      'property',
      'og:type',
      'website'
    )

    return () => {
      document.title = previousTitle

      cleanupDescription()
      cleanupOgTitle()
      cleanupOgDescription()
      cleanupOgImage()
      cleanupOgType()
    }
  }, [destination, locale])

  useEffect(() => {
    if (!destination) {
      return
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: destination.title,
      description: destination.description || '',
      image: destination.image || '',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.coordinates[0],
        longitude: destination.coordinates[1],
      },
    }

    const script =
      document.createElement('script')

    script.type = 'application/ld+json'
    script.textContent =
      JSON.stringify(structuredData)

    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [destination])

  const handleRetry = () => {
    setRetryCount(
      (current) => current + 1
    )
  }

  const gallery =
    destination?.gallery ?? []

  const facts = normalizeQuickFacts(
    destination?.quickFacts ?? []
  )

  const practicalInfo = normalizePracticalInfo(
    destination?.practicalInfo ?? []
  )

  const historyPreview = getHistoryPreview(
    destination?.history
  )

  const historyParagraphs = getHistoryParagraphs(
    destination?.history
  )

  if (isLoading) {
    return (
      <>
        <Header />

        <main>
          <div
            className="
              mx-auto
              w-full
              max-w-main

              px-4
              py-16

              sm:px-6
              md:px-4
              lg:px-5
              xl:px-0
            "
          >
            <LoadingSkeleton />
          </div>
        </main>

        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />

        <main>
          <div
            className="
              mx-auto
              w-full
              max-w-main

              px-4
              py-16

              sm:px-6
              md:px-4
              lg:px-5
              xl:px-0
            "
          >
            <FeedbackState
              variant="error"
              title={t('feedback.error.title')}
              description={t(
                'feedback.error.description'
              )}
              actionLabel={t(
                'feedback.error.retry'
              )}
              onAction={handleRetry}
            />
          </div>
        </main>

        <Footer />
      </>
    )
  }

  if (!destination) {
    return (
      <>
        <Header />

        <main>
          <div
            className="
              mx-auto
              w-full
              max-w-main

              px-4
              py-16

              sm:px-6
              md:px-4
              lg:px-5
              xl:px-0
            "
          >
            <NoResultsState />
          </div>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main>
        <DestinationHero
          title={destination.title}
          image={destination.image}
          location={destination.location}
          unescoYear={destination.unescoYear}
        />

        <div
          className="
            mx-auto
            w-full
            max-w-main

            px-4
            pb-16

            sm:px-6
            md:px-4
            lg:px-5
            xl:px-0
          "
        >
          {/* KEY FACTS */}
          <section
            aria-labelledby="key-facts-title"
            className="
              mt-6
              w-full
            "
          >
            <h2
              id="key-facts-title"
              className="sr-only"
            >
              {t('destination.keyFacts')}
            </h2>

            <div
              className="
                mx-auto
                w-full

                rounded-md
                border
                border-border-light
                bg-background-highlight

                px-4
                py-4

                shadow-default

                sm:px-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
                  items-center
                  gap-5
                "
              >
                {facts.map((fact) => (
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
          <div
            className="
              mt-6

              grid
              grid-cols-1
              gap-4

              lg:grid-cols-[1fr_450px]
              lg:items-start
              lg:gap-8
            "
          >
            <div
              className="
                contents

                lg:block
                lg:min-w-0
              "
            >
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
                  {destination.aboutTitle}
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[750px]

                    font-body
                    text-mobile-body
                    text-text-secondary

                    md:text-body-regular
                  "
                >
                  {destination.about}
                </p>
              </section>

              <section
                aria-labelledby="history-title"
                className="
                  mt-0

                  border-t
                  border-border-light

                  pt-6

                  lg:mt-6
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
                  {t('destination.history')}
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[750px]

                    font-body
                    text-mobile-body
                    text-text-secondary

                    md:text-body-regular
                  "
                >
                  {historyPreview}
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
                  {t('destination.readMore')}
                </Button>
              </section>

              <div
                className="
                  order-2

                  lg:order-none
                "
              >
                <DestinationGallery
                  key={`${destination.slug}-${locale}`}
                  gallery={gallery}
                  destinationTitle={
                    destination.title
                  }
                />
              </div>
            </div>

            <DestinationPracticalInfo
              practicalInfo={practicalInfo}
              lastVerifiedAt={
                destination.lastVerifiedAt
              }
            />
          </div>

          {/* DIRECTIONS */}
          <section
            aria-labelledby="directions-title"
            className="
              order-2
              mt-6

              border-t
              border-border-light

              pt-6

              lg:order-none
            "
          >
            <h2
              id="directions-title"
              className="
                font-heading
                text-mobile-h2
                uppercase
                text-primary

                md:text-h3
                md:uppercase
              "
            >
              {t('destination.directions')}
            </h2>

            <div
              className="
                mt-5

                grid
                grid-cols-1
                gap-5

                md:grid-cols-[220px_minmax(0,1fr)]
                md:items-stretch
                md:gap-3

                xl:grid-cols-[300px_minmax(0,1fr)]
                xl:gap-3
              "
            >
              <div
                className="
                  flex
                  w-full
                  flex-col

                  rounded-[14px]

                  border
                  border-border-light

                  bg-background-card

                  px-2
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-1

                    font-body
                    text-mobile-small
                    text-text-secondary

                    md:text-body-small
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
                  {t('destination.openGoogleMaps')}

                  <ExternalLink
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.8}
                  />
                </a>
              </div>

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
              mt-8

              rounded-lg
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
              {t('destination.exploreMore')}
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
              {relatedDestinations.map(
                (relatedDestination) => (
                  <RelatedDestinationCard
                    key={relatedDestination.slug}
                    title={relatedDestination.title}
                    image={relatedDestination.image}
                    slug={relatedDestination.slug}
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

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() =>
          setIsHistoryModalOpen(false)
        }
        paragraphs={historyParagraphs}
      />

      <Footer />
    </>
  )
}

export default DestinationPage