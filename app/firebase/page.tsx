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
import LocationGenerator from "@/components/generator"
import Navbar from '@/components/Navbar';


export default function MailIframeManager() {

    return (
    <div className="min-h-screen bg-background">
    <Navbar />
    {/* Location Generator Section */}
        <LocationGenerator />
    </div>
    )
}