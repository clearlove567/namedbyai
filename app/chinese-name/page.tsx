import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ChineseNameForm } from "@/components/forms/ChineseNameForm";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export const dynamic = 'force-dynamic';

export default async function ChineseNamePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">中文取名</h1>
      <ChineseNameForm />
    </div>
  )
}