// NDC (Nairobi DevOps Community) Data
// This file contains all the data for the About Us page and other NDC-related content

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  linkedin: string;
  twitter: string;
  instagram?: string;
  website?: string;
  bio?: string;
}

export interface Statistic {
  id: string;
  number: string;
  label: string;
  icon?: string;
}


// Statistics Data
export const statisticsData: Statistic[] = [
  {
    id: "community-members",
    number: "3000+",
    label: "Community Members",
    icon: "Users"
  },
  {
    id: "trained-learners",
    number: "30+",
    label: "Trained Learners",
    icon: "GraduationCap"
  },
  {
    id: "trainers",
    number: "20+",
    label: "Trainers",
    icon: "Award"
  },
  {
    id: "events",
    number: "50+",
    label: "Events",
    icon: "Calendar"
  },
  {
    id: "partners",
    number: "20+",
    label: "Partners",
    icon: "Handshake"
  }
];

// Team Data
export const teamData: TeamMember[] = [
  {
    id: "maamun-bwanakombo",
    name: "Maamun Bwanakombo",
    title: "Director",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/Maamun_Profile_Photo000_-_Maamun_Bwanakombo_npfvyl.png",
    linkedin: "https://linkedin.com/in/maamun-bwanakombo-58849b141",
    twitter: "https://x.com/maamunb1",
  },
  {
    id: "kevin-tuei",
    name: "Kevin Tuei",
    title: "Assistant Director",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1751295296/IMG_20231219_222811_913_-_Kevin_Tuei_l49t4o.jpg",
    linkedin: "https://linkedin.com/in/kevintuei",
    twitter: "https://x.com/kevshakes",
    instagram: "https://instagram.com/kevshakes",
    website: "https://kevintuei.medium.com",
  },
  {
    id: "alvin-ndungu",
    name: "Alvin Ndungu",
    title: "Projects Lead",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/Screenshot_20250724_192455_Gallery_-_Alvin_Ndungu_kqemak.jpg",
    linkedin: "https://linkedin.com/in/alvin-ndungu",
    twitter: "https://x.com/alvin_kh",
  },
  {
    id: "ronald-kipchirchir",
    name: "Ronald Kipchirchir",
    title: "Events Coordinator",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/profile_-_Ronald_Kipchirchir_nj0zo2.jpg",
    linkedin: "https://linkedin.com/in/ronald-kipchirchir-034983246/",
    twitter: "https://x.com/Ronaah_254",
  },
  {
    id: "mercyline-nyansarola",
    name: "Mercyline Nyansarola",
    title: "Community Outreach Manager",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/17efa17c-d20b-49a6-b1de-2675e00fc598_-_Mercyline_Nyansarola_vz4asn.jpg",
    linkedin: "https://linkedin.com/in/mercyline-nyansarola",
    twitter: "https://x.com/mercyline_m",
  },
  {
    id: "tabitha-margaret-wangechi",
    name: "Tabitha Margaret Wangechi",
    title: "Graphic Designer/Community Manager",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1751329261/headshot_-_Tabitha_Wangechi_fuuwbv.jpg",
    linkedin: "https://linkedin.com/in/tabitha-margaret771/",
    twitter: "https://x.com/_mWangechi",
  },
  {
    id: "reyhana-cherop",
    name: "Reyhana Cherop",
    title: "Campus Tour Lead",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/20230820_101641_-_Reyhana_Cherop_nxgjnp.jpg",
    linkedin: "https://linkedin.com/in/reyhana-cherop-77a584156/",
    twitter: "https://x.com/reyhana_cherop",
    website: "https://reyhanacynthia.wixsite.com/portfolio",
  },
  {
    id: "lawrence-juma",
    name: "Lawrence Juma",
    title: "Program Manager/Communication Lead",
    image: "https://res.cloudinary.com/nairobidevops/image/upload/v1751336808/IMG_3190_-_Lawrence_Juma_rrelx4.jpg",
    linkedin: "https://linkedin.com/in/jumalaw98",
    twitter: "https://x.com/jumalaw98",
    instagram: "https://instagram.com/jumalaw98",
    website: "https://lisagarcia.dev",
  },
];



 