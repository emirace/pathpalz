import Link from "next/link";

function Announcement() {
  return (
    <div className="relative z-50 flex flex-wrap items-center justify-center gap-4 bg-linear-to-br from-navy to-teal px-6 py-3 text-center text-white shadow-lg">
      <p className="m-0 text-[15px] font-medium tracking-wide">
        Our MartZync App is officially live
      </p>
      <Link
        href="https://www.martzync.com/"
        className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md active:translate-y-0"
      >
        Click here to become a seller or download the app
      </Link>
    </div>
  );
}

export default Announcement;
