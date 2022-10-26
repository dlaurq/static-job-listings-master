const filterBar = document.querySelector(".filter-bar");
const clearBtn = document.querySelector(".clear-filters");
const filterList = document.querySelectorAll(".filter");
const filterBtns = document.querySelectorAll(".filter-button");
const filterBox = document.querySelector(".filter-box");
const categs = document.querySelectorAll(".categ");

//Event buton clear
clearBtn.addEventListener("click", ()=>{
    filterBox.innerHTML= ""
    filterBar.classList.add("hide")
});

filterBtns.forEach(e => {
    e.addEventListener("click", ()=>{
        filter = e.parentElement;
        filter.remove();
    });
});


//Butonul categ
categs.forEach(categ => {
    categ.addEventListener("click", ()=>{

        //Daca filtrul nu exista
        if(!FilterExist(categ.innerHTML)){
            
            //Tamplate
            const filterStr = `<div class="filter">
            <div class="filter-name">${categ.innerHTML}</div>
            <div class="filter-button"><img src="./images/icon-remove.svg" alt="" width="50" height="50"></div>
            </div>`

            //Transform str ul in DOM
            const temp = document.createElement("div")
            temp.innerHTML = filterStr;
            filter = temp.querySelector(".filter")
            
            //Adaug eventu pt butonul de X
            const filterBtn = filter.querySelector(".filter-button")
            filterBtn.addEventListener("click", ()=>{
                filter = filterBtn.parentElement;
                filter.remove();
            });

            //Adaug filtrul
            filterBox.appendChild(filter);
        }
    });
});

function FilterExist(f){
    const fl = document.querySelectorAll(".filter");
    let ok =0;

    fl.forEach(filter => {
        const filterName = filter.querySelector(".filter-name").innerHTML;
        if(filterName.toString() == f.toString())
            ok=1;
    });

    if(ok==1)
        return true;
    
    return false;
}