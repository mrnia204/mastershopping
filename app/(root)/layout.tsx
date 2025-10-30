import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header";

export default function Rootlayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer />
    </div>
  );
}