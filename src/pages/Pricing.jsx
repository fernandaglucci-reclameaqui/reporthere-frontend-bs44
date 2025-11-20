import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Building2, Rocket, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for small businesses just starting out',
      features: [
        'Claim your business profile',
        'Respond to up to 5 complaints/month',
        'Basic company dashboard',
        'Email notifications',
        'Public profile page',
      ],
      limitations: [
        'Limited to 5 responses per month',
        'No priority support',
        'No advanced analytics',
      ],
      cta: 'Get Started Free',
      ctaLink: '/signup',
      popular: false,
      color: 'gray',
    },
    {
      name: 'Basic',
      icon: Building2,
      price: { monthly: 29, annual: 290 },
      description: 'For growing businesses that need more engagement',
      features: [
        'Everything in Free',
        'Respond to up to 50 complaints/month',
        'Advanced analytics dashboard',
        'Priority email support',
        'Custom response templates',
        'Complaint trend analysis',
        'Export complaint data',
      ],
      limitations: [
        'Limited to 50 responses per month',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=basic',
      popular: false,
      color: 'blue',
    },
    {
      name: 'Pro',
      icon: Rocket,
      price: { monthly: 79, annual: 790 },
      description: 'For established businesses with high volume',
      features: [
        'Everything in Basic',
        'Unlimited complaint responses',
        'Advanced reputation management',
        'AI-powered response suggestions',
        'Multi-user team access (up to 5 users)',
        'Priority phone support',
        'Custom branding on profile',
        'API access',
        'Dedicated account manager',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=pro',
      popular: true,
      color: 'green',
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'White-label solution',
        'Custom integrations',
        'Dedicated support team',
        'SLA guarantee',
        'Custom training',
        'Advanced security features',
        'Custom analytics & reporting',
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false,
      color: 'purple',
    },
  ];

  const savings = (plan) => {
    if (typeof plan.price.annual === 'number' && typeof plan.price.monthly === 'number') {
      const annualCost = plan.price.monthly * 12;
      const saved = annualCost - plan.price.annual;
      const percentage = Math.round((saved / annualCost) * 100);
      return { amount: saved, percentage };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that's right for your business
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                billingCycle === 'annual' ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <Badge variant="success" className="ml-2 bg-green-100 text-green-800">
                Save up to 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
            const savingsInfo = billingCycle === 'annual' ? savings(plan) : null;

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular
                    ? 'border-green-500 border-2 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full bg-${plan.color}-100`}>
                      <PlanIcon className={`w-8 h-8 text-${plan.color}-600`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      {typeof price === 'number' ? (
                        <>
                          <span className="text-4xl font-bold text-gray-900">${price}</span>
                          <span className="text-gray-500 ml-2">
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900">{price}</span>
                      )}
                    </div>
                    {savingsInfo && savingsInfo.amount > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${savingsInfo.amount}/year ({savingsInfo.percentage}% off)
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={`limit-${index}`} className="flex items-start">
                        <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link to={plan.ctaLink} className="w-full">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if I exceed my plan limits?</h3>
              <p className="text-gray-600">
                We'll notify you when you're approaching your limits. You can upgrade at any time to continue responding to complaints without interruption.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Absolutely. You can cancel your subscription at any time with no penalties. Your access will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to improve your reputation?</h2>
          <p className="text-xl text-gray-600 mb-6">
            Join thousands of businesses using ReportHere to build trust with customers
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
