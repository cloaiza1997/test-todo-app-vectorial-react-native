/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable generator-star-spacing */
import { flow, Instance, SnapshotOut, types, destroy } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { showMessage } from "react-native-flash-message"
/**
 * Model description here for TypeScript hints.
 */
export const TodoModel = types
  .model("Todo")
  .props({
    id: types.identifierNumber,
    text: types.maybe(types.string),
    date: types.maybe(types.string),
    finished: types.optional(types.boolean, false),
  })
  .views((self) => ({}))
  .actions((self) => ({}))

export const TodoListModel = types
  .model("TodoList")
  .props({
    items: types.array(TodoModel),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get completed() {
      return self.items.filter((item) => item.finished)
    },
    get pendding() {
      return self.items.filter((item) => !item.finished)
    },
  }))
  .views((self) => ({
    get completedCount() {
      return self.completed.length
    },
    get penddingCount() {
      return self.pendding.length
    },
  }))
  .actions((self) => ({
    /**
     * Organiza los elementos
     */
    orderData: () => {
      // Se organizan los elementos
      const order = self.items.sort((a, b) => {
        if (a.date > b.date) {
          return 1
        }
        if (a.date < b.date) {
          return -1
        }

        return 0
      })
      self.items = order
    },
  }))
  .actions((self) => ({
    setFinished: (id, finished, message) => {
      // Busca la tarea que concida con el id
      self.items.find((item) => item.id === id).finished = finished
      self.orderData()
      showMessage({
        message: message,
        type: "success",
        icon: "success",
      })
    },
  }))
  .actions((self) => ({
    /**
     * Agrega una nueva tarea
     */
    addTodo: flow(function* (todo) {
      // Se guarda en el servidor
      const result = yield self.environment.api.storeTodo(todo)
      // Se agrega el nuevo elemento
      self.items.push(result.todo)
      self.orderData()
      showMessage({
        message: "Tarea agregada correctamente",
        type: "success",
        icon: "success",
      })
    }),
    /**
     * Cambia el estado de finalizado de una tarea
     */
    activeTodo: flow(function* (id) {
      self.setFinished(id, false, "Tarea activa nuevamente")
      yield self.environment.api.updateTodo(id, { finished: false })
    }),
    /**
     * Marca una tarea como finalizada
     */
    completeTodo: flow(function* (id) {
      self.setFinished(id, true, "Tarea completada")
      yield self.environment.api.updateTodo(id, { finished: true })
    }),
    editTodo: flow(function* (todo) {
      // Se guarda en el servidor
      const response = yield self.environment.api.updateTodo(todo.id, {
        text: todo.text,
        date: todo.date,
      })

      if (response.kind === "ok") {
        // Se actualiza el elemento
        self.items.find((item) => {
          if (item.id === todo.id) {
            item.date = todo.date
            item.text = todo.text
            return true
          }
          return false
        })
        self.orderData()
        showMessage({
          message: "Tarea actualizada correctamente",
          type: "success",
          icon: "success",
        })
      }
    }),
    /**
     * Elimina una tarea
     */
    removeTodo: flow(function* (item) {
      const id = item.id
      destroy(item)
      showMessage({
        message: "Tarea eliminada correctamente",
        type: "success",
        icon: "success",
      })
      yield self.environment.api.deleteTodo(id)
    }),
    /**
     * Paginación
     */
    pagination: flow(function* (userId, finished, page) {
      const response = yield self.environment.api.getTodos(userId, finished, page)

      if (response.todos.length === 0) {
        return false
      } else {
        self.items.push(...response.todos)
        return true
      }
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TodoType = Instance<typeof TodoModel>
export interface Todo extends TodoType {}
type TodoSnapshotType = SnapshotOut<typeof TodoModel>
export interface TodoSnapshot extends TodoSnapshotType {}

type TodoListSnapshotType = SnapshotOut<typeof TodoListModel>
export interface TodoListSnapshot extends TodoListSnapshotType {}
