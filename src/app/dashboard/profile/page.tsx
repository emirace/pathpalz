"use client";

import { useGetUser } from "@/query/auth";
import {
  User,
  Mail,
  Phone,
  Shield,
  Loader2,
  Edit3,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center min-h-[60vh] text-gray-500">
        Could not load profile information.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-500">
            Manage your personal information and settings
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-all hover:bg-navy/90 hover:shadow-md active:scale-95">
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="col-span-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="relative h-32 bg-linear-to-r from-navy to-teal">
            <button className="absolute bottom-2 right-2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30">
              <Camera size={16} />
            </button>
          </div>
          <div className="relative px-6 pb-6 text-center">
            <div className="mx-auto -mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-100 shadow-md">
              <User size={40} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {user.name || "PathPalz Member"}
            </h2>
            <p className="mt-1 text-sm font-medium text-teal capitalize">
              {user.usertype?.[0] || "User"}
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
          <h3 className="mb-6 text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
            Personal Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600 shadow-inner">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
              <div className="rounded-full bg-green-50 p-3 text-green-600 shadow-inner">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Phone Number
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.phone_number
                    ? `${user.tel_code || ""} ${user.phone_number}`.trim()
                    : "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
              <div className="rounded-full bg-purple-50 p-3 text-purple-600 shadow-inner">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Account Role
                </p>
                <p className="mt-1 font-medium text-gray-900 capitalize">
                  {user.usertype?.join(", ") || "Standard User"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
