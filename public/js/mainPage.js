// const introData = "<p>I am a Student and a Self taught Programmer. Based in Mumbai, India.<br/>Worked on multiple multifunction Chat Bots for <abbr title=\"Discord is a Chat App which allows Users to create Bots that can respond to Commands and do certain functions.\">Discord</abbr>.<br/>Currently learning Web Development, C++ and Java. Interested to Deep Dive into the world of Programming and create apps that make life easier. Aside from Programming, I like to play Games and Editing during my free time.</p>";

const introP = document.getElementById('intro');
const aboutContentTimeline = document.getElementById('about-content-timeline')
const about1 = document.getElementById('about1');
const about2 = document.getElementById('about2');
const about3 = document.getElementById('about3');

let httpdatareq = new XMLHttpRequest();
httpdatareq.open('get', '/data/mainpage.json', true);
httpdatareq.send();

httpdatareq.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        let datas = JSON.parse(this.responseText);

        introP.innerHTML = datas.intro;

        let aboutdata = '';
        let i = 1;
        for(let data of datas.about){
            if(i % 2 == 0){
                aboutdata += `
                    <div class="about-container about-container-right">
                        <div class="content">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>
                        </div>
                    </div>
                `
            }
            else {
                aboutdata += `
                    <div class="about-container about-container-left">
                        <div class="content">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>
                        </div>
                    </div>
                `
            } 
            i++
        }
        aboutContentTimeline.innerHTML = aboutdata;
    }
}