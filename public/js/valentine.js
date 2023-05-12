const button2 = document.getElementById('btn1');
button2.addEventListener('mouseover', function () {
    this.style.left = `${Math.random() * 70}%`;
    this.style.top = `${Math.random() * 70}%`;
});
button2.addEventListener('click', function () {
    this.style.left = `${Math.random() * 80}%`;
    this.style.top = `${Math.random() * 80}%`;
});

const dailog = document.getElementById("dialog");
function openModal() {
    dailog.showModal();
}

function closeModal() {
    dailog.close();
}


