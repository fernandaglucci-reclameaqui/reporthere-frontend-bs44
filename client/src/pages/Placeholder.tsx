import { useRoute } from "wouter";

export default function Placeholder() {
  const [match, params] = useRoute("/:page");
  
  // Map page slugs to titles
  const titles: Record<string, string> = {
    "companies": "Browse Companies",
    "categories": "Categories",
    "blog": "Our Blog",
    "about": "About Us",
    "consumers": "For Consumers",
    "businesses": "For Businesses",
    "login": "Login",
    "search": "Search Results",
    "reviews": "Write a Review",
    "careers": "Careers",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  };

  // Extract the last part of the path if it's nested or just use the param
  const path = window.location.pathname.split('/').pop() || "";
  const title = titles[path] || "Page Under Construction";

  return (
    <div className="container py-20 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚧</span>
        </div>
        <h1 className="text-4xl font-bold text-[#1A2E25]">{title}</h1>
        <p className="text-xl text-gray-600">
          We're currently building this page. Check back soon for updates!
        </p>
        <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 mt-8">
          <p className="font-mono text-sm text-gray-500">Current Route: {window.location.pathname}</p>
        </div>
      </div>
    </div>
  );
}
