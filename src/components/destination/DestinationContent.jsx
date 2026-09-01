import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import Button from '../ui/Button'
import DestinationGallery from './DestinationGallery'
import DestinationPracticalInfo from './DestinationPracticalInfo'
import HistoryModal from './HistoryModal'

function DestinationContent({
  destination,
  locale,
  practicalInfo = [],
  historyPreview = '',
  historyParagraphs = [],
}) {
  const { t } = useTranslation()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  return (
    <>
      <div
        className="
          mt-6
          grid 
          grid-cols-1 
          gap-4
          
          lg:grid-cols-[1fr_450px] 
          lg:items-start lg:gap-8
        "
      >
        <div className="contents lg:block lg:min-w-0">
          <section aria-labelledby="about-destination-title">
            <h2
              id="about-destination-title"
              className="
                font-heading text-mobile-h2 uppercase text-primary
                
                md:text-h3
              "
            >
              {destination.aboutTitle}
            </h2>

            <p
              className="
                mt-4 
                max-w-[750px]
                font-body text-mobile-body text-text-secondary
                
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
              border-t border-border-light 
              pt-6
              
              lg:mt-6
            "
          >
            <h2
              id="history-title"
              className="
                font-heading text-mobile-h2 uppercase text-primary
                
                md:text-h3
              "
            >
              {t('destination.history')}
            </h2>

            <p
              className="
                mt-4 
                max-w-[750px]
                font-body text-mobile-body text-text-secondary
                
                md:text-body-regular
              "
            >
              {historyPreview}
            </p>

            {historyParagraphs.length > 0 && (
              <Button
                type="button"
                variant="outline"
                icon={ArrowRight}
                iconSize={16}
                className="mt-5"
                onClick={() => setIsHistoryModalOpen(true)}
              >
                {t('destination.readMore')}
              </Button>
            )}
          </section>

          <DestinationGallery
            key={`${destination.slug}-${locale}`}
            gallery={destination.gallery ?? []}
            destinationTitle={destination.title}
          />
        </div>

        <DestinationPracticalInfo
          practicalInfo={practicalInfo}
          lastVerifiedAt={destination.lastVerifiedAt}
        />
      </div>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        paragraphs={historyParagraphs}
      />
    </>
  )
}

export default DestinationContent