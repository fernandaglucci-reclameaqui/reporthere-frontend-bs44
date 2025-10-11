
import React, { useState } from "react";
import { Company } from "@/api/entities";
import { ExtractDataFromUploadedFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { slugify } from "../components/utils/slug";

const fileSources = [
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/d86ad4fc0_100usautomotive.pdf", name: "US Automotive Tech" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/1cdd4eca0_100usautomobile.pdf", name: "US Automobile Brands" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/070405ad4_100usartsnentertainement.pdf", name: "US Arts & Entertainment" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/9fc1c88d8_100usairlines.pdf", name: "US Airlines & Travel" },
];

const extractionSchema = {
  type: "object",
  properties: {
    companies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          website: { type: "string" },
          email: { type: "string" },
          industry_text: { "type": "string", "description": "The raw industry text from the 'industry' column, for example: Automotive Tech US" },
          description: { type: "string" }
        },
        required: ["name", "website", "email", "industry_text", "description"]
      }
    }
  }
};

export default function DataImport() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready to import company data from PDF files.");

  const mapIndustry = (industryText) => {
    const text = industryText.toLowerCase();
    if (text.includes("automotive")) return "automotive";
    if (text.includes("art") || text.includes("entertainment")) return "entertainment";
    if (text.includes("travel") || text.includes("airlines")) return "travel_hospitality";
    return "other";
  };
  
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (e) {
      return null;
    }
  };

  const handleImport = async () => {
    setLoading(true);
    let allCompanies = [];

    for (const source of fileSources) {
      try {
        setStatus(`Extracting data from ${source.name}...`);
        const result = await ExtractDataFromUploadedFile({
          file_url: source.url,
          json_schema: extractionSchema,
        });

        if (result.status === "success" && result.output.companies) {
          allCompanies = [...allCompanies, ...result.output.companies];
        } else {
          setStatus(`Error extracting from ${source.name}: ${result.details}`);
          setLoading(false);
          return;
        }
      } catch (error) {
        setStatus(`An unexpected error occurred with ${source.name}: ${error.message}`);
        setLoading(false);
        return;
      }
    }

    if (allCompanies.length > 0) {
      setStatus(`Formatting ${allCompanies.length} records for database insertion...`);
      const formattedCompanies = allCompanies.map(c => ({
        name: c.name,
        website: c.website,
        email: c.email.split(',')[0].trim(),
        industry: mapIndustry(c.industry_text),
        description: c.description,
        primary_domain: getDomain(c.website),
        slug: slugify(c.name)
      }));

      try {
        setStatus("Inserting records into the database... This may take a moment.");
        await Company.bulkCreate(formattedCompanies);
        setStatus(`Successfully imported ${formattedCompanies.length} companies! You can now navigate away from this page.`);
      } catch (error) {
        setStatus(`Error inserting data into database: ${error.message}`);
      }
    } else {
      setStatus("No companies were extracted from the files.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UploadCloud className="w-6 h-6 text-green-600" />
              <CardTitle>Company Data Import</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Click the button below to start the one-time process of importing company data from the provided PDF files into the database.
            </p>
            <Button
              onClick={handleImport}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Importing, please wait..." : "Start Import Process"}
            </Button>
            <div className="mt-4 p-4 bg-gray-100 rounded-md border">
              <p className="text-sm font-semibold text-gray-800">Status:</p>
              <p className="text-sm text-gray-600 mt-1">{status}</p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              This is a one-time operation. This page can be removed after the import is successful.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
