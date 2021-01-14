import { createContext, Reducer } from '@frontend-awesome/context'
import styleguideConfig from './styleguide.config.json'

import { StyleguideContext, StyleguideContextFunction } from './context.types'
import { StyleguideGenericAction } from './actions.types'

type StyleguideConfigurationTheme = keyof typeof styleguideConfig.themes

const initialState = {
  theme: styleguideConfig.themes.default
}

const reducer: Reducer<StyleguideContext, StyleguideGenericAction> = (state, action) => {
  switch (action.type) {
    case 'styleguide/switch-theme':
      return {
        ...state,
        theme: action.payload
      }
    default:
      return state
  }
}

const { ContextProvider: StyleguideProvider, useContext, useDispatch } = createContext<
  StyleguideContext,
  StyleguideGenericAction
>(initialState, reducer)

function useStyles(
  styleFunction: StyleguideContextFunction
): {
  classes: Record<string, string>
  switchTheme: (theme: StyleguideConfigurationTheme) => void
}
function useStyles(): { switchTheme: (theme: StyleguideConfigurationTheme) => void }

function useStyles(styleFunction?: StyleguideContextFunction) {
  const context = useContext()
  const dispatch = useDispatch()

  const switchTheme = (theme: StyleguideConfigurationTheme) => {
    if (styleguideConfig.themes[theme]) {
      dispatch({
        type: 'styleguide/switch-theme',
        payload: styleguideConfig.themes[theme]
      })
    }
  }

  return {
    ...(styleFunction !== undefined ? { classes: styleFunction(context) } : null),
    switchTheme
  }
}

export { StyleguideProvider, useStyles }
