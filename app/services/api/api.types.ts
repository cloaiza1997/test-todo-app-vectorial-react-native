import { GeneralApiProblem } from "./api-problem"
import { UserSnapshot } from "../../models/user/user"
import { TodoSnapshot, TodoListSnapshot } from "../../models/todo/todo"

// export interface User {
//   id: number
//   name: string
//   image: string
// }

// export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
// export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: UserSnapshot } | GeneralApiProblem
export type GetTodoResult = { kind: "ok"; todo: TodoSnapshot } | GeneralApiProblem
export type GetTodoListResult = { kind: "ok"; todo: TodoListSnapshot } | GeneralApiProblem
export type UpdateElement = { kind: "ok"; success: boolean } | GeneralApiProblem
