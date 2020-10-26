import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, TextStyle, View, Image } from "react-native"
import { Screen, Text, HeaderCustom, TextField } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { IconButton } from "react-native-paper"
import ImagePicker from "react-native-image-picker"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const TEXT: TextStyle = {
  fontSize: 20,
  marginLeft: 10,
  marginRight: 60,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 10,
}

const INPUT_CONTENT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
}

const EDIT: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
}

const SAVE: ViewStyle = {
  backgroundColor: color.palette.orange,
}

const PHOTO: ViewStyle = {
  backgroundColor: color.palette.cyan,
  height: 50,
  width: 50,
  borderRadius: 50,
  position: "absolute",
  right: 0,
  bottom: 0,
}

const TEXT_FIELD = {
  width: "80%",
  marginLeft: 10,
}

const IMAGE = {
  width: 200,
  height: 200,
  borderRadius: 200,
}

const PROFILE_CONTENT: ViewStyle = {
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
}

export const ProfileScreen = observer(function ProfileScreen() {
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

  const openPicker = async () => {
    const media: "photo" = "photo"

    const options = {
      title: "Imagen de perfil",
      storageOptions: {
        skipBackup: true,
        path: "TodoApp",
      },
      cancelButtonTitle: "Cancelar",
      takePhotoButtonTitle: "Tomar una foto",
      chooseFromLibraryButtonTitle: "Escoger desde la galería",
      mediaType: media,
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        user.update({ image: response.uri })
      }
    })
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  // console.log("**", user.image)

  return (
    <Screen style={ROOT} preset="scroll">
      <HeaderCustom title="Mi perfil" />
      <ScrollView style={CONTENT}>
        <View style={PROFILE_CONTENT}>
          <View>
            <Image source={{ uri: user.image }} style={IMAGE} />
            <IconButton icon="camera-plus" style={PHOTO} onPress={openPicker} />
          </View>
          <View style={INPUT_CONTENT}>
            {edit ? (
              <>
                <IconButton icon="content-save-edit" style={SAVE} onPress={onSubmit} />
                <TextField
                  style={TEXT_FIELD}
                  value={name}
                  onChange={(e) => setName(e.nativeEvent.text)}
                  autoFocus
                />
              </>
            ) : (
              <>
                <IconButton icon="account-edit" style={EDIT} onPress={onToogleEdit} />
                <Text style={TEXT}>{user.name}</Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})
