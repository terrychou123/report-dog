import { Suspense } from "react";
import { SchoolRelatedPosts } from "@/components/school/school-related-posts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <SchoolRelatedPosts facilityKey="general-nursing-home" />
      </Suspense>
    </>
  );
}
