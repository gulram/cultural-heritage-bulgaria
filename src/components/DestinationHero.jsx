import { ArrowLeft } from 'lucide-react'

import Button from './Button'
import DestinationMetadata from './DestinationMetadata'

function DestinationHero({
  title,
  image,
  location,
  unescoYear,
}) {
  return (
    <section
      className="
        relative
        min-h-[340px]
        overflow-hidden
        bg-cover
        bg-center

        md:min-h-[380px]
      "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[340px]
          w-full
          max-w-main
          flex-col
          justify-end

          px-5
          pb-10
          pt-[100px]

          md:min-h-[380px]

          lg:px-0
        "
      >
        <Button
          to="/#destinations"
          variant="filled"
          icon={ArrowLeft}
          iconPosition="left"
          iconSize={16}
          className="mb-5 self-start"
        >
          Всички дестинации
        </Button>

        <h1
          className="
            font-heading
            text-mobile-h1
            text-white

            md:text-h1
          "
        >
          {title}
        </h1>

        <div className="mt-4">
          <DestinationMetadata
            location={location}
            unescoYear={unescoYear}
            variant="light"
          />
        </div>
      </div>
    </section>
  )
}

export default DestinationHero