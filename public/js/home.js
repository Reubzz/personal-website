const languages = [
    {
        name: "javascript",
        value: "80%"
    },
    {
        name: "cpp",
        value: "60%"
    },
    {
        name: "html",
        value: "95%"
    },
    {
        name: "css",
        value: "70%"
    },
    {
        name: "java",
        value: "40%"
    },
    {
        name: "nodejs",
        value: "80%"
    },
    {
        name: "python",
        value: "60%"
    },
]


languages.forEach((language) => {
    let progressBar = document.getElementById(`${language.name}-progress`);
    let progress = document.getElementById(language.name);
    if (!progress) return;
    if (!progressBar) return;
    progressBar.style.width = language.value;
    progress.children[0].children[0].innerHTML = language.name.charAt(0).toUpperCase() + language.name.slice(1)
    progress.children[0].children[1].innerHTML = language.value
})


projectData = [
    {
        name: 'Discord Bot',
        img: '/Assets/imgs/Discord Bot.png',
        description: `A multifunction Discord Bot.
        Extremely easy to use and user friendly.
        Moderation, YouTube Alerts, Games, Messages Scheduling and much more!!`,
        projectId: 1,
    },
    {
        name: 'Discord Bot Website - Nodejs',
        img: '/Assets/imgs/Discord Bot Website.png',
        description: `A Nodejs Website using Express.js webserver, to showcase all the features of the Bot and provide live updating Leaderboard System from Discord using Bot's Api. `,
        projectId: 2,
    },
    {
        name: 'URL Shortner - Nodejs Website',
        img: '/Assets/imgs/Url Shortner.png',
        description: `A online tool to shorten any web url to a custom user defined url slug with options to set expiry dates.`,
        projectId: 3,
    },
    {
        name: 'Discord Canvas - NPM Package',
        img: '/Assets/imgs/Discord Canvas.png',
        description: `A npm package to simplify the use of Canvas to generate images (Rank-Cards) for Leveling Systems in Discord Bots.`,
        projectId: 4,
    },
    {
        name: 'Simple Web Scrapper',
        img: '/Assets/imgs/Web Scrapper.png',
        description: `A simple web scrapper that provides HTML data of any website that is crawlable.`,
        projectId: 5,
    },
    {
        name: 'Simple Flutter Mobile App',
        img: '/Assets/imgs/flutter.png',
        description: `A simple mobile app using Static Data to display movies.\n 
        [My First Project using Flutter!!]`,
        projectId: 6,
    },
]

projectData.forEach(function (project) {
    const projectsElement = document.getElementById('projects-gallery');

    const node = document.createElement('div');

    node.classList.add('project', 'gallery-cell');
    node.innerHTML = `<img src="${project.img}" alt="Project Image">
    <h2 class="project-title">${project.name}</h2>
    <p class="project-description">${project.description}</p>`

    node.onclick = function () { openProject(`${project.projectId}`) };
    // console.log(node)

    projectsElement.appendChild(node)
})


function openProject(projectId) {
    console.log(projectId)
}

var flkty = new Flickity('.projects-gallery', {
    // options
    cellAlign: 'left',
    contain: true,
    freeScroll: true,
    wrapAround: true,
    groupCells: true,
    setGallerySize: false,
    draggable: false,
    autoPlay: 3000,
    adaptiveHeight: true,
    // pauseAutoPlayOnHover: false
});