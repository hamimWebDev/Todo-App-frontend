import { Button } from "../components/ui/button";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../redux/api/api";
import UpdateTodoModel from "./UpdateTodoModel";


export type TItem = {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: "medium" | "low" | "high";
};

const TodoCard = ({
  title,
  description,
  _id,
  isCompleted,
  priority,
}: TItem) => {
  const [taskId, { isLoading }] = useDeleteTodoMutation();
  const [updateData] = useUpdateTodoMutation();

  const currentCard = {
    title,
    description,
    _id,
    priority,
  };

  const toggleState = () => {
    const options = {
      id: _id,
      data: {
        title,
        description,
        priority,
        isCompleted: !isCompleted,
      },
    };
    updateData(options);
  };

  const toggleClick = () => {
    taskId(_id);
  };

  return (
    <div className="bg-white rounded-md p-3 border flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center">
      <div className="flex items-center space-x-3 flex-1">
        <input
          onChange={toggleState}
          type="checkbox"
          name="complete"
          id="complete"
          defaultChecked={isCompleted}
        />
        <p className="font-semibold flex-1">{title}</p>
      </div>
      <div className="flex items-center space-x-3 flex-1">
        <div
          className={`w-3 h-3 rounded-full 
          ${priority === "high" ? "bg-red-500" : ""}
          ${priority === "medium" ? "bg-yellow-500" : ""}
          ${priority === "low" ? "bg-green-500" : ""}
        `}
        ></div>
        <p>{priority}</p>
      </div>
      <div className="flex items-center space-x-3 flex-1">
        {isCompleted ? (
          <p className="font-medium text-green-500">Done</p>
        ) : (
          <p className="font-medium text-red-500">Pending...</p>
        )}
      </div>
      <p className="flex-[2]">{description}</p>
      <div className="flex space-x-5">
        <Button
          onClick={() => toggleClick()}
          className="bg-red-500"
          type="button"
          disabled={isLoading}
        >
          <svg
            className="w-5 h-5"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <UpdateTodoModel {...currentCard} />
      </div>
    </div>
  );
};

export default TodoCard;
