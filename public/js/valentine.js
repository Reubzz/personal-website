const button2 = document.getElementById('btn1');
let noBtnClickCount = 0;

button2.addEventListener('mouseover', function () {
    this.style.left = `${Math.random() * 70}%`;
    this.style.top = `${Math.random() * 70}%`;

    noBtnClickCount++ 
    const keepTryingText = document.getElementById('keep-trying-text');

    if(noBtnClickCount == 5) {
        keepTryingText.innerHTML = "Hey you're being too mean now! Say Yes!"
        openModal("dialog-no");
    }
    else if (noBtnClickCount == 10) {
        keepTryingText.innerHTML = "Wow! You need to try harder to Reject me!! UwU"
        openModal("dialog-no");
    }
    else if (noBtnClickCount == 15) {
        keepTryingText.innerHTML = "Damn! You're really hell bent on saying No!!"
        openModal("dialog-no");
    }
    else if (noBtnClickCount == 20) {
        keepTryingText.innerHTML = "Okayy Fine! Bye!"
        openModal("dialog-no");
    }
});


function openModal(id) {
    document.getElementById(id).showModal();
}

function closeModal(id) {
    if(noBtnClickCount == 20) {
        document.getElementById(id).close();
        return window.location.href="https://reubz.io";
    }
    document.getElementById(id).close();
}


