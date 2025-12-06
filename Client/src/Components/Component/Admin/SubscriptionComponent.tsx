import React, { useState, useRef } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

const AdminSubscriptionPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: billingCycle === "monthly" ? 29 : 290,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { text: "Up to 5 tables", included: true },
        { text: "Basic QR code generation", included: true },
        { text: "Order management", included: true },
        { text: "Basic analytics", included: true },
        { text: "Email support", included: true },
        { text: "Custom branding", included: false },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: billingCycle === "monthly" ? 79 : 790,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { text: "Up to 20 tables", included: true },
        { text: "Advanced QR customization", included: true },
        { text: "Order management", included: true },
        { text: "Advanced analytics & reports", included: true },
        { text: "Priority support", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingCycle === "monthly" ? 199 : 1990,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { text: "Unlimited tables", included: true },
        { text: "Full QR customization", included: true },
        { text: "Real-time analytics", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Multiple locations", included: true },
      ],
    },
    {
      id: "enterprise2",
      name: "Enterprise Plus",
      price: billingCycle === "monthly" ? 299 : 2990,
      period: billingCycle === "monthly" ? "/month" : "/year",
      features: [
        { text: "Unlimited tables", included: true },
        { text: "AI-powered insights", included: true },
        { text: "Team access", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Enterprise-level security", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-gray-400 mb-6">
          Choose the plan that fits your business.
        </p>

        {/* Billing cycle buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg border border-gray-700 ${
              billingCycle === "monthly"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-lg border border-gray-700 ${
              billingCycle === "yearly"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300"
            }`}
          >
            Yearly
          </button>
        </div>

        {plans.length > 3 && (
          <>
            {/* LEFT ARROW */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] p-2 rounded-full border border-gray-700 hover:bg-gray-800 z-10 mt-15"
            >
              <ChevronLeft size={45} />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] p-2 rounded-full border border-gray-700 hover:bg-gray-800 z-10 mt-15"
            >
              <ChevronRight size={45} />
            </button>
          </>
        )}

        {/* Scrollable Plans */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 min-w-max pb-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-[#1a1a1a] w-80 p-6 rounded-lg border border-gray-800 flex-shrink-0"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

                <p className="text-3xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </p>

                <hr className="my-4 border-gray-800" />

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {f.included ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600" />
                      )}
                      <span
                        className={
                          f.included ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-2 rounded-lg border border-gray-700 font-semibold transition ${
                    selectedPlan === plan.id
                      ? "bg-white text-black"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionPlans;
