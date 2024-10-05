const form = document.querySelector('form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const email = document.querySelector('#email')
const display = document.querySelector('#error')
const submitBtn = document.querySelector('#submit-btn').value.toLowerCase()
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    display.textContent = ''

    // if Login Page
    if (submitBtn == 'login') {
        authApi('login', bodyOptions = {
            username: username.value,
            password: password.value
        });
    }


    // If Register user page 
    if (submitBtn == 'register') {
        authApi('register', bodyOptions = {
            username: username.value,
            password: password.value,
            email: email.value
        });
    }
})


async function authApi(apiEndPoint, bodyOptions) {
    try {
        const res = await fetch('/api/auth/' + apiEndPoint, {
            method: 'POST',
            body: JSON.stringify(bodyOptions),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (res.status === 400 || res.status === 401) {
            display.classList.add("error")
            console.log(display)
            return display.textContent = `${data.error.code}. ${(data.error.code != 100) ? data.error.message : ''}`
        }
        if (data.status.code === 200) {
            if(getCookie('redirectToUrl') != null) {
                window.location.replace(getCookie('redirectToUrl'));
                deleteCookie('redirectToUrl');
                return; 
            } 
            return window.location.replace('/urlshortner');
        };
    } catch (err) {
        console.log(err.message)
    }
}

function getCookie(name) {
    const cookiesObject = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
    return cookiesObject[name] ? cookiesObject[name] : null;
}

function deleteCookie(cookieName) {
    // Set the cookie's expiration date to a past date
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}