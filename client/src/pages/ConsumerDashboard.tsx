import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";

export default function ConsumerDashboard() {
  // Mock data for consumer's complaints
  const myComplaints = [
    {
      id: "C-1023",
      company: "Amazon",
      title: "Package never arrived despite 'Delivered' status",
      date: "2024-01-10",
      status: "In Progress",
      responses: 1,
      lastUpdate: "2 hours ago"
    },
    {
      id: "C-0998",
      company: "Uber Eats",
      title: "Wrong order delivered and refused refund",
      date: "2024-01-05",
      status: "Resolved",
      responses: 2,
      lastUpdate: "3 days ago"
    }
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500">Manage your complaints and track resolutions.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => window.location.href = '/file-complaint'}>
            <Plus className="h-4 w-4 mr-2" />
            File New Complaint
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle>My Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myComplaints.map((complaint) => (
                <div key={complaint.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">#{complaint.id}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs font-medium text-gray-500">{complaint.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Filed against <span className="font-medium text-gray-900">{complaint.company}</span></p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> {complaint.responses} responses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Updated {complaint.lastUpdate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                    <Badge className={
                      complaint.status === 'Resolved' 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }>
                      {complaint.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
