import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 font-serif">
            Find Your Perfect Name with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Discover meaningful names that reflect your identity and cultural heritage, powered by advanced AI technology.
          </p>
          
          {/* Name Generation Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* English Name Generator */}
            <Link href="/english-name"
                  className="group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">English Name</h3>
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create your perfect English name with meaningful origins and cultural significance
              </p>
              <span className="inline-flex items-center text-blue-600 group-hover:gap-2 transition-all">
                Get Started <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
              </span>
            </Link>

            {/* Chinese Name Generator */}
            <Link href="/chinese-name" 
                  className="group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">中文取名</h3>
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                基于传统文化与现代审美，为您创造独特而富有寓意的中文名字
              </p>
              <span className="inline-flex items-center text-blue-600 group-hover:gap-2 transition-all">
                开始取名 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}