import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { deleteResourceAction } from "../../redux/reducer";
import { Resources } from "../../lib/helpers/api";
import Spinner from "../spinner";
import { useRouter } from "next/router";

const ResourcesTable = () => {
  const { isFetching, data, error } = useQuery("resources", Resources.list);

  if (isFetching)
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8">
        Some error occurred while loading Resources data
      </div>
    );

  if (!data?.length) {
    return <div className="text-center py-10">No Resources added yet</div>;
  }

  return (
    <table className="rounded-md overflow-hidden w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-left whitespace-nowrap">
          <th className="px-4 py-3">
            <span className="text-gray-200">#</span>
          </th>
          <th className="px-4 py-3">
            <span className="text-gray-200">Title</span>
          </th>
          <th className="px-4 py-3">
            <span className="text-gray-200">Category</span>
          </th>
          <th className="px-4 py-3 text-center">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-4 py-3">
            <span className="text-gray-200">Created On</span>
          </th>
          <th className="px-4 py-3">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {Array.isArray(data) &&
          data.map((obj, i) => <Tr {...obj} serial={i + 1} key={i} />)}
      </tbody>
    </table>
  );
};
export default ResourcesTable;

function Tr({ _id, title, avatar, category, createdAt, status, serial }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const onUpdate = () => {
    router.push(`/resources/${_id}/edit`);
  };

  const onDelete = () => {
    dispatch(deleteResourceAction(_id));
  };

  return (
    <tr>
      <td className="px-4 py-3">
        <span>{serial}</span>
      </td>
      <td className="px-4 py-3 flex flex-row items-center">
        {title || "Not Provided"}
      </td>
      <td className="px-4 py-3 capitalize">
        <span>{category || "Not Available"}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <button className="cursor">
          <span
            className={`${
              status === "active" ? "bg-green-800" : "bg-rose-500"
            } capitalize text-white px-5 py-1 rounded-md font-semibold`}
          >
            {status || "NA"}
          </span>
        </button>
      </td>
      <td className="px-4 py-3">
        <span>
          {createdAt
            ? new Date(createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown"}
        </span>
      </td>
      <td className="px-4 py-3 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
