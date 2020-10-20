import React, { useState } from "react"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Drawer } from "react-native-paper"

export default function DrawerContent(props) {
  const { navigation } = props
  const [active, setActive] = useState("home")

  const onChangeScreen = (screen) => {
    setActive(screen)
    navigation.navigate(screen)
  }

  return (
    <DrawerContentScrollView>
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
        <Drawer.Item
          label="Cerrar sesión"
          onPress={() => {
            onChangeScreen("login")
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}
