
/*
* closures
**/
const navCont = () => {
    const navCont = document.querySelector(".nav-cont");
    return (_ => navCont);
};

const categoriesImgs = () => {
    const cates = {
        App     : ["app-1.jpg", "app-2.jpg", "app-3.jpg"],
        Product : ["product-1.jpg", "product-2.jpg", "product-3.jpg"],
        Branding: ["branding-1.jpg", "branding-2.jpg", "branding-3.jpg"],
        Books   : ["books-1.jpg", "books-2.jpg", "books-3.jpg"],
    };
    
    return (_ => cates);
};

const downScrollFlag = () => {
    let flag = false;
    return ((val = undefined) => (flag = (val !== undefined) ? val : flag));
};


/*
* Functions definitions
* */

// adding style to element
const styleElement = (ele, styleObj) => Object.assign(ele.style, styleObj);

// changing navbar style
const highlightNavbar = (highlight) => {
    const flag = downScrollFlag();
    if (highlight) {
        styleElement(navCont()(), {
            backgroundColor: "#fff",
            boxShadow: "0 0 5px #333"
        });
        flag(true);
    } else {
        styleElement(navCont()(), {
            backgroundColor: "transparent",
            boxShadow: "none"
        });
        flag(false);
    }
};

// changeNavbarStyle [ when scroll ]
const changeNavbarStyle = () => {
    if ((window.scrollY >= 100) && (!(downScrollFlag())())) {
        highlightNavbar(true);
    } else if (((window.scrollY <= 100) && (downScrollFlag)) && (window.screen.width >= 992)) {
        highlightNavbar(false);
    }
};

// applyElementsAnimation [ when scroll ]
const applyElementsAnimation = () => {
    const revealPoint = 150;
    const windowHeight = window.innerHeight;
    [...document.querySelectorAll(".anime-scroll")].forEach((ele) => {
        const eleTop = ele.getBoundingClientRect().top;
        const eleBtm = ele.getBoundingClientRect().bottom;
        ele.classList.toggle("active", (revealPoint < windowHeight - eleTop) && !(eleBtm <= 0));
    });
};

const displayAllCategory = (cates) => {
    document.querySelector(".cate-cont").innerHTML = `${
        (() => {
            let temp = "";
            for (let cateName in cates) {
                temp += cates[cateName].map(img => `<div class="col-md-6 col-lg-4 img-cont-active" category-name="${cateName}">
                                                        <div>
                                                            <div class="img-cont">
                                                                <img src="./assets/imgs/${img}" alt="" class="w-100 object-fit-cover">
                                                            </div>
                                                        </div>
                                                    </div>`
                ).join(" ");
            }
            return temp;
        })()
    }`;
}

const changePortfolioContentOnClk = () => {
    // focus "All" btn (first <a>)
    document.querySelector("#portfolio .content ul li").querySelector("a").focus();
    
    [...document.querySelectorAll("#portfolio .content ul li a")].forEach((ele) => {
        ele.addEventListener("click", (e) => {
            const elements = [...document.querySelectorAll(".cate-cont > div")];
            elements.forEach((element) => {
                element.classList.remove("img-cont-active");
                element.classList.add("img-cont-inactive");
            });
            if(e.target.innerHTML === "All") {
                elements.forEach((element) => {
                    setTimeout(() => {
                        element.classList.remove("img-cont-inactive");
                        element.classList.add("img-cont-active");
                    }, 300);
                });
            } else {
                elements.forEach((element) => {
                    if(element.getAttribute("category-name") === e.target.innerHTML) {
                        setTimeout(() => {
                            element.classList.remove("img-cont-inactive");
                            element.classList.add("img-cont-active");
                        }, 300);
                    }
                });
            }
        });
    });
};

const applyNumIncAnime = () => {
    const cli = document.querySelector("#cli");
    const pro = document.querySelector("#pro");
    const hours = document.querySelector("#hours");
    const work = document.querySelector("#work");
    const elesCont = document.querySelector(".sec3");
    if((150 < window.innerHeight - elesCont.getBoundingClientRect().top)) {
        let count = 0;
        let timer = setInterval(() => {
            count++;
            if(Number(cli.innerHTML) < 235)  cli.innerHTML = String(count);
            if(Number(pro.innerHTML) < 150)  pro.innerHTML = String(count);
            if(Number(hours.innerHTML) < 1467)  hours.innerHTML = String(count);
            if(Number(work.innerHTML) < 23)  work.innerHTML = String(count);
            
            if(count >= 1467) clearInterval(timer);
        }, 10);
    }
};

/*
* window actions
* */

// when resize screen
window.onresize = () => {
    if (window.screen.width <= 992) {
        highlightNavbar(true);
    } else {
        highlightNavbar(false);
    }
}

// when scrolling
window.onscroll = () => {
    changeNavbarStyle();
    applyElementsAnimation();
    applyNumIncAnime();
};

// when DOM is loaded
window.onload = () => {
    styleElement(document.querySelector(".loader-cont"), { display: "none" });
    document.querySelector(".img-cont").classList.add("active");
    document.querySelector(".main-content").classList.add("active");
    styleElement(document.querySelector(".main-cont"), { paddingTop: `${navCont()().getBoundingClientRect()}px` });
    displayAllCategory(categoriesImgs()());
    changePortfolioContentOnClk();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};









