import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your actual Stripe Publishable Key
// This key is safe to expose in your frontend code.
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

// A custom component for the payment form
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(100); // Default donation amount in cents (e.g., $1.00)
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setProcessing(false);
      return;
    }

    // Create PaymentMethod
    const { paymentMethod, error: createPaymentMethodError } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (createPaymentMethodError) {
      setError(createPaymentMethodError.message);
      setProcessing(false);
      return;
    }

    // Send the paymentMethod.id and amount to your backend
    // You MUST replace '/api/create-payment-intent' with your actual backend endpoint
    try {
      const response = await fetch('/api/create-payment-intent', { // <<< REPLACE THIS URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount, paymentMethodId: paymentMethod.id }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setProcessing(false);
        return;
      }

      // If a client secret is returned, confirm the payment on the client side
      if (data.clientSecret) {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (confirmError) {
          setError(confirmError.message);
          setProcessing(false);
          return;
        }

        if (paymentIntent.status === 'succeeded') {
          setSucceeded(true);
        } else {
          setError('Payment not successful. Status: ' + paymentIntent.status);
        }
      } else {
        // Handle cases where no clientSecret is returned (e.g., direct charge or other backend flow)
        setSucceeded(true); // Assume success if no client secret and no error
      }

    } catch (networkError) {
      setError('Network error or server unreachable.');
      console.error('Network error:', networkError);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-lg font-medium text-gray-800 mb-2">
          Donation Amount (NZD)
        </label>
        <input
          type="number"
          id="amount"
          value={amount / 100} // Display in dollars
          onChange={(e) => setAmount(Math.round(parseFloat(e.target.value) * 100))} // Store in cents
          min="1"
          step="1"
          className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-gray-800 mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-md focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '18px',
                  color: '#333',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {succeeded && <div className="text-blue-600 text-sm mt-2">Donation successful! Thank you for your support.</div>}
        <div className="flex items-center justify-center">
            <button
                type="submit"
                disabled={processing || succeeded || !stripe || !elements}
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {processing ? 'Processing...' : 'Donate Now'}
            </button>
        </div>
    </form>
  );
};

// Main DonatePage component
const DonateStripePage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 mb-8">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Donate
      </h2>

      <div className="paragraph-text">
        <p className="mb-4">
          Your support helps Reclaim NZ in its mission. Every contribution, no matter how small, makes a difference.
        </p>
        <p className="mb-6">
          Please use the secure form below to make a donation via Stripe.
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>

      <div className="paragraph-text mt-8">
        <p className="text-sm text-gray-500 text-center">
          All donations are processed securely through Stripe. Your financial information is encrypted and not stored on our servers.
        </p>
      </div>
    </div>
  );
};

export default DonateStripePage;
