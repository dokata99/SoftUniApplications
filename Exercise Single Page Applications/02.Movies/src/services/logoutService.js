import { showHome } from "../pages/homePage.js"
import { setupNavigation } from "../../app.js"

export function logoutUser(){
    sessionStorage.clear()
    setupNavigation()
    showHome()
}