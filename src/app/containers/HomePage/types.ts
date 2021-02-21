export type TodosDataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodosParams = {
  title_like?: string;
  completed?: boolean;
};

export type TodosObject = {
  loading: boolean;
  error: string;
  data: Array<TodosDataType>;
};

export interface TodosState {
  todos: TodosObject;
}
