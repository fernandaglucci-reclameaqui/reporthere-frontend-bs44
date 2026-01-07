import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminIntelligence() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState({
    complaintsCreated: 0,
    companiesClaimed: 0,
    companyReplies: 0,
    evidenceFlagged: 0,
    complaintsResolved: 0
  });
  const [events, setEvents] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState('all');

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const getTimeRangeDate = () => {
    const now = new Date();
    switch (timeRange) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const startDate = getTimeRangeDate().toISOString();

      // Load metrics from platform_events
      const { data: eventsData, error: eventsError } = await supabase
        .from('platform_events')
        .select('*')
        .gte('created_at', startDate)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      // Calculate metrics
      const newMetrics = {
        complaintsCreated: eventsData?.filter(e => e.event_type === 'complaint_created').length || 0,
        companiesClaimed: eventsData?.filter(e => e.event_type === 'company_claimed').length || 0,
        companyReplies: eventsData?.filter(e => e.event_type === 'company_replied').length || 0,
        evidenceFlagged: eventsData?.filter(e => e.event_type === 'evidence_flagged').length || 0,
        complaintsResolved: eventsData?.filter(e => e.event_type === 'complaint_resolved').length || 0
      };

      setMetrics(newMetrics);
      setEvents(eventsData || []);

      // Load watchlist
      await loadWatchlist();

    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWatchlist = async () => {
    try {
      // Detect repeated complaints by same user
      const { data: complaints, error: complaintsError } = await supabase
        .from('complaints')
        .select('user_id, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (complaintsError) throw complaintsError;

      // Count complaints per user
      const userCounts = {};
      complaints?.forEach(c => {
        if (c.user_id) {
          userCounts[c.user_id] = (userCounts[c.user_id] || 0) + 1;
        }
      });

      // Find users with 3+ complaints in 7 days
      const watchUsers = Object.entries(userCounts)
        .filter(([_, count]) => count >= 3)
        .map(([userId, count]) => ({
          entityType: 'user',
          identifier: userId,
          reason: 'Multiple complaints in short time',
          count,
          status: 'watching',
          lastActivity: new Date().toISOString()
        }));

      // Detect high-activity companies
      const { data: companyComplaints, error: companyError } = await supabase
        .from('complaints')
        .select('company_name, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (companyError) throw companyError;

      const companyCounts = {};
      companyComplaints?.forEach(c => {
        if (c.company_name) {
          companyCounts[c.company_name] = (companyCounts[c.company_name] || 0) + 1;
        }
      });

      // Find companies with 5+ complaints in 7 days
      const watchCompanies = Object.entries(companyCounts)
        .filter(([_, count]) => count >= 5)
        .map(([companyName, count]) => ({
          entityType: 'company',
          identifier: companyName,
          reason: 'High complaint volume',
          count,
          status: 'watching',
          lastActivity: new Date().toISOString()
        }));

      setWatchlist([...watchUsers, ...watchCompanies]);

    } catch (err) {
      console.error('Error loading watchlist:', err);
    }
  };

  const getEventBadgeColor = (eventType) => {
    const colors = {
      complaint_created: 'bg-blue-100 text-blue-700',
      company_claimed: 'bg-green-100 text-green-700',
      company_replied: 'bg-purple-100 text-purple-700',
      evidence_flagged: 'bg-red-100 text-red-700',
      complaint_resolved: 'bg-emerald-100 text-emerald-700',
      admin_claim_status_changed: 'bg-orange-100 text-orange-700',
      admin_credits_updated: 'bg-yellow-100 text-yellow-700'
    };
    return colors[eventType] || 'bg-slate-100 text-slate-700';
  };

  const getEventDescription = (event) => {
    const data = event.event_data || {};
    switch (event.event_type) {
      case 'complaint_created':
        return `Complaint created for ${data.company_name || 'company'}`;
      case 'company_claimed':
        return `Company ${data.company_id || ''} claimed profile`;
      case 'company_replied':
        return `Company replied to complaint #${data.complaint_id || ''}`;
      case 'evidence_flagged':
        return `Evidence flagged by admin`;
      case 'complaint_resolved':
        return `Complaint #${data.complaint_id || ''} resolved`;
      case 'admin_claim_status_changed':
        return `Claim status changed to ${data.new_status || ''}`;
      case 'admin_credits_updated':
        return `Credits updated for ${data.company_id || 'company'}`;
      default:
        return event.event_type;
    }
  };

  const filteredEvents = eventFilter === 'all' 
    ? events 
    : events.filter(e => e.event_type === eventFilter);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-slate-600">Loading intelligence dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Platform Intelligence</h1>
        <p className="mt-2 text-slate-600">Real-time metrics, audit trail, and abuse detection</p>
      </div>

      {/* Legal Notice */}
      <Alert className="mb-8 border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800">
          <strong>Admin Only:</strong> This dashboard is for observation and early detection. 
          No automatic blocking or content removal. All signals are internal and never visible to users.
        </AlertDescription>
      </Alert>

      {/* Time Range Selector */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700">Time Range:</span>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={loadDashboardData} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Complaints Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{metrics.complaintsCreated}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Companies Claimed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{metrics.companiesClaimed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Company Replies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{metrics.companyReplies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Evidence Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{metrics.evidenceFlagged}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Complaints Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{metrics.complaintsResolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Event Timeline (Audit Feed)</CardTitle>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="complaint_created">Complaints Created</SelectItem>
                <SelectItem value="company_claimed">Companies Claimed</SelectItem>
                <SelectItem value="company_replied">Company Replies</SelectItem>
                <SelectItem value="evidence_flagged">Evidence Flagged</SelectItem>
                <SelectItem value="complaint_resolved">Complaints Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredEvents.length === 0 && (
              <p className="py-8 text-center text-slate-500">No events in this time range</p>
            )}
            {filteredEvents.slice(0, 50).map((event) => (
              <div key={event.id} className="flex items-center gap-4 border-b border-slate-100 py-3 last:border-0">
                <div className="text-xs text-slate-500" style={{ minWidth: '140px' }}>
                  {new Date(event.created_at).toLocaleString()}
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-medium ${getEventBadgeColor(event.event_type)}`}>
                  {event.event_type.replace(/_/g, ' ')}
                </div>
                <div className="flex-1 text-sm text-slate-700">
                  {getEventDescription(event)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Watchlist */}
      <Card>
        <CardHeader>
          <CardTitle>Watchlist (Abuse Signals)</CardTitle>
          <p className="text-sm text-slate-600">
            Detected patterns for review. No automatic actions taken. Internal only.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {watchlist.length === 0 && (
              <p className="py-8 text-center text-slate-500">No patterns detected</p>
            )}
            {watchlist.map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.entityType === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.entityType}
                    </span>
                    <span className="font-medium text-slate-900">{item.identifier}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.reason}</p>
                  <p className="mt-1 text-xs text-slate-500">Count: {item.count} | Last activity: {new Date(item.lastActivity).toLocaleDateString()}</p>
                </div>
                <div className="ml-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === 'watching' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h4 className="font-semibold text-amber-900">Detection Rules</h4>
            <ul className="mt-2 space-y-1 text-sm text-amber-800">
              <li>• <strong>User watchlist:</strong> 3+ complaints in 7 days</li>
              <li>• <strong>Company watchlist:</strong> 5+ complaints in 7 days</li>
              <li>• <strong>No automatic actions:</strong> Signals are for review only</li>
              <li>• <strong>Neutral observation:</strong> No guilt, no labels, no blocking</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
