import { StyleguideContext } from './styleguide.types'

export type SwitchThemeAction = {
  type: 'styleguide/switch-theme'
  payload: StyleguideContext['theme']
}

export type StyleguideGenericAction = SwitchThemeAction
