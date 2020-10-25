/* eslint-disable generator-star-spacing */
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { TodoListModel } from "../todo/todo"
import { showMessage } from "react-native-flash-message"
/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.maybe(types.number),
    name: types.maybe(types.string),
    user: types.optional(types.maybe(types.string), ""),
    pass: types.optional(types.maybe(types.string), ""),
    image: types.maybe(types.string),
    todos: types.optional(TodoListModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setData(user) {
      self.id = user.id
      self.image = user.image
      self.name = user.name
      self.todos = user.todos
    },
  }))
  .actions((self) => ({
    login: flow(function* (user, pass) {
      const result = yield self.environment.api.login(user, pass)

      if (result.kind === "ok") {
        const user = result.user
        // Consulta los todos del usuario
        const todos = yield self.environment.api.getTodos(user.id)
        user.todos = todos.todo
        self.setData(user)
        // Ordena la data
        self.todos.orderData()
      } else {
        showMessage({
          message: "Usuario y/o contraseña incorrectos",
          type: "danger",
          icon: "warning",
        })
      }
    }),
    logout() {
      self.setData({
        id: undefined,
        name: undefined,
        image: undefined,
        user: undefined,
        pass: undefined,
        todos: undefined,
      })
    },
    update: flow(function* (user) {
      const result = yield self.environment.api.updateUser(self.id, user)
      if (result.kind === "ok") {
        self.name = user.name
        showMessage({
          message: "Usuario actualizado correctamente",
          type: "success",
          icon: "success",
        })
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
