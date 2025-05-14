import React, { useState } from "react";
import { User, Mail, Phone, Banknote, Hash, UserPlus, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const AffiliateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    bankName: "",
    accountNumber: "",
  });

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const res = await fetch('http://localhost:5000/api/affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success("Form submitted successfully!");

          // ✅ Clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          username: "",
          bankName: "",
          accountNumber: "",
        });

      } else {
       toast.error("Failed to submit form.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
    finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='flex flex-col justify-center py-8 sm:px-6 lg:px-8'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
          Become an Affiliate by <br /> creating an account
        </h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Full Name */}
            <InputField
              id="fullName"
              label="Full Name"
              icon={<User className="h-5 w-5 text-gray-400" />}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />

            {/* Username */}
            <InputField
              id="username"
              label="Username"
              icon={<User className="h-5 w-5 text-gray-400" />}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="johndoe123"
            />

            {/* Phone Number */}
            <InputField
              id="phone"
              label="Phone Number"
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234..."
              type="tel"
            />

            {/* Email */}
            <InputField
              id="email"
              label="Email"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              type="email"
            />

            {/* Bank Name */}
            <InputField
              id="bankName"
              label="Bank Name"
              icon={<Banknote className="h-5 w-5 text-gray-400" />}
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              placeholder="GTBank"
            />

            {/* Account Number */}
            <InputField
              id="accountNumber"
              label="Account Number"
              icon={<Hash className="h-5 w-5 text-gray-400" />}
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="1234567890"
              type="number"
            />

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                  Register
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable InputField component
const InputField = ({ id, label, icon, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium text-gray-300'>
      {label}
    </label>
    <div className='mt-1 relative rounded-md shadow-sm'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        {icon}
      </div>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
        rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
        focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default AffiliateForm;
