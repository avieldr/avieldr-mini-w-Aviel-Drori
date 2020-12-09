import mainScreenTheme from './mainScreenTheme'

const Themes = {
   mainScreenTheme: mainScreenTheme,
}

export const getTheme = (mode) => {
   const Theme = {}
   for (let key in Themes) {
      Theme[key] = Themes[key][mode]
   }
   return Theme
}
