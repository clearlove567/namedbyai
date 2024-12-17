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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { chineseMeanings } from "@/lib/constants/nameMeanings";
import { chineseNameStyles } from "@/lib/constants/nameStyles";

const formSchema = z.object({
  lastName: z.string().min(1, "请输入姓氏").max(2, "姓氏最多两个字"),
  gender: z.string(),
  birthDate: z.string().optional(),
  style: z.string(),
  meaning: z.string(),
  nameLength: z.string(),
});

export function ChineseNameForm() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      gender: "male",
      style: "traditional",
      meaning: "health_longevity",
      nameLength: "2",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const selectedMeaning = chineseMeanings.find(m => m.value === values.meaning);
      const meaningDetails = selectedMeaning ? selectedMeaning.description : values.meaning;

      const response = await fetch("/api/generate-chinese-name", {
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓氏</FormLabel>
                <FormControl>
                  <Input placeholder="请输入姓氏" {...field} maxLength={2} />
                </FormControl>
                <FormDescription>请输入您的姓氏，最多两个字</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">男</SelectItem>
                    <SelectItem value="female">女</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>出生日期（可选）</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>用于生辰八字分析</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名字风格</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择名字风格" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {chineseNameStyles.map((style) => (
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
                <FormLabel>期望寓意</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择期望寓意" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {chineseMeanings.map((meaning) => (
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
            name="nameLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名字字数</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择名字字数" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">单字名</SelectItem>
                    <SelectItem value="2">双字名</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "生成中..." : "生成名字"}
          </Button>
        </form>
      </Form>

      {results && <NameResults results={results} type="chinese" />}
    </div>
  );
}