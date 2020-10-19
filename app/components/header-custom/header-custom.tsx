import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { Header } from "../header/header"
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface HeaderCustomProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  title: string
}

/**
 * Describe your component here
 */
export function HeaderCustom(props: HeaderCustomProps) {
  const { style, title } = props

  const navigation = useNavigation()

  return (
    <View style={[CONTAINER, style]}>
      <Header headerText={title} leftIcon="menu" onLeftPress={() => navigation.openDrawer()} />
    </View>
  )
}
