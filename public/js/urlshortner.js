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


const userLogoutBtn = document.getElementById('logout-btn');

function logoutHover() {
    const logoutIcon = '<i class="fa-solid fa-right-from-bracket"></i>';

    userLogoutBtn.innerHTML = `${logoutIcon} logout`;
}

function logoutHoverLeave(username, userId, userRole) {
    const userIcon = '<i class="fa-solid fa-user"></i>';
    userLogoutBtn.innerHTML = `${userIcon} ${username}`
}