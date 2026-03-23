import { Navbar } from "@/components/layout/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LearnFlow — Tasks",
  description: "Manage your learning tasks",
}

export default function TasksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
