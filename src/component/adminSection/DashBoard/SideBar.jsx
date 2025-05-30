import React, { useState } from "react";
import {
  FiBarChart,
  FiBriefcase,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

// Example component removed as we're using the AdminLayout

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
    // Get the current route path and determine which item is selected
  const currentPath = location.pathname;
  const selectedPath = currentPath.split('/').pop();
  const pathToTitle = {
    "dashboard": "Dashboard",
    "sales": "Sales",
    "view-site": "View Site",
    "products": "Products",
    "tags": "Tags",
    "analytics": "Analytics",
    "members": "Members",
    "lecturer-management": "Lecturer Management",
    "department-management": "Department Management",
    "vacancy-management": "Vacancy Management",
  };
  const defaultSelected = pathToTitle[selectedPath] || "Dashboard";
  const [selected, setSelected] = useState(defaultSelected);
  
  // Get lecturer status from localStorage - this determines what they can access
  const lecturerStatus = Number(localStorage.getItem('lecturerStatus')) || 1;

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />      <div className="space-y-1">
        {/* Dashboard - accessible to all */}
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        
        {/* Sales - accessible to status 1 (admin) and status 3 (permanent) only */}
        {(lecturerStatus === 1 || lecturerStatus === 3) && (
          <Option
            Icon={FiDollarSign}
            title="Sales"
            selected={selected}
            setSelected={setSelected}
            open={open}
            notifs={3}
          />
        )}
        
        {/* View Site - accessible to all */}
        <Option
          Icon={FiMonitor}
          title="View Site"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        
        {/* Products - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiShoppingCart}
            title="Products"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
        
        {/* Tags - accessible to status 1 (admin) and status 3 (permanent) only */}
        {(lecturerStatus === 1 || lecturerStatus === 3) && (
          <Option
            Icon={FiTag}
            title="Tags"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
        
        {/* Analytics - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiBarChart}
            title="Analytics"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
        
        {/* Members - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiUsers}
            title="Members"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
          {/* Lecturer Management - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiUserPlus}
            title="Lecturer Management"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
        
        {/* Department Management - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiGrid}
            title="Department Management"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
        
        {/* Vacancy Management - accessible to status 1 (admin) only */}
        {lecturerStatus === 1 && (
          <Option
            Icon={FiBriefcase}
            title="Vacancy Management"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        )}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  const navigate = useNavigate();
    // Convert title to route path
  const getRoutePath = (title) => {
    const routeMap = {
      "Dashboard": "dashboard",
      "Sales": "sales",
      "View Site": "view-site", 
      "Products": "products",
      "Tags": "tags",
      "Analytics": "analytics",
      "Members": "members",
      "Lecturer Management": "lecturer-management",
      "Department Management": "department-management",
      "Vacancy Management": "vacancy-management"
    };
    
    return `/admin/${routeMap[title] || title.toLowerCase()}`;
  };
  
  return (
    <motion.button
      layout
      onClick={() => {
        setSelected(title);
        navigate(getRoutePath(title));
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  const lecturerStatus = Number(localStorage.getItem('lecturerStatus')) || 1;
  const lecturerRole = localStorage.getItem('lecturerRole') || 'Admin Lecturer';
  
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                {lecturerStatus === 1 ? 'Admin Dashboard' : 'Lecturer Dashboard'}
              </span>
              <span className="block text-xs text-slate-500">
                {lecturerRole}
              </span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

// ExampleContent removed as we're using the AdminLayout

export default Sidebar;