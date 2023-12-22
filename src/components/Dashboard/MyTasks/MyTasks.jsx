import { useState, useEffect, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Heading from "../Heading";
import axios from "axios";
import { authContext } from "../../../utils/context/AuthProvider";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const [data, setData] = useState(null);
  const { user, loading, setLoading } = useContext(authContext);

  // Simulating API call to fetch data
  useEffect(() => {
    axios
      .get(
        `https://task-management-server-eight-sandy.vercel.app/tasks/${user?.email}`
      )
      .then((res) => {
        setData(res?.data?.tasks[0]);
        console.log(res.data.tasks.length);
        console.log(data);
      });
  }, [user]);
  console.log(data?.todo);

  useEffect(() => {
    if (data) {
      axios
        .put(
          `https://task-management-server-eight-sandy.vercel.app/updateTasks/${user?.email}`,
          data
        )
        .then((res) => {
          // setData(res?.data?.tasks[0]);
          console.log(res);
        });
    }
    console.log(data);
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check if the drop is outside the droppable area
    if (!destination) return;

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedData = { ...data };
    const draggableItem = updatedData[source.droppableId].find(
      (item) => item.id === draggableId
    );

    // Remove from the source list
    updatedData[source.droppableId] = updatedData[source.droppableId].filter(
      (item) => item.id !== draggableId
    );

    // Update status based on the column moved to
    draggableItem.status = destination.droppableId;

    // Add to the destination list
    updatedData[destination.droppableId].splice(
      destination.index,
      0,
      draggableItem
    );

    setData(updatedData);
  };

  return (
    <div className="">
      <Heading title={"My Tasks"} />

      {data?.todo?.length > 0 ||
      data?.inProgress?.length > 0 ||
      data?.completed?.length > 0 ? (
        <div className="md:p-10">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-9 gap-1">
              {/* Todo Column */}
              <div className="col-span-3">
                <Column data={data?.todo} title={"Todo"} id={"todo"} />
              </div>
              {/* InProgress Column */}
              <div className="col-span-3">
                <Column
                  data={data?.inProgress}
                  title={"In Progress"}
                  id={"inProgress"}
                />
              </div>

              {/* Completed Column */}
              <div className="col-span-3">
                <Column
                  data={data?.completed}
                  title={"Completed"}
                  id={"completed"}
                />
              </div>
            </div>
          </DragDropContext>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh] flex-col">
          <h1 className="text-xl font-semibold">No Task Added </h1>
          <Link
            to={"/dashboard/add-task"}
            className="text-white mt-4 underline btn btn-primary"
          >
            Add Task
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
