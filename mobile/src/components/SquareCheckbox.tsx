import { Checkbox, Text } from "native-base";

interface SquareCheckbox {
  onChange: () => void
  isChecked: boolean,
  text: string
}

export function SquareCheckbox({ onChange, isChecked, text }: SquareCheckbox) {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      value={"Cartão"}
      mb={3}
    >
      <Text>{text}</Text>
    </Checkbox>
  )
}