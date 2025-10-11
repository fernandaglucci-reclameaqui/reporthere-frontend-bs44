
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
      navigate(createPageUrl(`companies?q=${encodeURIComponent(searchQuery.trim())}`));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F5FBF6]">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 py-12 md:flex-row md:py-20">
        {/* Left: copy + search */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            See Company Reputation <br className="hidden md:block" />
            You Can Trust
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Make informed decisions based on verified reviews and company response
            history from real consumers.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-6 flex w-full max-w-xl items-center rounded-full bg-white shadow-md ring-1 ring-black/5">
            <Input
              type="text"
              name="q"
              placeholder="Search for a company..."
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

          {/* CTAs */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={createPageUrl("FileComplaint")} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium ring-1 ring-black/10 transition hover:bg-gray-100 hover:ring-black/20 hover:shadow-md">
              Write a Complaint
            </Link>
            <Link to={createPageUrl("ClaimProfile")} className="rounded-full bg-gradient-to-b from-green-500 to-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:from-green-600 hover:to-green-800 hover:shadow-lg">
              Are you a business? Claim your profile
            </Link>
          </div>
        </div>

        {/* Right: people image */}
        <div className="relative w-full md:w-1/2">
          <div className="relative mx-auto w-full max-w-xl">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/349bd174d_imageforhomepage-correctone.png"
              alt="Happy customers using ReportHere"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* subtle gradient wash */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-white/60 to-transparent" />
    </section>
  );
}
