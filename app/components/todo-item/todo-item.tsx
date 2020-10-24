import React, { useRef } from "react"
import { TextStyle, ViewStyle, View, TouchableOpacity } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { IconButton } from "react-native-paper"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  minHeight: 50,
  marginHorizontal: 10,
  marginBottom: 10,
  padding: 10,
  backgroundColor: color.palette.darkGrey,
  borderRadius: 10,
}

const BUTTON_CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignContent: "center",
  marginBottom: 10,
  padding: 10,
}
const BUTTON_LEFT_CONTAINER: ViewStyle = { marginLeft: 10 }
const BUTTON_RIGHT_CONTAINER: ViewStyle = { marginRight: 10 }

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  color: color.text,
}

const icons = {
  complete: "playlist-check",
  delete: "delete",
  open: "restore",
}

const ICON_COMPLETE: ViewStyle = {
  backgroundColor: color.palette.green,
}

const ICON_DELETE: ViewStyle = {
  backgroundColor: color.palette.angry,
}

const ICON_OPEN: ViewStyle = {
  backgroundColor: color.palette.cyan,
}

export interface TodoItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: any
  onPress: any
  onLeft: any
  onRight: any
}
/**
 * Describe your component here
 */
export function TodoItem(props: TodoItemProps) {
  const { item, onPress, onLeft, onRight } = props

  const swipeRef = useRef(null)

  const getIcon = (type) => {
    let name
    let style

    switch (type) {
      case "complete":
        name = icons.complete
        style = ICON_COMPLETE
        break
      case "delete":
        name = icons.delete
        style = ICON_DELETE
        break
      case "open":
        name = icons.open
        style = ICON_OPEN
        break
      default:
        break
    }

    return { name, style }
  }

  const renderLeftActions = () => {
    const icon = getIcon(onRight.type)
    return (
      <View style={[BUTTON_CONTAINER, BUTTON_LEFT_CONTAINER]}>
        <IconButton
          icon={icon.name}
          style={icon.style}
          size={30}
          onPress={() => {
            swipeRef.current.close()
            onRight.func()
          }}
        />
      </View>
    )
  }

  const renderRightActions = () => {
    const icon = getIcon(onLeft.type)
    return (
      <View style={[BUTTON_CONTAINER, BUTTON_RIGHT_CONTAINER]}>
        <IconButton
          icon={icon.name}
          style={icon.style}
          size={30}
          onPress={() => {
            swipeRef.current.close()
            onLeft.func()
          }}
        />
      </View>
    )
  }

  return (
    <Swipeable
      ref={swipeRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <TouchableOpacity style={CONTAINER} onPress={onPress}>
        <Text style={TEXT}>{item.text}</Text>
        <Text style={TEXT}>{item.date}</Text>
      </TouchableOpacity>
    </Swipeable>
  )
}
