import { galleryImages } from "@/data/galleryData";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-muted dark:bg-[#023047] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Snapshots of Our Journey</h2>
          <p className="text-lg text-black">
            Explore moments from our Events, MeetUps, workshops, community events, and Collaborations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg hover-scale cursor-pointer group"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-700 hover:underline focus:underline transition-colors"
          >
            View All Our Images
          </a>
        </div>
      </div>
    </section>
  );
}
