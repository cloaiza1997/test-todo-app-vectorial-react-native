import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView } from "react-native"
import { Screen, Text, Header, TextField, Button, DatePicker } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/FontAwesome5"
import { SM_ICON } from "../../theme/icons"
import { showMessage } from "react-native-flash-message"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
}

const BUTTON: ViewStyle = {
  marginTop: 20,
}

export const FormScreen = observer(function FormScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { user } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const [text, setText] = useState("")
  const [date, setDate] = useState("")

  const addTodo = () => {
    if (text && date) {
      user.todos.addTodo({ userId: user.id, text, date, finished: false })
      setText("")
      setDate("")
    } else {
      showMessage({
        message: "Diligencia correctamente los datos",
        type: "danger",
        icon: "warning",
      })
    }
  }

  const onChangeText = (e) => {
    setText(e.nativeEvent.text)
  }

  const onChangeDate = (date) => {
    setDate(date)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText="Crear tarea" leftIcon="back" onLeftPress={goBack} />
      <ScrollView style={CONTENT}>
        <TextField
          label="Descripción"
          placeholder="Todo..."
          multiline
          numberOfLines={4}
          value={text}
          onChange={onChangeText}
        />

        <DatePicker label="Fecha de cumplimiento" onChange={onChangeDate} defaultDate={date} />

        <Button style={BUTTON} onPress={addTodo}>
          <Icon style={SM_ICON} name="save" />
          <Text>Crear tarea</Text>
        </Button>
      </ScrollView>
    </Screen>
  )
})
