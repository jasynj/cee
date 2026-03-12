import SectionHeader from '../ui/SectionHeader'
import { galleryImages } from '../../data/gallery'

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Portfolio"
          title="Photo"
          scriptText="Gallery"
          subtitle="A glimpse into the unforgettable moments we've created."
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item mb-2 break-inside-avoid"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
