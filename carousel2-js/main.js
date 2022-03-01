const carousel = document.getElementsByClassName("carousel")[0];
const buttonLeft = document.getElementsByClassName("fa-angle-left")[0];
const buttonRight = document.getElementsByClassName("fa-angle-right")[0];

const imageNumber = 7;
let position = 0;

carousel.style.width = (800 * imageNumber) + "px";

for (let i = 1; i < imageNumber; i++){
    const div = document.createElement("div");
    div.className = "image";
    div.style.backgroundImage = "url('images/img-" + i + ".jpeg')";
    carousel.appendChild(div);
}

function isDisplay () {
  
    if (position == -imageNumber + 2)
        buttonRight.style.visibility = "hidden";
    else
        buttonRight.style.visibility = "visible";

    if (position == 0)
       buttonLeft.style.visibility = "hidden";
    else
        buttonLeft.style.visibility = "visible";
}

buttonLeft.addEventListener('click', function () {
    if (position < 0)
        position++;
    carousel.style.transform = "translate("+ position * 800 + "px)";
    carousel.style.transition = "all 0.3s ease";
    isDisplay ();
});

buttonRight.addEventListener('click', function () {
    if (position > -imageNumber + 2)
        position--;
    carousel.style.transform = "translate("+ position * 800 + "px)";
    carousel.style.transition = "all 0.3s ease";
    isDisplay ();
});

isDisplay ();