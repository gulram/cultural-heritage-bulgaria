import { useTranslation } from 'react-i18next'

import RelatedDestinationCard from './RelatedDestinationCard'
import InteractiveMapBanner from '../home/InteractiveMapBanner'

function RelatedDestinationsSection({
  destinations = [],
}) {
  const { t } = useTranslation()

  if (destinations.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="related-title"
      className="
        mt-8 
        rounded-lg
        bg-primary p-4
        
        lg:p-5
      "
    >
      <h2
        id="related-title"
        className="
          font-heading text-mobile-h2 text-white
          
          md:text-h3 md:uppercase
        "
      >
        {t('destination.exploreMore')}
      </h2>

      <div
        className="
          mt-5 
          grid grid-cols-1 
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {destinations.map((destination) => (
          <RelatedDestinationCard
            key={destination.slug}
            title={destination.title}
            image={destination.image}
            slug={destination.slug}
          />
        ))}
      </div>

      <div className="mt-5">
        <InteractiveMapBanner />
      </div>
    </section>
  )
}

export default RelatedDestinationsSection