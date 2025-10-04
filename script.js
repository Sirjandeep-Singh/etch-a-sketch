let currentmode = 'black';
const grid = document.querySelector('.grid');
function creategrid(size){
    grid.innerHTML = '';
    const numOfBoxes = size * size;
    const boxWidth = 960/size;
    const boxHeight = 960/size;
    for(let i = 0 ; i < numOfBoxes ; i++){
        const box = document.createElement(`div`);
        box.classList.add('square');
        box.style.height = `${boxHeight}px`;
        box.style.width = `${boxWidth}px`;
        grid.appendChild(box);
    }
}
//create a default grid of 16x16
creategrid(16);

grid.addEventListener('mouseover', (e) =>{
    if(!e.target.classList.contains('square')) return;

    if(currentmode === 'black'){
        e.target.style.backgroundColor = currentmode;
        e.target.dataset.opacity = 0;
    }

    if(currentmode == 'rainbow'){
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                                    ${Math.floor(Math.random() * 256)}, 
                                    ${Math.floor(Math.random() * 256)})`;
        e.target.style.backgroundColor = randomColor;
        e.target.dataset.opacity = 0;
    }

    if(currentmode == 'shading'){
        let current_opacity = parseFloat(e.target.dataset.opacity) || 0;
        if(current_opacity < 1) current_opacity += 0.1;
        e.target.dataset.opacity = current_opacity;
        e.target.style.backgroundColor = `rgba(0,0,0,${current_opacity})`;
    }
});

const resetbutton = document.querySelector('#reset');
resetbutton.addEventListener("click", () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = `white`;
        square.dataset.opacity = 0;
    })
} );

const setrainbowbutton = document.querySelector('#rainbow');
setrainbowbutton.addEventListener('click' , () => {
    currentmode = 'rainbow';
});

const setshadingbutton = document.querySelector('#shading');
setshadingbutton.addEventListener('click' , () => {
    currentmode = 'shading';
});

const setblackbutton = document.querySelector('#black');
setblackbutton.addEventListener('click' , () => {
    currentmode = 'black';
});

const resizebutton = document.querySelector('#resize');
resizebutton.addEventListener('click' , () =>{
    const newSize = parseInt(prompt("Enter the new size for the grid : WARNING! SIZE SHOULD BE LESS THAN 100"));
    if(newSize > 1000 || newSize < 1){
        alert('Invalid Size');
        creategrid(16);
        return;
    }
    creategrid(newSize);
    return;
});