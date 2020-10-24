import React, { useState, useEffect } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5"
import { SM_ICON } from "../../theme/icons"

const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.lighterGrey,
  minHeight: 44,
  fontSize: 18,
  borderRadius: 10,
  backgroundColor: color.palette.darkGrey,
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderWidth: 2,
  borderColor: color.palette.darkGrey,
  width: "100%",
  marginRight: 20,
}

const CONTAINER: ViewStyle = {
  paddingVertical: 5,
}

const INPUT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  // justifyContent: "center",
  marginVertical: 5,
  width: "85%",
}

export interface DatePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onChange: any
  label?: string
  defaultDate?: string
}

/**
 * Describe your component here
 */
export function DatePicker(props: DatePickerProps) {
  const { onChange, label, defaultDate } = props
  const [open, setOpen] = useState(false)
  const [textDate, setTextDate] = useState(defaultDate)
  const [date, setDate] = useState(defaultDate ? new Date(defaultDate) : new Date())

  const hideDatePicker = () => {
    setOpen(false)
  }

  const handlerConfirm = (date) => {
    hideDatePicker() // En ios no se cierra automáticamente, se debe de forzar
    const dateFormated = moment(date).format("YYYY/MM/DD") // Formateo de fecha
    onChange(dateFormated)
    setTextDate(dateFormated)
    setDate(date)
  }

  useEffect(() => {
    if (!defaultDate) {
      setTextDate("")
    }
  }, [defaultDate])

  return (
    <View style={CONTAINER}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        {label && <Text preset="fieldLabel">{label}</Text>}
        <View style={INPUT_CONTAINER}>
          <Text style={[INPUT, textDate && { color: color.text }]}>{textDate || "aaaa/mm/dd"}</Text>
          <Icon style={SM_ICON} name="calendar-alt" />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={open}
        locale="es-co"
        mode="date"
        date={date}
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}
