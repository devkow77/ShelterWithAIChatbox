"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const dotVariants: Variants = {
  closed: () => ({
    y: 0,
    scale: 1,
  }),
  open: (custom: number) => ({
    y: custom,
    scale: custom === 0 ? 2 : 1,
  }),
  hover: (custom: number) => ({
    y: custom * 1.2,
    scale: custom === 0 ? 2.2 : 1.1,
    transition: { duration: 0.2 },
  }),
};

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimalsOpen, setIsAnimalsOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen((prev) => !prev);
    // Resetujemy stan podlisty przy zamykaniu całego menu
    if (isOpen) setIsAnimalsOpen(false);
  };

  const toggleAnimals = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsAnimalsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        className="z-50 flex cursor-pointer flex-col gap-1 p-4 xl:hidden"
        animate={isOpen ? "open" : "closed"}
        whileHover="hover"
      >
        <motion.div
          custom={9}
          variants={dotVariants}
          className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
          transition={{ duration: 0.3 }}
        />
        <motion.div
          custom={0}
          variants={dotVariants}
          className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
          transition={{ duration: 0.3 }}
        />
        <motion.div
          custom={-9}
          variants={dotVariants}
          className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {isOpen ? (
        <div className="fixed z-40 top-0 left-0 w-screen h-screen dark:bg-black dark:text-white bg-white flex items-center justify-center overflow-y-auto">
          <ul className="space-y-6 text-center font-medium">
            <li>Strona główna</li>
            <li className="space-y-4">
              <button
                onClick={toggleAnimals}
                className="flex items-center justify-center w-full"
              >
                Zarządzanie zwierzętami{" "}
                {isAnimalsOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isAnimalsOpen ? (
                <ul className="space-y-4">
                  <li>Psy</li>
                  <li>Koty</li>
                  <li>Króliki</li>
                  <li>Inne zwierzęta</li>
                </ul>
              ) : null}
            </li>
            <li>Blog</li>
            <li>Faq</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Hamburger;
