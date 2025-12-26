import { motion } from "motion/react";
import { partnersData, type Partner } from "@/data/partnersData";

interface SponsorCardProps {
  partner: Partner;
}

function SponsorCard({ partner }: SponsorCardProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 md:px-12 min-w-[200px] md:min-w-[240px]">
      <div className="relative w-32 h-20 md:w-40 md:h-24 mb-3  opacity-60 hover:opacity-100 transition-all duration-300">
        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
      </div>
      {/* <p className="text-sm font-medium text-foreground/80 text-center">{partner.name}</p> */}
    </div>
  );
}

interface CarouselRowProps {
  partners: readonly Partner[];
  direction?: "left" | "right";
  duration?: number;
}

function CarouselRow({ partners, direction = "left", duration = 40 }: CarouselRowProps) {
  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <SponsorCard key={`${partner.id}-${index}`} partner={partner} />
        ))}
      </motion.div>
    </div>
  );
}

export function SponsorsCarousel() {
  const { communityPartners } = partnersData;
  const midPoint = Math.ceil(communityPartners.length / 2);
  const row1 = communityPartners.slice(0, midPoint);
  const row2 = communityPartners.slice(midPoint);

  return (
    <div className="w-full space-y-8 md:space-y-12">
      {/* Row 1: Left to Right */}
      <CarouselRow partners={row1} direction="right" duration={50} />

      {/* Row 2: Right to Left */}
      <CarouselRow partners={row2} direction="left" duration={50} />
    </div>
  );
}
