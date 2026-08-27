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
  ticket: Ticket,
  prices: Ticket,
  price: Ticket,
  admission: Ticket,
  guide: Users,
  guided_tour: Users,
  visitors: Users,
  accessibility: Users,
  directions: MapPin,
  transport: MapPin,
  location: MapPin,
  purchase: Info,
  contact: Info,
  contacts: Info,
  information: Info,
  dress_code: Info,
  rules: Info,
}

function normalizeKey(value) {
  if (!value) {
    return ''
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replaceAll('-', '_')
    .replaceAll(' ', '_')
}

function getQuickFactIcon(fact) {
  const possibleKeys = [
    fact.icon,
    fact.type,
    fact.id,
    fact.key,
  ]

  for (const value of possibleKeys) {
    const key = normalizeKey(value)

    if (QUICK_FACT_ICON_MAP[key]) {
      return QUICK_FACT_ICON_MAP[key]
    }
  }

  return Info
}

function normalizeQuickFacts(quickFacts = []) {
  return quickFacts.map((fact, index) => ({
    id:
      fact.id ||
      fact.type ||
      fact.key ||
      `fact-${index}`,

    icon: getQuickFactIcon(fact),

    value:
      fact.value ||
      fact.title ||
      fact.label ||
      '',

    description:
      fact.description ||
      fact.subtitle ||
      fact.text ||
      fact.summary ||
      '',
  }))
}

function getPracticalInfoIcon(item) {
  const possibleKeys = [
    item.icon,
    item.type,
    item.id,
    item.key,
  ]

  for (const value of possibleKeys) {
    const key = normalizeKey(value)

    if (PRACTICAL_ICON_MAP[key]) {
      return PRACTICAL_ICON_MAP[key]
    }
  }

  return Info
}

function normalizePracticalInfo(
  practicalInfo = []
) {
  return practicalInfo.map(
    (item, index) => {
      let lines = []

      if (Array.isArray(item.lines)) {
        lines = item.lines
      } else {
        if (item.summary) {
          lines.push(item.summary)
        }

        if (Array.isArray(item.details)) {
          lines.push(...item.details)
        } else if (item.details) {
          lines.push(item.details)
        }
      }

      return {
        id:
          item.id ||
          item.type ||
          item.key ||
          `practical-${index}`,

        icon: getPracticalInfoIcon(item),

        title:
          item.title ||
          item.label ||
          '',

        lines: lines.filter(Boolean),
      }
    }
  )
}

function getHistoryPreview(history) {
  if (!history) {
    return ''
  }

  const paragraphs = history
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph.trim()
    )
    .filter(Boolean)

  const firstParagraph =
    paragraphs[0] || history

  if (firstParagraph.length <= 650) {
    return firstParagraph
  }

  const shortened =
    firstParagraph.slice(0, 650)

  const lastSentenceEnd = Math.max(
    shortened.lastIndexOf('.'),
    shortened.lastIndexOf('!'),
    shortened.lastIndexOf('?')
  )

  if (lastSentenceEnd > 300) {
    return shortened.slice(
      0,
      lastSentenceEnd + 1
    )
  }

  return `${shortened.trim()}…`
}

function getHistoryParagraphs(history) {
  if (!history) {
    return []
  }

  return history
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph.trim()
    )
    .filter(Boolean)
}

function keepNumberAndUnitTogether(text) {
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
}