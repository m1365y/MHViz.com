const url = "https://mhviz.com/getData.php";
let fetchedData = null;
d3.json(url)
    .then(data => {
        if (!data || typeof data.map !== 'function') {
            throw new Error('Invalid data received from server');
        }
        fetchedData = data;
        populateDropdownAndDisplayData(data);
    })
    .catch(error => {
        console.error("Error fetching or processing data:", error);
    });

function fetchDataFromDatabase() {
    return d3.json(url)
        .then(data => {
            if(data.error) {
                throw new Error(data.error);
            }
            fetchedData = data;
            populateDropdownAndDisplayData(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function optionChanged(selectedMeasure) {
    if (fetchedData) {
        updateDisplay(selectedMeasure, fetchedData);
    }
}

function populateDropdownAndDisplayData(data) {
    const measures = [...new Set(data.map(item => item.measure))];
    measures.forEach(measure => {
        d3.select("#selDataset").append("option").text(measure).property("value", measure);
    });
    updateDisplay(measures[0], data);
}


// const url = "http://mhviz.com/getData.php";
// let fetchedData = null;

// fetchDataFromDatabase();

// function fetchDataFromDatabase() {
//     d3.json(url)
//         .then(data => {
//             if (!data || !Array.isArray(data) || data.length === 0) {
//                 console.error("Received invalid data from the server:", data);
//                 return;
//             }
//             fetchedData = data;
//             populateDropdownAndDisplayData(data);
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//         });
// }

// function optionChanged(selectedMeasure) {
//     if (fetchedData && fetchedData.length) {
//         updateDisplay(selectedMeasure, fetchedData);
//     } else {
//         console.warn("No fetched data available to update display.");
//     }
// }

// function populateDropdownAndDisplayData(data) {
//     const measures = [...new Set(data.map(item => item.measure))];
//     const dropdown = d3.select("#selDataset");
//     dropdown.html("");  // Clear previous dropdown items
//     measures.forEach(measure => {
//         dropdown.append("option").text(measure).property("value", measure);
//     });

//     // Default display
//     if (measures.length) {
//         updateDisplay(measures[0], data);
//     } else {
//         console.warn("No measures found to update display.");
//     }
// }

function updateDisplay(selectedMeasure, data) {
    const filteredData = data.filter(item => item.measure === selectedMeasure);
    filteredData.sort((a, b) => b.data_value - a.data_value); // Sort data in descending order
    displayDataInDiv(filteredData);
    createPieChart(filteredData);
    createBarChart(filteredData);
    createMapMarkers(filteredData);
}

function displayDataInDiv(data) {
    const div = d3.select("#dataDisplay");
    div.html(""); // clear current content
    data.forEach(item => {
        div.append("p").text(`${item.locationname}, ${item.statedesc} - ${item.data_value} ${"%"}`);
    });
}

function createPieChart(data) {
    const sortedData = data.sort((a, b) => b.data_value - a.data_value).slice(0, 5);
    
    const values = sortedData.map(d => d.data_value);
    const labels = sortedData.map(d => d.locationname);
    
    const pieTrace = {
        values: values,
        labels: labels,
        type: 'pie',
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
    };

    const layout = {
        title: "Top 5 Locations by Value Distribution"
    };

    Plotly.newPlot("pie", [pieTrace], layout);
}

function createBarChart(data) {
    const values = data.map(d => d.data_value);
    const labels = data.map(d => d.statedesc);
    const barTrace = {
        x: labels,
        y: values,
        type: 'bar',
        hoverinfo: 'x+y+name',
        marker: {
            color: 'rgb(55, 83, 109)'
        }
    };

    const layout = {
        title: "Value by State"
    };

    Plotly.newPlot("bar", [barTrace], layout);
}
// Call fetchDataFromDatabase on script load
fetchDataFromDatabase();
let map;
let markersGroup;

function createMapMarkers(data) {
    data = data.slice(0, 5);

    if (!map) {
        map = L.map('map').setView([37.0902, -95.7129], 3); // Default to USA's lat/long
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }

    if (markersGroup) {
        markersGroup.clearLayers();
    }
    markersGroup = L.layerGroup().addTo(map);

    data.forEach(item => {
        if (item.geolocation && item.geolocation.coordinates) {
            const coords = item.geolocation.coordinates;
            const lat = coords[1];
            const long = coords[0];
            const description = `${item.locationname}, ${item.statedesc} - ${item.data_value} ${"%"}`;
            L.marker([lat, long]).bindPopup(description).addTo(markersGroup);
        }
    });
}
