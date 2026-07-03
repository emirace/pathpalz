"use client";

import { useGetUser } from "@/query/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [isLoading, user]);

  return children;
}

export default AuthLayout;
