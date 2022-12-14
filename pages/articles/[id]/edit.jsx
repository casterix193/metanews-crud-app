import Link from "next/link";
import EditArticleForm from "../../../components/articles/forms/edit";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Spinner from "../../../components/spinner";
import toast from "react-hot-toast";
import { useReducer } from "react";
import { Articles } from "../../../lib/helpers/api";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const EditArticle = () => {
  const router = useRouter();
  const [formData, setFormData] = useReducer(formReducer, {});

  console.log(router.query);

  const { isFetching, data: article } = useQuery(
    ["article", router.query.id],
    () => Articles.get(router.query.id),
    {
      onError: () => {
        toast.error(
          "There was some error while loading data for article. Please try again after some time"
        );
        router.push("/articles");
      },
    }
  );

  if (isFetching || !article)
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="container px-4 md:px-10 lg:px-20">
        <div className="py-10 flex align-middle justify-between">
          <h2 className="text-lg font-normal mb-5">Edit Article</h2>
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
          <EditArticleForm
            article={article}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
