function deleteLink(linkId) {
    let confirmation = confirm("Are you sure you want to Delete this shortened link?")
    if (confirmation)
        return window.location.assign("/urlshortner/delete/" + linkId)
}
function disableLink(linkId) {
    let confirmation = confirm("Are you sure you want to Disable this shortened link?")
    if (confirmation)
        return window.location.assign("/urlshortner/disable/" + linkId)
}
function openMobileMenu(menu) {
    menu.classList.toggle('open')
}
if (window.history.replaceState)
    window.history.replaceState(null, null, window.location.href);