import {
  useEffect,
} from 'react'

import {
  useTranslation,
} from 'react-i18next'

import {
  X,
} from 'lucide-react'

function HistoryModal({
  isOpen,
  onClose,
  paragraphs,
}) {
  const { t } = useTranslation()

  /*
   * HISTORY MODAL
   * - затваряне с Escape
   * - блокиране на scroll-а на страницата
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (
      event
    ) => {
      if (
        event.key === 'Escape'
      ) {
        onClose()
      }
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow =
      'hidden'

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
    isOpen,
    onClose,
  ])

  if (!isOpen) {
    return null
  }

  return (
    <>
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

          px-4
          py-8

          sm:px-6

          md:px-8

          lg:px-5
        "
        style={{
          animation:
            'historyOverlayFadeIn 300ms ease-out',
        }}
        onMouseDown={(
          event
        ) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            onClose()
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
            overflow-hidden

            rounded-lg

            border
            border-border-light

            bg-background-card

            shadow-hover
          "
          style={{
            animation:
              'historyModalMoveIn 300ms ease-out',
          }}
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            aria-label={t(
              'common.close'
            )}
            onClick={onClose}
            className="
              absolute
              right-4
              top-4
              z-20

              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              bg-background-card

              text-accent-orange

              transition-colors
              duration-200
              ease-out

              hover:text-accent-antique

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-orange
              focus-visible:ring-offset-2

              sm:right-5
              sm:top-5
            "
          >
            <X
              aria-hidden="true"
              size={22}
              strokeWidth={1.7}
            />
          </button>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              max-h-[85vh]
              overflow-y-auto

              px-4
              py-6

              sm:px-5

              md:px-6
              md:py-6
            "
          >
            {/* MODAL HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-6

                pr-10
              "
            >
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
                {t(
                  'destination.historyModalTitle'
                )}
              </h2>
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
                text-mobile-body
                text-text-secondary

                md:text-body-regular
              "
            >
              {paragraphs.map(
                (
                  paragraph,
                  index
                ) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HistoryModal