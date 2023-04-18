function deleteLink(linkId) {
    window.location.assign("/urlshortner/delete/" + linkId)
}
function openMobileMenu(menu) {
    menu.classList.toggle('open')
}