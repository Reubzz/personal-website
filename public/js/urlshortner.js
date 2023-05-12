function deleteLink(linkId) {
    window.location.assign("/urlshortner/delete/" + linkId)
}
function disableLink(linkId) {
    window.location.assign("/urlshortner/disable/" + linkId)
}
function openMobileMenu(menu) {
    menu.classList.toggle('open')
}
if (window.history.replaceState)
    window.history.replaceState(null, null, window.location.href);