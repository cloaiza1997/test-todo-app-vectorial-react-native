import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, ImageStyle, View, ScrollView, TextStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { CONTAINER } from "../../theme/container"
import Icon from "react-native-vector-icons/FontAwesome5"
import { SM_ICON } from "../../theme/icons"

const logo = require("../../assets/img/logo.png")

const LOGO_CONTAINER: ViewStyle = {
  alignItems: "center",
}

const LOGO: ImageStyle = {
  width: 200,
  height: 200,
  marginTop: 50,
  marginBottom: 50,
}

const TITLE: TextStyle = {
  fontSize: 30,
}

const BUTTON: ViewStyle = {
  marginVertical: 20,
  borderRadius: 0,
  backgroundColor: color.palette.cyan,
  width: "90%",
}

const INPUT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  marginVertical: 5,
}

const TEXT_FIELD = {
  width: "100%",
  marginLeft: 20,
}

const ERROR = {
  borderColor: color.palette.angry,
}

export const LoginScreen = observer(function LoginScreen() {
  const { user } = useStores()

  const navigation = useNavigation()
  const [form, setForm] = useState({
    user: "",
    userError: false,
    pass: "",
    passError: false,
  })
  const login = () => {
    const errors = {
      userError: false,
      passError: false,
    }
    if (form.user && form.pass) {
      user.login(form.user, form.pass)
    } else {
      if (!form.user) {
        errors.userError = true
      }

      if (!form.pass) {
        errors.passError = true
      }
      setForm({ ...form, ...errors })
    }
  }

  const onChangeForm = (field, event) => {
    setForm({ ...form, [field]: event.nativeEvent.text })
  }

  useEffect(() => {
    if (user.id) {
      navigation.navigate("main")
      setForm({
        user: "",
        userError: false,
        pass: "",
        passError: false,
      })
    }
  }, [user.id, navigation])

  return (
    <Screen style={CONTAINER} preset="scroll">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={LOGO_CONTAINER}>
          <Image source={logo} style={LOGO} />
          <Text style={TITLE}>TodoApp</Text>
          <View style={INPUT_CONTAINER}>
            <Icon style={SM_ICON} name="user-alt" />
            <TextField
              style={TEXT_FIELD}
              inputStyle={form.userError && ERROR}
              placeholder="Usuario"
              value={form.user}
              onChange={(e) => onChangeForm("user", e)}
            />
          </View>
          <View style={INPUT_CONTAINER}>
            <Icon style={SM_ICON} name="lock" />
            <TextField
              style={TEXT_FIELD}
              inputStyle={form.passError && ERROR}
              placeholder="Contraseña"
              value={form.pass}
              onChange={(e) => onChangeForm("pass", e)}
              secureTextEntry
            />
          </View>
          <Button style={BUTTON} onPress={login}>
            <Text>Iniciar sesión</Text>
          </Button>
        </View>
      </ScrollView>
    </Screen>
  )
})
