import {
  useEffect,
  useRef,
} from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FOCUSABLE_ELEMENTS = `
  button:not([disabled]),
  [href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex="-1"])
`

function HistoryModal({
  isOpen,
  onClose,
  paragraphs = [],
}) {
  const { t } = useTranslation()

  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow =
      document.body.style.overflow

    const previousActiveElement =
      document.activeElement

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current

      if (!dialog) return

      const focusableElements = Array.from(
        dialog.querySelectorAll(FOCUSABLE_ELEMENTS)
      ).filter(
        (element) =>
          element instanceof HTMLElement &&
          !element.hasAttribute('disabled') &&
          element.offsetParent !== null
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      const activeElement = document.activeElement

      if (
        event.shiftKey &&
        activeElement === firstElement
      ) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
        return
      }

      if (
        activeElement &&
        !dialog.contains(activeElement)
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

      if (
        previousActiveElement instanceof
        HTMLElement
      ) {
        previousActiveElement.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/25 px-4 py-8
        animate-history-overlay
        sm:px-6
        md:px-8
        lg:px-5
      "
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
        tabIndex={-1}
        className="
          relative 
          max-h-[85vh] w-full max-w-[760px] 
          overflow-hidden
          
          rounded-lg 
          border border-border-light
          bg-background-card 
          shadow-hover
          
          animate-history-modal
          
          focus:outline-none
        "
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t('common.close')}
          onClick={onClose}
          className="
            absolute right-4 top-4 z-20

            flex h-9 w-9 shrink-0 
            items-center justify-center
           
            bg-background-card 
            text-accent-orange
            
            transition-colors duration-200 ease-out
           
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

        <div
          className="
            max-h-[85vh] overflow-y-auto
            px-4 py-6
            sm:px-5
            md:px-6 md:py-6
          "
        >
          <div className="flex items-center justify-between gap-6 pr-10">
            <h2
              id="history-modal-title"
              className="
                font-heading text-mobile-h2 uppercase text-primary
                
                md:text-h3 
                md:whitespace-nowrap
              "
            >
              {t('destination.historyModalTitle')}
            </h2>
          </div>

          <div
            className="
              mt-5 flex w-full flex-col gap-5
              
              font-body text-mobile-body text-text-secondary
              
              md:text-body-regular
            "
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HistoryModal