function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

$(document).ready(function () {
    $('.slick-list').slick(
        {
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 739,
                    settings: {
                        slidesToShow: 3,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                }
            ]
        }
    );
});

$(document).ready(function () {
    $('.img-main-list').slick(
        {
            slidesToShow: 1,
            draggable: false,
            responsive: [
                {           
                    breakpoint: 739,
                    settings: {
                        slidesToShow: 1,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        slidesToScroll: 1,
                        infinite: true,
                        draggable: true,
                        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
                    }
                }
            ]
        }
    );

    
});


$(document).ready(function () {
    $('.blog-list').slick(
        {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 739,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        infinite: true,
                    }
                }
            ]
        }
    );
});


window.addEventListener("scroll", debounceFn(function () {
    const header = document.querySelector(".header")
    const headerHeight = header && header.offsetHeight
    const pageY = window.pageYOffset;
    const line = document.querySelector(".line")

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const widthLine = (pageY / scrollHeight) * 100

    line.style.width = `${widthLine}%`


    if (pageY >= headerHeight) {
        header.classList.add("is-fixed")
        document.body.style.paddingTop = `${headerHeight}px`;
    } else {
        header.classList.remove("is-fixed")
        document.body.style = ``;
    }

}, 10))

const navItems = document.querySelectorAll(".nav-mobile-js");
const toggleBtn = document.querySelector(".toggle-menu")
const navList = document.querySelector(".nav-list")
const btnFooter = document.querySelectorAll(".btn-footer-link")
toggleBtn.addEventListener("click", function (e) {
    e.preventDefault()
    navList.classList.toggle("open")
})
navItems.forEach(item => item.addEventListener("click", function (e) {
    e.currentTarget.classList.toggle("open")
}))

btnFooter.forEach(item => item.addEventListener("click", function (e) {
    const icon = e.currentTarget.querySelector(".footer-icon")
    const accordionContent = e.currentTarget.querySelector(".list-footer")

    accordionContent.style.height = `${accordionContent.scrollHeight}px`;
    e.currentTarget.classList.toggle("open")
    if (!e.currentTarget.classList.contains("open")) {
        accordionContent.style.height = `0px`;
    }

    icon.classList.toggle("fa-angle-up")
    icon.classList.toggle("fa-angle-down")
}))