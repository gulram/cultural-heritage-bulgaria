import {
  useTranslation,
} from 'react-i18next'

import InfoRow from './InfoRow'

function formatVerifiedDate(date) {
  if (!date) {
    return ''
  }

  const [year, month, day] =
    date.split('-')

  return `${day}.${month}.${year}`
}

function DestinationPracticalInfo({
  practicalInfo,
  lastVerifiedAt,
}) {
  const { t } = useTranslation()

  return (
    <aside
      aria-labelledby="practical-info-title"
      className="
        order-1

        w-full
        self-start

        rounded-lg
        border
        border-border-light
        bg-background-card

        px-5
        py-4

        shadow-default

        lg:order-none
        lg:w-[450px]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        <h2
          id="practical-info-title"
          className="
            font-body
            text-mobile-section
            uppercase
            tracking-[0.12em]
            text-accent-orange

            lg:text-section-small
            md:tracking-[0.12em]
          "
        >
          {t(
            'destination.practicalInfo'
          )}
        </h2>

        {practicalInfo.map(
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
                {item.lines.map(
                  (
                    line,
                    index
                  ) => (
                    <p
                      key={`${item.id}-${index}`}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </InfoRow>
          )
        )}

        {lastVerifiedAt && (
          <div
            className="
              mt-1
              border-t
              border-border-light
              pt-3
            "
          >
            <p
              className="
                font-body
                text-mobile-small
                text-text-secondary

                md:text-body-small
              "
            >
              {t(
                'destination.updated',
                {
                  date:
                    formatVerifiedDate(
                      lastVerifiedAt
                    ),
                }
              )}
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default DestinationPracticalInfo