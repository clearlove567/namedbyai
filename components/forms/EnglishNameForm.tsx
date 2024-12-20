"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { NameResults } from "../results/NameResults";
import { englishNameStyles, englishMeanings, initialLetters } from "@/lib/constants/nameStyles";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  gender: z.string(),
  style: z.string(),
  meaning: z.string(),
  firstLetter: z.string().optional(),
});

export function EnglishNameForm() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { remainingUsage, updateRemainingUsage } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      style: "classic",
      meaning: englishMeanings[0].value,
      firstLetter: "any",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (remainingUsage <= 0) {
      toast({
        title: "Daily Limit Reached",
        description: "Please try again tomorrow when the limit resets",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setResults(null);

      const response = await fetch("/api/generate-english-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Daily Limit Reached",
            description: "Please try again tomorrow when the limit resets",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        throw new Error(data.error || "Error generating names");
      }

      if (data.names && Array.isArray(data.names)) {
        setResults(data.names);
        updateRemainingUsage().catch(console.error);
        setIsLoading(false);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("当前 isLoading 状态:", isLoading);
  }, [isLoading]);

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select name style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {englishNameStyles.map((style) => (
                      <SelectItem 
                        key={style.value} 
                        value={style.value}
                      >
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Meaning</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meaning" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {englishMeanings.map((meaning) => (
                      <SelectItem 
                        key={meaning.value} 
                        value={meaning.value}
                      >
                        {meaning.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Letter (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select initial letter" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Letter</SelectItem>
                    {initialLetters.map((letter) => (
                      <SelectItem 
                        key={letter.value} 
                        value={letter.value}
                      >
                        {letter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || remainingUsage <= 0}
          >
            {isLoading ? "Generating..." : remainingUsage <= 0 ? "Daily Limit Reached" : "Generate Names"}
          </Button>
          
          {remainingUsage <= 0 && (
            <p className="text-sm text-red-500 text-center mt-2">
              The daily limit has been reached. Please try again tomorrow when it resets.
            </p>
          )}
        </form>
      </Form>

      {results && <NameResults results={results} type="english" />}
    </div>
  );
}