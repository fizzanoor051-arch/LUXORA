"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LockKeyhole } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export default function AuthGuard({
  children,
  fallbackUrl = "/auth/login",
}: AuthGuardProps) {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem(
          "luxora_token"
        );

        const user = localStorage.getItem(
          "luxora_user"
        );

        const authenticated = Boolean(token && user);

        setIsAuthenticated(authenticated);

        if (!authenticated) {
          router.replace(fallbackUrl);
        }
      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        router.replace(fallbackUrl);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthentication();
  }, [router, fallbackUrl]);

  if (isChecking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf8fb] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1e7f3]">
            <LoaderCircle
              size={24}
              className="animate-spin text-[#8d5c91]"
              strokeWidth={1.6}
            />
          </div>

          <p className="mt-4 text-sm text-[#817783]">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf8fb] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1e7f3]">
            <LockKeyhole
              size={23}
              strokeWidth={1.6}
              className="text-[#8d5c91]"
            />
          </div>

          <h2 className="mt-5 font-serif text-2xl font-semibold text-[#21152b]">
            Authentication Required
          </h2>

          <p className="mt-2 text-sm text-[#817783]">
            Please sign in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}