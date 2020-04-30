import { SurveyQuestion } from "./surveyQuestion";
import { MatTableDataSource } from "@angular/material";

export class SurveySession {
  id: number;
  startsAt: String;
  endsAt: String;
  questions: SurveyQuestion[];
  questionsDataSource: MatTableDataSource<SurveyQuestion>;
}
