import { useContext, useEffect, useState } from "react";
import "./scroll.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { BiSolidShow } from "react-icons/bi";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import UpdateTask from "./UpdateTask";
import axios from "axios";
import { authContext } from "../../../utils/context/AuthProvider";
import toast from "react-hot-toast";

export default function Column({ data, title, id }) {
  const [modal, setModal] = useState(null);
  const [updateModalData, setUpdateModalData] = useState(null);
  const { user } = useContext(authContext);

  // view task functionality
  const showModal = (task) => {
    setModal(task);
    const modalElement = document.getElementById("my_modal_2");
    if (modalElement) {
      modalElement.showModal();
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("my_modal_2");
    if (modalElement) {
      modalElement.addEventListener("cancel", () => {
        modalElement.close();
        setModal(null);
      });
    }
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById("my_modal_2");
    if (modalElement) {
      modalElement.showModal();
    }
  }, [modal]);

  // edit task functionality
  const showEditModal = (task) => {
    setUpdateModalData(task);
    const modalElement = document.getElementById("my_modal_3");
    if (modalElement) {
      modalElement.showModal();
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("my_modal_3");
    if (modalElement) {
      modalElement.addEventListener("cancel", () => {
        modalElement.close();
        setUpdateModalData(null);
      });
    }
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById("my_modal_3");
    if (modalElement) {
      modalElement.showModal();
    }
  }, [updateModalData]);

  const handleDeleteTask = async (task) => {
    const toastId = toast.loading("Loading...");
    console.log({
      email: user?.email,
      status: task?.status,
      id: task?.id,
    });
    const res = await axios.put(
      `https://task-management-server-eight-sandy.vercel.app/deleteSingleTask/${user?.email}`,
      {
        status: task?.status,
        id: task?.id,
      }
    );

    toast.success("Task Deleted", { id: toastId });
    window.location.reload();

    console.log(res);
  };
  return (
    <div className="bg-[#f4f5f7] rounded-lg h-[85vh] overflow-y-scroll border column">
      <h1
        className={`${
          title === "Todo"
            ? "bg-primary"
            : title === "In Progress"
            ? "bg-orange-400"
            : "bg-green-500"
        } p-[8px]  text-white text-center sticky`}
      >
        {title}
      </h1>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column flex flex-col gap-2 lg:px-4 mt-2 overflow-hidden"
          >
            {data?.map((task, index) => (
              <Draggable key={task?.id} draggableId={task?.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      task.status === "todo"
                        ? "bg-primary"
                        : task.status === "inProgress"
                        ? "bg-orange-400"
                        : "bg-green-500"
                    } lg:p-5 p-2 rounded-xl text-white`}
                  >
                    <div className="border-b pb-1 flex justify-between flex-col lg:flex-row">
                      <h1 className="font-bold ">
                        {" "}
                        {task?.title.substring(0, 10)}..
                      </h1>
                      <p
                        className={`${
                          task.priority === "moderate"
                            ? "bg-orange-400"
                            : task.priority === "low"
                            ? "bg-gray-300"
                            : "bg-red-700"
                        } px-2 rounded-lg`}
                      >
                        {task.priority}
                      </p>
                    </div>
                    <p className="font-light">
                      {task?.description?.substring(0, 100)}...
                    </p>
                    <div className="mt-3 flex items-center justify-between flex-col gap-2 xl:flex-row">
                      <p className="">
                        {Math.ceil(
                          (new Date(task.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}
                        days left
                      </p>
                      <div className="flex items-center gap-4">
                        <BiSolidShow
                          className="text-2xl cursor-pointer"
                          onClick={() => showModal(task)}
                        />
                        <LuClipboardEdit
                          className="text-2xl cursor-pointer"
                          onClick={() => showEditModal(task)}
                        />
                        <MdDeleteSweep
                          className="text-2xl cursor-pointer "
                          onClick={() => handleDeleteTask(task)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {modal && (
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <div className="border-b pb-1 flex justify-between flex-col xl:flex-row">
              <h1 className="font-bold "> {modal?.title}</h1>
              <p
                className={`${
                  modal.priority === "moderate"
                    ? "bg-orange-500"
                    : modal.priority === "low"
                    ? "bg-gray-300"
                    : "bg-red-700"
                } px-2 rounded-lg `}
              >
                {modal.priority}
              </p>
            </div>
            <p className="font-light">{modal?.description}</p>
            <div className="mt-3 flex items-center justify-between flex-col gap-2 xl:flex-row">
              <p className="">
                {Math.ceil(
                  (new Date(modal.deadline) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}
                days left
              </p>
              <div className="flex items-center gap-4">
                <BiSolidShow
                  className="text-2xl cursor-pointer"
                  onClick={() => showModal(modal)}
                />
                <LuClipboardEdit
                  className="text-2xl cursor-pointer"
                  onClick={() => showEditModal(modal)}
                />
                <MdDeleteSweep
                  className="text-2xl cursor-pointer "
                  onClick={() => handleDeleteTask(modal)}
                />
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModal(null)}>Close</button>
          </form>
        </dialog>
      )}
      {updateModalData && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <UpdateTask
              updateModalData={updateModalData}
              setUpdateModalData={setUpdateModalData}
            />
            {/* {updateModalData?.title} */}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setUpdateModalData(null)}>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
