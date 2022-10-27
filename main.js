const filterBar = document.querySelector(".filter-bar");
const clearBtn = document.querySelector(".clear-filters");
const filterList = document.querySelectorAll(".filter");
const filterBtns = document.querySelectorAll(".filter-button");
const filterBox = document.querySelector(".filter-box");



//Citire date din JSON si afisare
const jobList = document.querySelector(".job-list")

 const jl = fetch('./data.json')
    .then((res => res.json()))
    .then(data => AddJobs(data))

function AddJobs(jl){
    jl.forEach(job => {
        //Elementul(principal) div.job
        const jobDOM = document.createElement("div");
        jobDOM.classList.add("job"); 

        //Elementul div.job-profile
        const jobProfile = document.createElement("div");
        jobProfile.classList.add("job-profile");

        //i
        const profileImg = document.createElement("img")
        profileImg.classList.add("profile-img")
        profileImg.src = job.logo;
        jobProfile.appendChild(profileImg)

        //
        const jobDesc = document.createElement("div")
        jobDesc.classList.add("job-desc")

        //
        const jobHeader = document.createElement("div")
        jobHeader.classList.add("job-header")

        //
        const companyName = document.createElement("div")
        companyName.classList.add("company-name")
        companyName.innerHTML = job.company;
        jobHeader.appendChild(companyName)

        //
        const jobPromo = document.createElement("div")
        jobPromo.classList.add("job-promo")

        const newPromo = document.createElement("div")
        newPromo.classList.add("new")
        newPromo.innerHTML = "NEW"

        const featPromo = document.createElement("div")
        featPromo.classList.add("featured")
        featPromo.innerHTML = "Featured"

        if(job.new) jobPromo.appendChild(newPromo)

        if(job.featured) jobPromo.appendChild(featPromo)

        jobHeader.appendChild(jobPromo)
        jobDesc.appendChild(jobHeader)

        //
        const jobTitle = document.createElement("div")
        jobTitle.classList.add("job-title")
        jobTitle.innerHTML = job.position
        jobDesc.appendChild(jobTitle)

        //
        const jobFooter = document.createElement("ul")
        jobFooter.classList.add("job-footer")

        const JobPostData = document.createElement("li")
        JobPostData.classList.add("posted-data")
        JobPostData.innerHTML = job.postedAt
        const jobContract = document.createElement("li")
        jobContract.classList.add("contract")
        jobContract.innerHTML = job.contract
        const jobLocation = document.createElement("li")
        jobLocation.classList.add("location")
        jobLocation.innerHTML = job.location

        jobFooter.appendChild(JobPostData);
        jobFooter.appendChild(jobContract);
        jobFooter.appendChild(jobLocation);
        jobDesc.appendChild(jobFooter)
        jobProfile.appendChild(jobDesc)
        jobDOM.appendChild(jobProfile)


        //creez ul.job-categs
        const jobCategs = document.createElement("ul");
        jobCategs.classList.add("job-categs");

        //creez li.categ
        const jobCateg = document.createElement("li");
        jobCateg.classList.add("categ")

        //Adaug o categ
        jobCateg.innerHTML = job.level;
        jobCategs.appendChild(jobCateg);
        
        //Adaugam din job.lang in ul 
        job.languages.forEach(e => {
            const temp = document.createElement("li")
            temp.classList.add("categ")
            temp.innerHTML = e
            jobCategs.appendChild(temp);
        });

        //Adaugam din job.tools in ul 
        job.tools.forEach(e => {
            const temp = document.createElement("li")
            temp.classList.add("categ")
            temp.innerHTML = e
            jobCategs.appendChild(temp);
        });

        jobDOM.appendChild(jobCategs)

        //console.log(jobDOM)

        //
        jobList.appendChild(jobDOM)
    });

    //Butonul categ
    const categs = document.querySelectorAll(".categ");
    console.log(categs)
    categs.forEach(categ => {
        categ.addEventListener("click", ()=>{

            //Daca filtrul nu exista
            if(!FilterExist(categ.innerHTML)){

                //Daca bara cu filtre e ascunsa
                if(filterBar.classList.contains("hide"))
                    filterBar.classList.remove("hide")
                
                
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


}

//Event buton clear
clearBtn.addEventListener("click", ()=>{
    filterBox.innerHTML= ""
    filterBar.classList.add("hide")
});

//
filterBtns.forEach(e => {
    e.addEventListener("click", ()=>{
        filter = e.parentElement;
        filter.remove();
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




//Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process