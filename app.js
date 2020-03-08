console.log('hi1')

// append option to #selDataset and loop through patient ID numbers to assign as values and text labels to options for drop down menu

// select patient ID handler
function handleSelect() {
    d3.event.preventDefault();

    // select ID from dropdown menu
    var patientID = d3.select('#selDataset').node().value;

}

// function to render plots
d3.json("data/samples.json").then((data) => {
    console.log(data);
    console.log('hi2')

    var sample_values = data.samples.map(x => x.sample_values);
    var otu_ids = data.samples.map( x => x.otu_ids);
    console.log(sample_values);
    console.log(otu_ids);

    var trace1 = {
        x: sample_values,
        y: otu_ids,
        type: "bar",
        name: data.samples.otu_labels
    };
    
    var data = [trace1];

    var layout = {
        title: "Number of Samples by OTU",
        xaxis: { title: "Sample size" },
        yasxis: { title: "OTU" }
    };

    Plotly.newPlot("bar", data, layout);
});