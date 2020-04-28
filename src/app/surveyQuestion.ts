import { SurveyQuestionAnswer } from './surveyQuestionAnswer';
import { SurveySession } from './surveySession';

export class SurveyQuestion{
    questionId?: number;
    question: String;
    questionAnswers?: SurveyQuestionAnswer[];
    session?: SurveySession;
}