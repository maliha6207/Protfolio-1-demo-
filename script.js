const header = document.querySelector(".header")
const ham = document.querySelector(".ham")
const navbar = document.querySelector(".navbar")
const readMore = document.querySelector(".read-more")
const morePara = document.querySelector(".p2")
const teamCards = document.querySelector(".team-cards")
const teamTrack = document.querySelector(".team-track")
const sendBtn = document.querySelector(".sent-email");
const scrollBtn = document.querySelector(".scroll-btn ")
let tracknum = 2
window.addEventListener("scroll", () => {
    if (scrollY > 20) {
        header.classList.add("scrolled")
    }
    else {
        header.classList.remove("scrolled")
    }
    if(scrollY > 570){
        scrollBtn.style.display = "flex"
    }
    else{
        scrollBtn.style.display = "none"
    }
})

    window.addEventListener("resize", () => {
        currentWidth()
    })
function updateTrack() {
        teamTrack.innerHTML = ""
    for (let i = 0; i < tracknum; i++) {
        const trackdiv = document.createElement("div")
        trackdiv.classList.add("track")
        if(i==0){
            trackdiv.classList.add("current")
        }
        teamTrack.append(trackdiv)

    }
}
function currentWidth(){
    if (window.innerWidth <= 760) {
            tracknum = 6
            updateTrack()
        }
    else  if (window.innerWidth <= 1029) {
            tracknum = 3
            updateTrack()
        }
        else{
            tracknum = 2
            updateTrack()
        }
}
currentWidth()
updateTrack()
ham.addEventListener("click", () => {
    if (ham.src.includes("ham-icon.png")) {
        navbar.style.display = "flex"
        ham.src = "cross-icon.png"
    }
    else {
        navbar.style.display = "none"
        ham.src = "ham-icon.png"
    }
})
readMore.addEventListener("click", () => {
    if (!morePara.classList.contains("open")) {
        morePara.classList.add("open")
        readMore.innerHTML = "Read less"
    }
    else {
        morePara.classList.remove("open")
        readMore.innerHTML = "Read more"
    }
})
document.querySelectorAll(".track").forEach(track => {
    track.addEventListener("click", () => {
        document.querySelector(".current").classList.remove("current")
        track.classList.add("current")
    })
});
teamTrack.addEventListener("click", (e) => {
    if (e.target.classList.contains("track")) {
        document.querySelector(".current").classList.remove("current")
        e.target.classList.add("current")
        const allTracks = Array.from(teamTrack.children);
        const clickedIndex = allTracks.indexOf(e.target);
        const firstCard = teamCards.children[0];
        if (firstCard) {
            const maxScroll = teamCards.scrollWidth - teamCards.clientWidth;
        const scrollPerStep = tracknum > 1 ? maxScroll / (tracknum - 1) : 0;

            teamCards.scrollTo({
                left:clickedIndex * scrollPerStep,
                behavior: "smooth"
            });
        }
    }
})
teamCards.addEventListener("wheel", (e) => {
    e.preventDefault();
}, { passive: false });

teamCards.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false });


if(sendBtn){
    sendBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const templateParams = {
        from_name: document.querySelector(".name").value,
        reply_to: document.querySelector(".email").value,
        subject: document.querySelector(".subject").value,
        message: document.querySelector("#problem").value
    };
    
           document.querySelector(".name").value = "";
           document.querySelector(".email").value = "";
           document.querySelector(".subject").value = "";
           document.querySelector("#problem").value = "";
    emailjs.send('service_jrlf6ib', 'template_1lipxmd', templateParams)
        .then((response) => {
           alert("Message sent successfully!");
        }) 
        .catch((error) => {
           alert("Failed to send message, try again.");
        });
});
}
scrollBtn.addEventListener("click",()=>{
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" 
        });
})