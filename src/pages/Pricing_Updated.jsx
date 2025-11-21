// This file contains the updated Pricing page with Stripe integration
// Replace your current Pricing.jsx with this content after adding Stripe API keys

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Zap, Building2, Rocket, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createCheckoutSession } from '../services/stripeService';
import { User } from '@/api/entities';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(null);

  // Stripe Price IDs - REPLACE THESE with your actual Stripe price IDs after creating products
  const STRIPE_PRICE_IDS = {
    basic_monthly: 'price_basic_monthly', // Replace with actual Stripe price ID
    basic_annual: 'price_basic_annual',   // Replace with actual Stripe price ID
    pro_monthly: 'price_pro_monthly',     // Replace with actual Stripe price ID
    pro_annual: 'price_pro_annual',       // Replace with actual Stripe price ID
  };

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
      popular: false,
      color: 'gray',
      stripePriceId: null,
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
      cta: 'Subscribe Now',
      popular: false,
      color: 'blue',
      stripePriceId: {
        monthly: STRIPE_PRICE_IDS.basic_monthly,
        annual: STRIPE_PRICE_IDS.basic_annual,
      },
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
      cta: 'Subscribe Now',
      popular: true,
      color: 'green',
      stripePriceId: {
        monthly: STRIPE_PRICE_IDS.pro_monthly,
        annual: STRIPE_PRICE_IDS.pro_annual,
      },
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
      popular: false,
      color: 'purple',
      stripePriceId: null,
    },
  ];

  const handleSubscribe = async (plan) => {
    setLoading(plan.name);

    try {
      // Check if user is logged in
      const user = await User.me().catch(() => null);

      if (!user) {
        // Redirect to signup with plan parameter
        navigate(`/signup?plan=${plan.name.toLowerCase()}`);
        return;
      }

      // Get the appropriate price ID based on billing cycle
      const priceId = billingCycle === 'monthly' 
        ? plan.stripePriceId.monthly 
        : plan.stripePriceId.annual;

      // Create Stripe checkout session
      const checkoutUrl = await createCheckoutSession(
        priceId,
        user.email,
        user.id
      );

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  const handleCTA = (plan) => {
    if (plan.name === 'Free') {
      navigate('/signup');
    } else if (plan.name === 'Enterprise') {
      navigate('/contact');
    } else {
      handleSubscribe(plan);
    }
  };

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
            const isLoading = loading === plan.name;

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
                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
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
                  <Button
                    onClick={() => handleCTA(plan)}
                    disabled={isLoading}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 mb-16">
          <p className="text-gray-600 mb-4">💳 Secure payment powered by Stripe</p>
          <p className="text-sm text-gray-500">
            ✅ 30-day money-back guarantee • ✅ Cancel anytime • ✅ No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
