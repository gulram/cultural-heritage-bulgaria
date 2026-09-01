import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import DestinationHero from '../components/destination/DestinationHero'
import DestinationKeyFacts from '../components/destination/DestinationKeyFacts'
import DestinationContent from '../components/destination/DestinationContent'
import DestinationDirections from '../components/destination/DestinationDirections'
import RelatedDestinationsSection from '../components/destination/RelatedDestinationsSection'

import FeedbackState from '../components/ui/FeedbackState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

import useDestinations from '../hooks/useDestinations'
import usePageMetadata from '../hooks/usePageMetadata'

import {
  getGoogleMapsUrl,
  getHistoryParagraphs,
  getHistoryPreview,
  normalizePracticalInfo,
  normalizeQuickFacts,
} from '../utils/destinationUtils'

function DestinationPageState({ children }) {
  return (
    <>
      <Header />

      <main>
        <div
          className="
            mx-auto w-full max-w-main

            px-4 pb-16 pt-[96px]

            sm:px-6

            md:px-4

            lg:px-5

            xl:px-0
          "
        >
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
}

function DestinationPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en' ? 'en' : 'bg'

  const {
    destinations,
    isLoading,
    error,
    retry,
  } = useDestinations(locale)

  const destination =
    destinations.find((item) => item.slug === slug) ?? null

  const relatedDestinations = destinations.filter(
    (item) => item.slug !== slug
  )

  usePageMetadata(destination, locale)

  if (isLoading) {
    return (
      <DestinationPageState>
        <LoadingSkeleton />
      </DestinationPageState>
    )
  }

  if (error) {
    return (
      <DestinationPageState>
        <FeedbackState
          variant="error"
          title={t('feedback.error.title')}
          description={t('feedback.error.description')}
          actionLabel={t('feedback.error.retry')}
          onAction={retry}
        />
      </DestinationPageState>
    )
  }

  if (!destination) {
    return (
      <DestinationPageState>
        <FeedbackState
          variant="empty"
          title={t('feedback.destinationNotFound.title')}
          description={t('feedback.destinationNotFound.description')}
          actionLabel={t('feedback.destinationNotFound.backHome')}
          to="/"
        />
      </DestinationPageState>
    )
  }

  const facts = normalizeQuickFacts(
    destination.quickFacts
  )

  const practicalInfo = normalizePracticalInfo(
    destination.practicalInfo
  )

  const historyPreview = getHistoryPreview(
    destination.history
  )

  const historyParagraphs = getHistoryParagraphs(
    destination.history
  )

  const googleMapsUrl = getGoogleMapsUrl(
    destination.coordinates
  )

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
            mx-auto w-full max-w-main

            px-4 pb-16

            sm:px-6

            md:px-4

            lg:px-5

            xl:px-0
          "
        >
          <DestinationKeyFacts facts={facts} />

          <DestinationContent
            destination={destination}
            locale={locale}
            practicalInfo={practicalInfo}
            historyPreview={historyPreview}
            historyParagraphs={historyParagraphs}
          />

          <DestinationDirections
            destination={destination}
            googleMapsUrl={googleMapsUrl}
          />

          <RelatedDestinationsSection
            destinations={relatedDestinations}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default DestinationPage