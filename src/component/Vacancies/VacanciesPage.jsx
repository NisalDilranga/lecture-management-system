import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UtilityBar from "../../component/Naviagtion/UtilityBar";
import Footer from "../../component/footer/Footer";
import NavBar from "../../component/Naviagtion/NavBar";

const vacancies = [
  {
    id: 1,
    title: "Senior Lecturer - Computer Science",
    department: "Department of Computer Science",
    faculty: "Faculty of Science",
    deadline: "2025-03-30",
    type: "Academic",
    description:
      "We are seeking a highly qualified Senior Lecturer with expertise in Computer Science, particularly in the areas of Artificial Intelligence and Machine Learning.",
    requirements: [
      "PhD in Computer Science or related field",
      "Minimum 5 years teaching experience",
      "Strong research background",
      "Excellent publication record",
    ],
  },
  {
    id: 2,
    title: "Research Assistant - Physics",
    department: "Department of Physics",
    faculty: "Faculty of Science",
    deadline: "2025-03-25",
    type: "Academic",
    description:
      "Join our cutting-edge research team in Quantum Physics and contribute to groundbreaking discoveries.",
    requirements: [
      "MSc in Physics",
      "Experience with laboratory equipment",
      "Strong analytical skills",
      "Research publication experience",
    ],
  },
  {
    id: 3,
    title: "Administrative Officer",
    department: "General Administration",
    faculty: "Central Administration",
    deadline: "2025-03-28",
    type: "Non-Academic",
    description:
      "We're looking for an experienced Administrative Officer to manage and coordinate administrative operations.",
    requirements: [
      "Bachelor's degree in Management",
      "5+ years administrative experience",
      "Strong organizational skills",
      "Excellent communication abilities",
    ],
  },
  {
    id: 4,
    title: "Laboratory Technician",
    department: "Department of Chemistry",
    faculty: "Faculty of Science",
    deadline: "2025-03-27",
    type: "Non-Academic",
    description:
      "Support laboratory operations and maintain equipment in our state-of-the-art chemistry labs.",
    requirements: [
      "Diploma in Laboratory Technology",
      "3+ years lab experience",
      "Knowledge of safety protocols",
      "Equipment maintenance skills",
    ],
  },
];

const VacanciesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || vacancy.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <UtilityBar />
      <NavBar />
      <div className="bg-gray-50 min-h-screen  mx-auto">
        <div className="max-w-[1400px] flex items-center flex-col justify-center mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-primary/90 py-16"
          >
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-black text-center mb-2">
                Career Opportunities
              </h1>
              <p className="text-black text-center max-w-2xl mx-auto">
                Join our team of dedicated professionals and help shape the
                future of education
              </p>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isPageLoaded ? 1 : 0,
                y: isPageLoaded ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Find Your Perfect Role
              </h2>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by title, department or faculty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm bg-white md:w-48"
                >
                  <option value="All">All Types</option>
                  <option value="Academic">Academic</option>
                  <option value="Non-Academic">Non-Academic</option>
                </select>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                {filteredVacancies.length}{" "}
                {filteredVacancies.length === 1 ? "position" : "positions"}{" "}
                found
              </div>
            </motion.div>

            <AnimatePresence>
              {filteredVacancies.map((vacancy, index) => (
                <motion.div
                  key={vacancy.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 mb-5 hover:shadow-lg transition-all border-l-4 border-primary"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wider text-primary-dark font-semibold bg-primary/10 px-3 py-1 rounded-full mb-2 inline-block">
                        {vacancy.type}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {vacancy.title}
                      </h2>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-3">
                        <p className="text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-primary/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          {vacancy.department}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-primary/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                          </svg>
                          {vacancy.faculty}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-accent-dark"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Deadline: {vacancy.deadline}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors mt-4 md:mt-0 shadow-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setSelectedVacancy(
                          selectedVacancy === vacancy.id ? null : vacancy.id
                        )
                      }
                      aria-expanded={selectedVacancy === vacancy.id}
                    >
                      {selectedVacancy === vacancy.id
                        ? "Hide Details"
                        : "View Details"}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {selectedVacancy === vacancy.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-4 border-t border-gray-200"
                      >
                        <div className="prose max-w-none text-gray-700 mb-4">
                          <p>{vacancy.description}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h3 className="font-semibold text-primary mb-3">
                            Key Requirements:
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {vacancy.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <motion.button
                            className="bg-accent text-white px-8 py-2.5 rounded-lg hover:bg-accent-dark transition-colors shadow-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Apply Now
                          </motion.button>

                          <motion.button
                            className="bg-transparent border border-primary text-primary px-6 py-2.5 rounded-lg hover:bg-primary/5 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Save for Later
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredVacancies.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-sm"
              >
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                  No matching vacancies found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find more
                  opportunities.
                </p>
              </motion.div>
            )}

            <div className="text-center mt-10">
              <p className="text-gray-500 mb-4">
                Don't see a role that fits your skills?
              </p>
              <motion.button
                className="bg-primary/10 text-primary font-medium px-6 py-2.5 rounded-lg hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Spontaneous Application
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VacanciesPage;
