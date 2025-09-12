"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: Omit<ColorModeProviderProps, "defaultTheme">) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider
        defaultTheme="light"
        {...props}
      />
    </ChakraProvider>
  )
}
