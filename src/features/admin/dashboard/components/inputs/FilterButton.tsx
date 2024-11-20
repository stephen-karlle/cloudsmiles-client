import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import PopOver from "@components/ui/PopOver";
import CheckIcon from "@icons/linear/CheckIcon";
import FilterIcon from "@icons/linear/FilterIcon";
import useClickOutside from "@hooks/useClickOutside";
import ChevronIcon from "@icons/linear/ChevronIcon";

type IFilterButton = {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  position: "left" | "right"; // Added position prop
};

const months = [
  "None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const years = [
  "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"
];

const FilterButton = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  position,
}: IFilterButton) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMonthOpen, setMonthOpen] = useState(false);
  const [isYearOpen, setYearOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  let monthTimeout: any;
  let yearTimeout: any;

  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setFilterOpen(!isFilterOpen);
  };

  const handleSelectMonth = (e: MouseEvent, month: string) => {
    if (month === "None") {
      setSelectedMonth("Month");
    }
    e.stopPropagation();
    setSelectedMonth(month);
  };

  const handleSelectYear = (e: MouseEvent, year: string) => {
    e.stopPropagation();
    setSelectedYear(year);
  };

  const handleMouseEnterMonth = () => {
    clearTimeout(monthTimeout);
    monthTimeout = setTimeout(() => setMonthOpen(true), 50); // 200ms delay
  };

  const handleMouseLeaveMonth = () => {
    clearTimeout(monthTimeout);
    monthTimeout = setTimeout(() => setMonthOpen(false), 50); // 200ms delay
  };

  const handleMouseEnterYear = () => {
    clearTimeout(yearTimeout);
    yearTimeout = setTimeout(() => setYearOpen(true), 50); // 200ms delay
  };

  const handleMouseLeaveYear = () => {
    clearTimeout(yearTimeout);
    yearTimeout = setTimeout(() => setYearOpen(false), 50); // 200ms delay
  };

  useClickOutside(anchorRef, () => {
    setFilterOpen(false); // Close the entire filter when clicking outside
    setMonthOpen(false); // Close the month popover
    setYearOpen(false); // Close the year popover
  });

  // Dynamic classes for positioning popovers
  const positionClasses = position === "left" ? "-left-36" : "-right-36"; // For popovers

  return (
    <div
      className="flex px-2 h-8 items-center justify-center rounded-md relative ring-1 ring-gray-200 text-gray-700 gap-2 cursor-pointer"
      onClick={(e) => handleOpen(e)}
      ref={anchorRef}
    >
      <FilterIcon className="w-4 h-4 stroke-2 stroke-gray-700" />
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, x: position === "left" ? 10 : -10 }} // Dynamic initial position
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === "left" ? 10 : -10 }} // Dynamic exit position
            transition={{ duration: 0.2 }}
            className={`
                top-12 z-10 h-fit absolute cursor-default bg-white ring-1 ring-gray-200 rounded-md shadow-lg shadow-gray-200 w-44 flex p-2 flex-col
                ${position === "left" ? "right-0" : "left-0"}
              `}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-base font-medium text-gray-700 px-2 mb-1">Filter by</h1>

            {/* Month Section */}
            <div
              className="w-full flex items-center justify-between gap-2 relative text-sm hover:bg-gray-50 px-2 rounded-md py-1"
              onMouseEnter={handleMouseEnterMonth}
              onMouseLeave={handleMouseLeaveMonth}
            >
              <p className="text-gray-500">{"Month: "}
                <span className="text-gray-700 font-medium">{selectedMonth}</span>
              </p>
              <ChevronIcon className="w-4 h-4 -rotate-90 stroke-2 stroke-gray-500" />
              <PopOver
                anchorRef={monthRef}
                isOpen={isMonthOpen}
                onClose={() => setMonthOpen(false)}
                className={`w-32 ${positionClasses} -top-32 p-4 flex flex-col gap-2`} // Apply dynamic positioning here
                position="right"
              >
                {months.map((month, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full "
                    onClick={(e) => handleSelectMonth(e, month)}
                  >
                    <p className={`${selectedMonth === month ? "text-gray-700" : "text-gray-500 text-sm"}`}>{month}</p>
                    {selectedMonth === month && <CheckIcon className="w-4 h-4 stroke-2 stroke-gray-700" />}
                  </button>
                ))}
              </PopOver>
            </div>

            {/* Year Section */}
            <div
              className="w-full flex items-center justify-between gap-2 relative text-sm hover:bg-gray-50 px-2 rounded-md py-1 "
              onMouseEnter={handleMouseEnterYear}
              onMouseLeave={handleMouseLeaveYear}
            >
              <p className="text-gray-500">{"Year: "}
                <span className="text-gray-700 font-medium">{selectedYear}</span>
              </p>
              <ChevronIcon className="w-4 h-4 -rotate-90 stroke-2 stroke-gray-500" />
              <PopOver
                anchorRef={yearRef}
                isOpen={isYearOpen}
                onClose={() => setYearOpen(false)}
                className={`w-32 ${positionClasses} -top-32 p-4 flex flex-col gap-2`} // Apply dynamic positioning here
                position="right"
              >
                {years.map((year, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full "
                    onClick={(e) => handleSelectYear(e, year)}
                  >
                    <p className={`${selectedYear === year ? "text-gray-700" : "text-gray-500 text-sm"}`}>{year}</p>
                    {selectedYear === year && <CheckIcon className="w-4 h-4 stroke-2 stroke-gray-700" />}
                  </button>
                ))}
              </PopOver>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterButton;
