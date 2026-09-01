import { supabase } from '../lib/supabase'

import {
  keepNumberAndUnitTogether,
} from '../utils/destinationUtils'

const IMAGE_BUCKET = 'destination-images'

const DESTINATION_FIELDS = `
  id,
  number,
  slug,
  unesco_year,
  latitude,
  longitude,
  last_verified_at
`

const TRANSLATION_FIELDS = `
  destination_id,
  title,
  location,
  description,
  map_description,
  about_title,
  about,
  history,
  quick_facts,
  practical_info,
  map_info
`

const IMAGE_FIELDS = `
  id,
  destination_id,
  role,
  storage_path,
  alt_bg,
  alt_en
`

function getPublicImageUrl(storagePath) {
  if (!storagePath) {
    return null
  }

  const { data } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(storagePath)

  return data.publicUrl
}

function formatText(value) {
  if (!value) {
    return value
  }

  return keepNumberAndUnitTogether(value)
}

function formatQuickFacts(quickFacts) {
  if (!Array.isArray(quickFacts)) {
    return []
  }

  return quickFacts.map((fact) => ({
    ...fact,
    value: formatText(fact.value),
    description: formatText(
      fact.description
    ),
  }))
}

function formatPracticalInfo(
  practicalInfo
) {
  if (!Array.isArray(practicalInfo)) {
    return []
  }

  return practicalInfo.map((item) => ({
    ...item,
    title: formatText(item.title),
    summary: formatText(item.summary),

    details: Array.isArray(item.details)
      ? item.details.map(formatText)
      : [],
  }))
}

function formatMapInfo(mapInfo) {
  if (
    !mapInfo ||
    typeof mapInfo !== 'object' ||
    Array.isArray(mapInfo)
  ) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(mapInfo).map(
      ([key, value]) => [
        key,
        typeof value === 'string'
          ? formatText(value)
          : value,
      ]
    )
  )
}

function mapImage(image, locale) {
  const localizedAlt =
    locale === 'en'
      ? image.alt_en
      : image.alt_bg

  const fallbackAlt =
    locale === 'en'
      ? image.alt_bg
      : image.alt_en

  return {
    id: image.id,
    url: getPublicImageUrl(
      image.storage_path
    ),
    alt:
      localizedAlt ??
      fallbackAlt ??
      '',
  }
}

function mapDestination(
  destination,
  translation,
  images,
  locale
) {
  const mainImageRecord =
    images.find(
      (image) =>
        image.role === 'main'
    ) ?? null

  const mainImage =
    mainImageRecord
      ? mapImage(
          mainImageRecord,
          locale
        )
      : null

  const gallery = images
    .filter(
      (image) =>
        image.role === 'gallery'
    )
    .map(
      (image) =>
        mapImage(image, locale)
    )

  return {
    id: destination.id,
    number: destination.number,
    slug: destination.slug,

    title: formatText(
      translation.title
    ),

    location: formatText(
      translation.location
    ),

    unescoYear:
      destination.unesco_year
        ? String(
            destination.unesco_year
          )
        : '',

    coordinates: [
      destination.latitude,
      destination.longitude,
    ],

    description: formatText(
      translation.description
    ),

    mapDescription: formatText(
      translation.map_description
    ),

    aboutTitle: formatText(
      translation.about_title
    ),

    about: formatText(
      translation.about
    ),

    history: formatText(
      translation.history
    ),

    quickFacts: formatQuickFacts(
      translation.quick_facts
    ),

    practicalInfo:
      formatPracticalInfo(
        translation.practical_info
      ),

    mapInfo: formatMapInfo(
      translation.map_info
    ),

    lastVerifiedAt:
      destination.last_verified_at,

    image:
      mainImage?.url ?? null,

    imageAlt:
      mainImage?.alt ?? '',

    gallery,
  }
}

function groupImagesByDestination(
  images = []
) {
  const imagesMap = new Map()

  images.forEach((image) => {
    const destinationImages =
      imagesMap.get(
        image.destination_id
      ) ?? []

    destinationImages.push(image)

    imagesMap.set(
      image.destination_id,
      destinationImages
    )
  })

  return imagesMap
}

export async function getDestinations(
  locale = 'bg'
) {
  const [
    destinationsResult,
    translationsResult,
    imagesResult,
  ] = await Promise.all([
    supabase
      .from('destinations')
      .select(DESTINATION_FIELDS)
      .order('number', {
        ascending: true,
      }),

    supabase
      .from(
        'destination_translations'
      )
      .select(TRANSLATION_FIELDS)
      .eq('locale', locale),

    supabase
      .from('destination_images')
      .select(IMAGE_FIELDS)
      .order('sort_order', {
        ascending: true,
      }),
  ])

  if (destinationsResult.error) {
    throw new Error(
      `Failed to load destinations: ${destinationsResult.error.message}`
    )
  }

  if (translationsResult.error) {
    throw new Error(
      `Failed to load destination translations: ${translationsResult.error.message}`
    )
  }

  if (imagesResult.error) {
    throw new Error(
      `Failed to load destination images: ${imagesResult.error.message}`
    )
  }

  const destinations =
    destinationsResult.data ?? []

  const translations =
    translationsResult.data ?? []

  const images =
    imagesResult.data ?? []

  const translationsMap = new Map(
    translations.map(
      (translation) => [
        translation.destination_id,
        translation,
      ]
    )
  )

  const imagesMap =
    groupImagesByDestination(images)

  return destinations.map(
    (destination) => {
      const translation =
        translationsMap.get(
          destination.id
        )

      if (!translation) {
        throw new Error(
          `Missing "${locale}" translation for destination "${destination.slug}".`
        )
      }

      return mapDestination(
        destination,
        translation,
        imagesMap.get(
          destination.id
        ) ?? [],
        locale
      )
    }
  )
}