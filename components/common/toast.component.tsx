import { EToastType } from "@/enums/toastType.enum"
import Toast from "react-native-toast-message"

const ToastSystem = (type: EToastType, title: string, message: string) => {
  return Toast.show({
    type: type,
    text1: title,
    text2: message,
    text1Style: { fontSize: 16 },
    text2Style: { fontSize: 14 },
  })
}

export default ToastSystem