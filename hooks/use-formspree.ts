"use client"

import { useState, type FormEvent } from "react"

const FORMSPREE_URL = "https://formspree.io/f/mwvnjyyn"

type FormStatus = "idle" | "submitting" | "success" | "error"

export function useFormspree() {
  const [status, setStatus] = useState<FormStatus>("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return { status, handleSubmit }
}
