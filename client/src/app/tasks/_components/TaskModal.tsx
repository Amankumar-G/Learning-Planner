"use client"

import {
  Box,
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import type { Task } from "../dto/task.dto"
import {
  normalizeTaskForm,
  validateTaskForm,
  type TaskFormValues,
} from "../_utils/taskValidation"
import { compactButtonStyles, primaryButtonStyles } from "@/components/ui/button-styles"

type TaskModalMode = "create" | "edit" | "delete"

interface Props {
  open: boolean
  mode: TaskModalMode
  task?: Task
  isPending: boolean
  onClose: () => void
  onCreate: (values: TaskFormValues) => Promise<void>
  onEdit: (taskId: number, values: TaskFormValues) => Promise<void>
  onDelete: (taskId: number) => Promise<void>
}

const FORM_ID = "task-modal-form"

function readFormText(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export function TaskModal({
  open,
  mode,
  task,
  isPending,
  onClose,
  onCreate,
  onEdit,
  onDelete,
}: Readonly<Props>) {
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setFormError(null)
    }
  }, [open])

  let title = "Delete task"
  if (mode === "create") {
    title = "Add new task"
  } else if (mode === "edit") {
    title = "Edit task"
  }

  const subtitle =
    mode === "delete"
      ? "This action cannot be undone."
      : "Use the form below to keep your learning plan up to date."

  let submitLabel = "Delete task"
  if (mode === "create") {
    submitLabel = "Add task"
  } else if (mode === "edit") {
    submitLabel = "Save changes"
  }

  async function handleFormAction(formData: FormData) {
    setFormError(null)

    try {
      if (mode === "delete") {
        if (!task) {
          throw new Error("Task not found")
        }
        await onDelete(task.id)
        onClose()
        return
      }

      const values = normalizeTaskForm({
        title: readFormText(formData, "title"),
        description: readFormText(formData, "description"),
      })

      const validationError = validateTaskForm(values)
      if (validationError) {
        setFormError(validationError)
        return
      }

      if (mode === "create") {
        await onCreate(values)
        onClose()
        return
      }

      if (!task) {
        throw new Error("Task not found")
      }

      await onEdit(task.id, values)
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong"
      setFormError(message)
    }
  }

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(event) => {
        if (!event.open) {
          onClose()
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(24, 30, 36, 0.42)" backdropFilter="blur(2px)" />
        <Dialog.Positioner p={{ base: 3, md: 6 }}>
          <Dialog.Content
            bg="var(--surface)"
            border="1px solid"
            borderColor="var(--outline)"
            rounded={{ base: "2xl", md: "3xl" }}
            maxW="2xl"
              shadow="var(--surface-shadow-strong)"
          >
            <Dialog.Header pb={3} px={{ base: 5, md: 7 }} pt={{ base: 5, md: 6 }}>
              <Stack gap={1.5}>
                <Dialog.Title fontSize="xl" fontWeight="800" color="var(--ink)">
                  {title}
                </Dialog.Title>
                <Text fontSize="sm" color="var(--muted)">
                  {subtitle}
                </Text>
              </Stack>
            </Dialog.Header>

            <Dialog.Body px={{ base: 5, md: 7 }} py={3}>
              <form id={FORM_ID} action={handleFormAction}>
                {mode === "delete" ? (
                  <Box
                    border="1px solid"
                    borderColor="var(--danger-border)"
                    rounded="xl"
                    bg="var(--danger-bg)"
                    px={{ base: 4, md: 5 }}
                    py={{ base: 3.5, md: 4 }}
                  >
                    <Text color="var(--danger-ink)" fontSize="sm">
                      Are you sure you want to delete &quot;{task?.title ?? "this task"}&quot;?
                    </Text>
                  </Box>
                ) : (
                  <Stack gap={{ base: 4, md: 4.5 }}>
                    <Field.Root required>
                      <Field.Label color="var(--ink)">Title</Field.Label>
                      <Input
                        name="title"
                        defaultValue={mode === "edit" ? task?.title ?? "" : ""}
                        placeholder="Build authentication flow"
                        bg="var(--surface-elevated)"
                        borderColor="var(--outline)"
                        h="44px"
                        px={4}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="var(--ink)">Description</Field.Label>
                      <Textarea
                        name="description"
                        defaultValue={mode === "edit" ? task?.description ?? "" : ""}
                        placeholder="Write tests, add modal, and verify API responses..."
                        rows={5}
                        bg="var(--surface-elevated)"
                        borderColor="var(--outline)"
                        resize="vertical"
                        px={4}
                        py={3}
                      />
                    </Field.Root>
                  </Stack>
                )}
              </form>

              {formError && (
                <Text mt={4} fontSize="sm" color="var(--danger-ink)" fontWeight="600">
                  {formError}
                </Text>
              )}
            </Dialog.Body>

            <Dialog.Footer px={{ base: 5, md: 7 }} pb={{ base: 5, md: 6 }} pt={3} gap={3}>
              <Button
                variant="outline"
                borderColor="var(--outline)"
                color="var(--muted)"
                onClick={onClose}
                disabled={isPending}
                {...compactButtonStyles}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form={FORM_ID}
                bg={mode === "delete" ? "var(--danger-solid)" : "var(--accent)"}
                color="white"
                loading={isPending}
                _hover={{ bg: mode === "delete" ? "var(--danger-strong)" : "var(--accent-strong)" }}
                {...primaryButtonStyles}
              >
                {submitLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
