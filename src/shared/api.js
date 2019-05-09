const baseUri = "https://todo-app-evandro-nova.herokuapp.com/";
//const baseUri = "http://10.207.78.93:8080/";
export const item = {
  get: baseUri + "item/",
  put: baseUri + "item/",
  patch: baseUri + "item/",
  getEvents: baseUri + "v2/item/",
  post: baseUri + "item/"
};
