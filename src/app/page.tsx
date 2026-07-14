import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problems from "../components/Problems";
import Products from "../components/Products";
import WhyChoose from "../components/WhyChoose";
import Partnership from "../components/Partnership";
import Cta from "../components/Cta";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-[#225732] selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problems />
      <Products />
      <WhyChoose />
      <Partnership />
      <Cta />
      <ContactForm />
      <Footer />
    </div>
  );
}
