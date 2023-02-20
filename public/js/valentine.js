const button2 = document.getElementById('btn1');
button2.addEventListener('mouseover', function () {
    this.style.left = `${Math.random() * 70}%`;
    this.style.top = `${Math.random() * 70}%`;
});
button2.addEventListener('click', function () {
    this.style.left = `${Math.random() * 80}%`;
    this.style.top = `${Math.random() * 80}%`;
});

// document.getElementById('btn2').addEventListener('click', function () {
//   alert('YEYY THANK U, I LOVE U');
// });

const dailog = document.getElementById("dialog");
function openModal() {
    dailog.showModal();
}

function closeModal() {
    dailog.close();
}


