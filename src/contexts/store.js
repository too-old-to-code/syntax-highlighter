import React from "react";

const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
const CHANGE_THEME = "CHANGE_THEME";
const CHANGE_FONT_SIZE = "CHANGE_FONT_SIZE";
const TOGGLE_LINE_NUMBERS = "TOGGLE_LINE_NUMBERS";
const CHANGE_LINE_NUMBER_START = "CHANGE_LINE_NUMBER_START";
const RESTORE_STATE = "RESTORE_STATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const UPDATE_CODE = "UPDATE_CODE";
const ADD_TOAST = "ADD_TOAST";
const REMOVE_TOAST = "REMOVE_TOAST";

export const restoreState = (payload) => ({
  type: RESTORE_STATE,
  payload,
});

export const updateCode = (payload) => ({
  type: UPDATE_CODE,
  payload,
});

export const addToast = (payload, dispatch) => {
  const payloadWithDate = { ...payload, date: Date.now() };
  dispatch({ type: ADD_TOAST, payload: payloadWithDate });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dispatch({ type: REMOVE_TOAST, payload: payloadWithDate }));
    }, 5000);
  });
};

export const removeToast = (payload) => ({
  type: REMOVE_TOAST,
  payload,
});

export const changeLanguage = (payload) => ({
  type: CHANGE_LANGUAGE,
  payload,
});

export const changeLineNumberStart = (payload) => ({
  type: CHANGE_LINE_NUMBER_START,
  payload,
});

export const changeTheme = (payload) => ({
  type: CHANGE_THEME,
  payload,
});

export const changeFontSize = (payload) => ({
  type: CHANGE_FONT_SIZE,
  payload,
});

export const toggleLineNumbers = () => ({
  type: TOGGLE_LINE_NUMBERS,
});

export const saveCode = (payload) => ({
  type: SAVE,
  payload,
});

export const deleteCode = (payload) => ({
  type: DELETE,
  payload,
});

export const storeReducer = (state, action) => {
  switch (action.type) {
    case RESTORE_STATE: {
      return {
        ...action.payload,
      };
    }
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }
    case CHANGE_THEME: {
      return {
        ...state,
        currentTheme: action.payload,
      };
    }
    case CHANGE_FONT_SIZE: {
      return {
        ...state,
        fontSize: +action.payload,
      };
    }
    case CHANGE_LINE_NUMBER_START: {
      if (action.payload < 0) return state;
      return {
        ...state,
        lineNumberStart: +action.payload,
      };
    }
    case TOGGLE_LINE_NUMBERS: {
      return {
        ...state,
        lineNumbers: !state.lineNumbers,
      };
    }
    case SAVE: {
      return {
        ...state,
        saved: [...state.saved, action.payload],
      };
    }
    case DELETE: {
      return {
        ...state,
        saved: state.saved.filter((code) => code.date !== action.payload),
      };
    }
    case UPDATE_CODE: {
      const { saved } = state;
      const index = saved.findIndex(
        (code) => code.date === action.payload.date
      );
      const updatedSavedSnippets = [
        ...saved.slice(0, index),
        action.payload,
        ...saved.slice(index + 1),
      ];
      return {
        ...state,
        saved: updatedSavedSnippets,
      };
    }
    case ADD_TOAST: {
      return {
        ...state,
        toasts: [action.payload, ...state.toasts],
      };
    }
    case REMOVE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter(
          (toast) => toast.date !== action.payload.date
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export const initialState = {
  version: 5,
  currentTheme: "3024-day",
  currentLanguage: "javascript",
  fontSize: 8,
  lineNumbers: false,
  lineNumberStart: 0,
  saved: [],
  toasts: [],
};

export const StoreContext = React.createContext();
