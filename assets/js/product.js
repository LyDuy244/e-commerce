const filterMore = document.querySelector(".filter-more-mobile")
const dropdownLinks = document.querySelectorAll(".dropdown-link")

dropdownLinks.forEach(item => item.addEventListener("click", function(e){
    e.preventDefault();
}))

filterMore.addEventListener("click", function (e) {
    const dropdownWrapper = e.target.parentNode.nextElementSibling.nextElementSibling   
    console.log(dropdownWrapper)

    dropdownWrapper.classList.toggle("is-active")
    dropdownWrapper.style.height = `${dropdownWrapper.scrollHeight}px`

    if (!dropdownWrapper.classList.contains("is-active")) {
        dropdownWrapper.style.height = `0px`
    }
})