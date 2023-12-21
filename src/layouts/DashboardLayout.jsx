import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center md:hidden">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        <Link to={"/"} className=" text-3xl font-semibold  mr-4 ">
          <span className="text-primary">Task.</span>ly
        </Link>
      </div>

      <aside
        id="default-sidebar"
        className={`${
          open ? "" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <Link to={"/"} className=" text-3xl font-semibold    mx-auto">
            <span className="text-primary">Task.</span>ly
          </Link>
          <ul className="space-y-2 font-medium mt-10">
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  bg-gray-200 group"
                    : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100  group"
                }
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/dashboard/my-tasks"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <FaTasks />
                <span className="ms-3">My Tasks</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 " onClick={() => setOpen(false)}>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
