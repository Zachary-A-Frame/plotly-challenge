url = "../samples.json"

// ===================================================
// Data Exploration
// d3.json(url).then(function (data) {
//      for (i = 0; i < data.names.length; i++) {
//           console.log(i)
//           console.log(data.names[i])
//           console.log(data.metadata[i])
//           console.log(data.samples[i])
//           console.log("=======================")
//      }
// })
// ===================================================

// ===================================================
// So we need to create a dropdown menu that contains all of the test subject ID No.

d3.json(url).then(function (data) {
     for (i = 0; i < data.names.length; i++) {
          d3.select("#selDataset").append("option").attr("value", i).text(data.names[i])
     }
})

// ===================================================

// We want the top 10 OTU's found in an individual.
// d3.json(url).then(function (data) {
//      for (i = 0; i < 10; i++)
//           console.log(data.samples[0].sample_values[i])
// })


function init() {
     let xValues = []
     let yValues = []

     d3.json(url).then(function (data) {
          for (i = 0; i < 10; i++) {
               xValues.push(data.samples[0].sample_values[i])
               concatValue = "OTU " + data.samples[0].otu_ids[i];
               yValues.push("OTU " + data.samples[0].otu_ids[i].toString())
          }

          var layout = {
               title: "Top 10 OTU",
               yaxis: {
                    tickmode: "linear",
               },
               margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30,
               },
          };
          let trace = [{
               x: xValues.reverse(),
               y: yValues.reverse(),
               orientation: "h",
               type: "bar",
          }]
          let bubbleTrace = [
            {
              x: yValues,
              y: xValues,
              mode: "markers",
              marker: {
                size: xValues,
                color: [
                  "rgb(93, 164, 214)",
                  "rgb(255, 144, 14)",
                  "rgb(44, 160, 101)",
                  "rgb(255, 65, 54)",
                  "rgb(93, 164, 214)",
                  "rgb(255, 144, 14)",
                  "rgb(44, 160, 101)",
                  "rgb(255, 65, 54)",
                  "rgb(173,216,230)",
                  "rgb(144,238,144)",
                ],
                opacity: [1.0, 0.9, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.5],
              },
              type: "scatter",
            },
          ];

          Plotly.newPlot("bar", trace, layout);
          Plotly.newPlot("bubble", bubbleTrace)
     });
}



let updatePlotly = () => {
     let x = []
     let y = []

     d3.json(url).then(function (data) {
          let dropdownMenu = d3.select("#selDataset")
          let dataset = dropdownMenu.property("value")

          for (i = 0; i < 10; i++) {
               x.push(data.samples[dataset].sample_values[i])
               y.push("OTU " + data.samples[dataset].otu_ids[i].toString())
          }

          Plotly.restyle("bar", "x", [x.reverse()])
          Plotly.restyle("bar", "y", [y.reverse()])
          Plotly.restyle("bubble", "x", [y])
          Plotly.restyle("bubble", "y", [x]);

     })
}

d3.selectAll("#selDataset").on("change", updatePlotly);

init()