const WhyPathPalz = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left — Title */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-[#023E74] uppercase tracking-tight leading-none">
              Why PathPalz
            </h2>
            <div className="w-12 h-1 bg-teal rounded-full" />
          </div>

          {/* Right — Content */}
          <div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We don&apos;t do passive watching. Every week you build something
              real. You have a learning partner to work through challenges with,
              and an accountability manager who checks in with you every single
              week. By the end, you have a{" "}
              <span className="font-semibold text-navy">working project</span>{" "}
              and a{" "}
              <span className="font-semibold text-navy">GitHub profile</span> —
              not just a certificate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPathPalz;
