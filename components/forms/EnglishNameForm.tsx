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
import { useState } from "react";
import { NameResults } from "../results/NameResults";
import { englishNameStyles, englishMeanings, initialLetters } from "@/lib/constants/nameStyles";

const formSchema = z.object({
  gender: z.string(),
  style: z.string(),
  meaning: z.string(),
  firstLetter: z.string().optional(),
});

export function EnglishNameForm() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);
      const selectedMeaning = englishMeanings.find(m => m.value === values.meaning);
      const meaningDetails = selectedMeaning ? selectedMeaning.label : values.meaning;

      const response = await fetch("/api/generate-english-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          meaning: meaningDetails,
        }),
      });
      const data = await response.json();
      
      if (data.names && Array.isArray(data.names)) {
        setResults(data.names);
      } else {
        console.error("Invalid response format:", data);
        setResults([]);
      }
    } catch (error) {
      console.error("Error generating names:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Names"}
          </Button>
        </form>
      </Form>

      {results && <NameResults results={results} type="english" />}
    </div>
  );
}