import { EnglishNameForm } from "@/components/forms/EnglishNameForm";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export default function EnglishNamePage() {
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
              English Name Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Find your perfect English name that reflects your personality and aspirations
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <EnglishNameForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}