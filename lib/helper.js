const BASE_URL = "http://localhost:3000/";
// all post
export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}api/posts`);
  const json = await response.json();

  return json;
};

// single post
export const getPost = async (postId) => {
  const response = await fetch(`${BASE_URL}api/posts/${postId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

//posting a new post
export async function addPost(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/posts`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

//update a new post
export async function updatePost(postId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/posts/${postId}`, Options);
  const json = await response.json();
  return json;
}

//delete a new post
export async function deletePost(postId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}api/posts/${postId}`, Options);
  const json = await response.json();
  return json;
}
