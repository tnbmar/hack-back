export interface taskDto {
  content: string;
  lessonId: number;
  currentAnswerId: number;

}


export interface checkTaskDto {
  task_id: number;
  answer_id: number;
}
