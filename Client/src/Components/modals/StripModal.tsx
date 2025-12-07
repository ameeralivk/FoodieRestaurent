// import { useState } from "react";
// import type { FormEvent } from "react";
// import { makePayment } from "../../services/planService";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Types
// interface CheckoutFormProps {
//   closeModal: () => void;
//   amount: number | null;
// }

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#fff",
//       fontFamily: "Helvetica, Arial, sans-serif",
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#a0aec0",
//       },
//       padding: "14px 12px",
//     },
//     invalid: {
//       color: "#ff6b6b",
//       iconColor: "#ff6b6b",
//     },
//   },
// };

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ closeModal, amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     setMessage("");

//     try {
//       const data = await makePayment(500, "usd");
//       const clientSecret: string = data.data?.clientSecret;

//       const cardElement = elements.getElement(CardElement);

//       if (!cardElement) {
//         setMessage("Card input not found.");
//         setLoading(false);
//         return;
//       }

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (result.error) {
//         setMessage(result.error.message || "Payment failed.");
//       } else if (result.paymentIntent?.status === "succeeded") {
//         setMessage("🎉 Payment Successful!");
//         setTimeout(closeModal, 2000);
//       }
//     } catch (err) {
//       setMessage("⚠️ Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl w-full max-w-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Complete Your Payment
//       </h2>

//       <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
//         <h3 className="font-semibold mb-2 text-gray-200">Order Summary</h3>
//         <div className="flex justify-between text-gray-300">
//           <span>Subscription Price</span>
//           <span>₹{amount}</span>
//         </div>
//         <div className="flex justify-between text-white font-bold mt-2">
//           <span>Total</span>
//           <span>₹{amount}</span>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-gray-300 font-medium mb-2">
//             Card Details
//           </label>
//           <div className="border border-gray-700 rounded-lg p-3 bg-gray-800 h-20">
//             <CardElement options={CARD_ELEMENT_OPTIONS} />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className={`w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Processing..." : `Pay ₹${amount}`}
//         </button>

//         {message && (
//           <p
//             className={`text-center font-medium mt-2 ${
//               message.includes("Successful") ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;

import { useState } from "react";
import type { FormEvent } from "react";
import { makePayment } from "../../services/planService";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  closeModal: () => void;
  amount: number | null;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: "16px",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#ff6b6b" },
  },
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ closeModal, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe) return;

    if (!amount) {
      setMessage("Amount missing. Please try again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // INR required for UPI
      const data = await makePayment(amount, "inr");
      const clientSecret: string = data?.data?.clientSecret;

      if (!clientSecret) {
        setMessage("Unable to generate payment.");
        setLoading(false);
        return;
      }

      // 📌 CARD PAYMENT
      if (paymentMethod === "card") {
        const cardElement = elements?.getElement(CardElement);
        if (!cardElement) {
          setMessage("Card element missing.");
          setLoading(false);
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (result.error) {
          setMessage(result.error.message || "Payment failed.");
        } else if (result.paymentIntent?.status === "succeeded") {
          setMessage("🎉 Payment Successful!");
          setTimeout(closeModal, 2000);
        }
      }

      // 📌 UPI PAYMENT
      if (paymentMethod === "upi") {
        if (!upiId.trim()) {
          setMessage("Please enter a valid UPI ID.");
          setLoading(false);
          return;
        }

        // Build params WITHOUT elements first
        const params: any = {
          clientSecret,
          confirmParams: {
            payment_method_data: {
              type: "upi",
              upi: {
                vpa: upiId,
              },
            },
          },
        };

        // Only include elements if not null (fixes TS error)
        if (elements) {
          params.elements = elements;
        }

        const result = await stripe.confirmPayment(params);

        if (result.error) {
          setMessage(result.error.message || "UPI payment failed.");
        } else if (result.paymentIntent?.status === "processing") {
          setMessage("⏳ Please approve the payment in your UPI app.");
        } else if (result.paymentIntent?.status === "succeeded") {
          setMessage("🎉 Payment Successful!");
          setTimeout(closeModal, 2000);
        }
      }
    } catch (err) {
      console.log(err);
      setMessage("⚠️ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your Payment
      </h2>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
        <h3 className="text-gray-200 font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between text-gray-300">
          <span>Subscription Price</span>
          <span>₹{amount ?? "--"}</span>
        </div>
        <div className="flex justify-between mt-2 font-bold text-white">
          <span>Total</span>
          <span>₹{amount ?? "--"}</span>
        </div>
      </div>

      {/* PAYMENT METHOD SWITCH */}
      <div className="flex mb-6">
        <button
          onClick={() => setPaymentMethod("card")}
          type="button"
          className={`flex-1 py-2 rounded-l-lg font-semibold ${
            paymentMethod === "card"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Card
        </button>

        <button
          onClick={() => setPaymentMethod("upi")}
          type="button"
          className={`flex-1 py-2 rounded-r-lg font-semibold ${
            paymentMethod === "upi"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          UPI
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CARD FIELD */}
        {paymentMethod === "card" && (
          <div>
            <label className="text-gray-300 mb-2 block">Card Details</label>
            <div className="border border-gray-700 bg-gray-800 p-3 rounded-lg h-20">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        )}

        {/* UPI FIELD */}
        {paymentMethod === "upi" && (
          <div>
            <label className="text-gray-300 mb-2 block">
              Enter UPI ID (example: ameer@ybl)
            </label>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* PAY BUTTON */}
        <button
          type="submit"
          disabled={loading || !amount}
          className={`w-full py-3 bg-blue-600 font-semibold rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : `Pay ₹${amount ?? "--"}`}
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center mt-2 font-medium ${
              message.includes("Successful") ? "text-green-500" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
