import {
  SET_TODOS,
  ADD_TODOS,
  DELETE_TODOS,
  UPDATE_COUNT,
  CURRENT_PAGE,
  SET_ALLTASK,
  SET_USER,
  SET_AVATAR,
} from "./constains";

const initialState = {
  todos: [],
  updateCount: 0,
  currentPage: 1,
  allTask: [],
  user: {},
  avatar:
    "https://www.meme-arsenal.com/memes/8b6f5f94a53dbc3c8240347693830120.jpg",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case ADD_TODOS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case DELETE_TODOS:
      return {
        ...state,
        todos: [
          ...state.todos.filter((item) => item._id !== action.payload._id),
        ],
      };
    case UPDATE_COUNT:
      return {
        ...state,
        updateCount: action.payload,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ALLTASK:
      return {
        ...state,
        allTask: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
