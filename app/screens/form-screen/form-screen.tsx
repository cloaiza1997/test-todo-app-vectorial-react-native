import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView } from "react-native"
import { Screen, Text, Header, TextField, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
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
      <Header headerText="Crear tarea" leftIcon="back" onLeftPress={goBack} />
      <ScrollView style={CONTENT}>
        <TextField multiline label="Descripción" placeholder="Todo..." numberOfLines={4} />
        <TextField multiline label="Fecha cumplimiento" placeholder="Fecha..." numberOfLines={4} />
        <Button>
          <Text>Crear tarea</Text>
        </Button>
      </ScrollView>
    </Screen>
  )
})
