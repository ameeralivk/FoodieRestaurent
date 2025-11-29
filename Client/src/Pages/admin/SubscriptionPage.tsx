import React from "react";
import { Check } from "lucide-react";
import Admin_Navbar from "../../Components/Layouts/Admin_Navbar";
interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  badge?: string;
  buttonText: string;
  features: PlanFeature[];
  isEnterprise?: boolean;
}

const SubscriptionPlans: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Basic",
      price: "Free",
      period: "1 Month",
      buttonText: "Select",
      features: [
        { text: "Limited features" },
        { text: "Basic reporting" },
        { text: "Community support" },
      ],
    },
    {
      name: "6 Month",
      price: "₹750",
      period: "per month",
      badge: "Best Value",
      buttonText: "Select",
      features: [
        { text: "All Basic features" },
        { text: "Advanced reporting" },
        { text: "Priority support" },
        { text: "Custom branding" },
      ],
    },
    {
      name: "1 Year",
      price: "₹999",
      period: "per month",
      badge: "Best Value",
      buttonText: "Select",
      features: [
        { text: "All Basic features" },
        { text: "Advanced reporting" },
        { text: "Priority support" },
        { text: "Custom branding" },
      ],
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      buttonText: "Contact Sales",
      isEnterprise: true,
      features: [
        { text: "All Premium features" },
        { text: "Dedicated account manager" },
        { text: "Custom integrations" },
        { text: "White-glove onboarding" },
      ],
    },
  ];

  return (
    <>
      <Admin_Navbar role={"admin"} />
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-16 px-4">
        <div className="max-w-7xxl mx-auto">
          <div className="mb-8 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-700/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-green-400 mb-1">
                  Approval Successful!
                </h3>
                <p className="text-gray-300 text-base">
                  Your application has been approved. Please select a
                  subscription plan below to continue and unlock all features
                  for your restaurant.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">
              Subscription Plans
            </h1>
            <p className="text-gray-400 text-lg">
              Choose the plan that best fits your restaurant's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gradient-to-b ${
                  plan.isEnterprise
                    ? "from-neutral-800 to-neutral-900"
                    : "from-neutral-800 to-neutral-900"
                } rounded-xl p-6 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 flex flex-col`}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white text-xl font-semibold">
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span className="bg-yellow-500 text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-white text-4xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm ml-2">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all duration-300 ${
                    plan.isEnterprise
                      ? "bg-neutral-700 text-white hover:bg-neutral-600"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start mb-3">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlans;
