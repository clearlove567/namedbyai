import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { EnglishNameForm } from "@/components/forms/EnglishNameForm";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export const dynamic = 'force-dynamic';

export default async function EnglishNamePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">English Name Generator</h1>
      <EnglishNameForm />
    </div>
  )
}