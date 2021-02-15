/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '-'+ d.getDate()+'-'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click', Generate);

/* Function called by event listener */
function Generate() {

    //get data
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getData(baseUrl, zip, key)
        .then(function(data) {
            // add data to POST request
            if(!data.main){
                console.log(data);
                alert("Wrong Code");
            }
            else{
                console.log(data);
                post('/insert', { temp: data.main.temp, date: newDate, content: feelings });
            }
            
        }).then(function() {
            // call update to update browser content
            update();
        })
}

/* Function to GET Web API Data*/
const getData = async(baseUrl, zip, key) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}${zip}${key}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        console.log(data)
        return data;

    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const post = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const update = async () => {
    const request = await fetch('http://localhost:8888/getData');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log('error', error);
    }
}
