
function scrollImage(element) {
    const containerElement = element.children[1].children[0]; // Selecting the Image Container (The <a> tag)
    const img = containerElement.children[0]; // Selecting the actual image (<image> tag which is inside the <a> tag above)

    // taking both image and container height (after css styling not original size)
    let height = parseInt(img.height);
    let windowHeight = parseInt(containerElement.clientHeight);

    // subtracting window height out of the image height so the image doesn't scroll out of view
    // the bottom of the img will touch bottom of container.
    let transformValue = height - windowHeight;
    img.style.cssText = `transform: translateY(-${transformValue}px)` // scroll to the bottom of the image.
}

function returnImage(element) {
    const img = element.children[1].children[0].children[0]; // Selecting the actual image (<image> tag)
    img.style.cssText = `transform: translateY(0%)` // making the translate back to 0 so it scrolls back to the top of the image. 
}

document.addEventListener('DOMContentLoaded', function () {
    let MainHomepageData = document.getElementById('homepage-wrapper')
    let HomepageLoader = document.getElementById('loading-layer')

    setInterval(() => {
        MainHomepageData.style.display = 'contents';
        HomepageLoader.style.display = 'none'
    }, 1000 * 2.5);
});
