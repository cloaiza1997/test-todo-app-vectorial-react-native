import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { UserSnapshot } from "../../models/user/user"
import { TodoSnapshot, TodoListSnapshot } from "../../models/todo/todo"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * LOGIN
   */
  async login(user: string, pass: string): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get("users")

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      // Se realiza la validación de los datos del usuario
      const userLogin = response.data.filter((item) => item.user === user && item.pass === pass)

      if (userLogin.length === 1) {
        const resultUser: UserSnapshot = {
          id: userLogin[0].id,
          name: userLogin[0].name,
          image: userLogin[0].image,
          user: userLogin[0].user,
          pass: userLogin[0].pass,
          todos: userLogin[0].todos,
        }
        return { kind: "ok", user: resultUser }
      } else {
        return { kind: "unauthorized" }
      }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async updateUser(userId, user): Promise<Types.UpdateElement> {
    const response: ApiResponse<any> = await this.apisauce.patch(`/users/${userId}`, user)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", success: true }
  }

  /**
   * CREATE TODO
   */
  async storeTodo(todo): Promise<Types.GetTodoResult> {
    // Se agrega una nueva tarea relacionada al usuario
    const response: ApiResponse<any> = await this.apisauce.post(`users/${todo.userId}/todos`, todo)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultUser: TodoSnapshot = {
        ...response.data,
      }
      return { kind: "ok", todo: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * GET TODOS BY USER
   */
  async getTodos(userId, finished, page = 1, limit = 10): Promise<Types.GetTodoListResult> {
    // Se consultan las tareas del usuario
    const response: ApiResponse<any> = await this.apisauce.get(
      `users/${userId}/todos?finished=${finished}&_sort=date&_order=asc&_page=${page}&_limit=${limit}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultUser: TodoListSnapshot = response.data
      return { kind: "ok", todos: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * DELETE TODO
   */
  async deleteTodo(todoId): Promise<Types.UpdateElement> {
    // Se elimina la tarea del listado
    const response: ApiResponse<any> = await this.apisauce.delete(`/todos/${todoId}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", success: true }
  }

  /**
   * UPDATE TODO
   */
  async updateTodo(todoId, todo): Promise<Types.UpdateElement> {
    const response: ApiResponse<any> = await this.apisauce.patch(`/todos/${todoId}`, todo)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", success: true }
  }
}
