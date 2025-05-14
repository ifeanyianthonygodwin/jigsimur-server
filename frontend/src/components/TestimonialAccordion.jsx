import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const testimonials = [
  {
    title: "Incredible Energy Boost",
    content:
      "Since I started taking Jigsimur, my energy levels have gone through the roof. I feel younger and more alive every day!",
  },
  {
    title: "Pain Relief Like Magic",
    content:
      "I suffered from joint pain for years. Jigsimur has relieved me of that pain, and I can now go on daily walks again.",
  },
  {
    title: "Great for Digestion",
    content:
      "My digestion has improved significantly. No more bloating, and my system feels more regular and light.",
  },
  {
    title: "Helped My Diabetes",
    content:
      "Jigsimur helped me regulate my blood sugar naturally. I highly recommend it for diabetics, but always consult your doctor too.",
  },
  {
    title: "Cured My Partial Stroke",
    content:
      "I was suffering from partial stroke for the past five years. Taking all kinds of medication to no avail until I got to know about jigsimur. I thank God today I can walk perfectly through this wonderful Product.",
  },
  {
    title: "Skin Glow and Vitality",
    content:
      "People keep asking what I'm using on my skin. It’s Jigsimur! I feel detoxed and fresh from the inside out.",
  },
];

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left text-white hover:bg-emerald-900 transition"
      >
        <span className="font-medium">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="px-4 pb-4 text-sm text-gray-300"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-emerald-400 py-6">
      What People Say About Jigsimur
      </h2>
      <div className="divide-y divide-gray-700">
        {testimonials.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onClick={() => toggleIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialAccordion;
