import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PathPalz",
  description: "Privacy Policy for PathPalz",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-navy py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Shield className="mx-auto mb-6 h-16 w-16 text-teal" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            We are committed to protecting your personal information and your right to privacy.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
          
          <div className="prose prose-teal max-w-none text-gray-600">
            <section className="mb-10 border-b border-gray-100 pb-10">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-navy" />
                <h2 className="m-0 text-2xl font-bold text-gray-900">1. Introduction</h2>
              </div>
              <p className="leading-relaxed">
                Welcome to PathPalz. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-10 border-b border-gray-100 pb-10">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-navy" />
                <h2 className="m-0 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              </div>
              <p className="mb-4 leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="space-y-3 rounded-xl bg-gray-50 p-6 border border-gray-100">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                  <span><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                  <span><strong>Contact Data:</strong> includes email address and telephone numbers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                  <span><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                  <span><strong>Usage Data:</strong> includes information about how you use our website, products and services.</span>
                </li>
              </ul>
            </section>

            <section className="mb-10 border-b border-gray-100 pb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              <p className="mb-4 leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="space-y-2 pl-4 text-gray-600 list-disc marker:text-teal">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section className="mb-10 border-b border-gray-100 pb-10">
              <div className="mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-navy" />
                <h2 className="m-0 text-2xl font-bold text-gray-900">4. Data Security</h2>
              </div>
              <p className="leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section className="mb-10 border-b border-gray-100 pb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Your Legal Rights</h2>
              <p className="mb-4 leading-relaxed">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <h4 className="font-semibold text-gray-900">Request access</h4>
                  <p className="mt-1 text-sm text-gray-500">To your personal data.</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <h4 className="font-semibold text-gray-900">Request correction</h4>
                  <p className="mt-1 text-sm text-gray-500">Of the personal data that we hold about you.</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <h4 className="font-semibold text-gray-900">Request erasure</h4>
                  <p className="mt-1 text-sm text-gray-500">Of your personal data.</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <h4 className="font-semibold text-gray-900">Object to processing</h4>
                  <p className="mt-1 text-sm text-gray-500">Of your personal data.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">6. Contact Us</h2>
              <p className="mb-4 leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="rounded-xl bg-gray-50 p-6 border border-gray-100 flex flex-col items-start">
                <p className="font-medium text-gray-900">PathPalz Legal Team</p>
                <a 
                  href="mailto:privacy@pathpalz.com" 
                  className="mt-2 text-navy hover:text-teal inline-flex items-center gap-2 transition-colors font-medium"
                >
                  <Mail className="h-4 w-4" />
                  privacy@pathpalz.com
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
