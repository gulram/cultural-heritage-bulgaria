import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(),
    },
  },
}))

import { supabase } from '../lib/supabase'
import { getDestinations } from './destinationService'

describe('getDestinations', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    supabase.storage.from.mockReturnValue({
      getPublicUrl: vi.fn(
        (storagePath) => ({
          data: {
            publicUrl: `https://example.com/${storagePath}`,
          },
        })
      ),
    })
  })

  it('combines destination, translation and image data', async () => {
    const destinationData = [
      {
        id: 1,
        number: 1,
        slug: 'rila-monastery',
        unesco_year: 1983,
        latitude: 42.133297,
        longitude: 23.340186,
        last_verified_at: '2026-08-23',
      },
    ]

    const translationData = [
      {
        destination_id: 1,
        title: 'Рилски манастир',
        location: 'Рила, България',
        description: 'Описание',
        map_description: 'Кратко описание',
        about_title: 'За обекта',
        about: 'Информация',
        history: 'История',
        quick_facts: [],
        practical_info: [],
        map_info: {},
      },
    ]

    const imageData = [
      {
        id: 1,
        destination_id: 1,
        role: 'main',
        storage_path: 'rila-main.webp',
        alt_bg: 'Рилски манастир',
        alt_en: 'Rila Monastery',
      },
    ]

    supabase.from.mockImplementation(
      (table) => {
        if (table === 'destinations') {
          return {
            select: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: destinationData,
                error: null,
              }),
            })),
          }
        }

        if (
          table ===
          'destination_translations'
        ) {
          return {
            select: vi.fn(() => ({
              eq: vi.fn().mockResolvedValue({
                data: translationData,
                error: null,
              }),
            })),
          }
        }

        if (
          table === 'destination_images'
        ) {
          return {
            select: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({
                data: imageData,
                error: null,
              }),
            })),
          }
        }
      }
    )

    const result =
      await getDestinations('bg')

    expect(result).toHaveLength(1)

    expect(result[0]).toMatchObject({
      id: 1,
      number: 1,
      slug: 'rila-monastery',
      title: 'Рилски манастир',
      location: 'Рила, България',
      unescoYear: '1983',
      coordinates: [
        42.133297,
        23.340186,
      ],
      image:
        'https://example.com/rila-main.webp',
      imageAlt: 'Рилски манастир',
    })
  })
})