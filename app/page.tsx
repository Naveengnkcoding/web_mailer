"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Trash2, Send, Code, FileText, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmailRecipient {
  id: string
  email: string
}

interface HtmlFile {
  name: string
  path: string
  url: string
}

export default function MailIframeManager() {
  const [fromEmail, setFromEmail] = useState("")
  const [recipients, setRecipients] = useState<EmailRecipient[]>([{ id: "1", email: "" }])
  const [emailContent, setEmailContent] = useState("")
  const [htmlContent, setHtmlContent] = useState("")
  const [contentType, setContentType] = useState<"text" | "html">("text")
  const [iframeUrl, setIframeUrl] = useState("")
  const [generatedIframe, setGeneratedIframe] = useState("")
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [htmlFiles, setHtmlFiles] = useState<HtmlFile[]>([])
  const { toast } = useToast()

  // Mock HTML files - in a real app, this would fetch from your source folder
  useEffect(() => {
    const mockFiles: HtmlFile[] = [
      { name: "index.html", path: "/index.html", url: `${window.location.origin}/index.html` },
      { name: "about.html", path: "/about.html", url: `${window.location.origin}/about.html` },
      { name: "contact.html", path: "/contact.html", url: `${window.location.origin}/contact.html` },
      { name: "services.html", path: "/services.html", url: `${window.location.origin}/services.html` },
      { name: "portfolio.html", path: "/portfolio.html", url: `${window.location.origin}/portfolio.html` },
    ]
    setHtmlFiles(mockFiles)
  }, [])

  const addRecipient = () => {
    const newRecipient: EmailRecipient = {
      id: Date.now().toString(),
      email: "",
    }
    setRecipients([...recipients, newRecipient])
  }

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((r) => r.id !== id))
    }
  }

  const updateRecipient = (id: string, email: string) => {
    setRecipients(recipients.map((r) => (r.id === id ? { ...r, email } : r)))
  }

  const generateIframe = () => {
    if (!iframeUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to generate iframe",
        variant: "destructive",
      })
      return
    }

    const iframe = `<iframe src="${iframeUrl}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`
    setGeneratedIframe(iframe)

    const output = `Generated iframe for: ${iframeUrl}`
    setConsoleOutput((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${output}`])

    toast({
      title: "Success",
      description: "Iframe generated successfully!",
    })
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const sendEmail = async () => {
    const validRecipients = recipients.filter((r) => r.email.trim())

    if (!fromEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter sender email",
        variant: "destructive",
      })
      return
    }

    if (validRecipients.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one recipient email",
        variant: "destructive",
      })
      return
    }

    if (!emailContent.trim() && !htmlContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter email content",
        variant: "destructive",
      })
      return
    }

    // Mock email sending - in a real app, this would call your email API
    const emailData = {
      from: fromEmail,
      to: validRecipients.map((r) => r.email),
      content: contentType === "text" ? emailContent : htmlContent,
      type: contentType,
    }

    console.log("Sending email:", emailData)

    const output = `Email sent from ${fromEmail} to ${validRecipients.length} recipient(s)`
    setConsoleOutput((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${output}`])

    toast({
      title: "Success",
      description: "Email sent successfully! (Mock)",
    })
  }

  const clearConsole = () => {
    setConsoleOutput([])
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Mail & Iframe Manager</h1>
          <p className="text-muted-foreground">Send emails, generate iframes, and manage HTML files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Email Composer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">From Email</label>
                <Input
                  type="email"
                  placeholder="sender@example.com"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <Button size="sm" variant="outline" onClick={addRecipient}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {recipients.map((recipient) => (
                    <div key={recipient.id} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="recipient@example.com"
                        value={recipient.email}
                        onChange={(e) => updateRecipient(recipient.id, e.target.value)}
                      />
                      {recipients.length > 1 && (
                        <Button size="sm" variant="outline" onClick={() => removeRecipient(recipient.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Tabs value={contentType} onValueChange={(v) => setContentType(v as "text" | "html")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Content</TabsTrigger>
                  <TabsTrigger value="html">HTML Content</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="space-y-2">
                  <Textarea
                    placeholder="Enter your email content here..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    rows={6}
                  />
                </TabsContent>
                <TabsContent value="html" className="space-y-2">
                  <Textarea
                    placeholder="Paste your HTML content here..."
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>

              <Button onClick={sendEmail} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Iframe Generator Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Iframe Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Website URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={iframeUrl}
                  onChange={(e) => setIframeUrl(e.target.value)}
                />
              </div>

              <Button onClick={generateIframe} className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Generate Iframe
              </Button>

              {generatedIframe && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Iframe Code</label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedIframe, "Iframe code")}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Textarea value={generatedIframe} readOnly rows={3} className="font-mono text-sm" />
                </div>
              )}

              {generatedIframe && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="border rounded-lg p-2 bg-muted/50">
                    <div dangerouslySetInnerHTML={{ __html: generatedIframe }} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Console Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Console Output
              </CardTitle>
              <Button size="sm" variant="outline" onClick={clearConsole}>
                Clear Console
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
              {consoleOutput.length === 0 ? (
                <div className="text-gray-500">Console output will appear here...</div>
              ) : (
                consoleOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* HTML Files List Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              HTML Files Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {htmlFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{file.path}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{file.name.split(".").pop()}</Badge>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(file.url, "File URL")}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy URL
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
