import { HStack } from "native-base";
import { Button, Props } from "./Button";

interface FooterProps extends Props{
  title2: string,
  variant1?: 'blue' | 'gray' | 'black' //ou é outline ou é solid
  variant2?: 'blue' | 'gray' | 'black' //ou é outline ou é solid
}

export function Footer({title, variant1,variant2, title2}: FooterProps){
  return(
    <HStack justifyContent='space-between' bgColor={"gray.100"} paddingY={5} paddingX={6}>
      <Button
      title={title}
      variant={variant1}
      w="48%"
      />
      <Button
      title={title2}
      variant={variant2}
      w="48%"
      />
    </HStack>
  )
}