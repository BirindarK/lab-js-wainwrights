const ListOfWainwrights = document.getElementById("wainwrights-list");
const wainwrightsContainer = document.getElementById("wainwrightsContainer");
const wainwrightsHeader = document.getElementById("wainwrights-header");
const wainwrightsForm = document.getElementById("wainwrights-form");

let wainwrightsData;

//Message 
const message = (output) => {
    wainwrightsHeader.innerText = "";
    wainwrightsHeader.innerText = output;
}

//Fetching all WainWrights Data 
const getAllWainwrights = async () => {
    const response = await fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json');

    if(response.ok) {
        const data = await response.json();
        wainwrightsData = data;
        message("Awaiting API");
        wainwrightsMap(data);
    }
}

//Looping through properties in the List of Wainwrights
const wainwrightsMap = (wainwrightsData =>{
    for(let property of wainwrightsData) {
        console.log(property);
        ListOfWainwrightsProperty(property);
    }
    message ("JS Wainwrights Lab");
})

//Creating the properties for the List of Wainwrights
const ListOfWainwrightsProperty = (property) => {
    let name = document.createElement("h3");
    name.innerText = property.name;

    let height = document.createElement("h4");
    height.innerText = property.heightFeet;

    let area = document.createElement("p");
    area.innerText = property.area.about;

    let list = document.createElement("li");
    list.appendChild(name);
    list.appendChild(height);
    list.appendChild(area);

    ListOfWainwrights.appendChild(list);

}

//Form and Filtering 
wainwrightsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let input = evt.target[0].value;

    ListOfWainwrights.innerHTML = "";
    message ("Results are being filtered");

    const filteredResult = wainwrightsData.filter(element => element.name.toLowerCase().includes(input.toLowerCase()));
    wainwrightsMap(filteredResult);

    if(filteredResult.length === 0) {
        let errorMessage = document.createElement("p");
        errorMessage.innerText = "Cannot filter by the requested input";
        wainwrightsContainer.appendChild(errorMessage);

    }
    message ("JS Wainwrights Lab")
})


getAllWainwrights();