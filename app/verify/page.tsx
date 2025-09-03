"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function VerifyContent() {
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setError("No verification token found");
                setIsVerifying(false);
                return;
            }

            try {
                const response = await fetch(`/api/verify?token=${token}`);
                const data = await response.json();

                if (data.success) {
                    setIsVerified(true);
                    toast({
                        title: "Success",
                        description: "Email verified successfully. You can now log in.",
                    });
                    // Redirect to login page after 3 seconds
                    setTimeout(() => {
                        router.push("/login");
                    }, 3000);
                } else {
                    setError(data.error || "Verification failed");
                }
            } catch (error) {
                setError("An error occurred during verification");
            } finally {
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [searchParams, router, toast]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 text-center">
                <h1 className="text-2xl font-bold">Email Verification</h1>
                
                {isVerifying && (
                    <div className="space-y-4">
                        <p>Verifying your email...</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                )}

                {isVerified && (
                    <div className="space-y-4">
                        <p className="text-green-600">Email verified successfully!</p>
                        <p>Redirecting you to login...</p>
                    </div>
                )}

                {error && (
                    <div className="space-y-4">
                        <p className="text-red-600">{error}</p>
                        <Button asChild>
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md space-y-8 text-center">
                    <h1 className="text-2xl font-bold">Email Verification</h1>
                    <div className="space-y-4">
                        <p>Loading...</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                </div>
            </main>
        }>
            <VerifyContent />
        </Suspense>
    );
} 