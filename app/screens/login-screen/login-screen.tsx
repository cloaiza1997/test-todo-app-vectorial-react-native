import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const login = () => {
    console.log("HOLA")
    navigation.navigate("main")
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="loginScreen" />
      <Button text="Iniciar sesión" onPress={login} />
    </Screen>
  )
})
