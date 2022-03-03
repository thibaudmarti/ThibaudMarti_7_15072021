import { GET_POSTS, UPDATE_POST, DELETE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id_post === action.payload.id_post) {
          return {
            ...post,
            post_content: action.payload.post_content,
          };
        } else {
          return post;
        }
      });
    case DELETE_POST:
      return state.filter((post) => post.id_post !== action.payload.id_post);
    // case LIKE_POST:
    //   return state;
    // case COUNT_LIKES:
    //   return state;
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           likers: [action.payload.userId, ...post.likers],
    //         };
    //       }
    //       return post;
    //     });
    //   case UNLIKE_POST:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           likers: post.likers.filter((id) => id !== action.payload.userId),
    //         };
    //       }
    //       return post;
    //     });
    //   case UPDATE_POST:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           message: action.payload.message,
    //         };
    //       } else return post;
    //     });
    //   case DELETE_POST:
    //     return state.filter((post) => post._id !== action.payload.postId);
    //   case EDIT_COMMENT:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           comments: post.comments.map((comment) => {
    //             if (comment._id === action.payload.commentId) {
    //               return {
    //                 ...comment,
    //                 text: action.payload.text,
    //               };
    //             } else {
    //               return comment;
    //             }
    //           }),
    //         };
    //       } else return post;
    //     });
    //   case DELETE_COMMENT:
    //     return state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         return {
    //           ...post,
    //           comments: post.comments.filter(
    //             (comment) => comment._id !== action.payload.commentId
    //           ),
    //         };
    //       } else return post;
    // });
    default:
      return state;
  }
}
