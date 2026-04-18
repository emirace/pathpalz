"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "info@pathpalz.com",
      subtext: "Expect a response within 24 hours.",
      link: "mailto:info@pathpalz.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "(+44)123456789",
      subtext: "Mon-Fri from 9am to 6pm.",
      link: "tel:+44123456789",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "London, United Kingdom",
      subtext: "88 London Road, London, United Kingdom.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#00284F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-manrope">
              Let's build something{" "}
              <span className="text-teal">extraordinary</span> together.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed font-inter">
              Have a project in mind or want to learn a new skill? Reach out and
              our team will get back to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Main Content */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#00284F] mb-6 font-manrope">
                  Contact Information
                </h2>
                <p className="text-gray-500 text-lg">
                  Prefer a direct line? Here are all the ways you can reach the
                  PathPalz team.
                </p>
              </div>

              <div className="grid gap-8">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="flex items-start gap-6 p-6 rounded-2xl border border-gray-100 hover:border-teal/30 hover:bg-gray-50 transition-all group"
                  >
                    <div className="shrink-0 w-12 h-12 bg-[#00677D]/10 rounded-xl flex items-center justify-center text-[#00677D] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#00284F] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xl font-bold text-[#00677D] mb-1">
                        {item.details}
                      </p>
                      <p className="text-sm text-gray-400">{item.subtext}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Social Links Placeholder */}
              <div className="pt-6">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  {["LinkedIn", "GitHub", "Twitter", "Instagram"].map(
                    (social) => (
                      <button
                        key={social}
                        className="px-5 py-2 rounded-full border border-gray-200 text-sm font-bold text-[#00284F] hover:bg-[#00284F] hover:text-white transition-all"
                      >
                        {social}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="relative">
              {!isSubmitted ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl shadow-gray-200/50 relative z-10 transition-all duration-500">
                  <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal/10 rounded-full mb-4">
                      <MessageSquare className="w-6 h-6 text-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#00284F] font-manrope">
                      Send us a message
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Fill out the form and we'll be in touch.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#00677D] uppercase tracking-wider px-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-[#00284F] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#00677D] uppercase tracking-wider px-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-[#00284F] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#00677D] uppercase tracking-wider px-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="How can we help?"
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-[#00284F] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#00677D] uppercase tracking-wider px-1">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your project or enquiry..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-[#00284F] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 bg-[#00677D] text-white font-bold text-base uppercase tracking-widest rounded-xl shadow-lg shadow-teal/20 hover:bg-[#00677D]/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-2xl shadow-gray-200/50 flex flex-col items-center justify-center min-h-[500px] animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#00284F] mb-4 font-manrope">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-lg mb-10 max-w-sm">
                    Thank you for reaching out. We've received your enquiry and
                    will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="flex items-center gap-2 text-teal font-bold hover:gap-3 transition-all"
                  >
                    Send another message <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Background accent for the form */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-teal/5 rounded-[40px] -z-1 rotate-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Map Section Placeholder */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
            {/* Using a stylized visual вместо a real map for now */}
            <div className="absolute inset-0 opacity-40 grayscale pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#00677D_1.5px,transparent_1.5px)] bg-size-[24px_24px]" />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-[#00284F] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <MapPin className="w-8 h-8 text-teal" />
              </div>
              <h4 className="text-xl font-bold text-[#00284F]">
                Find us in London
              </h4>
              <p className="text-gray-500">
                88 London Road, London, United Kingdom.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
