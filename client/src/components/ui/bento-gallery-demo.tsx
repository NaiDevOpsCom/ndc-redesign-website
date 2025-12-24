import InteractiveImageBentoGallery from "@/components/ui/bento-gallery"



export default function InteractiveImageBentoGalleryDemo() {
    return (
        <div className="w-full antialiased">
            <InteractiveImageBentoGallery
                imageItems={imageItems}
                imagePool={imageItems.map(item => ({
                    url: item.url,
                    alt: item.title
                }))} // Use same items as pool for demo
                title="Curated Moments"
                description="A collection of stunning landscapes. Drag to explore, click to expand."
            />
        </div>
    )
}