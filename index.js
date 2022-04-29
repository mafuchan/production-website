const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const userName = formData.get("user-name")
    const userEmail = formData.get("user-email")
    const userFavorite = formData.get("user-favorite")

    localStorage.setItem("name", userName)
    localStorage.setItem("mail", userEmail)
    localStorage.setItem("msg", userFavorite)

    event.target.reset()
    console.log(localStorage)
});