"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NameResult {
  name: string;
  meaning: string;
  score: number;
  cultural_notes?: string;
}

interface NameResultsProps {
  results: NameResult[];
  type: "chinese" | "english";
}

export function NameResults({ results, type }: NameResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: type === "chinese" ? "已复制" : "Copied",
      description: type === "chinese" ? "名字已复制到剪贴板" : "Name copied to clipboard",
    });
  };

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8 font-serif text-gray-900">
        {type === "chinese" ? "为您推荐的名字" : "Recommended Names"}
      </h2>
      <div className="grid gap-6">
        {results.map((result, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold font-serif">{result.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(result.name)}
                  className="hover:bg-blue-50"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-base text-gray-600">
                {type === "chinese" ? "寓意" : "Meaning"}: {result.meaning}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {type === "chinese" ? "评分" : "Score"}
                  </span>
                  <span className="text-sm font-medium">{result.score}/100</span>
                </div>
                {result.cultural_notes && (
                  <p className="text-sm text-gray-600 leading-relaxed">{result.cultural_notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}