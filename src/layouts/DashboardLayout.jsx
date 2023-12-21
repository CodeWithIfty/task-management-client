import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { FaTasks, FaUserTie } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { authContext } from "../utils/context/AuthProvider";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { SignOutUser } = useContext(authContext);
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
                    ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <FaTasks />
                <span className="ms-3">My Tasks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"add-task"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <MdAssignmentAdd />
                <span className="ms-3">Add Task</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"my-profile"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                    : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                }
              >
                <FaUserTie />
                <span className="ms-3">My Profile</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={SignOutUser}
                className={
                  "flex items-center p-2 text-red-500 rounded-lg hover:bg-gray-100  group"
                }
              >
                <AiOutlineLogout />

                <span className="ms-3">Sign Out</span>
              </button>
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
