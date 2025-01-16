let downScrollFlag = false;
const navCont = document.querySelector(".nav-cont");
const highlightNavbar = (highlight) => {
    if(highlight) {
        navCont.style.backgroundColor = "#fff";
        navCont.style.boxShadow = "0 0 5px #333";
        downScrollFlag = true;
    } else {
        navCont.style.backgroundColor = "transparent";
        navCont.style.boxShadow = "none";
        downScrollFlag = false;
    }
}
window.onscroll = () => {
    if((window.scrollY >= 100) && (!downScrollFlag)) {
        highlightNavbar(true);
    } else if(((window.scrollY <= 100) && (downScrollFlag)) && (window.screen.width >= 992)) {
        highlightNavbar(false);
    }
};

window.onresize = () => {
    if(window.screen.width <= 992) {
        highlightNavbar(true);
    } else {
        highlightNavbar(false);
    }
};

document.querySelector(".main-cont").style.paddingTop = `${navCont.getBoundingClientRect().height}px`;













