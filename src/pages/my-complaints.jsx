import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

/**
 * Consumer Dashboard - My Complaints
 * Simple, confidence-inspiring interface for consumers to track their complaints
 */

export default function MyComplaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'waiting', 'responded', 'resolved'

  useEffect(() => {
    if (user) {
      loadComplaints();
    }
  }, [user, filter]);

  async function loadComplaints() {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/complaints/my-complaints?filter=${filter}`);
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error loading complaints:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadge(status) {
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Waiting for Response' },
      under_review: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Under Review' },
      responded: { color: 'bg-green-100 text-green-800', icon: MessageSquare, label: 'Company Replied' },
      resolved: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle, label: 'Resolved' }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view your complaints.
            </p>
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Complaints</h1>
          <p className="text-gray-600">
            Track all your submitted complaints and company responses in one place.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'waiting' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('waiting')}
            >
              Waiting
            </Button>
            <Button
              variant={filter === 'responded' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('responded')}
            >
              Replied
            </Button>
            <Button
              variant={filter === 'resolved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('resolved')}
            >
              Resolved
            </Button>
          </div>

          {/* New Complaint Button */}
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/submit-complaint">
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </Link>
          </Button>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Complaints Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any complaints. Start by submitting your first one.
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/submit-complaint">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Complaint
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {complaint.company_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Case #{complaint.id} • {formatDate(complaint.created_date)}
                          </p>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {complaint.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {complaint.reply_count || 0} {complaint.reply_count === 1 ? 'reply' : 'replies'}
                        </span>
                        {complaint.category && (
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {complaint.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button asChild variant="outline">
                      <Link href={`/complaint/${complaint.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-blue-900 mb-2">ℹ️ How It Works</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Companies are notified immediately when you submit a complaint</li>
              <li>• You'll receive an email when the company responds</li>
              <li>• Response times and resolution quality are publicly visible</li>
              <li>• You can continue the conversation until your issue is resolved</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
