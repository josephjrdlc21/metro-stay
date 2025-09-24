import { Alert } from "@chakra-ui/react"

interface NotificationProps {
  status?: "info" | "warning" | "success" | "error" | "failed"
  title: string
}

export default function AppNotification({ status = "error", title }: NotificationProps){
    return(
        <Alert.Root status={status === "failed" ? "error" : status}>
            <Alert.Indicator />
            <Alert.Title>{title}</Alert.Title>
        </Alert.Root>
    );
}