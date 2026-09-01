import {
  Award,
  CalendarDays,
  Church,
  Clock3,
  House,
  Info,
  Landmark,
  Layers3,
  MapPin,
  Palette,
  Ruler,
  ScrollText,
  Search,
  Ticket,
  Users,
} from 'lucide-react'

const QUICK_FACT_ICON_MAP = {
  period: CalendarDays,
  history: Clock3,
  architecture: Landmark,
  church: Church,
  art: Palette,
  dimensions: Ruler,
  structure: Layers3,
  inscription: ScrollText,
  discovery: Search,
  unique: Award,
  house: House,
}

const PRACTICAL_ICON_MAP = {
  hours: Clock3,
  working_hours: Clock3,
  opening_hours: Clock3,
  tickets: Ticket,
  admission: Ticket,
  guide: Users,
  guided_tour: Users,
  accessibility: Users,
  directions: MapPin,
  transport: MapPin,
  contacts: Info,
  information: Info,
  dress_code: Info,
  rules: Info,
}

function normalizeKey(value = '') {
  return String(value)
    .trim()
    .replace(
      /([a-z0-9])([A-Z])/g,
      '$1_$2'
    )
    .toLowerCase()
    .replaceAll('-', '_')
    .replaceAll(' ', '_')
}

function normalizeQuickFacts(
  quickFacts = []
) {
  return quickFacts.map(
    (fact, index) => ({
      id: `fact-${index}`,

      icon:
        QUICK_FACT_ICON_MAP[
          normalizeKey(fact.icon)
        ] ?? Info,

      value:
        fact.value ?? '',

      description:
        fact.description ?? '',
    })
  )
}

function normalizePracticalInfo(
  practicalInfo = []
) {
  return practicalInfo.map(
    (item, index) => {
      const details =
        Array.isArray(
          item.details
        )
          ? item.details
          : []

      return {
        id: `${
          normalizeKey(
            item.type
          ) || 'practical'
        }-${index}`,

        icon:
          PRACTICAL_ICON_MAP[
            normalizeKey(
              item.type
            )
          ] ?? Info,

        title:
          item.title ?? '',

        lines: [
          item.summary,
          ...details,
        ].filter(Boolean),
      }
    }
  )
}

function getHistoryParagraphs(
  history
) {
  if (!history) {
    return []
  }

  return history
    .split(/\n\s*\n/)
    .map(
      (paragraph) =>
        paragraph.trim()
    )
    .filter(Boolean)
}

function getHistoryPreview(
  history
) {
  const [
    firstParagraph = '',
  ] = getHistoryParagraphs(
    history
  )

  if (
    firstParagraph.length <= 650
  ) {
    return firstParagraph
  }

  const shortened =
    firstParagraph.slice(
      0,
      650
    )

  const lastSentenceEnd =
    Math.max(
      shortened.lastIndexOf('.'),
      shortened.lastIndexOf('!'),
      shortened.lastIndexOf('?')
    )

  if (
    lastSentenceEnd > 300
  ) {
    return shortened.slice(
      0,
      lastSentenceEnd + 1
    )
  }

  return `${shortened.trim()}…`
}

function getGoogleMapsUrl(
  coordinates = []
) {
  const [
    latitude,
    longitude,
  ] = coordinates

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return ''
  }

  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
}

function keepNumberAndUnitTogether(
  text
) {
  if (!text) {
    return text
  }

  return String(text).replace(
    /(\d+(?:[.,]\d+)?)\s+(г\.|лв\.|лв|евро|€|ч\.|мин\.|км|м|BGN|EUR|h|min)(?=\s|$|[,.!?;:)])/g,
    '$1\u00A0$2'
  )
}

export {
  normalizeQuickFacts,
  normalizePracticalInfo,
  getHistoryPreview,
  getHistoryParagraphs,
  keepNumberAndUnitTogether,
  getGoogleMapsUrl,
}