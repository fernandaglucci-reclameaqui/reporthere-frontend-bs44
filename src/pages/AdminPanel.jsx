import React, { useState, useEffect } from 'react';
import { Complaint } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff,
  Flag,
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    flagged: 0,
    resolved: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [searchQuery, filterStatus, complaints]);

  const loadData = async () => {
    setLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Check if user is admin (you'll need to add admin role to your schema)
      if (user.user_type !== 'admin') {
        window.location.href = createPageUrl('');
        return;
      }

      // Load all complaints for moderation
      const allComplaints = await Complaint.list({ limit: 1000 });
      setComplaints(allComplaints);

      // Calculate stats
      const stats = {
        total: allComplaints.length,
        pending: allComplaints.filter(c => c.status === 'pending' || c.status === 'open').length,
        flagged: allComplaints.filter(c => c.is_flagged).length,
        resolved: allComplaints.filter(c => c.status === 'resolved').length
      };
      setStats(stats);

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = [...complaints];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'flagged') {
        filtered = filtered.filter(c => c.is_flagged);
      } else if (filterStatus === 'pending') {
        filtered = filtered.filter(c => c.status === 'pending' || c.status === 'open');
      } else {
        filtered = filtered.filter(c => c.status === filterStatus);
      }
    }

    setFilteredComplaints(filtered);
  };

  const handleToggleVisibility = async (complaintId, currentVisibility) => {
    try {
      await Complaint.update(complaintId, { is_public: !currentVisibility });
      loadData();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const handleToggleFlag = async (complaintId, currentFlag) => {
    try {
      await Complaint.update(complaintId, { is_flagged: !currentFlag });
      loadData();
    } catch (error) {
      console.error('Error toggling flag:', error);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (!confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
      return;
    }

    try {
      await Complaint.delete(complaintId);
      loadData();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  // Wave 2.4: Evidence flagging controls
  const handleFlagEvidence = async (complaintId, currentFlag) => {
    try {
      await Complaint.update(complaintId, { evidence_flagged: !currentFlag });
      loadData();
    } catch (error) {
      console.error('Error flagging evidence:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!currentUser || currentUser.user_type !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>Access Denied: Admin privileges required</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Moderation Panel</h1>
          </div>
          <p className="text-gray-600">Manage and moderate complaints across the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Flagged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.flagged}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === 'flagged' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('flagged')}
                  size="sm"
                >
                  Flagged
                </Button>
                <Button
                  variant={filterStatus === 'resolved' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('resolved')}
                  size="sm"
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No complaints found matching your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map(complaint => (
              <Card key={complaint.id} className={complaint.is_flagged ? 'border-red-300 bg-red-50' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">
                          <Link 
                            to={createPageUrl(`complaint/${complaint.id}`)}
                            className="hover:text-green-600"
                          >
                            {complaint.title}
                          </Link>
                        </CardTitle>
                        {complaint.is_flagged && (
                          <Badge variant="destructive" className="gap-1">
                            <Flag className="w-3 h-3" />
                            Flagged
                          </Badge>
                        )}
                        {!complaint.is_public && (
                          <Badge variant="secondary" className="gap-1">
                            <EyeOff className="w-3 h-3" />
                            Hidden
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        Company: {complaint.company_name} | 
                        Status: <span className="capitalize">{complaint.status}</span> | 
                        Filed: {new Date(complaint.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleVisibility(complaint.id, complaint.is_public)}
                      >
                        {complaint.is_public ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Show
                          </>
                        )}
                      </Button>
                      <Button
                        variant={complaint.is_flagged ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleFlag(complaint.id, complaint.is_flagged)}
                      >
                        <Flag className="w-4 h-4 mr-1" />
                        {complaint.is_flagged ? 'Unflag' : 'Flag'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteComplaint(complaint.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">{complaint.description}</p>
                  
                  {/* Wave 2.4: Evidence Reference Display for Admins */}
                  {(complaint.evidence_type || complaint.evidence_description || complaint.evidence_link) && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Evidence Referenced:</p>
                          {complaint.evidence_type && (
                            <p className="text-xs text-gray-600">Type: <span className="capitalize">{complaint.evidence_type}</span></p>
                          )}
                          {complaint.evidence_description && (
                            <p className="text-xs text-gray-600">Description: {complaint.evidence_description.substring(0, 100)}...</p>
                          )}
                          {complaint.evidence_link && (
                            <p className="text-xs text-gray-600">Link: <a href={complaint.evidence_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{complaint.evidence_link.substring(0, 50)}...</a></p>
                          )}
                        </div>
                        <Button
                          variant={complaint.evidence_flagged ? 'destructive' : 'outline'}
                          size="sm"
                          onClick={() => handleFlagEvidence(complaint.id, complaint.evidence_flagged)}
                          className="shrink-0"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {complaint.evidence_flagged ? 'Unflag Evidence' : 'Flag Evidence'}
                        </Button>
                      </div>
                      {complaint.evidence_flagged && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertDescription className="text-xs">
                            Evidence has been flagged by admin. This complaint may contain questionable evidence references.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
