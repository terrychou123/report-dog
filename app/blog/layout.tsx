import { Navbar } from "@/components/navbar";

// Blog 區段共用 layout，提供與首頁相同的導航列
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
