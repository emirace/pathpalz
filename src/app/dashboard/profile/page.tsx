"use client";

import { useState, useEffect, useRef } from "react";
import { useGetUser, useUpdateProfile } from "@/query/auth";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Shield,
  Link as LinkIcon,
  FileText,
  Loader2,
  Edit3,
  Camera,
  X,
  ImagePlus,
  Globe,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading } = useGetUser();
  const updateProfileMutation = useUpdateProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    bio: "",
    social_media_link: "",
    is_public: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateForm = () => {
      if (user) {
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone_number: user.phone_number || "",
          bio: user.bio || "",
          social_media_link: user.social_media_link || "",
          is_public: Boolean(user.is_public),
        });
      }
    };
    updateForm();
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("phone_number", formData.phone_number);
    data.append("bio", formData.bio);
    data.append("social_media_link", formData.social_media_link);
    data.append("is_public", String(formData.is_public));
    if (selectedImage) {
      data.append("profile_image", selectedImage);
    }

    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setNotification({
          type: "success",
          message: "Profile updated successfully.",
        });
        setSelectedImage(null);
        setImagePreview(null);
        // close modal shortly after showing success message
        setTimeout(() => {
          setIsEditModalOpen(false);
          setNotification(null);
        }, 1500);
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Could not update profile. Please try again.";
        setNotification({ type: "error", message: msg });
      },
    });
  };

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

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const socialMediaLink = user.social_media_link || user.social_link || "";
  const isInstructor = Boolean(user.usertype?.includes("instructor"));

  return (
    <div className="mx-auto max-w-4xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-500">
            Manage your personal information and settings
          </p>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-all hover:bg-navy/90 hover:shadow-md active:scale-95"
        >
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="col-span-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="relative h-32 bg-linear-to-r from-navy to-teal">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              <Camera size={16} />
            </button>
          </div>
          <div className="relative px-6 pb-6 text-center">
            <div className="mx-auto -mt-12 mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
              {imagePreview || user.profile_image ? (
                <Image
                  src={imagePreview || user.profile_image}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {fullName || "PathPalz Member"}
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
                  {(() => {
                    if (!user.usertype || user.usertype.length === 0)
                      return "Standard User";
                    const order = ["user", "instructor", "platform"];
                    const validRoles = user.usertype.filter(
                      (r: string) =>
                        r.toLowerCase() !== "business" &&
                        r.toLowerCase() !== "bussiness",
                    );
                    if (validRoles.length === 0) return "Standard User";
                    return validRoles
                      .sort(
                        (a: string, b: string) =>
                          order.indexOf(a.toLowerCase()) -
                          order.indexOf(b.toLowerCase()),
                      )
                      .pop();
                  })()}
                </p>
              </div>
            </div>

            {isInstructor && (
              <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
                <div
                  className={`rounded-full p-3 shadow-inner ${
                    user.is_public
                      ? "bg-teal/10 text-teal"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {user.is_public ? <Globe size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Profile Visibility
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {user.is_public ? "Public" : "Private"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Card */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <h3 className="mb-6 text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
          About
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
            <div className="rounded-full bg-amber-50 p-3 text-amber-600 shadow-inner">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bio</p>
              <p className="mt-1 whitespace-pre-line font-medium text-gray-900">
                {user.bio || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
            <div className="rounded-full bg-cyan-50 p-3 text-cyan-600 shadow-inner">
              <LinkIcon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500">
                Social Media Link
              </p>
              {socialMediaLink ? (
                <a
                  href={socialMediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-words font-medium text-navy transition-colors hover:text-teal hover:underline"
                >
                  {socialMediaLink}
                </a>
              ) : (
                <p className="mt-1 font-medium text-gray-900">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setNotification(null);
                }}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {notification && (
                <div
                  className={`mb-2 rounded-md border p-3 text-sm ${
                    notification.type === "success"
                      ? "bg-green-50 text-green-800 border-green-100"
                      : "bg-red-50 text-red-800 border-red-100"
                  }`}
                >
                  {notification.message}
                </div>
              )}
              {/* Profile Image Picker */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
                    {imagePreview || user.profile_image ? (
                      <Image
                        src={imagePreview || user.profile_image}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 rounded-full bg-navy p-1.5 text-white shadow-md transition-colors hover:bg-navy/90"
                  >
                    <ImagePlus size={14} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">Click to change photo</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label
                  htmlFor="social_media_link"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Social Media Link
                </label>
                <input
                  type="url"
                  id="social_media_link"
                  name="social_media_link"
                  value={formData.social_media_link}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              {/* Profile Visibility */}
              {isInstructor && (
                <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Public Profile
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Make your profile visible to other users.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.is_public}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_public: !prev.is_public,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-navy/20 ${
                      formData.is_public ? "bg-navy" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        formData.is_public ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setNotification(null);
                  }}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-all hover:bg-navy/90 hover:shadow-md disabled:opacity-50"
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
