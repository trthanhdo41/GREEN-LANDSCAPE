import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { Grid3X3, Layers, ShieldCheck, Box as BoxIcon } from "lucide-react";
import { siteContent } from "@/data/site-content";

const ICONS: Record<string, React.ReactNode> = {
  "Tấm Ốp Tường Gỗ Nhựa": <Grid3X3 className="w-6 h-6" />,
  "Sàn Gỗ Nhựa 1 Lớp": <Layers className="w-6 h-6" />,
  "Sàn Gỗ Nhựa 2 Lớp (Capstock)": <ShieldCheck className="w-6 h-6" />,
  "Lan Can Gỗ Nhựa": <BoxIcon className="w-6 h-6" />,
};

export default function ProductsPage() {
  const productsPage = siteContent.productsPage;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-[#225732] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden bg-[#1a3821]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#234F2C]/80 to-[#0a1c10]"></div>
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#467B48]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-6 mt-16">
          <div className="w-16 h-1 bg-[#8B6A4C] mb-6 rounded-full opacity-90"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider font-serif mb-6 drop-shadow-md">
            {productsPage.hero.title}
          </h1>
          <p className="text-[#e2ece5] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {productsPage.hero.description}
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-6 md:px-12 w-full bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-32">
          {productsPage.categories.map((category, index) => {
             const isEven = index % 2 === 0;
             return (
               <div key={category.id} className="flex flex-col gap-16">
                  {/* Category Info */}
                  <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
                      <Image 
                        src={category.categoryImage}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>

                    {/* Text */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-14 h-14 rounded-full bg-[#F0F5F1] text-[#467B48] flex items-center justify-center shadow-sm">
                            {ICONS[category.title]}
                         </div>
                         <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3821] uppercase tracking-wide">
                            {category.title}
                         </h2>
                      </div>
                      
                      <div className="w-20 h-1 bg-[#8B6A4C] mb-8 rounded-full"></div>

                      <div className="text-gray-600 text-lg leading-[1.8] font-light space-y-4">
                        {category.description.split('\n').map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Variants Grid */}
                  <div className="w-full bg-[#FCFAF4] rounded-[2rem] p-8 md:p-12 border border-[#f0eee6]">
                    <h3 className="text-xl font-bold text-[#1a3821] mb-8 uppercase tracking-wide flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#467B48]"></span>
                      Các mã sản phẩm
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.products.map((product) => (
                        <div key={product.code} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                          <div className="relative h-[280px] w-full overflow-hidden bg-gray-50">
                            <Image 
                              src={product.image}
                              alt={product.code}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex flex-col items-center justify-center text-center border-t border-gray-50 flex-grow">
                            <h4 className="text-xl font-bold text-[#1a3821] mb-2">{product.code}</h4>
                            <p className="text-[15px] text-gray-500">{product.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             );
          })}
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
