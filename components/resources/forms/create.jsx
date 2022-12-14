import { useQueryClient, useMutation } from "react-query";
import { CATEGORIES } from "../../../shared/data";
import Spinner from "../../spinner";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Resources } from "../../../lib/helpers/api";

const CreateResourceForm = ({ formData, setFormData }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addMutation = useMutation(Resources.create, {
    onSuccess: () => {
      toast.success("Resource successfully added");
      router.push("/resources");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Sorry. Some error occurred while adding resource");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      return console.log("Don't have Form Data");
    }

    let { title, description, category, status } = formData;

    const model = {
      title,
      description,
      category,
      status: status ?? "active",
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-9 gap-4">
        <div className="col-span-4 input-type">
          <input
            type="text"
            onChange={setFormData}
            name="title"
            className="w-full bg-gray-600 px-5 py-3 focus:outline-none rounded-md"
            placeholder="Title"
          />
        </div>
        <div className="col-span-3 relative w-full lg:max-w-sm">
          <select
            onChange={setFormData}
            name="category"
            className="bg-gray-600 w-full px-5 py-3 rounded-md shadow-sm focus:outline-none"
            placeholder="Category"
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex gap-4 items-center">
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              value="active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 bg-gray-500 checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contaion foat-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block tet-gray-800"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              value="inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 bg-gray-500 checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contaion foat-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block tet-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
      </div>
      <div className="input-type">
        <textarea
          rows={20}
          onChange={setFormData}
          name="description"
          className="bg-gray-600 w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Description"
          style={{ minHeight: 256 }}
        />
      </div>

      <button
        type="submit"
        className="mx-auto text-md bg-green-600 text-white px-12 h-10 rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
      >
        Submit
      </button>
    </form>
  );
};
export default CreateResourceForm;
