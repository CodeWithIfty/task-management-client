import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Heading from "../Heading";

// Mock data
const initialData = {
  todo: [
    { id: "task1", content: "Task 1", status: "todo" },
    { id: "task2", content: "Task 2", status: "todo" },
    // Add more tasks as needed
  ],
  inProgress: [
    { id: "task3", content: "Task 1", status: "inProgress" },
    { id: "task4", content: "Task 2", status: "inProgress" },
  ],
  completed: [
    { id: "task5", content: "Task 1", status: "completed" },
    { id: "task6", content: "Task 2", status: "completed" },
  ],
};

const MyTasks = () => {
  const [data, setData] = useState(initialData);

  // Simulating API call to fetch data
  useEffect(() => {
    // Replace this with your API call to fetch actual data
    // For now, setting initial demo data
    setData(initialData);
  }, []);

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
      <div className="p-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-9 gap-1">
            {/* Todo Column */}
            <div className="col-span-3">
              <Column data={data.todo} title={"Todo"} id={"todo"} />
            </div>
            {/* InProgress Column */}
            <div className="col-span-3">
              <Column
                data={data.inProgress}
                title={"In Progress"}
                id={"inProgress"}
              />
            </div>

            {/* Completed Column */}
            <div className="col-span-3">
              <Column
                data={data.completed}
                title={"Completed"}
                id={"completed"}
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MyTasks;
