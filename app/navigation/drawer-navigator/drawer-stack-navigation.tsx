import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { HomeScreen, ReportsScreen, ProfileScreen, FormScreen } from "../../screens"

const Stack = createNativeStackNavigator()

export default function StackNavigation() {
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
