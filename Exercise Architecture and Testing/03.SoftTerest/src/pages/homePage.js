
let main
let section


export function setupHome(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
}
export async function showHome() {
    main.innerHTML = ''
    main.appendChild(section)
   
}