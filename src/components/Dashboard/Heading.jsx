import { Link } from "react-router-dom";

const Heading = ({ title }) => {
  return (
    <div className="flex justify-between border-b pb-2">
      <h2 className="text-2xl">{title}</h2>
    </div>
  );
};

export default Heading;
