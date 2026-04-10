"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { Toaster } from "./toaster"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: Readonly<ColorModeProviderProps>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
