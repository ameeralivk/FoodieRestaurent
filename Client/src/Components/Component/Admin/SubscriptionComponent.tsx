import React, { useState, useRef, useEffect } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ISubscriptionPlan } from "../../../services/planService";
import { getAllPlan, makePayment } from "../../../services/planService";
import LoadingCard from "../../Elements/Reusable/CardLoading";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
const AdminSubscriptionPlans: React.FC = () => {
  const restuarentId = useSelector(
    (state: RootState) => state.auth.admin?._id as string
  );
  const [plan, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [fullplan, setFullPlan] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    Id: string | null;
    amount: number | null;
  }>({ Id: "", amount: null });
  const [openModal, setOpenModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  ); // <- new state

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handlePayment = async (plan: { Id: string | null; amount: number | null }) => {
    try {
      const res = await makePayment(
        plan.amount,
        restuarentId,
        plan.Id
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
    `x`;
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllPlan();
      await new Promise((res) => setTimeout(res, 300));
      setFullPlan(response.data.data);

      // Filter initial monthly plans
      const monthlyPlans = response.data.data.filter((p: ISubscriptionPlan) => {
        const day = p.duration.split(" ")[0];
        return Number(day) < 364 && p.duration != "1 Year"; // monthly < 1 year
      });
      setPlans(monthlyPlans);
    } catch (error) {
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleBillingCycle = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    setLoading(true);

    setTimeout(() => {
      const filteredPlans = fullplan.filter((p) => {
        const [value, unit] = p.duration.split(" ");
        const num = Number(value);

        if (cycle === "monthly") {
          return (
            (unit.toLowerCase().includes("day") && num < 365) ||
            (unit.toLowerCase().includes("month") && num * 30 < 365)
          );
        } else {
          return (
            unit.toLowerCase().includes("year") ||
            (unit.toLowerCase().includes("day") && num >= 365) ||
            (unit.toLowerCase().includes("month") && num * 30 >= 365)
          );
        }
      });

      setPlans(filteredPlans);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-6xl mx-auto relative">
        <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-gray-400 mb-6">
          Choose the plan that fits your business.
        </p>

        {/* Billing cycle buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => handleBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg border border-gray-700 ${
              billingCycle === "monthly"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => handleBillingCycle("yearly")}
            className={`px-6 py-2 rounded-lg border border-gray-700 ${
              billingCycle === "yearly"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300"
            }`}
          >
            Yearly
          </button>
        </div>
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
              {/* Close button */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* <Elements stripe={stripePromise}>
                <CheckoutForm closeModal={() => setOpenModal(false)} amount={selectedPlan.amount} />
              </Elements> */}
            </div>
          </div>
        )}
        {plan.length > 3 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] p-2 rounded-full border border-gray-700 hover:bg-gray-800 z-10 mt-15"
            >
              <ChevronLeft size={45} />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] p-2 rounded-full border border-gray-700 hover:bg-gray-800 z-10 mt-15"
            >
              <ChevronRight size={45} />
            </button>
          </>
        )}

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 min-w-max pb-4">
            {loading
              ? [...Array(3)].map((_, i) => <LoadingCard key={i} />)
              : plan.map((plan) => (
                  <div
                    key={plan._id}
                    className="bg-[#1a1a1a] w-80 p-6 rounded-lg border border-gray-800 flex-shrink-0"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {plan.planName}
                    </h3>

                    <p className="text-3xl font-bold">
                      ₹{plan.price}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        {plan.duration}
                      </span>
                    </p>

                    <hr className="my-4 border-gray-800" />

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {f.length ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600" />
                          )}
                          <span
                            className={
                              f.length ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        setSelectedPlan({ Id: plan._id, amount: plan.price });
                        handlePayment({ Id: plan._id, amount: plan.price });
                      }}
                      className={`w-full py-2 rounded-lg border border-gray-700 font-semibold transition ${
                        selectedPlan.Id === plan._id
                          ? "bg-white text-black"
                          : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      {selectedPlan.Id === plan._id
                        ? "Selected"
                        : "Select Plan"}
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
