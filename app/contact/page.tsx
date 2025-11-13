"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  function handleSelectChange(value: string) {
    setForm((prev) => ({ ...prev, inquiryType: value }))
  }

  function validateForm() {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.message.trim()) {
      return "All fields except phone are required."
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Please enter a valid email."
    }
    if (!["general", "quote", "support", "partnership"].includes(form.inquiryType)) {
      return "Please select a valid inquiry type."
    }
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          inquiryType: form.inquiryType,
          message: form.message.trim(),
        }),
      })
      console.log(res)
      if (res.ok) {
        setStatus("sent")
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          inquiryType: "",
          message: "",
        })
        setTimeout(() => setStatus("idle"), 3000)
        toast.success("Your message was sent successfully!")
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || "Something went wrong. Try again later.")
        setStatus("error")
        toast.error("Something went wrong. Try again later.")
      }
    } catch (err) {
      console.error(err)
      setError("Network error.")
      setStatus("error")
      toast.error("Something went wrong. Try again later.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="secondary" className="w-fit mx-auto">
              Get In Touch
            </Badge>
            <h1 className="text-4xl font-bold text-balance lg:text-5xl">
              Contact Our Lighting Experts
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Ready to transform your space with innovative lighting solutions?
              Our team is here to help you find the perfect lighting for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Rahul"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Singh"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select
                      value={form.inquiryType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="quote">Request Quote</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your lighting needs..."
                      className="min-h-[120px]"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                      ? "Message Sent!"
                      : "Send Message"}
                  </Button>

                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get In Touch</CardTitle>
                  <CardDescription>Multiple ways to reach our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">1800-8900-686 & +91 83068 82537</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 8AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">glowcasacontact@gmail.com</p>
                      <p className="text-sm text-muted-foreground">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">Mansarover, </p>
                      <p className="text-muted-foreground">Jaipur</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8AM - 6PM</p>
                      <p className="text-muted-foreground">Saturday: 9AM - 4PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Glowcasa?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Free consultation and quote",
                    "Expert installation services",
                    "5-year warranty on all products",
                    "24/7 technical support",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
