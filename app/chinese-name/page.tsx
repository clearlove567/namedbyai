import { ChineseNameForm } from "@/components/forms/ChineseNameForm";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export default function ChineseNamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 font-serif">
              中文取名
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              结合传统文化与现代审美，为您打造独特而富有寓意的中文名字
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <ChineseNameForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}