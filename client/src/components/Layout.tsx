import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container flex h-28 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <img src="/images/logo-official.png" alt="ReportHere" className="h-24 w-auto object-contain cursor-pointer" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-lg font-medium text-gray-600">
            <Link href="/companies" className="hover:text-[#2C4A3B] transition-colors border-b-2 border-transparent hover:border-[#2C4A3B] py-1">Companies</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#2C4A3B] transition-colors group relative">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <Link href="/blog" className="hover:text-[#2C4A3B] transition-colors border-b-2 border-transparent hover:border-[#2C4A3B] py-1">Blog</Link>
            <Link href="/about" className="hover:text-[#2C4A3B] transition-colors border-b-2 border-transparent hover:border-[#2C4A3B] py-1">About</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/consumers">
              <Button variant="default" className="bg-[#2C4A3B] hover:bg-[#1e3329] text-white font-bold shadow-md rounded-lg px-6 py-6 text-lg">
                For Consumers
              </Button>
            </Link>
            <Link href="/businesses">
              <Button variant="outline" className="border-2 border-[#2C4A3B] text-[#2C4A3B] hover:bg-[#2C4A3B]/5 font-bold rounded-lg px-6 py-6 text-lg bg-transparent">
                For Businesses
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-[#2C4A3B] font-medium hover:bg-gray-100 text-lg">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-28 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 z-40 animate-in slide-in-from-top-5">
            <Link href="/companies" className="text-lg font-medium text-gray-600 hover:text-[#2C4A3B] py-2 border-b border-gray-50">Companies</Link>
            <Link href="/categories" className="text-lg font-medium text-gray-600 hover:text-[#2C4A3B] py-2 border-b border-gray-50">Categories</Link>
            <Link href="/blog" className="text-lg font-medium text-gray-600 hover:text-[#2C4A3B] py-2 border-b border-gray-50">Blog</Link>
            <Link href="/about" className="text-lg font-medium text-gray-600 hover:text-[#2C4A3B] py-2 border-b border-gray-50">About</Link>
            <div className="flex flex-col gap-3 mt-2">
              <Link href="/consumers">
                <Button className="w-full bg-[#2C4A3B] hover:bg-[#1e3329] text-white font-bold py-6 text-lg">For Consumers</Button>
              </Link>
              <Link href="/businesses">
                <Button variant="outline" className="w-full border-2 border-[#2C4A3B] text-[#2C4A3B] font-bold py-6 text-lg">For Businesses</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="w-full text-gray-600 font-medium text-lg">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>


    </div>
  );
}
