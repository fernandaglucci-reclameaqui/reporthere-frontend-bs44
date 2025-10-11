import React from 'react';
import CompanyPublicProfile from './CompanyProfile';
import RouteProbe from "@/components/debug/RouteProbe";

// This file handles the /c/:slug route.
// It wraps the main CompanyProfile component with its own RouteProbe.
export default function CProfilePage() {
  return (
    <RouteProbe name="/c/:slug">
        <CompanyPublicProfile />
    </RouteProbe>
  );
}