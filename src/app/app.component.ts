import { SurveySession } from "./surveySession";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SurveyQuestion } from "./surveyQuestion";
import { SurveyQuestionAnswer } from "./surveyQuestionAnswer";
import { MatTableDataSource } from "@angular/material";
import { IAssessment } from "./assessment.model";
import { getSessionDetails } from "./utils/sessionDetails";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  //variables for fake data:
  question: SurveyQuestion;
  questionAnswer: SurveyQuestionAnswer;
  questionAnswers: SurveyQuestionAnswer[];
  session: SurveySession;
  sessions: SurveySession[];
  radioButtonQuestions: SurveyQuestion[];
  radioButtonQuestionForm: FormGroup;
  radioButtonGridQuestions: SurveyQuestion[];
  radioButtonGridQuestionForm: FormGroup;
  displayedColumns: string[] = [
    "question",
    "answer_one",
    "answer_two",
    "answer_three",
    "answer_four",
    "answer_five",
    "not_applicable",
  ];
  dataSource: MatTableDataSource<IAssessment>;

  constructor(private formBuilder: FormBuilder) {
    //initialize the fake data:
    this.radioButtonQuestions = [];
    this.radioButtonGridQuestions = [];

    //for radiobuttonquestions
    for (let i = 1; i <= 5; i++) {
      this.question = new SurveyQuestion();
      this.question.question = "Radio " + i;
      this.question.questionId = i;

      this.questionAnswers = [];
      for (let j = 1; j <= 3; j++) {
        this.questionAnswer = new SurveyQuestionAnswer();
        this.questionAnswer.answer = "Answer " + j;
        this.questionAnswer.questionAnswerId = j;
        this.questionAnswer.questionId = i;
        this.questionAnswers.push(this.questionAnswer);
      }
      this.question.questionAnswers = this.questionAnswers;
      this.radioButtonQuestions.push(this.question);
    }

    let radiogroup: any = {};
    this.radioButtonQuestionForm = new FormGroup(radiogroup);
    this.radioButtonQuestions.forEach((question) => {
      radiogroup[question.questionId] = new FormControl("");
    });

    //for radiobuttongridquestions

    this.sessions = [];
    getSessionDetails().sessions.forEach((session) => {
      this.session = new SurveySession();
      this.session.id = session.id;
      this.session.startsAt = session.startsAt;
      this.session.endsAt = session.endsAt;
      this.session.questions = [];
      session.questions.forEach((question) => {
        this.question = new SurveyQuestion();
        this.question.id = session.id + "" + question.id;
        this.question.value = question.value;
        this.question.answer = Math.floor(Math.random() * 6) + 1;
        this.session.questions.push(this.question);
      });

      this.session.questions.forEach((question) => {});

      this.session.questionsDataSource = new MatTableDataSource<SurveyQuestion>(
        this.session.questions
      );
      this.sessions.push(this.session);
    });
    // this.session1 = new SurveySession();
    // this.session1.startsAt = "9";
    // this.session1.endsAt = "11";
    // this.session2 = new SurveySession();
    // this.session2.startsAt = "12";
    // this.session2.endsAt = "14";
    // for (let i = 1; i <= 2; i++) {
    //   this.question = new SurveyQuestion();
    //   this.question.question = "Radiogrid " + i;
    //   this.question.questionId = i;
    //   if (i % 2 === 0) {
    //     this.question.session = this.session1;
    //   } else {
    //     this.question.session = this.session2;
    //   }
    //   this.radioButtonGridQuestions.push(this.question);
    // }
    // console.log(this.radioButtonGridQuestions);

    let radioGridGroup: any = {};
    this.radioButtonGridQuestionForm = new FormGroup(radiogroup);
    this.radioButtonGridQuestions.forEach((question) => {
      radioGridGroup[question.questionId] = new FormControl("");
    });
  }

  onSubmit() {
    for (const field in this.radioButtonQuestionForm.controls) {
      const radioControl = this.radioButtonQuestionForm.get(field);
      console.log(radioControl.value);
    }

    for (const item in this.radioButtonGridQuestionForm.controls) {
      const radioGridControl = this.radioButtonGridQuestionForm.get(item);
      console.log(radioGridControl.value);
    }
  }

  setAssessmentLevel(sessionId, assessment, value) {
    this.sessions[sessionId - 1].questions[
      assessment.id.substr(sessionId) - 1
    ] = {
      ...assessment,
      answer: value,
    };

    console.log(this.sessions);
  }
}
