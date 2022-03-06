function countryRegion(region){

    if(region==='all'){
        fetch(`https://restcountries.com/v3.1/${region}`)
        .then(res => res.json())
        .then(data => {
        displayData(data)});
        


    }else if(region==='europe' || region==='america'){
        fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => {
        displayData(data)})
    }
    else{
        fetch(`https://restcountries.com/v3.1/name/${region}`)
        .then(res => res.json())
        .then(data => {
        displayData(data)})
    }
    document.getElementById('spinner').style.display='block';
    // document.getElementById('cardContainer').style.display='none';
}   

const displayData= data =>{
    console.log(data);
    
    // document.getElementById('cardContainer').style.display='block';
    const cardDiv= document.getElementById('cardContainer');
    cardDiv.innerHTML="";
    
    

    for(const country of data){
        const countryName=country.name.common; 
        const countryflag=country.flags.png;
        const countryRegion=country.region;
        const countryPopulation=country.population;
        const countryId= country.ccn3;
        

         const div= document.createElement('div');
         div.classList.add('card')
         div.innerHTML=`
            <img src="${countryflag}" class="card-img-top" alt="...">
            <div class="card-body">
            <h6 class="card-title mb-2">Country: ${countryName}</h6>
            <p class="card-text">Country Region: <b>${countryRegion}</b></p>
            <p class="card-text">Population: <b>${countryPopulation}</b></p>

                <div class="details">
                    <button onclick="details(${countryId})" type="button" class="btn btn-outline-success details" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    More Details
                    </button>
                </div>
            </div>
        `
         cardDiv.appendChild(div);

         
    }
    document.getElementById('spinner').style.display='none';

}

const searchBtn= search=>{
    const searchedValue=document.getElementById('searched-value').value;
    countryRegion(searchedValue);
    document.getElementById('searched-value').value="";
}
const allBtn= () =>{
    countryRegion('all');
}
const europeBtn= () =>{
    countryRegion('europe');
}
const americaBtn= () =>{
    countryRegion('america');
}

const details=countryDetails=>{
    const countryId= countryDetails; 
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => {
        const allcountries= data;
        const singleCuntry= allcountries.find(country => country.ccn3==countryId)

        const countryflag=singleCuntry.flags.png;
        const countryName=singleCuntry.name.common;
        const countryRegion=singleCuntry.region;
        const countryPopulation=singleCuntry.population;
        const countryArea=singleCuntry.area;

        const modalBody= document.getElementById('modal-body');
        modalBody.innerHTML="";
        const div=document.createElement('div');
        div.classList.add('modal-body');
        div.innerHTML=`
            <div class="country-flag">
                <img width="300" src="${countryflag}" alt="">
            </div>
            <div class="country-details">
                <table class="table">
                    <tr>
                        <th>Name:</th>
                        <td>${countryName}</td>
                    </tr>
                    <tr>
                        <th>Region:</th>
                        <td>${countryRegion}</td>
                    </tr>
                    <tr>
                        <th>Population:</th>
                        <td>${countryPopulation}</td>
                    </tr>
                    <tr>
                        <th>Area (Sqkm):</th>
                        <td>${countryArea}</td>
                    </tr>
                </table>
            </div>
        `
    
        modalBody.appendChild(div);

    });
}
