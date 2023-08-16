
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click',function(){
        if(header.style.color=='red'){
            header.style.color='blue'
            return}
        header.style.color='red'
        return
    })
 
})()  
