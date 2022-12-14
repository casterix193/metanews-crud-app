import toast from "react-hot-toast";
import { Articles } from "../../lib/helpers/api";
import { getPosts } from "../../lib/helper";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { deleteArticleAction } from "../../redux/reducer";

const DeleteConfirmation = ({ id, onConfirm, onCancel }) => {
  const queryclient = useQueryClient();
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    await Articles.delete(id);
    queryclient.prefetchQuery("articles", Articles.list);
    onConfirm();
    dispatch(deleteArticleAction(null));
  };

  return (
    <div>
      <p>Are you sure want to delete ?</p>
      <div className="flex items-center justify-end mt-4">
        <button className="mr-4" onClick={onCancel}>
          No
        </button>
        <button
          className="bg-rose-600 rounded-md text-white px-4 py-1"
          onClick={handleConfirm}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
