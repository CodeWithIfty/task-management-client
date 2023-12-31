import Heading from "../Heading";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../../../utils/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    const currentDate = new Date();
    const deadline = new Date(data.deadline);

    // Check if the deadline is a future date
    if (deadline <= currentDate) {
      toast.error("Please select a future date for the deadline.", {
        id: toastId,
      });
      return;
    }

    try {
      await axios.post(
        "https://task-management-server-eight-sandy.vercel.app/addTodoTask",
        {
          email: user?.email,
          data,
        }
      );

      const daysLeft = Math.ceil(
        (deadline - currentDate) / (1000 * 60 * 60 * 24)
      );
      const message = `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left to do`;

      toast.success("Task Assigned", { id: toastId });
      toast.success(message);

      navigate("/dashboard");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading title={"Add Task"} />
      <div className="md:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label>Title:</label>
            <input
              {...register("title", { required: true })}
              className=" w-96 px-3 py-2 bg-gray-100 border rounded-lg"
              placeholder="Enter Task Title Here."
            />
          </div>
          <div className="flex flex-col ">
            <label>Description:</label>
            <textarea
              {...register("description")}
              className=" w-96 px-3 py-2 bg-gray-100 border rounded-lg"
              placeholder="Enter Task Title Here."
            />
          </div>
          <div className="flex flex-col ">
            <label>Deadline:</label>
            <input
              type="date"
              {...register("deadline")}
              className=" w-96 px-3 py-2 bg-gray-100 border rounded-lg"
            />
          </div>
          <div className="flex flex-col ">
            <label>Priority:</label>
            <select
              {...register("priority")}
              className=" w-96 px-3 py-2 bg-gray-100 border rounded-lg"
            >
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

export default AddTask;
