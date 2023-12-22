import Heading from "../Heading";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../utils/context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateTask = ({ updateModalData, setUpdateModalData }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(authContext);
  const [task, setTask] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTask(null); // Reset the form with updated data
    setTask(updateModalData);
  }, [updateModalData]);
  console.log(updateModalData, setUpdateModalData);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    const currentDate = new Date();
    const selectedDate = new Date(
      data.deadline ? data.deadline : updateModalData.deadline
    );

    if (selectedDate <= currentDate) {
      toast.error("Please select a future date for the deadline.", {
        id: toastId,
      });
      return;
    }

    const daysLeft = Math.ceil(
      (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    const newData = {
      title: data.title ? data.title : updateModalData.title,
      status: updateModalData.status,
      priority: data.priority ? data.priority : updateModalData.priority,
      id: updateModalData.id,
      description: data.description
        ? data.description
        : updateModalData.description,
      deadline: data.deadline ? data.deadline : updateModalData.deadline,
    };

    await axios.put(
      `https://task-management-server-eight-sandy.vercel.app/updateSingleTask/${user?.email}`,
      newData
    );
    window.location.reload();
    setUpdateModalData(null);
    toast.success("Task Assigned", { id: toastId });
    toast.success(
      `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left to complete the task`
    );

    reset();
  };

  return (
    <div>
      <div className="md:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label>Title:</label>
            <input
              {...register("title", { required: true })}
              className=" md:w-96  px-3 py-2 bg-gray-100 border rounded-lg"
              placeholder="Enter Task Title Here."
              defaultValue={task?.title}
            />
          </div>
          <div className="flex flex-col ">
            <label>Description:</label>
            <textarea
              {...register("description")}
              className=" md:w-96 px-3 py-2 bg-gray-100 border rounded-lg"
              placeholder="Enter Task Title Here."
              defaultValue={task?.description}
            />
          </div>
          <div className="flex flex-col ">
            <label>Deadline:</label>
            <input
              type="date"
              {...register("deadline")}
              className=" md:w-96 px-3 py-2 bg-gray-100 border rounded-lg"
              defaultValue={task?.deadline}
            />
          </div>
          <div className="flex flex-col ">
            <label>Priority:</label>
            <select
              {...register("priority")}
              className=" md:w-96 px-3 py-2 bg-gray-100 border rounded-lg"
              defaultValue={task?.priority}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-full mt-4 hover:bg-transparent hover:ring-2 hover:text-black transition-all ease-in-out duration-100 focus:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
