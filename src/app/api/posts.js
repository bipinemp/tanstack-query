import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export function getPosts(page) {
  return axios
    .get(`${POSTS_URL}?_limit=11&_page=${page}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function getAllPosts() {
  return axios
    .get(`${POSTS_URL}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function getPostsPaginated(page) {
  return axios.get(`${POSTS_URL}?_limit=10&_page=${page}`).then((res) => {
    const hasNext = page * 10 <= parseInt(res.headers["x-total-count"]);
    return {
      nextPage: hasNext ? page + 1 : undefined,
      previousPage: page > 1 ? page - 1 : undefined,
      posts: res.data,
    };
  });
}

export function getSinglePost(id) {
  return axios
    .get(`${POSTS_URL}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function getUserDetails(id) {
  return axios
    .get(`${USERS_URL}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function addNewPost(post) {
  return axios
    .post(`${USERS_URL}`, {
      post,
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
