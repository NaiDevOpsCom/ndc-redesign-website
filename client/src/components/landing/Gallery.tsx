import { communityGallery } from "@/data/galleryData";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";

// Transform gallery data to match bento gallery format
const bentoGalleryItems = communityGallery.map((image, index) => ({
  id: index,
  title: image.alt,
  desc: `Snapshot from our community ${image.alt.toLowerCase()}`,
  url: image.url,
  span: index === 0 ? "md:col-span-2 md:row-span-2" : index % 3 === 0 ? "md:row-span-2" : "md:row-span-1",
}));

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 bg-muted dark:bg-[#023047] transition-colors duration-300"
    >
      <InteractiveImageBentoGallery
        imageItems={bentoGalleryItems}
        title="Snapshots of Our Journey"
        description="Explore moments from our Events, MeetUps, workshops, community events, and Collaborations"
      />
    </section>
  );
}
