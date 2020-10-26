import { color, typography } from "../../theme"
import { IconButton } from "react-native-paper"
import { Text } from "../"
import { TextStyle, ViewStyle, View, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import React, { useRef } from "react"
import Swipeable from "react-native-gesture-handler/Swipeable"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  minHeight: 50,
  marginHorizontal: 10,
  marginBottom: 10,
  padding: 10,
  backgroundColor: color.palette.darkGrey,
  borderRadius: 10,
  overflow: "visible",
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

const DATE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.palette.orange,
  marginHorizontal: 4,
}

const DATE_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
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

const CONTAINER_COMPLETED: ViewStyle = {
  position: "absolute",
  top: 5,
  right: 5,
}

const ICON_COMPLETED = {
  color: color.palette.green,
  fontSize: 20,
}

export interface TodoItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: any
  onPress: any
  onLeft: any
  onRight: any
  completed?: boolean
}
/**
 * Describe your component here
 */
export function TodoItem(props: TodoItemProps) {
  const { item, onPress, onLeft, onRight, completed } = props

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
        <View style={DATE_CONTAINER}>
          <Icon style={DATE} name="calendar-alt" />
          <Text style={DATE}>{item.date}</Text>
        </View>
        <Text style={TEXT}>{item.text}</Text>
        {completed && (
          <View style={CONTAINER_COMPLETED}>
            <Icon style={ICON_COMPLETED} name="check-circle" />
          </View>
        )}
      </TouchableOpacity>
    </Swipeable>
  )
}
