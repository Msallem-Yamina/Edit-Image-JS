const saturate = document.getElementById("saturate"),
    contrast = document.getElementById("contrast"),
    bright = document.getElementById("brightness"),
    sepia = document.getElementById("sepia"),
    scale = document.getElementById("grayscale"),
    blur = document.getElementById("blur"),
    rotate = document.getElementById("hue-rotate"),
    upload = document.getElementById("upload"),
    download = document.getElementById("download"),
    img = document.getElementById("img"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    reset = document.querySelector("span"),
    imgBox = document.querySelector(".img-box");
// Reset Filters To Default Values
function resetValue (){
    ctx.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    bright.value = '100';
    sepia.value = '0';
    scale.value = '0';
    rotate.value = '0';
    blur.value = '0';
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}
window.onload = () =>{
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}
upload.onchange = () => {
    resetValue();
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    // Create New File To Read An Image
    let file = new FileReader();
    // Read The Image
    file.readAsDataURL(upload.files[0]); 
    // You must wait for the photo to be downloaded and then displayed
    file.onload = () => {
        img.src = file.result;
    }
    // Create a Copy Of The Image For Download, Because We Do Not Have The Right In JavaScript To Download The Photo After Their Modifications
    img.onload = ()=> {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = "none";
    }
}
// You Must Invite All Filters So That They Are All Applied Together
let filters = document.querySelectorAll("ul li input");
filters.forEach ( (filter) => {
    filter.addEventListener('input', ()=>{
        ctx.filter = `
          saturate(${saturate.value}%)
          contrast(${contrast.value}%)
          brightness(${bright.value}%)
          sepia(${sepia.value}%)
          grayscale(${scale.value})
          blur(${blur.value}px)
          hue-rotate(${rotate.value}deg)
        `;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
});
// Reset Filters To Default Values 
reset.onclick = resetValue;
download.onclick = ()=> {
    download.href = canvas.toDataURL();
}