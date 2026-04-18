import React from "react";

interface ReadyToStartProps {
  onApply: () => void;
}

const ReadyToStart = ({ onApply }: ReadyToStartProps) => {
  return (
    <section className="bg-white py-20 lg:py-24 border-t border-gray-150">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
          {/* Left Side */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-[#00284F]">
              Ready to start?
            </h2>
            <div className="w-24 md:w-28 h-1.5 bg-[#0094B2] mt-4 md:mt-5" />
          </div>

          {/* Right Side */}
          <div className="md:max-w-3xl">
            <p className="text-black text-lg md:text-[22px] font-medium leading-relaxed tracking-tight">
              <button
                onClick={onApply}
                className="text-[#0094B2] hover:underline font-bold cursor-pointer"
              >
                Apply now
              </button>{" "}
              — it takes 5 minutes. We reply within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
