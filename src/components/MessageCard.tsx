"use client"

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Message } from "@/models/User"
import { toast } from "sonner"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }
    : MessageCardProps
) => {
    const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(`/api/delete-message/`, {
        params: {
            messageId: message._id
        }
    })
    toast(response.data.message)
    onMessageDelete(message._id as string)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{message.content}</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><X className="w-5 h-5" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this message.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
            </CardHeader>
        </Card>

    )
}

export default MessageCard
