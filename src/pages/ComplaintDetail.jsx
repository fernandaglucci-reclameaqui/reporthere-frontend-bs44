
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Complaint } from "@/api/entities";
import { Company } from "@/api/entities";
import { User } from "@/api/entities"; // Import User entity
import BusinessReplyForm from "@/components/complaints/BusinessReplyForm"; // Import BusinessReplyForm
import SentimentSelectionModal from "@/components/complaints/SentimentSelectionModal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building2, User as UserIcon, Clock, AlertCircle, ArrowLeft, FileText, CheckCircle, ShieldCheck } from "lucide-react"; // Rename User to UserIcon, add ShieldCheck
import AIComplaintSummary from "@/components/ai/AIComplaintSummary";
import AIRiskFlag from "@/components/ai/AIRiskFlag";
import SocialShareButtons from "@/components/social/SocialShareButtons";

const Skeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-12 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {error === "Complaint not found" ? "Complaint Not Found" : "Something Went Wrong"}
      </h2>
      <p className="text-gray-600 mb-6">
        {error === "Complaint not found" 
          ? "The complaint you're looking for doesn't exist or may have been removed."
          : "We encountered an error loading this complaint. Please try again."
        }
      </p>
      <div className="space-x-4">
        <Button onClick={onRetry} className="bg-green-600 hover:bg-green-700">
          Try Again
        </Button>
        <Link to={createPageUrl("complaints")}>
          <Button variant="outline">Browse All Complaints</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default function ComplaintDetail() {
  const location = useLocation(); // Keep location for handleRetry in ErrorState if user refreshes before new logic loads
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [complaint, setComplaint] = useState(null);
  const [company, setCompany] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCompanyMember, setIsCompanyMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSentimentModal, setShowSentimentModal] = useState(false);

  const updateMetaTags = (complaintData) => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', complaintData.description.substring(0, 160) + (complaintData.description.length > 160 ? '...' : ''));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', complaintData.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', complaintData.description.substring(0, 160) + (complaintData.description.length > 160 ? '...' : ''));
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/550231a20_transparentshield.png');
  }

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setIsCompanyMember(false); // Reset on new load

    try {
      // Try to get ID from query parameter first, then from path parameter
      const id = searchParams.get('id') || params.id;
      if (!id) {
        throw new Error("No complaint ID provided");
      }

      // Set document title and meta for crawlers early
      document.title = `Complaint Details | ReportHere`;

      const [complaintData, user] = await Promise.all([
        Complaint.get(id),
        User.me().catch(() => null) // Fetch current user, handle error gracefully
      ]);
      
      setComplaint(complaintData);
      setCurrentUser(user);
      
      document.title = `${complaintData.title} | ReportHere`;

      if (complaintData.company_id) {
        try {
          const companyData = await Company.get(complaintData.company_id);
          setCompany(companyData);
          // Update SEO meta tags with complaint and company data
          updateMetaTags(complaintData, companyData);
          // Check if current user is a business member and claims this company
          if (user && user.user_type === 'business' && companyData.claimed_by && companyData.claimed_by.includes(user.id)) {
            setIsCompanyMember(true);
          }
        } catch (err) {
          // If company fetch fails, continue without it
          console.warn("Failed to load company data:", err);
        }
      }
    } catch (err) {
      console.error("Error loading complaint:", err);
      setError(err.message === "No complaint ID provided" ? "No complaint specified" : "Complaint not found");
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    loadData();
  }, [params.id]);

  const handleRetry = () => {
    loadData(); // Re-fetch data
  };

  const handleReplySuccess = (updatedComplaint) => {
    setComplaint(updatedComplaint);
    // If complaint is now resolved and user hasn't selected sentiment yet, show modal
    if (updatedComplaint.status === 'resolved' && !updatedComplaint.customer_sentiment && currentUser && currentUser.id === updatedComplaint.user_id) {
      setShowSentimentModal(true);
    }
  };

  const handleSentimentSelected = async (sentiment) => {
    try {
      // Update complaint with sentiment
      const updated = await Complaint.update(complaint.id, {
        customer_sentiment: sentiment,
        resolved_at: new Date().toISOString()
      });
      setComplaint(updated);
      setShowSentimentModal(false);
    } catch (err) {
      console.error('Failed to save sentiment:', err);
      alert('Failed to save your feedback. Please try again.');
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  if (!complaint) {
    // This case should ideally be caught by error state if loadData fails to fetch complaint.
    // However, it's a good fallback.
    return <ErrorState error="Complaint not found" onRetry={handleRetry} />;
  }
    
  const companyLink = company ? createPageUrl(`company/${company.slug}`) : createPageUrl('companies');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      case 'responded':
        return <Badge className="bg-blue-100 text-blue-800">Response Received</Badge>;
      case 'published':
        return <Badge className="bg-yellow-100 text-yellow-800">Published</Badge>;
      case 'submitted':
        return <Badge className="bg-gray-100 text-gray-800">Under Review</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{status.replace(/_/g, ' ')}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-start gap-4">
          <div>
          <Link to={createPageUrl("complaints")}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Complaints
            </Button>
          </Link>
          </div>
          
          <SocialShareButtons
            url={window.location.href}
            title={`A consumer shared an experience with ${complaint.company_name}`}
            description="Consumer feedback shared on ReportHere. This reflects the user's personal experience."
            hashtags={['ConsumerFeedback', 'ReportHere']}
          />
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{complaint.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span>
                Company: <Link to={companyLink} className="font-medium text-green-600 hover:underline">{complaint.company_name}</Link>
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>Status: {getStatusBadge(complaint.status)}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Filed: {new Date(complaint.created_at).toLocaleDateString()}</span>
              {complaint.amount_involved && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Amount: ${complaint.amount_involved.toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Consumer Complaint */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-600" />
                Consumer's Complaint
              </CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3" />
                Filed on {new Date(complaint.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Neutral Disclaimer - Wave 2.2 */}
              <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <p className="text-xs text-blue-800">
                  <ShieldCheck className="w-4 h-4 inline mr-1" />
                  <strong>Disclaimer:</strong> This complaint reflects the consumer's personal experience. 
                  ReportHere does not verify, investigate, or confirm the accuracy of claims made by users.
                </p>
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap mb-4">{complaint.description}</p>
              
              {/* AI-Generated Summary */}
              <div className="mt-4">
                <AIComplaintSummary complaint={complaint} autoGenerate={true} />
              </div>

              {/* AI Risk Assessment (for company members) */}
              {isCompanyMember && (
                <div className="mt-4">
                  <AIRiskFlag complaint={complaint} autoAnalyze={true} />
                </div>
              )}
              
              {/* Evidence References - Wave 2.1 */}
              {(complaint.evidence_type || complaint.evidence_description || complaint.evidence_link) && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Evidence Referenced
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {complaint.evidence_type && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Type:</span>{' '}
                        <span className="text-gray-600 capitalize">{complaint.evidence_type}</span>
                      </p>
                    )}
                    {complaint.evidence_description && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Description:</span>{' '}
                        <span className="text-gray-600">{complaint.evidence_description}</span>
                      </p>
                    )}
                    {complaint.evidence_link && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Link:</span>{' '}
                        <a href={complaint.evidence_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                          {complaint.evidence_link}
                        </a>
                      </p>
                    )}
                    <p className="text-xs text-gray-500 italic mt-2">
                      Note: Evidence references are provided by the consumer and not verified by ReportHere.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Response */}
          {complaint.business_response ? (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <ShieldCheck className="w-5 h-5" />
                  Verified Business Response
                </CardTitle>
                {complaint.business_response_date && (
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3" />
                    Responded on {new Date(complaint.business_response_date).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-wrap">{complaint.business_response}</p>
              </CardContent>
            </Card>
          ) : isCompanyMember ? (
             <BusinessReplyForm 
                complaint={complaint} 
                company={company}
                onReplySuccess={handleReplySuccess}
              />
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-500">
                  <Building2 className="w-5 h-5" />
                  Awaiting Company Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The company has not yet responded to this complaint.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link to={createPageUrl(`FileComplaint?company=${encodeURIComponent(complaint.company_name)}&company_id=${complaint.company_id}`)}>
            <Button className="bg-green-600 hover:bg-green-700">
              File Another Complaint
            </Button>
          </Link>
          <Link to={companyLink}>
            <Button variant="outline">
              View Company Profile
            </Button>
          </Link>
        </div>

      {/* Sentiment Selection Modal */}
      {showSentimentModal && (
        <SentimentSelectionModal
          isOpen={showSentimentModal}
          onClose={() => setShowSentimentModal(false)}
          onSelect={handleSentimentSelected}
          complaintTitle={complaint.title}
        />
      )}
    </div>
  );
}
