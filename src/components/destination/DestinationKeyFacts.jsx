import { useTranslation } from 'react-i18next'

import KeyFactCard from './KeyFactCard'

function DestinationKeyFacts({ facts = [] }) {
  const { t } = useTranslation()

  if (facts.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="key-facts-title"
      className="mt-6 w-full"
    >
      <h2
        id="key-facts-title"
        className="sr-only"
      >
        {t('destination.keyFacts')}
      </h2>

      <div
        className="
          mx-auto w-full
          
          rounded-md border border-border-light
          
          bg-background-highlight px-4 py-4
          shadow-default
          
          sm:px-6
        "
      >
        <div
          className="
            grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            items-center gap-5
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
  )
}

export default DestinationKeyFacts