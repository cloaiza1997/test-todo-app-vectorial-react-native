import React from "react"
import StackNavigation from "./drawer-stack-navigation"
import { createDrawerNavigator } from "@react-navigation/drawer"
import DrawerContent from "./drawer-content"

const Drawer = createDrawerNavigator()

export default function DrawerNavigatior() {
  return (
    <Drawer.Navigator
      initialRouteName="main"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="main" component={StackNavigation} />
    </Drawer.Navigator>
  )
}
