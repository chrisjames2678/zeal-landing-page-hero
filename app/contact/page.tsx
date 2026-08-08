import type { Metadata } from "next"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata: Metadata = {
  title: "Contact — Zeal Travel",
  description: "Questions, ideas, or just want to talk travel. Get in touch with the Zeal team.",
}

export default function ContactPage() {
  return <ContactContent />
}
