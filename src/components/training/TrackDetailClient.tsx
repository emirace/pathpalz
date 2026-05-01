"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTracks, useGetTrackById } from "@/query/training/tracks";
import { useCheckout } from "@/query/training/payments";
import { useGetUser } from "@/query/auth";
import PaymentGatewayModal from "@/components/training/PaymentGatewayModal";
import {
  ChevronLeft,
  Clock,
  BarChart,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  BookOpen,
  X,
} from "lucide-react";
import Link from "next/link";

const TRACK_CURRICULUM: Record<
  string,
  { modules: { title: string; topics: string[] }[] }
> = {
  "software-development": {
    modules: [
      {
        title: "Foundations of the Web",
        topics: [
          "HTML5 Semantic Structure",
          "Advanced CSS & Grid/Flexbox",
          "Responsive Design Patterns",
        ],
      },
      {
        title: "Javascript Masterclass",
        topics: [
          "Asynchronous Programming",
          "ES6+ Features",
          "DOM Manipulation & Events",
        ],
      },
      {
        title: "Modern Frontend (React)",
        topics: [
          "Component Architecture",
          "State Management (Ref, Context)",
          "Hooks & Performance",
        ],
      },
      {
        title: "Backend & Systems",
        topics: [
          "Node.js & Express",
          "Database Design (SQL/NoSQL)",
          "API Development & Security",
        ],
      },
    ],
  },
  "data-ai": {
    modules: [
      {
        title: "Mathematics for Data Science",
        topics: [
          "Statistics & Probability",
          "Linear Algebra Foundations",
          "Calculus for Machine Learning",
        ],
      },
      {
        title: "Python for Data Analysis",
        topics: [
          "Pandas & NumPy Deep Dive",
          "Data Cleaning Techniques",
          "Exploratory Data Analysis",
        ],
      },
      {
        title: "Machine Learning Models",
        topics: [
          "Regression & Classification",
          "Clustering Algorithms",
          "Neural Networks Basics",
        ],
      },
      {
        title: "AI Deployment",
        topics: [
          "Model Evaluation",
          "MLOps Foundations",
          "Integrating AI into Products",
        ],
      },
    ],
  },
  devops: {
    modules: [
      {
        title: "Inftastructure as Code",
        topics: [
          "Terraform Foundations",
          "Cloud Provider Mastery (AWS/GCP)",
          "Network Security",
        ],
      },
      {
        title: "Containerization",
        topics: [
          "Docker Deep Dive",
          "Kubernetes Orchestration",
          "Microservices Patterns",
        ],
      },
      {
        title: "CI/CD Pipelines",
        topics: [
          "GitHub Actions",
          "Jenkins & Automation",
          "Blue/Green Deployments",
        ],
      },
      {
        title: "Monitoring & Reliability",
        topics: [
          "Prometheus & Grafana",
          "Site Reliability Engineering",
          "Log Management",
        ],
      },
    ],
  },
};

export default function TrackDetailClient() {
  const { slug } = useParams();
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestData, setGuestData] = useState({ fullName: "", email: "" });

  const { data: user } = useGetUser();
  const { data: tracks, isLoading: isTracksLoading } = useGetTracks();

  const foundTrack = useMemo(() => {
    return tracks?.find((t) => t.slug === slug);
  }, [tracks, slug]);

  const { data: track, isLoading: isTrackLoading } = useGetTrackById(
    foundTrack?.id || "",
  );

  const checkoutMutation = useCheckout();

  const curriculum = useMemo(() => {
    return (
      TRACK_CURRICULUM[slug as string] || {
        modules: [
          {
            title: "Fundamentals",
            topics: [
              "Core Concepts",
              "Standard Practices",
              "Introduction to Tools",
            ],
          },
          {
            title: "Intermediate Skills",
            topics: ["Project Work", "Best Practices", "Complexity Management"],
          },
          {
            title: "Professional Excellence",
            topics: [
              "Industry Standards",
              "Advanced Techniques",
              "Final Capstone",
            ],
          },
        ],
      }
    );
  }, [slug]);

  if (isTracksLoading || (foundTrack && isTrackLoading)) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-[#F3F3F8] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[#00284F] mb-4">
          Track not found
        </h1>
        <Link href="/training" className="text-teal hover:underline">
          Return to training overview
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    if (user) {
      if (track.status === "open") {
        setIsPaymentModalOpen(true);
      } else {
        setIsPaymentModalOpen(true);
      }
    } else {
      setIsGuestModalOpen(true);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestData.fullName || !guestData.email) return;
    setIsGuestModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleGatewaySelect = (gateway: "stripe" | "paystack") => {
    checkoutMutation.mutate(
      {
        track_id: track.id,
        gateway,
        ...(!user
          ? { email: guestData.email, full_name: guestData.fullName }
          : {}),
      },
      {
        onSuccess: (data) => {
          if (data.checkout_url) {
            window.location.href = data.checkout_url;
          }
        },
        onError: (error: any) => {
          alert(
            error?.response?.data?.message ||
              "Failed to initialize checkout. Please try again.",
          );
        },
      },
    );
  };

  const isOpen = track.status === "open";

  return (
    <div className="min-h-screen bg-[#F3F3F8] flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#00284F] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-teal/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/training"
            className="inline-flex items-center text-teal mb-8 hover:text-teal/80 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Tracks
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-teal/20 border border-teal/30 text-teal text-sm font-bold uppercase tracking-widest">
                {isOpen ? "Enrollment Open" : "Coming Soon"}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold font-manrope leading-tight">
                {track.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">
                {track.description}
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Duration
                    </p>
                    <p className="font-bold">{track.duration_weeks} Weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <BarChart className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Level
                    </p>
                    <p className="font-bold">Beginner Welcome</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Format
                    </p>
                    <p className="font-bold">Cohort-based</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 text-[#00284F] shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">
                    Standard Price
                  </span>
                  <span className="text-4xl font-extrabold font-manrope">
                    £{parseInt(track.price)}
                  </span>
                </div>

                <ul className="space-y-4">
                  {[
                    "Lifetime access to content",
                    "Certificate of completion",
                    "Discord community access",
                    "Weekly live sessions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleApply}
                  className="w-full h-16 bg-[#00284F] text-white rounded-2xl font-bold text-lg hover:bg-[#00284F]/90 transition-all flex items-center justify-center group"
                >
                  {isOpen ? "Apply for this path" : "Join the Waitlist"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-gray-400 font-medium">
                  {isOpen
                    ? "Application process takes under 5 minutes"
                    : "Get notified when the next cohort opens"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Curriculum & Modules */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold font-manrope text-[#00284F] mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-teal" />
                Learning Curriculum
              </h2>

              <div className="space-y-4">
                {curriculum.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <h3 className="text-xl font-bold text-[#00284F]">
                        {module.title}
                      </h3>
                    </div>
                    <div className="pl-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {module.topics.map((topic, tidx) => (
                        <div
                          key={tidx}
                          className="flex items-center gap-2 text-gray-500 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-manrope text-[#00284F] mb-8 flex items-center gap-3">
                <Zap className="w-8 h-8 text-teal" />
                What you'll achieve
              </h2>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#00284F]">
                      Industry Readiness
                    </h4>
                    <p className="text-sm text-gray-500">
                      Master the exact tools and workflows used by professional
                      engineers in active production environments.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#00284F]">
                      Production Portfolio
                    </h4>
                    <p className="text-sm text-gray-500">
                      Build and deploy 5+ significant projects to your personal
                      GitHub, ready for employer review.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#00284F]">
                      Network & Community
                    </h4>
                    <p className="text-sm text-gray-500">
                      Connect with a supportive group of peers and instructors
                      who are equally committed to high-growth tech careers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#00284F]">
                      Career Velocity
                    </h4>
                    <p className="text-sm text-gray-500">
                      Accelerate your transition from learner to earning with
                      practical, job-first training focused on results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar / Info */}
          <div className="space-y-8">
            <div className="bg-teal p-8 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-4">
                Questions about this track?
              </h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Our support team is available to help you choose the best path
                for your career goals.
              </p>
              <button className="w-full h-12 bg-white text-teal rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Speak to an Advisor
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-[#00284F]">
                Prerequisites
              </h3>
              <ul className="space-y-4">
                {[
                  "Basic computer literacy",
                  "Standard laptop or desktop",
                  "Reliable internet access",
                  "12+ hours per week commitment",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#424750]">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={handleGatewaySelect}
        isSubmitting={checkoutMutation.isPending}
      />

      {isGuestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00284f]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#00284F]">
                  Guest Checkout
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Please enter your details to proceed
                </p>
              </div>
              <button
                onClick={() => setIsGuestModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuestSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#00284F]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={guestData.fullName}
                  onChange={(e) =>
                    setGuestData({ ...guestData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#00284F]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={guestData.email}
                  onChange={(e) =>
                    setGuestData({ ...guestData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#00284F] text-white rounded-xl font-bold hover:bg-[#00284F]/90 transition-all flex items-center justify-center group"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href={`/login?redirect=/training/${slug}`}
                    className="text-teal font-semibold hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
