"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleButtonClick = (path: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to use this feature",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }
    router.push(path);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Name Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Create unique and meaningful names using artificial intelligence and cultural insights
        </p>
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* English Name Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">English Name</h2>
            <p className="text-gray-600">
              Generate modern and meaningful English names with cultural significance
            </p>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            onClick={() => handleButtonClick("/english-name")}
          >
            Generate Now
          </Button>
        </div>

        {/* Chinese Name Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">中文取名</h2>
            <p className="text-gray-600">
              基于传统文化和现代审美，为您生成优雅的中文名字
            </p>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => handleButtonClick("/chinese-name")}
          >
            开始生成
          </Button>
        </div>
      </div>

      {/* Features List */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4">
            <h3 className="font-medium mb-2">AI Intelligence</h3>
            <p className="text-gray-600">Smart name generation powered by deep learning</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Cultural Heritage</h3>
            <p className="text-gray-600">Perfect blend of tradition and modern aesthetics</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Personalization</h3>
            <p className="text-gray-600">Customized names based on your preferences</p>
          </div>
        </div>
      </section>

      {/* Additional Features */}
{/* Additional Features */}
<section className="max-w-4xl mx-auto mt-16 text-center">
  <h2 className="text-2xl font-semibold mb-8">Why Choose Us</h2>
  <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-medium mb-3">Smart Analysis</h3>
      <p className="text-gray-600">
        Advanced AI technology analyzing millions of names for patterns and meanings
      </p>
    </div>
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-medium mb-3">Cultural Depth</h3>
      <p className="text-gray-600">
        Deep understanding of both Eastern and Western naming traditions
      </p>
    </div>
  </div>
  {/* External Link */}
  <div className="mt-8">
    <a
      href="https://tasbihcounter.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      Visit Tasbih Counter
    </a>
  </div>
</section>

    </div>
  );
}
