import { supabase } from '../lib/supabase'

const IMAGE_BUCKET = 'destination-images'

function getPublicImageUrl(storagePath) {
  if (!storagePath) {
    return null
  }

  const { data } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(storagePath)

  return data.publicUrl
}

function mapImage(image, locale) {
  return {
    id: image.id,
    role: image.role,
    mediaType: image.media_type,

    fileName: image.file_name,
    storagePath: image.storage_path,

    url: getPublicImageUrl(
      image.storage_path
    ),

    alt:
      locale === 'en'
        ? image.alt_en
        : image.alt_bg,

    author: image.author,
    source: image.source,
    assetId: image.asset_id,
    license: image.license,
    sourceUrl: image.source_url,

    sortOrder: image.sort_order,
  }
}

function mapDestination(
  destination,
  translation,
  images,
  locale
) {
  const localizedImages = images
    .map((image) =>
      mapImage(image, locale)
    )
    .sort(
      (a, b) =>
        a.sortOrder - b.sortOrder
    )

  const mainImage =
    localizedImages.find(
      (image) =>
        image.role === 'main'
    ) ?? null

  const gallery =
    localizedImages.filter(
      (image) =>
        image.role === 'gallery'
    )

  return {
    id: destination.id,
    number: destination.number,
    slug: destination.slug,

    title: translation.title,
    location: translation.location,

    unescoYear: String(
      destination.unesco_year
    ),

    coordinates: [
      destination.latitude,
      destination.longitude,
    ],

    description:
      translation.description,

    mapDescription:
      translation.map_description,

    aboutTitle:
      translation.about_title,

    about:
      translation.about,

    history:
      translation.history,

    quickFacts:
      translation.quick_facts ?? [],

    practicalInfo:
      translation.practical_info ?? [],

    mapInfo:
      translation.map_info ?? {},

    sources:
      destination.sources ?? [],

    lastVerifiedAt:
      destination.last_verified_at,

    image:
      mainImage?.url ?? null,

    imageAlt:
      mainImage?.alt ?? '',

    mainImage,

    gallery,
  }
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
      .select(`
        id,
        number,
        slug,
        unesco_year,
        latitude,
        longitude,
        sources,
        last_verified_at
      `)
      .order(
        'number',
        { ascending: true }
      ),

    supabase
      .from(
        'destination_translations'
      )
      .select(`
        destination_id,
        locale,
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
      `)
      .eq('locale', locale),

    supabase
      .from('destination_images')
      .select(`
        id,
        destination_id,
        role,
        media_type,
        file_name,
        storage_path,
        alt_bg,
        alt_en,
        author,
        source,
        asset_id,
        license,
        source_url,
        sort_order
      `)
      .order(
        'sort_order',
        { ascending: true }
      ),
  ])

  if (destinationsResult.error) {
    throw new Error(
      `Грешка при зареждане на дестинациите: ${destinationsResult.error.message}`
    )
  }

  if (translationsResult.error) {
    throw new Error(
      `Грешка при зареждане на преводите: ${translationsResult.error.message}`
    )
  }

  if (imagesResult.error) {
    throw new Error(
      `Грешка при зареждане на изображенията: ${imagesResult.error.message}`
    )
  }

  const translationsMap =
    new Map(
      translationsResult.data.map(
        (translation) => [
          translation.destination_id,
          translation,
        ]
      )
    )

  const imagesMap = new Map()

  imagesResult.data.forEach(
    (image) => {
      if (
        !imagesMap.has(
          image.destination_id
        )
      ) {
        imagesMap.set(
          image.destination_id,
          []
        )
      }

      imagesMap
        .get(image.destination_id)
        .push(image)
    }
  )

  return destinationsResult.data.map(
    (destination) => {
      const translation =
        translationsMap.get(
          destination.id
        )

      if (!translation) {
        throw new Error(
          `Липсва превод "${locale}" за ${destination.slug}.`
        )
      }

      const images =
        imagesMap.get(
          destination.id
        ) ?? []

      return mapDestination(
        destination,
        translation,
        images,
        locale
      )
    }
  )
}

export async function getDestinationBySlug(
  slug,
  locale = 'bg'
) {
  const {
    data: destination,
    error: destinationError,
  } = await supabase
    .from('destinations')
    .select(`
      id,
      number,
      slug,
      unesco_year,
      latitude,
      longitude,
      sources,
      last_verified_at
    `)
    .eq('slug', slug)
    .maybeSingle()

  if (destinationError) {
    throw new Error(
      `Грешка при зареждане на дестинацията: ${destinationError.message}`
    )
  }

  if (!destination) {
    return null
  }

  const [
    translationResult,
    imagesResult,
  ] = await Promise.all([
    supabase
      .from(
        'destination_translations'
      )
      .select(`
        destination_id,
        locale,
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
      `)
      .eq(
        'destination_id',
        destination.id
      )
      .eq('locale', locale)
      .maybeSingle(),

    supabase
      .from('destination_images')
      .select(`
        id,
        destination_id,
        role,
        media_type,
        file_name,
        storage_path,
        alt_bg,
        alt_en,
        author,
        source,
        asset_id,
        license,
        source_url,
        sort_order
      `)
      .eq(
        'destination_id',
        destination.id
      )
      .order(
        'sort_order',
        { ascending: true }
      ),
  ])

  if (translationResult.error) {
    throw new Error(
      `Грешка при зареждане на превода: ${translationResult.error.message}`
    )
  }

  if (imagesResult.error) {
    throw new Error(
      `Грешка при зареждане на изображенията: ${imagesResult.error.message}`
    )
  }

  if (!translationResult.data) {
    throw new Error(
      `Липсва превод "${locale}" за ${slug}.`
    )
  }

  return mapDestination(
    destination,
    translationResult.data,
    imagesResult.data,
    locale
  )
}