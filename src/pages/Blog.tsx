import React from 'react';
import { Link } from 'wouter';
import { Calendar, User, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "How to File a Complaint That Gets Results",
    excerpt: "Learn the best practices for writing a clear, evidence-based complaint that companies can't ignore.",
    author: "Sarah Jenkins",
    date: "Jan 10, 2026",
    category: "Consumer Tips",
    image: "/images/blog-1.jpg"
  },
  {
    id: 2,
    title: "Understanding Your Consumer Rights in 2026",
    excerpt: "A comprehensive guide to the latest consumer protection laws and how they affect your purchases.",
    author: "Michael Ross",
    date: "Jan 08, 2026",
    category: "Legal",
    image: "/images/blog-2.jpg"
  },
  {
    id: 3,
    title: "Top 10 Companies with Best Customer Service",
    excerpt: "We analyzed thousands of reviews to bring you the list of companies that truly care about their customers.",
    author: "ReportHere Team",
    date: "Jan 05, 2026",
    category: "Rankings",
    image: "/images/blog-3.jpg"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2C4A3B] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ReportHere Blog</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tips, guides, and insights to help you navigate the consumer world with confidence.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for blog image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                  <span className="text-sm font-medium">Image: {article.title}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wide mb-3">
                  {article.category}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#2C4A3B] hover:text-green-700 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Get the latest consumer tips and company rankings delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <button className="bg-[#2C4A3B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1e3329] transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
