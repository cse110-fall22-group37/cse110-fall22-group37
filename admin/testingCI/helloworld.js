
window.addEventListener('DOMContentLoaded', init);

function init(){
    const hello = document.querySelector("p");
    console.log(hello);

    hello.addEventListener('click', (event) => {
       alert("Hello world");
});


/**
 * Function that says hello.
 * @param {string} name input string
 */
function sayHello(name) {
    console.log(`Hello ${name}`);
}

}
