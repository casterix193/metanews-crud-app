import ArticlesTable from "../../components/articles/table";
import Form from "../../components/articles/form";
import Link from "next/link";
import CreateArticleForm from "../../components/articles/forms/create";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const CreateArticle = () => {
  const [formData, setFormData] = useReducer(formReducer, {});

  return (
    <div>
      <div className="container px-4 md:px-10 lg:px-20">
        <div className="py-10 flex align-middle justify-between">
          <h2 className="text-lg font-normal mb-5">Create Article</h2>
          <Link
            href="/articles"
            className="flex items-center bg-gray-600 h-10 px-8 rounded-md hover:bg-gray-700 hover:border-indigo-500"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="container px-4 md:px-10 lg:px-20">
        <div className="p-8 bg-gray-700 rounded-md w-3/4 mx-auto">
          <CreateArticleForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
