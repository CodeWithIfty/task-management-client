import React, { useEffect } from "react";

const TaskModal = ({ modal }) => {
  useEffect(() => {
    document.getElementById("my_modal_2").showModal();
  }, [modal]);
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <div className="border-b pb-1 flex justify-between flex-col lg:flex-row">
          <h1 className="font-bold "> {modal?.title}</h1>
          <p
            className={`${
              modal?.priority === "moderate"
                ? "text-orange-400"
                : modal?.priority === "low"
                ? "text-gray-300"
                : "text-red-700"
            }`}
          >
            {modal?.priority}
          </p>
        </div>
        <p className="font-light">{modal?.description}</p>
        <p className="mt-5">Deadline: {modal?.deadline}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default TaskModal;
