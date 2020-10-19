import React from "react"
import { IconButton } from "react-native-paper"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { Text } from "../../components"
import { HomeScreen, ReportsScreen, ProfileScreen, FormScreen } from "../../screens"

const Stack = createNativeStackNavigator()

export default function StackNavigation(props) {
  const { navigation } = props

  const buttonLeft = (screen) => {
    return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reports"
        component={ReportsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="form"
        component={FormScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
