var dataset
async function fetchData(){
    dataset = await fetch("dataset.json")
}

function convertTextToRGB(){
    
}


//taking event from the form panel
let form = document.querySelector('form')
form.addEventListener('submit',function(event){
    event.preventDefault();

})



