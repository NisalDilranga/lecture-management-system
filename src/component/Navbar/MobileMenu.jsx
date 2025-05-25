import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from './NavbarData';

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

const MobileMenu = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="md:hidden bg-primary-dark overflow-hidden"
        >
          <div className="px-4 py-2">
            {navLinks.map((item, index) => (
              <div key={index}>
                <motion.a
                  href={item.href}
                  variants={itemVariants}
                  className="block py-3 text-white border-b border-primary-light hover:bg-primary hover:text-accent transition-colors duration-150"
                >
                  {item.title}
                </motion.a>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;