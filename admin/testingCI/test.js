
function init(){
    const hello = document.querySelector("p");
    console.log(hello);

    hello.addEventListener('click', (event) => {
       alert("Hello world");
});

}