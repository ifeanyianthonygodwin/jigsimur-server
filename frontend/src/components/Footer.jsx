import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Footer = () => {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-12 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-lime-400">JIGSIMUREXTRA</h2>
          <p className="text-gray-400 text-sm mb-4">
            Jigsimur is a powerful, all-natural herbal remedy formulated to support your body’s healing and rejuvenation process. Made from African medicinal plants and aloe ferox, it detoxifies, boosts immunity, and promotes overall wellness.
          </p>
          <div className="flex space-x-4 mt-4 text-lime-400">
            <a href="https://facebook.com/share/18oTtk7JYA" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-white text-xl transition" />
            </a>
            <a href="https://wa.me/message/NV6WKP5EEYI6E1" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="hover:text-white text-xl transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white text-xl transition" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-lime-400" />
              <span>+2348 1813 7137, +2348 05510 9037</span>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-lime-400" />
              <a href="https://wa.me/message/NV6WKP5EEYI6E1" className="hover:text-white transition">
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-lime-400" />
              <span>60 Ogbowankwo Street, Ajegunle, Apapa, Lagos.</span>
            </li>
          </ul>
        </div>

        {/* Quick Links / Copyright */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white transition">
                About Jigsimur
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Join as a Distributor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>

          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Jigsimurextra -Jigsimur Herbal Medicine. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
