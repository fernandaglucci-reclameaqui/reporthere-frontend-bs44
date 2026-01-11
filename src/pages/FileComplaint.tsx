import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";

export default function FileComplaint() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container max-w-2xl py-12">
          <Card className="border-emerald-100 bg-emerald-50">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">Complaint Submitted Successfully</h2>
              <p className="text-emerald-700">
                Your complaint has been filed and sent to the company. You will receive an email confirmation shortly.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Button variant="outline" className="bg-white" onClick={() => window.location.href = '/consumers'}>
                  View My Dashboard
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => window.location.href = '/'}>
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-3xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File a Complaint</h1>
          <p className="text-gray-500">
            Share your experience to help others and get a resolution.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`h-2 w-12 rounded-full ${
                      step >= i ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Step {step} of 3</span>
            </div>
            <CardTitle>
              {step === 1 && "Company & Issue Details"}
              {step === 2 && "Your Contact Information"}
              {step === 3 && "Review & Submit"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us what happened and who is involved."}
              {step === 2 && "How can the company contact you to resolve this?"}
              {step === 3 && "Please verify your information before submitting."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" placeholder="e.g. Amazon, Walmart..." required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Complaint Title *</Label>
                    <Input id="title" placeholder="Briefly summarize the issue" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide detailed information about what happened..." 
                      className="min-h-[150px]"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Evidence (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files here, or click to upload
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Images, PDF, or receipts (Max 5MB)
                      </p>
                    </div>
                  </div>

                  <Button type="button" className="w-full" onClick={() => setStep(2)}>
                    Next: Contact Info
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="button" className="w-full" onClick={() => setStep(3)}>
                      Next: Review
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg flex gap-3 border border-blue-100">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Public Visibility</p>
                      <p>
                        Your complaint title and description will be public. Your contact information (email, phone) will remain private and only shared with the company for resolution purposes.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and confirm that this complaint is truthful and about a genuine customer experience.
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Complaint"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
