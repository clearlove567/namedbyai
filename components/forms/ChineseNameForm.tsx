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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { toast } = useToast();
  const { remainingUsage, updateRemainingUsage } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      gender: "male",
      style: chineseNameStyles[0].value,
      meaning: chineseMeanings[0].value,
      nameLength: "2",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (remainingUsage <= 0) {
      toast({
        title: "今日使用次数已用完",
        description: "每天凌晨重置使用次数，请明天再来使用",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setResults(null);

      const response = await fetch("/api/generate-chinese-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "今日使用次数已用完",
            description: "每天凌晨重置使用次数，请明天再来使用",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        throw new Error(data.error || "生成名字时出错");
      }

      if (data.names && data.names.names && Array.isArray(data.names.names)) {
        setResults(data.names.names);
        updateRemainingUsage().catch(console.error);
        setIsLoading(false);
      } else {
        throw new Error("返回数据格式错误");
      }
    } catch (error: any) {
      console.error("生成错误:", error);
      toast({
        title: "生成失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || remainingUsage <= 0}
          >
            {isLoading ? "生成中..." : remainingUsage <= 0 ? "今日使用次数已用完" : "生成名字"}
          </Button>
          
          {remainingUsage <= 0 && (
            <p className="text-sm text-red-500 text-center mt-2">
              今日使用次数已达上限，请明天再来使用
            </p>
          )}
        </form>
      </Form>

      {results && <NameResults results={results} type="chinese" />}
    </div>
  );
}