import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text, HeaderCustom } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import { LoginScreen, ProfileScreen } from "../../screens"

const Tab = createMaterialTopTabNavigator()

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
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
      <HeaderCustom title="Listado de tareas" />
      <Tab.Navigator>
        <Tab.Screen name="Activas" component={TaskActive} />
        <Tab.Screen name="Inactivas" component={TaskInactive} />
      </Tab.Navigator>
      <Button text="+" onPress={openForm} />
    </Screen>
  )
})

export const TaskActive = observer(function TaskActive() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Activas" />
    </Screen>
  )
})

export const TaskInactive = observer(function TaskInactive() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Inactivas" />
    </Screen>
  )
})
