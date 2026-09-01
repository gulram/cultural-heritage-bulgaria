import {
  useEffect,
  useState,
} from 'react'

function useActiveSection(
  sectionIds = []
) {
  const [
    activeSection,
    setActiveSection,
  ] = useState(null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) =>
        document.getElementById(id)
      )
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const activeEntry = entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            )[0]

          if (activeEntry) {
            setActiveSection(
              activeEntry.target.id
            )
          }
        },
        {
          rootMargin:
            '-20% 0px -65% 0px',

          threshold: [
            0,
            0.25,
            0.5,
            0.75,
          ],
        }
      )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return activeSection
}

export default useActiveSection