// src/app/(app)/login/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  // if already logged in, don't sit on /login — bounce to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // brief flash before redirect effect fires
  }

  return (
    <div>
      <h1>LoginPage</h1>
      <button onClick={signInWithGoogle}>Continue with Google</button>
    </div>
  );
}

export default LoginPage;