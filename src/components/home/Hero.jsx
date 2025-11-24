
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(createPageUrl(`Search?q=${encodeURIComponent(searchQuery.trim())}`));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F5FBF6]">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-6 px-6 py-12 md:flex-row md:py-16">
        {/* Left: copy + search */}
        <div className="w-full md:w-5/12">
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Had a Bad Experience?
            <br />
            You're Not Alone.
          </h1>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            Let's Find a Solution, Together.
          </p>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            ReportHere is a <span className="font-bold text-[#198D53] text-xl">FREE*</span> platform — a welcoming bridge where people feel heard — and businesses have the chance to earn loyal fans.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-6 flex w-full max-w-xl items-center rounded-full bg-white shadow-md ring-1 ring-black/5">
            <Input
              type="text"
              name="q"
              placeholder="Search for a company (internet, delivery, auto repair…)"
              className="w-full rounded-l-full border-0 bg-transparent px-5 py-3 outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Search for a company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-r-full bg-gradient-to-b from-green-500 to-green-700 px-6 py-3 font-semibold text-white transition hover:from-green-600 hover:to-green-800 hover:shadow-lg active:scale-[.99]"
            >
              Search
            </Button>
          </form>

          {/* CTAs - Two prominent buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={createPageUrl("FileComplaint")}>
              <Button className="rounded-full bg-gradient-to-b from-green-500 to-green-700 px-6 py-3 text-base font-semibold text-white transition hover:from-green-600 hover:to-green-800 hover:shadow-lg">
                File a Complaint
              </Button>
            </Link>
            <Link to={createPageUrl("ClaimProfile")}>
              <Button variant="outline" className="rounded-full border-2 border-green-600 px-6 py-3 text-base font-semibold text-green-700 transition hover:bg-green-50 hover:shadow-md">
                Claim Your Business
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: people image - bigger and transparent */}
        <div className="relative w-full md:w-7/12 -mb-12 md:-mb-16">
          <div className="relative mx-auto w-full">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/108907386/aCgrtJIexWLKmdxe.png"
              alt="Happy customers using ReportHere"
              className="h-auto w-full object-contain scale-110 md:scale-125"
            />
          </div>
        </div>
      </div>

      {/* subtle gradient wash */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-white/60 to-transparent" />
    </section>
  );
}
