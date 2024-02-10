function changeLanguage(newLanguage: "nl" | "en") {
  window.localStorage.setItem("locale", newLanguage)
  window.location.reload()
}

export default {
  install: (app: any) => {
    app.config.globalProperties.$updateLocale = changeLanguage
  }
}
