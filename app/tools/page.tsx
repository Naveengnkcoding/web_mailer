"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Trash2, Send, Code, FileText, Link } from "lucide-react"
import { toast, useToast } from "@/hooks/use-toast"
import LocationGenerator from "@/components/generator"
import Navbar from '@/components/Navbar';


export default function MailIframeManager() {
    const [iframeUrl, setIframeUrl] = useState("")
    const [generatedIframe, setGeneratedIframe] = useState("")

    const generateIframe = () => {
    if (!iframeUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to generate iframe",
        variant: "destructive",
      })
      return
    }

    const iframe = `<iframe src="${iframeUrl}" allowfullscreen></iframe>`
    setGeneratedIframe(iframe)

    toast({
      title: "Success",
      description: "Iframe generated successfully!",
    })
  }


    return (
    <div className="min-h-screen bg-background">
    <Navbar />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
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
        </div>
    )
}