import React from "react";

const PaystackButton = ({ amount, email, publicKey, onSuccess, onClose }) => {
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount * 100, // Paystack expects amount in Kobo
      currency: "NGN",
      callback: function (response) {
        onSuccess(response); // what to do on successful payment
      },
      onClose: function () {
        onClose(); // what to do when payment modal is closed
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default PaystackButton;
