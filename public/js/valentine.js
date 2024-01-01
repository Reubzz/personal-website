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

button2.addEventListener('click', function () {
    this.style.left = `${Math.random() * 70}%`;
    this.style.top = `${Math.random() * 70}%`;

    noBtnClickCount++ 
    // const keepTryingText = document.getElementById('keep-trying-text');

    if(noBtnClickCount == 5) {
        openModal("dialog-no", { 
            textId: 'keep-trying-text', 
            text: "hey you're being to mean now! Say YES!!"
        });
    }
    else if (noBtnClickCount == 10) {
        openModal("dialog-no", { 
            textId: 'keep-trying-text', 
            text: "Wow! You need to try harder to Reject me!! UwU"
        });
    }
    else if (noBtnClickCount == 15) {
        openModal("dialog-no", { 
            textId: 'keep-trying-text', 
            text: "Damn! You're really hell bent on saying No!!"
        });
    }
    else if (noBtnClickCount == 20) {
        openModal("dialog-no", { 
            textId: 'keep-trying-text', 
            text: "Okayy Fine! Bye!"
        });
    }
});

function openModal(modalId, options = {}) {
    if (options.textId) {
        document.getElementById(options.textId).innerHTML =  options.text;
    }
    document.getElementById(modalId).showModal();
}

function closeModal(modalId) {
    if(noBtnClickCount == 20) {
        document.getElementById(modalId).close();
        noBtnClickCount = 0;
        return window.location.href="https://reubz.io";
    }
    document.getElementById(modalId).close();
}


