import { memo, useEffect, useState } from "react"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@tw-material/react"
import { genThemeConfig } from "@tw-material/theme/config"
import IconIcOutlineColorLens from "~icons/ic/outline-color-lens"
import { HexColorPicker } from "react-colorful"

import { useIsFirstRender } from "@/hooks/useFirstRender"

import { useTheme } from "../ThemeProvider"

export const ColorPicker = memo(() => {
  const { colorScheme, setColorScheme } = useTheme()

  const [color, setColor] = useState(colorScheme.color)

  const firstRender = useIsFirstRender()

  useEffect(() => {
    if (color == colorScheme.color || firstRender) {
      return
    }

    const config = genThemeConfig({
      sourceColor: color,
      customColors: [],
    })
    const cssVars = {}
    const sheet = new CSSStyleSheet()
    for (const key in config.utilities) {
      const value = Object.entries(config.utilities[key]).reduce(
        (acc, val) => `${acc}${val[0]}:${val[1]};`,
        ""
      )
      cssVars[key] = value
    }

    for (const key in cssVars) sheet.insertRule(`${key}{${cssVars[key]}}`)
    setColorScheme({ cssVars, color })

    document.adoptedStyleSheets = [sheet]
  }, [color, firstRender])

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="text-inherit" variant="text" isIconOnly>
          <IconIcOutlineColorLens className="pointer-events-none size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 p-2.5">
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  )
})
