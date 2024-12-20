"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (user) {
      router.push('/');
      router.refresh();
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-6"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </Button>
    </div>
  );
} 