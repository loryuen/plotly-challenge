console.log('hi1')

// append option to #selDataset and loop through patient ID numbers to assign as values and text labels to options for drop down menu
function buildDropdown() {
    d3.json("data/samples.json").then((data) => {
        var id = data.samples.map( x => x.id);
        console.log(id);
        console.log('hello');

        var section = d3.select('#selDataset');
        for (var i=0; i<id.length; i++) {
        section.append("option").text(id[i]);
        };
    }
    )};

buildDropdown();

// select patient ID handler
function handleSelect() {
    d3.event.preventDefault();

    // select ID from dropdown menu
    var id = d3.select('#selDataset').node().value;
    console.log(id);

    // build plot based on selected stock

    optionChanged(id);
}

// function to render plots
function optionChanged(id) {
    d3.json("data/samples.json").then((data) => {
    console.log(data);
    //console.log(id);
    
    for (var i = 0; i<data.samples.length; i++) {
        //console.log('testtest')
        //console.log(data.samples[i]['id'])
        if (data.samples[i]['id'] === id) {
            console.log(data.samples[i])
            var otu_ids = data.samples[i]['otu_ids']
            console.log(otu_ids)
            var sample_valuesList = data.samples[i]['sample_values'].sort( (a,b) => b.sample_valuesList - a.sample_valuesList)
            console.log(sample_valuesList)
            var sample_values = sample_valuesList.slice(0,10)
            console.log(sample_values)
        }
    }
    

    // define based on id
    //var sample_values = data.samples.map(x => x.sample_values);
    //var otu_ids = data.samples.map( x => x.otu_ids);
    //console.log(sample_values);
    //console.log(otu_ids);

    //console.log(data.samples[0]);

    var trace1 = {
        x: sample_values.reverse(),
        //y: otu_ids,
        type: "bar",
        name: data.samples.otu_labels
    };
    
    var data = [trace1];

    var layout = {
        title: "Number of Samples by OTU",
        xaxis: { title: "Sample size" },
        yaxis: { title: "OTU" }
    };

    Plotly.newPlot("bar", data, layout);
    });
}

d3.select("#selDataset").on("click", handleSelect);
