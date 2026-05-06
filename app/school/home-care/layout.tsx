import { SchoolRelatedPosts } from "@/components/school/school-related-posts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SchoolRelatedPosts facilityKey="home-care" />
    </>
  );
}
