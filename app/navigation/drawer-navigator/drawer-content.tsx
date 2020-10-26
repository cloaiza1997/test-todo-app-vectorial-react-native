import React, { useState } from "react"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Drawer } from "react-native-paper"
import { Text, ViewStyle, TextStyle, ImageStyle, Image, View } from "react-native"
import { useStores } from "../../models"

const logo = require("../../assets/img/logo.png")

const LOGO_CONTAINER: ViewStyle = {
  alignItems: "center",
}

const LOGO: ImageStyle = {
  width: 100,
  height: 100,
  marginTop: 10,
  marginBottom: 10,
}

const TITLE: TextStyle = {
  fontSize: 30,
  marginBottom: 10,
  color: "#FFF",
}

export default function DrawerContent(props) {
  const { navigation } = props
  const [active, setActive] = useState("home")
  const { user } = useStores()

  const onChangeScreen = (screen) => {
    setActive(screen)
    navigation.navigate(screen)
  }

  const logout = () => {
    user.logout()
    onChangeScreen("login")
  }

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <View style={LOGO_CONTAINER}>
          <Image source={logo} style={LOGO} />
          <Text style={TITLE}>TodoApp</Text>
        </View>
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item
          label="Mis tareas"
          active={active === "home"}
          onPress={() => {
            onChangeScreen("home")
          }}
        />
        <Drawer.Item
          label="Reportes"
          active={active === "reports"}
          onPress={() => {
            onChangeScreen("reports")
          }}
        />
        <Drawer.Item
          label="Mi perfil"
          active={active === "profile"}
          onPress={() => {
            onChangeScreen("profile")
          }}
        />
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label="Cerrar sesión" onPress={logout} />
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}
