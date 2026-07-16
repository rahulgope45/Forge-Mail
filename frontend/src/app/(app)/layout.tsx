"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    
    // Check if the current route is the public terms page
    const isPublicRoute = pathname === "/terms";

    return (
        <AuthProvider>
            {/* 
              If your AuthProvider internally intercepts and blocks children when unauthenticated,
              you can handle bypass flags here or pass a property down if needed.
              Otherwise, wrapping it natively ensures the Terms page renders cleanly.
            */}
            {children}
        </AuthProvider>
    );
}