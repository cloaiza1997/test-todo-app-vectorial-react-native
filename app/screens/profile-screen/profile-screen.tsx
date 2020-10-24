import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, TextStyle, View } from "react-native"
import { Screen, Text, HeaderCustom, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { IconButton } from "react-native-paper"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const TEXT: TextStyle = {
  fontSize: 20,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
}

const INPUT_CONTENT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const EDIT: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
}

export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { user } = useStores()

  const [edit, setEdit] = useState(false)

  const onToogleEdit = () => {
    setEdit(!edit)
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <HeaderCustom title="Mi perfil" />
      <ScrollView style={CONTENT}>
        <View style={INPUT_CONTENT}>
          {edit ? <TextField value={user.name} /> : <Text style={TEXT}>{user.name}</Text>}
          <IconButton icon="account-edit" style={EDIT} onPress={onToogleEdit} />
        </View>
      </ScrollView>
    </Screen>
  )
})
