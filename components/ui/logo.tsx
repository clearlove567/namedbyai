import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Sparkles className="h-6 w-6 text-blue-600" />
      <span className="font-serif font-bold text-xl text-gray-900">NamedByAI</span>
    </Link>
  );
} 