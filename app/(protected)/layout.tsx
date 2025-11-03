import Navbar from "@/components/navbar/Navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl md:max-w-6xl lg:max-w-8xl mx-auto pt-23 px-6">
        {children}
      </div>
    </div>
  );
}
