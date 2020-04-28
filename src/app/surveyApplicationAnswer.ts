import { SurveyQuestion } from './surveyQuestion';
import { SurveyQuestionAnswer } from './surveyQuestionAnswer';

export class SurveyApplicationAnswer{
    answer: String;
    surveyQuestion?: SurveyQuestion;
    surveyQuestionAnswer?: SurveyQuestionAnswer;
}