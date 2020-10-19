import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const FormScreen = observer(function FormScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerText="Crear tarea"
        // headerTx="Adiós" // Traducción
        leftIcon="back"
        onLeftPress={goBack}
      />
      <Text preset="header" text="formScreen" />
    </Screen>
  )
})
