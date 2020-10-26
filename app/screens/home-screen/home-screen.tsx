import { Button, Screen, Text, HeaderCustom, TodoItem } from "../../components"
import { color } from "../../theme"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { LG_ICON } from "../../theme/icons"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { ViewStyle, View, ScrollView, TextStyle, Alert, FlatList } from "react-native"
import IconFontAwesome from "react-native-vector-icons/FontAwesome5"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import React, { useState } from "react"
import Toast from "react-native-simple-toast"

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

const LOADING: TextStyle = {
  textAlign: "center",
  fontSize: 20,
  position: "absolute",
  justifyContent: "center",
  width: "100%",
  paddingTop: 20,
}

const LIST: ViewStyle = {
  marginTop: 10,
}

const LIST_FOOTER: ViewStyle = {
  marginBottom: 80,
}

export const TaskActive = observer(function TaskActive() {
  const navigation = useNavigation()
  const { user } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)

  const openFormEdit = (todo) => {
    navigation.navigate("form", todo)
  }

  console.log(user.todos.pendding)

  const onRefresh = () => {
    setRefreshing(true)
    console.log("** PULL TO REFRESH")
    setTimeout(() => {
      Toast.show("No hay nuevos elementos", Toast.SHORT)
      setRefreshing(false)
    }, 1000)
  }

  const onEndReached = async () => {
    if (!loading && !end && user.todos.penddingCount >= 10) {
      setLoading(true)

      const newPage = page + 1

      const isMore = await user.todos.pagination(user.id, false, newPage)

      if (!isMore) {
        setEnd(true)
      }
      setPage(newPage)
      setLoading(false)
    }
  }

  return (
    <Screen style={ROOT}>
      {user.todos.penddingCount === 0 ? (
        <View style={CONTAINER_TAB}>
          <IconFontAwesome name="umbrella-beach" style={LG_ICON} />
          <Text style={TITLE}>Estás al día, no tienes tareas pendientes</Text>
        </View>
      ) : (
        <View style={LIST}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={user.todos.pendding}
            ListFooterComponent={
              <View style={LIST_FOOTER}>
                {loading && <Text style={LOADING}>Cargando ...</Text>}
                {end && <Text style={LOADING}>Fin del listado</Text>}
              </View>
            }
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onPress={() => openFormEdit(item)}
                onLeft={{ type: "delete", func: () => user.todos.removeTodo(item) }}
                onRight={{ type: "complete", func: () => user.todos.completeTodo(item.id) }}
              />
            )}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        </View>
      )}
    </Screen>
  )
})

export const TaskInactive = observer(function TaskInactive() {
  const { user } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)

  console.log(user.todos.completed)

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

  const onRefresh = () => {
    setRefreshing(true)
    console.log("** PULL TO REFRESH")
    setTimeout(() => {
      Toast.show("No hay nuevos elementos", Toast.SHORT)
      setRefreshing(false)
    }, 1000)
  }

  const onEndReached = async () => {
    if (!loading && !end && user.todos.completedCount >= 10) {
      setLoading(true)

      const newPage = page + 1

      const isMore = await user.todos.pagination(user.id, true, newPage)

      if (!isMore) {
        setEnd(true)
      }
      setPage(newPage)
      setLoading(false)
    }
  }

  return (
    <Screen style={ROOT}>
      {user.todos.completedCount === 0 ? (
        <View style={CONTAINER_TAB}>
          <IconMaterial name="pending-actions" style={LG_ICON} />
          <Text style={TITLE}>Revisa tus tareas activas. No hay tareas finalizadas</Text>
        </View>
      ) : (
        <View style={LIST}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={user.todos.completed}
            ListFooterComponent={
              <View style={LIST_FOOTER}>
                {loading && <Text style={LOADING}>Cargando ...</Text>}
                {end && <Text style={LOADING}>Fin del listado</Text>}
              </View>
            }
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onPress={() => detail(item)}
                onLeft={{ type: "open", func: () => user.todos.activeTodo(item.id) }}
                onRight={{ type: "delete", func: () => user.todos.removeTodo(item) }}
                completed
              />
            )}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        </View>
      )}
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
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: 20,
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()

  const openForm = () => {
    navigation.navigate("form")
  }

  return (
    <Screen style={ROOT}>
      <HeaderCustom title="Mis tareas" />
      <Tab.Navigator>
        <Tab.Screen name="Activas" component={TaskActive} />
        <Tab.Screen name="Finalizadas" component={TaskInactive} />
      </Tab.Navigator>
      <View style={CONTAINER}>
        <Button onPress={openForm} style={BUTTON}>
          <Text style={BUTTON_TEXT}>+</Text>
        </Button>
      </View>
    </Screen>
  )
})
