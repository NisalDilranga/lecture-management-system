import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -5,
    height: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  },
  visible: { 
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 }
};

const DropdownMenu = ({ items, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
          className="absolute left-0 top-full mt-0 w-48 bg-white shadow-lg rounded-b-md overflow-hidden z-50"
        >
          <div className="py-2">
            {items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                variants={itemVariants}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors duration-150"
                whileHover={{ x: 5 }}
              >
                {item.title}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;