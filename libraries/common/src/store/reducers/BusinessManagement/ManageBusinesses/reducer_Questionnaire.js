import { ADD_QUESTIONS } from "../../../actions/types";

const initialState = {
  questions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
}
