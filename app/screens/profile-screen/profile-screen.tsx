import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, TextStyle, View } from "react-native"
import { Screen, Text, HeaderCustom, TextField } from "../../components"
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
  marginLeft: 10,
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

const SAVE: ViewStyle = {
  backgroundColor: color.palette.orange,
}

const TEXT_FIELD = {
  width: "80%",
  marginLeft: 10,
}

export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { user } = useStores()

  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(user.name)

  const onToogleEdit = () => {
    setEdit(!edit)
  }

  const onSubmit = () => {
    if (name !== user.name) user.update({ name })
    onToogleEdit()
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <HeaderCustom title="Mi perfil" />
      <ScrollView style={CONTENT}>
        <View style={INPUT_CONTENT}>
          {edit ? (
            <>
              <IconButton icon="content-save-edit" style={SAVE} onPress={onSubmit} />
              <TextField
                style={TEXT_FIELD}
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
              />
            </>
          ) : (
            <>
              <IconButton icon="account-edit" style={EDIT} onPress={onToogleEdit} />
              <Text style={TEXT}>{user.name}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  )
})
