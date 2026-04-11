import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="PathPalz Logo" 
                width={150} 
                height={40} 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-[200px]">
              Precision in Development, Human in Approach.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12">
            
            {/* Services */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-lg font-bold font-manrope">Services</h4>
              <ul className="flex flex-col space-y-4 text-gray-400">
                <li><Link href="/software-development" className="hover:text-teal transition-colors">Software Development</Link></li>
                <li><Link href="/training" className="hover:text-teal transition-colors">Tech Training</Link></li>
                <li><Link href="/consultancy" className="hover:text-teal transition-colors">Consultancy</Link></li>
                <li><Link href="/partners" className="hover:text-teal transition-colors">Partner Program</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-lg font-bold font-manrope">Resources</h4>
              <ul className="flex flex-col space-y-4 text-gray-400">
                <li><Link href="/privacy" className="hover:text-teal transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-teal transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-teal transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-lg font-bold font-manrope">Connect</h4>
              <ul className="flex flex-col space-y-4 text-gray-400">
                <li><Link href="https://linkedin.com" className="hover:text-teal transition-colors">LinkedIn</Link></li>
                <li><Link href="https://github.com" className="hover:text-teal transition-colors">GitHub</Link></li>
                <li><Link href="https://instagram.com" className="hover:text-teal transition-colors">Instagram</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 PathPalz. Precision in Development, Human in Approach.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
