import React from "react";
import Heading from "../Heading";
import { useForm } from "react-hook-form";

const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Handle form submission (e.g., API call to add task)
    console.log(data);
    // Reset the form after submission
    reset();
  };

  return (
    <div>
      <Heading title={"Add Task"} />
      <div className="p-5">
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
