type StyleguideTheme = {
  colors: Record<string, string>
  backgrounds: Record<string, string>
}

export type StyleguideContext = {
  theme: StyleguideTheme
}
export type StyleguideContextFunction = (context: StyleguideContext) => Record<string, string>
