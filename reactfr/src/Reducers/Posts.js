export default (post = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "UPDATE":
    case "like":
      return post.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
    case "Create":
      return [...post, action.payload];
    case "DELETE":
      return post.filter((post) => post._id !== action.payload);
    default:
      return post;
  }
};
