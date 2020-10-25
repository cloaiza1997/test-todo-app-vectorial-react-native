import { Button, Screen, Text, HeaderCustom, TodoItem } from "../../components"
import { color } from "../../theme"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { LG_ICON } from "../../theme/icons"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { ViewStyle, View, ScrollView, TextStyle, Alert } from "react-native"
import IconFontAwesome from "react-native-vector-icons/FontAwesome5"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import React from "react"

const Tab = createMaterialTopTabNavigator()

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTAINER_TAB: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: 200,
}

const TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 25,
}

const LIST: ViewStyle = {
  marginTop: 10,
  marginBottom: 80,
}

export const TaskActive = observer(function TaskActive() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const navigation = useNavigation()
  const { user } = useStores()

  const openFormEdit = (todo) => {
    navigation.navigate("form", todo)
  }

  console.log(user.todos.pendding)

  return (
    <Screen style={ROOT} preset="scroll">
      <ScrollView>
        {user.todos.penddingCount === 0 ? (
          <View style={CONTAINER_TAB}>
            <IconFontAwesome name="umbrella-beach" style={LG_ICON} />
            <Text style={TITLE}>Estás al día, no tienes tareas pendientes</Text>
          </View>
        ) : (
          <View style={LIST}>
            {user.todos.pendding.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onPress={() => openFormEdit(item)}
                onLeft={{ type: "delete", func: () => user.todos.removeTodo(item) }}
                onRight={{ type: "complete", func: () => user.todos.completeTodo(item.id) }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  )
})

export const TaskInactive = observer(function TaskInactive() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { user } = useStores()
  // Pull in navigation via hook

  const detail = (todo) => {
    Alert.alert(
      "Detalle de la tarea",
      `(${todo.date})\n${todo.text}`,
      [
        {
          text: "Cerrar",
          style: "cancel",
        },
      ],
      {
        cancelable: false,
      },
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <ScrollView>
        {user.todos.completedCount === 0 ? (
          <View style={CONTAINER_TAB}>
            <IconMaterial name="pending-actions" style={LG_ICON} />
            <Text style={TITLE}>Revisa tus tareas activas. No hay tareas finalizadas</Text>
          </View>
        ) : (
          <View style={LIST}>
            {user.todos.completed.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onPress={() => detail(item)}
                onLeft={{ type: "open", func: () => user.todos.activeTodo(item.id) }}
                onRight={{ type: "delete", func: () => user.todos.removeTodo(item) }}
                completed
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  )
})

const CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  alignItems: "flex-end",
}

const BUTTON: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 50,
  alignItems: "center",
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: 20,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const openForm = () => {
    navigation.navigate("form")
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <HeaderCustom title="Mis tareas" />
      <Tab.Navigator>
        <Tab.Screen name="Activas" component={TaskActive} />
        <Tab.Screen name="Finalizadas" component={TaskInactive} />
      </Tab.Navigator>
      <View style={CONTAINER}>
        <Button onPress={openForm} style={BUTTON}>
          <Text>+</Text>
        </Button>
      </View>
    </Screen>
  )
})
