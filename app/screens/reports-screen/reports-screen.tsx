import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Screen, Text, HeaderCustom } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import IconFontAwesome from "react-native-vector-icons/FontAwesome5"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import { LG_ICON } from "../../theme/icons"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
}

const CONTAINER_TAB: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 30,
}

const TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 20,
}

const COUNT: TextStyle = {
  textAlign: "center",
  fontSize: 30,
  fontWeight: "bold",
}

const COMPLETED: TextStyle = {
  color: color.palette.green,
}

const PENDDING: TextStyle = {
  color: color.palette.angry,
}

export const ReportsScreen = observer(function ReportsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { user } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <HeaderCustom title="Reportes" />
      <View style={CONTENT}>
        <View style={CONTAINER_TAB}>
          <IconMaterial name="pending-actions" style={LG_ICON} />
          <Text style={TITLE}>Tareas pendientes</Text>
          <Text style={[COUNT, PENDDING]}>{user.todos.penddingCount}</Text>
        </View>
        <View style={CONTAINER_TAB}>
          <IconFontAwesome name="umbrella-beach" style={LG_ICON} />
          <Text style={TITLE}>Tareas complentadas</Text>
          <Text style={[COUNT, COMPLETED]}>{user.todos.completedCount}</Text>
        </View>
      </View>
    </Screen>
  )
})
