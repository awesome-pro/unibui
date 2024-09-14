import Footer from "@/components/footer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
        <Header />
        {children}
        <Footer />
    </main>
  );
}
