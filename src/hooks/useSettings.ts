import { useLocalStorage } from "usehooks-ts"

const defaultSettings = {
  pageSize: "500",
  resizerHost: "",
}

export default function useSettings() {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings)
  return { settings, setSettings }
}
