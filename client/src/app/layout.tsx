import { Provider } from "@/components/ui/provider"
import "./globals.css"

export default function RootLayout(props: { readonly children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}