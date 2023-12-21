import "./scroll.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ data, title, id }) {
  return (
    <div className="bg-[#f4f5f7] rounded-lg h-[85vh] overflow-y-scroll border column">
      <h1
        className={`${
          title === "Todo"
            ? "bg-primary"
            : title === "In Progress"
            ? "bg-orange-400"
            : "bg-green-500"
        } p-[8px] bg-primary text-white text-center sticky`}
      >
        {title}
      </h1>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column flex flex-col gap-2 px-4 mt-2"
          >
            {data?.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
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
                    } p-5 rounded-xl`}
                  >
                    {task.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
