import { HStack } from "native-base";
import { Button, Props } from "./Button";

interface FooterProps extends Props{
  title2: string
}

export function Footer({title, variant, title2}: FooterProps){
  return(
    <HStack>
      <Button
      title={title}
      variant={variant}
      />
      <Button
      title={title2}
      variant={variant}
      />
    </HStack>
  )
}