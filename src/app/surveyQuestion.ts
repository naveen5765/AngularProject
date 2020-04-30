import { SurveyQuestionAnswer } from "./surveyQuestionAnswer";

export class SurveyQuestion {
  questionId?: number;
  question: String;
  questionAnswers?: SurveyQuestionAnswer[];
  id: String;
  value: String;
  answer: number;
}
