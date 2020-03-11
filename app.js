
// append option to #selDataset and loop through patient ID numbers to assign as values and text labels to options for drop down menu
function buildDropdown() {
    d3.json("data/samples.json").then((data) => {
        var id = data.samples.map( x => x.id);
        //var id = data.names.map(x=>x)
        console.log(id);

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

    //demographicInfo(id);

    for (var i = 0; i<data.samples.length; i++) {
        // loop through to get otu and sample values for each subject selected
        if (data.samples[i]['id'] === id) {
            console.log(data.samples[i])

            //get otu IDs
            var otu_ids = data.samples[i]['otu_ids']
            console.log(otu_ids)
            var otu_idsTop = data.samples[i]['otu_ids'].sort( (a,b) => b.otu_idsTop - a.otu_idsTop)
            var otu_ids10 = otu_idsTop.slice(0,10)

            //labels list for OTUs
            var labels =[]
            otu_ids10.forEach(x=> labels.push(`OTU ${x}`.toString()))
            console.log(labels)

            // get sample values
            var sample_valuesList = data.samples[i]['sample_values'].sort( (a,b) => b.sample_valuesList - a.sample_valuesList)
            console.log(sample_valuesList)
            var sample_values = sample_valuesList.slice(0,10)
            console.log(sample_values)
        }
    }

    // make bar chart
    var trace1 = {
        x: sample_values.reverse(),
        // y axis labels?
        text: labels.reverse(),
        //hovertext?
        type: "bar",
        //name: data.samples.otu_labels
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

// function for metadata demographic info
//function demographicInfo() {
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        
            for (var i = 0; i<data.metadata.length; i++) {
                // loop through to get metadata to get the one for subject selected
                if (data.metadata[i]['id'] === 940) {
                    console.log(data.metadata[i])
                    var idNo = data.metadata[i]['id']
                    var ethnicity = data.metadata[i]['ethnicity']
                    var gender = data.metadata[i]['gender']
                    var age = data.metadata[i]['age']
                    var location = data.metadata[i]['location']
                    var bbtype = data.metadata[i]['bbtype']
                    var wfreq = data.metadata[i]['wfreq']

                    metadataList = [`id: ${idNo}`, `ethnicity: ${ethnicity}`, `gender: ${gender}`, `age: ${age}`, `location: ${location}`, `bbtype: ${bbtype}`, `wfreq: ${wfreq}`]

                    var demoBox = d3.select('#sample-metadata')
                    //var demoList = demoBox.append('')

                    // var demoList = demoBox.append('par')
                    // var hi = Object.entries(data.metadata[i]).forEach( ([key,value]) => {
                    //     console.log(key,value)})
                    // demoList.append(hi)

                    metadataList.forEach( (x) => {
                        var demoList = demoBox.append('li')
                        demoDisp = demoList.text(x)
                        Object.entries(data.metadata[i]).forEach( ([key,value]) => {
                            console.log(key,value)
                        })
                    });
                    

                    }

                    
                    
                }
        }
        
    )
//};
//demographicInfo();


// bubble graph
d3.json("data/samples.json").then((data) => {
    console.log(data);
    console.log(data.samples[0]['id'])
    
    
    //console.log(id);

    for (var i = 0; i<data.samples.length; i++) {
        // loop through to get otu and sample values for each subject selected
        if (data.samples[i]['id'] === '940') {
            console.log(data.samples[i])

            //get otu IDs
            var otu_ids = data.samples[i]['otu_ids']
            console.log(otu_ids)
            //var otu_idsTop = data.samples[i]['otu_ids'].sort( (a,b) => b.otu_idsTop - a.otu_idsTop)
            //var otu_ids10 = otu_idsTop.slice(0,10)

            //labels list for OTUs
            // var labels =[]
            // otu_ids10.forEach(x=> labels.push(`OTU ${x}`.toString()))
            // console.log(labels)

            // get sample values
            var sample_valuesList = data.samples[i]['sample_values']
            console.log(sample_valuesList)
            //var sample_values = sample_valuesList.slice(0,10)
            //console.log(sample_values)
        }
    }

    // make bar chart
    var trace2 = {
        x: otu_ids,
        y: sample_valuesList,
        //text: labels,
        //hovertext?
        mode: 'markers',
       // type: "bar",
        marker: {size: sample_valuesList}
        //marker: sample_valuesList
        //name: data.samples.otu_labels
    };
    
    var data = [trace2];

    var layout = {
        title: "Number of Samples by OTU",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Number of samples" }
    };

    Plotly.newPlot("bubble", data, layout);

    });


d3.select("#selDataset").on("click", handleSelect);
