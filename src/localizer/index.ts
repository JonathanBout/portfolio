function changeLanguage(newLanguage: "nl" | "en") {
  window.localStorage.setItem("locale", newLanguage)
  if (window.location.host.match("localhost")) {
    location.reload()
  } else {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("changeLocale", "true")
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()

    let newHost = window.location.origin
    if (newLanguage === "nl") {
      newHost = newHost.replace(/\.com/, ".nl")
    } else {
      newHost = newHost.replace(/\.nl/, ".com")
    }

    if (window.location.origin !== newHost) {
      window.location.href = newHost + newRelativePathQuery
    }
  }
}

export default {
  install: (app: any) => {
    app.config.globalProperties.$updateLocale = changeLanguage
  },

  updateLocale: changeLanguage
}
