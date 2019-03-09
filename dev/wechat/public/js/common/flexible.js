function e(){
        var dw = document.documentElement.clientWidth, htmler = document.querySelector("html"), fz = dw/15;
        /*window.fontSize = fz;*/
        htmler.style.fontSize = fz + 'px';
}
    e();
    window.addEventListener("resize", e);