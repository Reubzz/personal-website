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

function closepopup(){
    document.getElementById('popup-wrapper').style.display = 'none';
    document.body.style.overflow = '';
}

function popupDisplay(id, slug, href, qr, expireAt, createdAt, username, role, disabled) {
    document.getElementById('popup-wrapper').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    document.getElementById('short-url').innerHTML = `https://reubz.io/${slug}`;
    document.getElementById('long-url').innerHTML = href;
    document.getElementById('qrcode').src = qr;
    document.getElementById('expiry-date').innerHTML = expireAt ? formatDate(expireAt) : "Never";
    document.getElementById('created-date').innerHTML = formatDate(createdAt);
    document.getElementById('created-by').innerHTML = `${username} (${role})`;
    document.getElementById('popup-download-btn').href = qr;
    document.getElementById('popup-go-button').href = href;
    document.getElementById('copy-text').value = `https://reubz.io/${slug}`;

    let disableBtn = document.getElementById('popup-disable-btn');
    let deleteBtn = document.getElementById('popup-delete-btn');

    deleteBtn.onclick = function () {deleteLink(id)};

    disableBtn.onclick = function () {disableLink(id)};
    if(disabled == true) {
        disableBtn.innerHTML = 'Enable Link <i class="fa-regular fa-eye"></i>';
    } else {
        disableBtn.innerHTML = 'Disable Link <i class="fa-regular fa-eye-slash"></i>'
    }
}

function formatDate(date){
    return new Date(date).toLocaleString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ''); 
}
window.onclick = function(event) {
    if (event.target == document.getElementById('popup-wrapper')) {
        document.getElementById('popup-wrapper').style.display = "none";
    }
}

function copyText() {
    let copyText = document.getElementById("copy-text");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText.value);
}