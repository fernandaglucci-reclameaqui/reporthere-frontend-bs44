import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-9xl font-black text-green-200">404</h1>
        <p className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link to={createPageUrl('Home')}>
            <Button className="bg-green-600 hover:bg-green-700">
              Go to Homepage
            </Button>
          </Link>
          <Link to={createPageUrl('companies')}>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Browse Companies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}