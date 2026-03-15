import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://reportwang.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://reportwang.com/home-care", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/hospital-nursing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://reportwang.com/nursing-home", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
