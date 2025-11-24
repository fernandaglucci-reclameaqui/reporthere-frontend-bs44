import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, Zap, TrendingUp, Rocket, Crown, Building2 } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: '$0',
      period: 'month',
      color: 'blue',
      users: '1 User',
      responses: '2 Complaint Responses / month',
      features: [
        'Public business profile',
        'View all complaints',
        'Basic dashboard',
        'Customer Karma overview (limited)'
      ],
      locked: [
        'Unlimited responses',
        'Advanced analytics',
        'Sentiment trends',
        'Exports',
        'SLA',
        'Multi-location',
        'Priority support'
      ],
      cta: 'Get Started Free',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Starter',
      icon: TrendingUp,
      price: '$49',
      period: 'month',
      color: 'green',
      users: '1 User',
      responses: '20 Complaint Responses / month',
      features: [
        'Everything in Free',
        'Customer Karma (basic)',
        'Basic analytics',
        '"Responsive Business" badge'
      ],
      locked: [
        'Advanced analytics',
        'Sentiment trends',
        'Export data',
        'Multi-user',
        'Multi-location'
      ],
      cta: 'Upgrade to Starter',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Growth',
      icon: Rocket,
      price: '$149',
      period: 'month',
      color: 'orange',
      users: '3 Users',
      responses: '100 Complaint Responses / month',
      features: [
        'Everything in Starter',
        'Advanced Customer Karma',
        'Sentiment trends',
        'SLA tracking',
        'Data export (CSV / PDF)',
        'Multi-user dashboard'
      ],
      locked: [
        'Multi-location advanced',
        'Priority support',
        'Enterprise reporting'
      ],
      cta: 'Upgrade to Growth',
      ctaLink: '/signup',
      popular: true
    },
    {
      name: 'Pro',
      icon: Crown,
      price: '$399',
      period: 'month',
      color: 'red',
      users: '6 Users',
      responses: '300 Complaint Responses / month',
      features: [
        'Everything in Growth',
        'Multi-location support',
        'Advanced reports',
        'Monthly performance summaries',
        'Priority email support'
      ],
      locked: [
        'Unlimited complaints',
        'API',
        'Dedicated account manager',
        'Enterprise infra'
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: 'month',
      color: 'purple',
      users: 'Custom Users',
      responses: '300+ Complaint Responses / month',
      features: [
        'Everything in Pro',
        'Unlimited or custom response volume',
        'API access (when released)',
        'Dedicated account manager',
        'Custom reporting',
        'Multi-location advanced',
        'Priority infrastructure + storage',
        'SLA guarantee'
      ],
      locked: [],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false
    }
  ];

  const colorClasses = {
    blue: {
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      text: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700'
    },
    orange: {
      border: 'border-orange-200',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700'
    },
    red: {
      border: 'border-red-200',
      bg: 'bg-red-50',
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    },
    purple: {
      border: 'border-purple-200',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  };

  const handleCTA = (plan) => {
    navigate(plan.ctaLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h1>
          <p className="text-2xl text-gray-700 font-light mb-2">
            Choose the perfect plan for your business
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include access to our platform and basic features.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {plans.map((plan, index) => {
            const colors = colorClasses[plan.color];
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-sm border-2 ${plan.popular ? 'border-emerald-500 shadow-lg scale-105' : colors.border} hover:shadow-xl transition-all relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Header */}
                  <div className={`${colors.bg} rounded-lg p-4 mb-6`}>
                    <plan.icon className={`w-10 h-10 ${colors.text} mx-auto mb-3`} />
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== 'Custom' && (
                        <span className="text-gray-600"> / {plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Users & Responses */}
                  <div className="mb-6 text-center">
                    <p className="text-sm font-semibold text-gray-700">{plan.users}</p>
                    <p className="text-sm text-gray-600">{plan.responses}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-3 text-sm">Included:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Locked Features */}
                  {plan.locked.length > 0 && (
                    <div className="mb-6">
                      <p className="font-semibold text-gray-900 mb-3 text-sm">Locked Features:</p>
                      <ul className="space-y-2">
                        {plan.locked.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCTA(plan)}
                    className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Have questions about pricing?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Check out our FAQ or contact our sales team for more information.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/faq" 
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              View FAQ
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Pricing;
