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
            Privacy & Payment Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            PathPalz Limited is committed to protecting your personal information and maintaining transparency in our operations.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Effective Date: April 22, 2026
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
          
          <div className="prose prose-teal max-w-none text-gray-600">
            
            {/* PART 1 - PRIVACY POLICY */}
            <div className="mb-16">
              <h2 className="mb-8 text-3xl font-bold text-navy border-b-2 border-teal pb-2 inline-block">PART 1 — PRIVACY POLICY</h2>
              
              <section className="mb-10 border-b border-gray-100 pb-10">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-navy" />
                  <h3 className="m-0 text-2xl font-bold text-gray-900">1. Who We Are and How to Contact Us</h3>
                </div>
                <p className="leading-relaxed">
                  Pathpalz Limited (&quot;Pathpalz&quot;) is the data controller responsible for the personal data collected through our website (https://pathpalz.com) and our training programmes. We provide tech solutions and tech training services to individuals in the United Kingdom and the Federal Republic of Nigeria.
                </p>
                <div className="mt-6 rounded-xl bg-gray-50 p-6 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-2">Registered contact details:</p>
                  <ul className="list-none space-y-2 p-0 m-0">
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-teal" />
                      <span className="font-medium">Email:</span> info@pathpalz.com
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-teal" />
                      <span className="font-medium">Website:</span> https://pathpalz.com/contact-us/
                    </li>
                  </ul>
                </div>
                <p className="mt-4 leading-relaxed">
                  If you have any questions about how we handle your personal data, please contact us at the email address above. For data protection queries from Nigerian residents, you may additionally contact the Nigeria Data Protection Commission (NDPC).
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <div className="mb-4 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-navy" />
                  <h3 className="m-0 text-2xl font-bold text-gray-900">2. What Personal Data We Collect</h3>
                </div>
                <p className="mb-6 leading-relaxed">
                  We collect personal data only where we have a lawful basis to do so. The categories of data we may collect are:
                </p>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3">2.1 Data You Provide Directly</h4>
                <ul className="space-y-3 rounded-xl bg-gray-50 p-6 border border-gray-100 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Identity data:</strong> full name, country of residence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Contact data:</strong> email address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Application data:</strong> training track preference, prior coding experience, availability, time zone, working status, motivation statement, and any additional information you volunteer on our application or waiting list forms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Financial data:</strong> payment method and transaction details (processed via Stripe or Paystack — Pathpalz does not store full card numbers)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Correspondence:</strong> emails, support messages, and any communications you send to us</span>
                  </li>
                </ul>

                <h4 className="text-lg font-bold text-gray-900 mb-3">2.2 Data Collected Automatically</h4>
                <ul className="space-y-3 rounded-xl bg-gray-50 p-6 border border-gray-100">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Technical data:</strong> IP address, browser type, operating system, device type, and referral source</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Usage data:</strong> pages visited, time spent on pages, and links clicked</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Cookie data:</strong> as described in Section 6 below</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <div className="mb-4 flex items-center gap-3">
                  <Lock className="h-6 w-6 text-navy" />
                  <h3 className="m-0 text-2xl font-bold text-gray-900">3. How We Use Your Data and Our Lawful Basis</h3>
                </div>
                <p className="mb-6 leading-relaxed">
                  We only process your personal data where we have a valid lawful basis under Article 6 of the UK GDPR (and equivalent provisions of the Nigerian Data Protection Act 2023). The table below sets out our purposes and corresponding lawful bases:
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Purpose</th>
                        <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Lawful Basis</th>
                        <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Detail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Processing your application and managing your enrolment</td>
                        <td className="px-4 py-3">Contract</td>
                        <td className="px-4 py-3">Necessary to perform our training agreement with you</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="px-4 py-3">Processing payments and maintaining financial records</td>
                        <td className="px-4 py-3">Contract / Legal obligation</td>
                        <td className="px-4 py-3">Required to deliver the service and comply with accounting laws</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Providing course access, assignments, and feedback</td>
                        <td className="px-4 py-3">Contract</td>
                        <td className="px-4 py-3">Core delivery of the training programme</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="px-4 py-3">Responding to your enquiries and providing customer support</td>
                        <td className="px-4 py-3">Legitimate interests</td>
                        <td className="px-4 py-3">Our legitimate interest in maintaining good customer relationships</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Sending programme updates and administrative notices</td>
                        <td className="px-4 py-3">Contract</td>
                        <td className="px-4 py-3">Necessary to manage the programme you are enrolled in</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="px-4 py-3">Sending marketing emails and newsletters</td>
                        <td className="px-4 py-3">Consent</td>
                        <td className="px-4 py-3">Only where you have opted in; you may withdraw at any time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Improving our website and training materials</td>
                        <td className="px-4 py-3">Legitimate interests</td>
                        <td className="px-4 py-3">Our legitimate interest in improving service quality</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="px-4 py-3">Fraud prevention and security</td>
                        <td className="px-4 py-3">Legitimate interests / Legal obligation</td>
                        <td className="px-4 py-3">Protecting Pathpalz and its trainees from fraudulent activity</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Complying with legal or regulatory obligations</td>
                        <td className="px-4 py-3">Legal obligation</td>
                        <td className="px-4 py-3">Including tax, anti-money laundering, and data protection law</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">4. Who We Share Your Data With</h3>
                <p className="mb-4 leading-relaxed">
                  We do not sell your personal data. We share data only in the following limited circumstances:
                </p>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3">4.1 Service Providers (Data Processors)</h4>
                <p className="mb-4 leading-relaxed">We engage third-party processors who act on our instructions and are bound by data processing agreements:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span>Google LLC — Google Workspace tools (Classroom, Drive, Meet, Forms, Sheets, Docs) used to deliver the training programme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span>Stripe, Inc. — payment processing for UK (GBP) payments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span>Paystack — payment processing for Nigeria (NGN) payments</span>
                  </li>
                </ul>
                <p className="mb-6 leading-relaxed">
                  These providers may transfer data internationally. Where transfers occur outside the UK or Nigeria, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the UK Information Commissioner’s Office (ICO) or equivalent mechanisms recognised under the NDPA 2023.
                </p>

                <h4 className="text-lg font-bold text-gray-900 mb-3">4.2 Legal and Regulatory Authorities</h4>
                <p className="mb-6 leading-relaxed">
                  We may disclose personal data to law enforcement agencies, regulatory bodies (including the ICO in the UK and the NDPC in Nigeria), or courts where we are legally required to do so, or where disclosure is necessary to protect the legal rights, safety, or property of Pathpalz or others.
                </p>

                <h4 className="text-lg font-bold text-gray-900 mb-3">4.3 Business Transfers</h4>
                <p className="leading-relaxed">
                  If Pathpalz undergoes a merger, acquisition, or sale of assets, your personal data may be transferred to the relevant successor entity. We will notify you of any such transfer and any changes to this policy in advance.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">5. International Data Transfers</h3>
                <p className="mb-4 leading-relaxed">
                  Pathpalz operates in both the United Kingdom and Nigeria. Data collected from UK residents is processed in accordance with UK GDPR. Data collected from Nigerian residents is processed in accordance with the Nigeria Data Protection Act 2023 (NDPA 2023).
                </p>
                <p className="leading-relaxed">
                  Where we transfer personal data internationally — for example, when using Google Workspace infrastructure hosted in the United States — we rely on appropriate transfer mechanisms, including adequacy decisions or Standard Contractual Clauses (SCCs), to ensure your data remains protected.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">6. Cookies and Tracking Technologies</h3>
                <p className="mb-4 leading-relaxed">
                  We use cookies and similar technologies on our website. Cookies are small text files stored on your device that help us operate and improve our website.
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-3">6.1 Types of Cookies We Use</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Strictly necessary cookies:</strong> required for the website to function (e.g., session management). These cannot be disabled.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Analytics cookies:</strong> help us understand how visitors interact with our website (e.g., pages viewed, time spent). We use these only where you have given consent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Marketing cookies:</strong> used to deliver relevant content or advertisements. We use these only where you have given consent.</span>
                  </li>
                </ul>
                <h4 className="text-lg font-bold text-gray-900 mb-3">6.2 Your Cookie Choices</h4>
                <p className="leading-relaxed">
                  On your first visit, you will be presented with a cookie consent banner. You may accept or reject non-essential cookies at any time by adjusting your preferences via the cookie settings link in our website footer. You may also manage cookies through your browser settings, although disabling all cookies may affect website functionality.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">7. How Long We Keep Your Data</h3>
                <p className="mb-4 leading-relaxed">
                  We retain personal data only for as long as necessary for the purposes for which it was collected, or as required by law. Our standard retention periods are:
                </p>
                <ul className="space-y-2 rounded-xl bg-gray-50 p-6 border border-gray-100">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Enrolment and training records:</strong> 6 years from the end of your last programme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Financial and payment records:</strong> 7 years (HMRC and Nigerian tax law requirements)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Marketing contact preferences:</strong> until you withdraw consent or no contact for 3 years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Website analytics data:</strong> 26 months from collection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-teal shrink-0"></span>
                    <span><strong>Support correspondence:</strong> 3 years from the date of last contact</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">8. Your Rights</h3>
                <p className="mb-6 leading-relaxed">
                  Depending on your jurisdiction, you have the following rights in relation to your personal data:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <h5 className="font-semibold text-gray-900 m-0">Right of access</h5>
                    <p className="mt-1 text-sm text-gray-500 m-0">To request a copy of the personal data we hold about you.</p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <h5 className="font-semibold text-gray-900 m-0">Right to rectification</h5>
                    <p className="mt-1 text-sm text-gray-500 m-0">To ask us to correct inaccurate or incomplete data.</p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <h5 className="font-semibold text-gray-900 m-0">Right to erasure</h5>
                    <p className="mt-1 text-sm text-gray-500 m-0">The &lsquo;right to be forgotten&rsquo; where no lawful basis remains.</p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <h5 className="font-semibold text-gray-900 m-0">Right to data portability</h5>
                    <p className="mt-1 text-sm text-gray-500 m-0">Receive your data in a machine-readable format.</p>
                  </div>
                </div>
                <p className="leading-relaxed">
                  To exercise any of these rights, please contact us at <strong>info@pathpalz.com</strong>. We will respond within one calendar month (UK GDPR) or 30 days (NDPA 2023).
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">9. How We Protect Your Data</h3>
                <p className="mb-4 leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your personal data, including:
                </p>
                <ul className="space-y-2 mb-6">
                  <li><strong>Access controls:</strong> limiting access to staff and contractors who require it.</li>
                  <li><strong>Secure transmission:</strong> all data is transmitted over HTTPS.</li>
                  <li><strong>Third-party oversight:</strong> processors must implement appropriate security measures.</li>
                  <li><strong>Incident response:</strong> procedures to detect, investigate, and notify relevant authorities.</li>
                </ul>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">10. Children&rsquo;s Data</h3>
                <p className="leading-relaxed">
                  Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.
                </p>
              </section>

              <section>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">11. Changes to This Privacy Policy</h3>
                <p className="leading-relaxed">
                  We may update this policy from time to time. Where changes are material, we will notify you by email and/or by posting a prominent notice on our website at least 14 days before the changes take effect.
                </p>
              </section>
            </div>

            {/* PART 2 - PAYMENT POLICY */}
            <div>
              <h2 className="mb-8 text-3xl font-bold text-navy border-b-2 border-teal pb-2 inline-block">PART 2 — PAYMENT POLICY</h2>
              
              <p className="mb-6 leading-relaxed italic text-gray-500">
                This Payment Policy forms part of the agreement between Pathpalz Limited and each enrolled trainee. It sets out how course fees are charged, when payment is due, and the circumstances in which refunds are available.
              </p>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">1. Course Fees and What Is Included</h3>
                <p className="leading-relaxed mb-4">
                  The course fee covers the full training programme as advertised, including weekly live sessions, lab exercises, pair learning, accountability manager support, and Demo Day.
                </p>
                <p className="leading-relaxed">
                  All fees are quoted inclusive of any applicable taxes. Payment processing fees (Stripe/Paystack) are added at checkout and displayed before payment confirmation.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">2. Accepted Payment Methods</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">Bank transfer</li>
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">Debit / Credit card</li>
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">PayPal</li>
                  <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium">Paystack (Naira payments)</li>
                </ul>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">3. Non-Refundable Registration Fee</h3>
                <p className="leading-relaxed">
                  A registration fee of <strong>£100 (UK)</strong> or equivalent in <strong>Naira (Nigeria)</strong> forms part of the total course fee. This fee is non-refundable, except where Pathpalz cancels the programme or where required by consumer law.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">4. Instalment Payment Plans</h3>
                <p className="leading-relaxed mb-4">
                  Trainees may apply for a two-instalment plan, subject to approval:
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="bg-navy text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                    <p className="m-0"><strong>First instalment:</strong> 50% of total fee, due on or before cohort start date.</p>
                  </div>
                  <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="bg-navy text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                    <p className="m-0"><strong>Second instalment:</strong> remaining balance, due no later than end of Week 4.</p>
                  </div>
                </div>
                <p className="leading-relaxed text-sm text-red-600 font-medium">
                  Note: Failure to make payments on time will result in immediate suspension of access to the training platform and live sessions.
                </p>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">6. Deferral Policy</h3>
                <p className="mb-4 leading-relaxed">
                  A trainee may request to defer enrolment. The following fees apply when returning after deferral:
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Deferral Period</th>
                        <th className="px-4 py-3 text-left font-bold uppercase tracking-wider">Applicable Fee to Rejoin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">Immediate next cohort</td>
                        <td className="px-4 py-3">No additional fee</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="px-4 py-3">3 to 6 months from original start date</td>
                        <td className="px-4 py-3">£100 (UK) / equivalent Naira amount (Nigeria)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">More than 6 months from original start date</td>
                        <td className="px-4 py-3">Full course fee applicable to the new cohort</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10 border-b border-gray-100 pb-10">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">7. Refunds and Cancellation Rights</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">UK Trainees — Statutory Cooling-Off Period</h4>
                    <p className="leading-relaxed">
                      UK consumers have a statutory right to cancel within 14 calendar days of contract formation (&lsquo;the cooling-off period&rsquo;).
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Nigerian Trainees</h4>
                    <p className="leading-relaxed">
                      Pathpalz will honour refund requests made within 7 calendar days of payment, provided training has not yet commenced.
                    </p>
                  </div>
                  <div className="bg-teal/10 p-6 rounded-xl border border-teal/20">
                    <h4 className="text-teal font-bold mb-2 m-0">Pathpalz&rsquo;s Discretionary Refund Policy</h4>
                    <p className="m-0 text-gray-700">
                      Full refunds are provided if Pathpalz cancels the cohort before it begins. Other cases (medical/emergency) are reviewed individually.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <div className="rounded-2xl bg-navy p-8 text-white shadow-lg">
                  <h3 className="mt-0 mb-4 text-2xl font-bold text-white">Acknowledgement and Acceptance</h3>
                  <p className="mb-6 text-gray-300">By registering for a Pathpalz training programme, you confirm that:</p>
                  <ul className="space-y-3 list-none p-0 m-0">
                    {[
                      "You have read, understood, and agree to be bound by this Privacy Policy and Payment Policy",
                      "You are at least 18 years of age",
                      "The information you have provided on your application is accurate and complete",
                      "You understand your cancellation and refund rights"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Shield className="mt-1 h-5 w-5 text-teal shrink-0" />
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

