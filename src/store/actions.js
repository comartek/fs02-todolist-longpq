import {
  SET_TODOS,
  ADD_TODOS,
  DELETE_TODOS,
  UPDATE_COUNT,
  CURRENT_PAGE,
  SET_ALLTASK,
  SET_USER,
  SET_AVATAR,
  SET_PAGINATION_VISIBLE,
  SET_FILTER_IS_CHOOSE,
} from "./constains";

export const setTodos = (data) => ({
  type: SET_TODOS,
  payload: data,
});

export const addTodos = (data) => ({
  type: ADD_TODOS,
  payload: data,
});

export const deleteTodos = (data) => ({
  type: DELETE_TODOS,
  payload: data,
});

export const updateCount = (data) => ({
  type: UPDATE_COUNT,
  payload: data,
});

export const currentPage = (data) => ({
  type: CURRENT_PAGE,
  payload: data,
});

export const setAllTask = (data) => ({
  type: SET_ALLTASK,
  payload: data,
});

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

export const setAvatar = (data) => ({
  type: SET_AVATAR,
  payload: data,
});

export const setPaginationVisible = (data) => ({
  type: SET_PAGINATION_VISIBLE,
  payload: data,
});

export const setFilterIsChoose = (data) => ({
  type: SET_FILTER_IS_CHOOSE,
  payload: data,
});
