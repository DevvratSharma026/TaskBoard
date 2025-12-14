import React from "react";

const DashboardNavbar = ({ user, onLogout, onSearch }) => {
  return (
    // Updated padding for mobile (px-4 py-3) and larger screens (md:px-8 md:py-4).
    // Switched to 'flex-wrap' to allow elements to move to a new line on small screens if necessary.
    <div className="flex flex-wrap justify-between items-center px-4 py-3 md:px-8 md:py-4 bg-[#4c456a] text-white">
      
      {/* Title is prominent */}
      <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">TaskBoard</h1> {/* Added mb-2 for spacing on wrap */}

      {/* Search Input: Full width on mobile (w-full), centered, then 1/3 width on medium screens and up. */}
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={onSearch}
        className="border px-3 py-1.5 rounded-md text-gray-800 placeholder-gray-500 w-full sm:w-2/3 md:w-1/3 order-3 md:order-none"
      />

      {/* User Info and Logout: Maintained as a flex container, but adjusted spacing. */}
      <div className="flex items-center gap-3 md:gap-4 order-2 md:order-none">
        <span className="text-sm md:text-base">{user?.firstName}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm md:text-base transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;