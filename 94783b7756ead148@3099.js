import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["df_final_value_float.csv",new URL("./files/454e95f3c1630d9e73a4f2f6bb3e06178a1d52c1251633ad14579235c506be191e0fedd3764b2182f409a4023f12ff5bd21a0e2c31abb01f191513af3e89d83f",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# LitVis Final Project
## Han Jun Yoon, Shao-Chun Wang, Purna Srivatsa, Katrina Kosmides

Regardless of the discipline or what is being researched, there are many papers and data to be read, processed, and analyzed, and the amount is only increasing. Due to the large amount of papers, literature review can take months or even years to find, organize, and review the work. This is a serious issue as it drastically increases the amount of time and work that is put into research before new data can be collected. The LitVis group has researched, designed, and implemented a solution to this major problem by creating visualizations that allow users to organize papers by score, frequency, and year. The interactive visualizations makes literature review much more efficient due to its many functionalities. Though the visualizations in this project are more specific to AI and machine learning, the visualizations can be loaded with any data of any field. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
------------------------------
The scatter plot below shows the relationship between year and score for each paper. The papers are encoded as point marks with the position represented by their year and score and the colors represented by their fold. Filters on folds, tasks, datasets, models, and metrics can be applied. The zoom and pan feature allows users to gather a better understanding of overall trends as well as take a more detailed look at specific points on the graph.`
)});
  main.variable(observer("viewof filteredFolds")).define("viewof filteredFolds", ["checkbox","_","folds"], function(checkbox,_,folds){return(
checkbox({
  title: "Folds",
  options: _.map(folds, fold => {
    return {value: fold, label: fold}
  }),
  value: folds,
})
)});
  main.variable(observer("filteredFolds")).define("filteredFolds", ["Generators", "viewof filteredFolds"], (G, _) => G.input(_));
  main.variable(observer("viewof filteredTasks")).define("viewof filteredTasks", ["Inputs","displayTasks"], function(Inputs,displayTasks){return(
Inputs.select(displayTasks, {label: "Tasks", multiple: true})
)});
  main.variable(observer("filteredTasks")).define("filteredTasks", ["Generators", "viewof filteredTasks"], (G, _) => G.input(_));
  main.variable(observer("viewof filteredDatasets")).define("viewof filteredDatasets", ["Inputs","displayDatasets"], function(Inputs,displayDatasets){return(
Inputs.select(displayDatasets, {label: "Datasets", multiple: true})
)});
  main.variable(observer("filteredDatasets")).define("filteredDatasets", ["Generators", "viewof filteredDatasets"], (G, _) => G.input(_));
  main.variable(observer("viewof filteredModels")).define("viewof filteredModels", ["Inputs","displayModels"], function(Inputs,displayModels){return(
Inputs.select(displayModels, {label: "Models", multiple: true})
)});
  main.variable(observer("filteredModels")).define("filteredModels", ["Generators", "viewof filteredModels"], (G, _) => G.input(_));
  main.variable(observer("viewof filteredMetrics")).define("viewof filteredMetrics", ["Inputs","displayMetrics"], function(Inputs,displayMetrics){return(
Inputs.radio(displayMetrics, {label: "Metrics"})
)});
  main.variable(observer("filteredMetrics")).define("filteredMetrics", ["Generators", "viewof filteredMetrics"], (G, _) => G.input(_));
  main.variable(observer()).define(["filteredMetrics"], function(filteredMetrics){return(
filteredMetrics
)});
  main.variable(observer("num_test")).define("num_test", function(){return(
0
)});
  main.variable(observer("metricsValue")).define("metricsValue", ["num_test"], function(num_test){return(
e =>{
  if(e=="Percentage error") {
    return num_test
  }
}
)});
  main.variable(observer()).define(["metricsValue","filteredMetrics"], function(metricsValue,filteredMetrics){return(
metricsValue(filteredMetrics)
)});
  main.variable(observer("chart")).define("chart", ["d3","height","margin","xAxisDate","xDate","zero_to_one","filteredMetrics","yAxis","y_zero_to_one","zero_to_ten","y_zero_to_ten","zero_to_hundred","y_zero_to_hundred","other_scale","y_other_scale","y","dataDate","foldTocolor","createLegend","setupZoom_zero_to_one","setupZoom_zero_to_ten","setupZoom_zero_to_hundred","setupZoom_other_scale"], function(d3,height,margin,xAxisDate,xDate,zero_to_one,filteredMetrics,yAxis,y_zero_to_one,zero_to_ten,y_zero_to_ten,zero_to_hundred,y_zero_to_hundred,other_scale,y_other_scale,y,dataDate,foldTocolor,createLegend,setupZoom_zero_to_one,setupZoom_zero_to_ten,setupZoom_zero_to_hundred,setupZoom_other_scale)
{

  var width = 1250;
  
  const svg = d3.create("svg")
      .attr("viewBox", [-15, 5, width + 15, height]);

  // The data to show when user hovers over a point
  const d_text = svg.append('text').text('').attr("font-size", "15px");

  // Adds title to the chart
  const title = svg.append("text")
      .attr("x", (width - 170) / 2)
      .attr("y", margin.top)
      .style("font-size", "20px")
      .style("text-decoration", "underline")
      .text("Score vs. Year");

  // Adds x axis title to the chart
  const xTitle = svg.append("text")
      .attr("x", (width - 80) / 2)
      .attr("y", height - 2)
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Year");

  // Adds y axis title to the chart
  const yTitle = svg.append("text")
      .attr("x", -( (height + 20) / 2))
      .attr("y", margin.right - 20)
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Score");
  
  // X and Y axis
  const gx = svg.append("g").call(xAxisDate, xDate);
  // const gx  = svg.append("g")
  //   .attr("transform", `translate(0,${height - margin.bottom})`)
  //             .call(xAxisDate);
  
  //call function(filteredMeric) which will return 0_1 or 0_100 or 0_10
  let gy;
  let y_func;
  // const gy = svg.append("g").call(yAxis, y);
  if(zero_to_one.includes(filteredMetrics)) {
    gy = svg.append("g").call(yAxis, y_zero_to_one);
    y_func = y_zero_to_one;
  } else if (zero_to_ten.includes(filteredMetrics)) {
    gy = svg.append("g").call(yAxis, y_zero_to_ten);
    y_func = y_zero_to_ten;
  } else if (zero_to_hundred.includes(filteredMetrics)) {
    gy = svg.append("g").call(yAxis, y_zero_to_hundred);
    y_func = y_zero_to_hundred;
  } else if (other_scale.includes(filteredMetrics)) {
    gy = svg.append("g").call(yAxis, y_other_scale);
    y_func = y_other_scale;
  }
  else{
    y_func = y;
  }
  
  //const gy = svg.append("g").call(yAxis, y);
  
  
  
  // Creates a color scale
  var cScale1 = d3.scaleOrdinal().domain([1, 11]).range(["#B84A62", "#FFB100", "#C5C9A4", "#6A8D73", "#E1B07E", "#7A6563", "#8EE3EF", "#37718E", "#8A7090", "#E3655B", "#BAB700"]);
  
  // Creates points and places them according to year and score
  const circles = svg.append("g")
      .selectAll("circle")
      .data(dataDate)
      .join("circle")
      .filter(d => d.value)
      // .attr("cx", d => x(d.year))
    .attr("cx", d => xDate(d.Date))
      .attr("cy", d => y_func(d.value))
      .attr("r", 7)
      .attr('fill', d => foldTocolor(d.fold)) //add by Shao
      //.style('fill', function(c) { return cScale1(c.fold)}) //comment by Shao
      .on("mouseover", function(event, d) {
        d3.select(event.target).attr("opacity", "0.50");
        d_text
          .html('Arxiv_id: ' + d.arxiv_id)
          .attr("x", 50)
          .attr("y", 60)
          .append("tspan")
          .html('Paper Title: ' + d.title)
          .attr("x", 50)
          .attr("y", 80)
          .append("tspan")
          .html('Model: ' + d.model)
          .attr("x", 50)
          .attr("y", 100)
          .append("tspan")
          .html('Fold: ' + d.fold)
          .attr("x", 50)
          .attr("y", 120)
          .append("tspan")
          .html('Dataset: ' + d.dataset)
          .attr("x", 50)
          .attr("y", 140)
          .append("tspan")
          .html('Metric: ' + d.metric)
          .attr("x", 50)
          .attr("y", 160)
          .append("tspan")
          .html('Score: ' + d.value)
          .attr("x", 50)
          .attr("y", 180)
          .append("tspan")
      })
      .on("mouseout", function(event, d) {
        d3.select(event.target).attr("opacity", "1.0");
        d_text.html('');
      });

  // Creates a legend for the colors of points 
  for (let i = 1; i <= 11; i++) {
    const size = width / 10;
    svg.append('rect').attr("x", width - 90).attr("y", ((i * size) / 8) + 30).attr("width", size / 8).attr('height', size / 8)
    .attr('fill', () => foldTocolor(i))
    //.attr("fill", () => cScale1(i));
  }
  
  createLegend(svg);
  
  // Allows user to zoom to a specific point on the chart
  if(zero_to_one.includes(filteredMetrics)) {
    //gy = svg.append("g").call(yAxis, y_zero_to_one);
    setupZoom_zero_to_one(svg, circles, gx, gy, y_zero_to_one);
  } else if (zero_to_ten.includes(filteredMetrics)) {
    //gy = svg.append("g").call(yAxis, y_zero_to_ten);
    setupZoom_zero_to_ten(svg, circles, gx, gy, y_zero_to_ten);
  } else if (zero_to_hundred.includes(filteredMetrics)) {
    //gy = svg.append("g").call(yAxis, y_zero_to_hundred);
    setupZoom_zero_to_hundred(svg, circles, gx, gy, y_zero_to_hundred);
  } else if (other_scale.includes(filteredMetrics)) {
    //gy = svg.append("g").call(yAxis, y_other_scale);
    setupZoom_other_scale(svg, circles, gx, gy, y_other_scale);
  }
  // setupZoom(svg, circles, gx, gy, y_func);

  //checkboxes for filtering
  // d3.selectAll("#checkbox").on("click",update());

  return svg.node();
}
);
  main.variable(observer("foldTocolor")).define("foldTocolor", ["d3"], function(d3){return(
d3
    .scaleOrdinal()
    .domain(["Speech Recognition","Machine Translation","Object Detection","Image Classification","Image Generation","Semantic Segmentation","Natural Language Inference","Miscellaneous","Pose Estimation", "Text Classification","Question Answering"])
    .range(["#B84A62", "#FFB100", "#C5C9A4", "#6A8D73", "#E1B07E", "#7A6563", "#8EE3EF", "#37718E", "#8A7090", "#E3655B", "#BAB700"])
)});
  main.variable(observer("chart2")).define("chart2", ["d3","width","height","margin","xAxis","x","yAxis","y2","frequencyData","filteredTasks","filteredDatasets","filteredMetrics","setupZoom2"], function(d3,width,height,margin,xAxis,x,yAxis,y2,frequencyData,filteredTasks,filteredDatasets,filteredMetrics,setupZoom2)
{

  const svg = d3.create("svg")
      .attr("viewBox", [-15, 5, width + 15, height]);

  // The data to show when user hovers over a point
  const d_text = svg.append('text').text('').attr("font-size", "15px");


  // Adds title to the chart
  const title = svg.append("text")
      .attr("x", (width - 170) / 2)
      .attr("y", margin.top)
      .style("font-size", "20px")
      .style("text-decoration", "underline")
      .text("Frequency vs. Year");

  // Adds x axis title to the chart
  const xTitle = svg.append("text")
      .attr("x", (width - 80) / 2)
      .attr("y", height - 2)
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Year");

  // Adds y axis title to the chart
  const yTitle = svg.append("text")
      .attr("x", -( (height + 20) / 2))
      .attr("y", margin.right - 20)
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Frequency");

  // Defines X and Y axis
  const gx = svg.append("g").call(xAxis, x);
  const gy = svg.append("g").call(yAxis, y2);

  // Adds line between points
  const path = svg.append("path")
    .datum(frequencyData)
    .attr("fill", "none")
    .attr("stroke", "darkgray")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line().x(function(d) { return x(d.year) }).y(function(d) { return y2(d.value) }))

  // Creates points and places them on chart according to year and frequency
  const circles = svg.append("g")
      .selectAll("circle")
      .data(frequencyData)
      .join("circle")
      .filter(d => d.value)
      .attr("cx", d => x(d.year))
      .attr("cy", d => y2(d.value))
      .attr("r", 5)
      .style('fill', "black")
      .on("mouseover", function(event, d) {
        d3.select(event.target).attr("opacity", "0.50");
        d_text
          //.html('Fold: ' + d.fold)
          //.attr("x", 50)
          //.attr("y", 60)
          //.append("tspan")
          .html('Filtered By Tasks: ' + filteredTasks)
          .attr("x", 50)
          .attr("y", 60)
          .append("tspan")
          .html('Filtered By Dataset: ' + filteredDatasets)
          .attr("x", 50)
          .attr("y", 80)
          .append("tspan")
          //.html('Filtered By Model: ' + filteredModels)
          //.attr("x", 50)
          //.attr("y", 100)
          //.append("tspan")
          .html('Filtered By Metric: ' + filteredMetrics)
          .attr("x", 50)
          .attr("y", 100)
          .append("tspan")
          .html('Frequency: ' + d.value)
          .attr("x", 50)
          .attr("y", 120)
          .append("tspan")
      })
      .on("mouseout", function(event, d) {
        d3.select(event.target).attr("opacity", "1.0");
        d_text.html('');
      });

  // Allows the user to zoom to a specific point on the chart
  setupZoom2(svg, circles, path, gx, gy, y2);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------------
The scatter plot above shows the relationship between year and frequency for each paper. The papers are encoded as point marks with the position represented by their year and score. The lines between points allow users to gather a better understanding of overall trends. The zoom and pan feature gives users the ability to take a more detailed look at specific points.
`
)});
  main.variable(observer("createLegend")).define("createLegend", ["width","height"], function(width,height){return(
function createLegend(svg) {
  
  // Legend text
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 548)
    .text("Speech Recognition")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 531)
    .text("Machine Translation") //speech_rec
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 515)
    .text("Object Detection")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 499)
    .text("Image Classification")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 484)
    .text("Image Generation")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 468)
    .text("Semantic Segmentation")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 453)
    .text("Natural Language Inference") 
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 437)
    .text("Miscellaneous")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 422)
    .text("Pose Estimation")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 406)
    .text("Text Classification")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  svg.append("text")
    .attr("x", width + 30)
    .attr("y", height - 390)
    .text("Question Answering") //qa
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
}
)});
  main.variable(observer("x")).define("x", ["d3","data1","margin","width"], function(d3,data1,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(data1, d => d.year)).nice()
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","years"], function(height,margin,d3,years){return(
(g,x) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(years).tickFormat(d3.format("d")))
)});
  main.variable(observer("arr_year")).define("arr_year", ["d3","data1"], function(d3,data1){return(
Array.from(d3.map(data1, d => d.year))
)});
  main.variable(observer("arr_year1")).define("arr_year1", ["arr_year"], function(arr_year){return(
[... new Set(arr_year)]
)});
  main.variable(observer("years")).define("years", ["d3","arr_year1"], function(d3,arr_year1){return(
d3.map(arr_year1, r=> parseInt(r))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Date on X axis**`
)});
  main.variable(observer("dataDate")).define("dataDate", ["filteredFoldTaskDatasetModelMetricData"], function(filteredFoldTaskDatasetModelMetricData){return(
filteredFoldTaskDatasetModelMetricData.map (r => ( { ...r,  Date: new Date(r.year + "-" + r.month + "-01")}  ) )
)});
  main.variable(observer("formatDate")).define("formatDate", ["d3"], function(d3){return(
d3.timeFormat("%b-%Y")
)});
  main.variable(observer("parseDate")).define("parseDate", ["d3"], function(d3){return(
d3.timeParse("%Y-%m-%d")
)});
  main.variable(observer()).define(["formatDate","parseDate"], function(formatDate,parseDate){return(
formatDate(parseDate('2014-10-01'))
)});
  main.variable(observer()).define(["d3","dataDate"], function(d3,dataDate){return(
d3.extent(dataDate, function(d) { return d.Date; })
)});
  main.variable(observer("xDate")).define("xDate", ["d3","dataDate","margin","width"], function(d3,dataDate,margin,width){return(
d3.scaleTime()
  .domain(d3.extent(dataDate, function(d) { return d.Date; })).nice()
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("xAxisDate")).define("xAxisDate", ["height","margin","d3"], function(height,margin,d3){return(
(g,x) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b-%Y")))
)});
  main.variable(observer("y")).define("y", ["d3","filteredFoldTaskDatasetModelMetricData","height","margin"], function(d3,filteredFoldTaskDatasetModelMetricData,height,margin){return(
d3.scaleLinear()
    .domain(d3.extent(filteredFoldTaskDatasetModelMetricData, d => d.value)).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("y2")).define("y2", ["d3","frequencyData","height","margin"], function(d3,frequencyData,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(frequencyData, d => d.value) + 2]).nice() 
    //.domain(d3.extent(frequencyData, d => d.value)).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("data1")).define("data1", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("df_final_value_float.csv").csv()
)});
  main.variable(observer()).define(["htl"], function(htl){return(
htl.html`<big><b>changing y axis based on metric</b></big>`
)});
  main.variable(observer("zero_to_hundred")).define("zero_to_hundred", function(){return(
["Accuracy", "Adversarial Accuracy", "AOP", "AP60", "AP70", "AP80", "AP90", "AR", "AUC", "Avg F1", "BLEU score", "Category iIoU", "Category IoU", "Class Avg", "class iIoU", "CorLoc", "EM", "Error Rate", "EMR", "F1", "F1 score", "F.W. IU", "FID", "FPS", "Frame (fps)", "Geometric Accuracy", "Global Accuracy", "Global Avg", "Inception score", "Intra FID", "KID", "mask AP", "Mean Accuracy", "Mean IoU", "Mean mAP", "MOTA", "mPCP", "Negative log-likelihood", "NLL Test", "NME", "PCK", "PCK@0.2", "PCK@0.5", "PCKh", "PCKh@0.5", "PCP", "PCP@0.5", "Percentage error", "Perplexity", "Pixel Accuracy", "Precision", "R-precision", "Rank-1", "Recall", "ROUGE-1", "ROUGE-2", "ROUGE-L", "Time (ms)", "Error Rate", "Top 5 Error Rate", "Word Error Rate", "Word Error Rate (WER)", "Top 1 Error Rate"]
)});
  main.variable(observer("zero_to_one")).define("zero_to_one", function(){return(
["AP", "AP50", "AP75", "box AP", "RMSE", "APL", "APM", "APS", "MAP", "Mean Squared Error", "MRR", "Pearson Correlation", "Spearman's Rank Correlation", "Test Score"]
)});
  main.variable(observer("zero_to_ten")).define("zero_to_ten", function(){return(
["Adversarial Divergence", "Average 3D Error", "Character Error Rate", "Model Entropy"]
)});
  main.variable(observer("other_scale")).define("other_scale", function(){return(
["Training Time", "Log-likelihood", "ms", "Number of incorrectly predicted examples", "Parameters", "Score", ""]
)});
  main.variable(observer("y_zero_to_one")).define("y_zero_to_one", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("y_zero_to_ten")).define("y_zero_to_ten", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,10]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("y_zero_to_hundred")).define("y_zero_to_hundred", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("y_other_scale")).define("y_other_scale", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,500000]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3"], function(margin,d3){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Additional code  - not needed**`
)});
  main.variable(observer()).define(["zero_to_ten","filteredMetrics"], function(zero_to_ten,filteredMetrics){return(
zero_to_ten.includes(filteredMetrics)
)});
  main.variable(observer("y_0_100")).define("y_0_100", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_0_100")).define("yAxis_0_100", ["margin","d3","y_0_100"], function(margin,d3,y_0_100){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_0_100))
)});
  main.variable(observer("data_extract1")).define("data_extract1", ["data2"], function(data2){return(
data2.filter(function(d){ return  (d.metric == "") })
)});
  main.variable(observer("sorted_data1")).define("sorted_data1", ["data_extract1","d3"], function(data_extract1,d3){return(
data_extract1.slice().sort((a, b) => d3.descending(a.value, b.value))
)});
  main.variable(observer()).define(["d3","data_extract1"], function(d3,data_extract1){return(
d3.min(data_extract1, d => d.value)
)});
  main.variable(observer()).define(["d3","data_extract1"], function(d3,data_extract1){return(
d3.max(data_extract1, d => d.value)
)});
  main.variable(observer("y_accuracy")).define("y_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_accuracy")).define("yAxis_accuracy", ["margin","d3","y_accuracy"], function(margin,d3,y_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_accuracy))
)});
  main.variable(observer("y_adversarial_accuracy")).define("y_adversarial_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_adversarial_accuracy")).define("yAxis_adversarial_accuracy", ["margin","d3","y_adversarial_accuracy"], function(margin,d3,y_adversarial_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_adversarial_accuracy))
)});
  main.variable(observer("y_adversarial_divergence")).define("y_adversarial_divergence", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,10])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_adversarial_divergence")).define("yAxis_adversarial_divergence", ["margin","d3","y_adversarial_divergence"], function(margin,d3,y_adversarial_divergence){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_adversarial_divergence))
)});
  main.variable(observer("y_aop")).define("y_aop", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_aop")).define("yAxis_aop", ["margin","d3","y_aop"], function(margin,d3,y_aop){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_aop))
)});
  main.variable(observer("y_ap")).define("y_ap", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap")).define("yAxis_ap", ["margin","d3","y_ap"], function(margin,d3,y_ap){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap))
)});
  main.variable(observer("y_ap50")).define("y_ap50", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap50")).define("yAxis_ap50", ["margin","d3","y_ap50"], function(margin,d3,y_ap50){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap50))
)});
  main.variable(observer("y_ap60")).define("y_ap60", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap60")).define("yAxis_ap60", ["margin","d3","y_ap60"], function(margin,d3,y_ap60){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap60))
)});
  main.variable(observer("y_ap70")).define("y_ap70", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap70")).define("yAxis_ap70", ["margin","d3","y_ap70"], function(margin,d3,y_ap70){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap70))
)});
  main.variable(observer("y_ap75")).define("y_ap75", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap75")).define("yAxis_ap75", ["margin","d3","y_ap75"], function(margin,d3,y_ap75){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap75))
)});
  main.variable(observer("y_ap80")).define("y_ap80", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap80")).define("yAxis_ap80", ["margin","d3","y_ap80"], function(margin,d3,y_ap80){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap80))
)});
  main.variable(observer("y_ap90")).define("y_ap90", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ap90")).define("yAxis_ap90", ["margin","d3","y_ap90"], function(margin,d3,y_ap90){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ap90))
)});
  main.variable(observer("y_apl")).define("y_apl", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_apl")).define("yAxis_apl", ["margin","d3","y_apl"], function(margin,d3,y_apl){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_apl))
)});
  main.variable(observer("y_apm")).define("y_apm", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_apm")).define("yAxis_apm", ["margin","d3","y_apm"], function(margin,d3,y_apm){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_apm))
)});
  main.variable(observer("y_aps")).define("y_aps", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_aps")).define("yAxis_aps", ["margin","d3","y_aps"], function(margin,d3,y_aps){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_aps))
)});
  main.variable(observer("y_ar")).define("y_ar", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ar")).define("yAxis_ar", ["margin","d3","y_ar"], function(margin,d3,y_ar){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ar))
)});
  main.variable(observer("y_auc")).define("y_auc", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_auc")).define("yAxis_auc", ["margin","d3","y_auc"], function(margin,d3,y_auc){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_auc))
)});
  main.variable(observer("y_avg_3d_error")).define("y_avg_3d_error", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,10])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_avg_3d_error")).define("yAxis_avg_3d_error", ["margin","d3","y_avg_3d_error"], function(margin,d3,y_avg_3d_error){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_avg_3d_error))
)});
  main.variable(observer("y_avg_f1")).define("y_avg_f1", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_avg_f1")).define("yAxis_avg_f1", ["margin","d3","y_avg_f1"], function(margin,d3,y_avg_f1){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_avg_f1))
)});
  main.variable(observer("y_bleu_score")).define("y_bleu_score", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_bleu_score")).define("yAxis_bleu_score", ["margin","d3","y_bleu_score"], function(margin,d3,y_bleu_score){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_bleu_score))
)});
  main.variable(observer("y_box_ap")).define("y_box_ap", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_box_ap")).define("yAxis_box_ap", ["margin","d3","y_box_ap"], function(margin,d3,y_box_ap){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_box_ap))
)});
  main.variable(observer("y_categ_ilou")).define("y_categ_ilou", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_categ_ilou")).define("yAxis_categ_ilou", ["margin","d3","y_categ_ilou"], function(margin,d3,y_categ_ilou){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_categ_ilou))
)});
  main.variable(observer("y_categ_lou")).define("y_categ_lou", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_categ_lou")).define("yAxis_categ_lou", ["margin","d3","y_categ_lou"], function(margin,d3,y_categ_lou){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_categ_lou))
)});
  main.variable(observer("y_char_error_rate")).define("y_char_error_rate", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,10])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_char_error_rate")).define("yAxis_char_error_rate", ["margin","d3","y_char_error_rate"], function(margin,d3,y_char_error_rate){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_char_error_rate))
)});
  main.variable(observer("y_class_avg")).define("y_class_avg", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_class_avg")).define("yAxis_class_avg", ["margin","d3","y_class_avg"], function(margin,d3,y_class_avg){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_class_avg))
)});
  main.variable(observer("y_class_ilou")).define("y_class_ilou", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_class_ilou")).define("yAxis_class_ilou", ["margin","d3","y_class_ilou"], function(margin,d3,y_class_ilou){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_class_ilou))
)});
  main.variable(observer("y_corloc")).define("y_corloc", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_corloc")).define("yAxis_corloc", ["margin","d3","y_corloc"], function(margin,d3,y_corloc){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_corloc))
)});
  main.variable(observer("y_em")).define("y_em", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_em")).define("yAxis_em", ["margin","d3","y_em"], function(margin,d3,y_em){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_em))
)});
  main.variable(observer("y_error_rate")).define("y_error_rate", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_error_rate")).define("yAxis_error_rate", ["margin","d3","y_error_rate"], function(margin,d3,y_error_rate){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_error_rate))
)});
  main.variable(observer("y_emr")).define("y_emr", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_emr")).define("yAxis_emr", ["margin","d3","y_emr"], function(margin,d3,y_emr){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_emr))
)});
  main.variable(observer("y_f1")).define("y_f1", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_f1")).define("yAxis_f1", ["margin","d3","y_f1_score"], function(margin,d3,y_f1_score){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_f1_score))
)});
  main.variable(observer("y_f1_score")).define("y_f1_score", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_f1_score")).define("yAxis_f1_score", ["margin","d3","y_f1_score"], function(margin,d3,y_f1_score){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_f1_score))
)});
  main.variable(observer("y_fw_iu")).define("y_fw_iu", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_fw_iu")).define("yAxis_fw_iu", ["margin","d3","y_fw_iu"], function(margin,d3,y_fw_iu){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_fw_iu))
)});
  main.variable(observer("y_fid")).define("y_fid", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_fid")).define("yAxis_fid", ["margin","d3","y_fid"], function(margin,d3,y_fid){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_fid))
)});
  main.variable(observer("y_fps")).define("y_fps", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_fps")).define("yAxis_fps", ["margin","d3","y_fps"], function(margin,d3,y_fps){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_fps))
)});
  main.variable(observer("y_frame")).define("y_frame", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_frame")).define("yAxis_frame", ["margin","d3","y_frame"], function(margin,d3,y_frame){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_frame))
)});
  main.variable(observer("y_geometric_accuracy")).define("y_geometric_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_geometric_accuracy")).define("yAxis_geometric_accuracy", ["margin","d3","y_geometric_accuracy"], function(margin,d3,y_geometric_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_geometric_accuracy))
)});
  main.variable(observer("y_global_accuracy")).define("y_global_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_global_accuracy")).define("yAxis_global_accuracy", ["margin","d3","y_global_accuracy"], function(margin,d3,y_global_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_global_accuracy))
)});
  main.variable(observer("y_global_avg")).define("y_global_avg", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_global_avg")).define("yAxis_global_avg", ["margin","d3","y_global_avg"], function(margin,d3,y_global_avg){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_global_avg))
)});
  main.variable(observer("y_inception_score")).define("y_inception_score", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_inception_score")).define("yAxis_inception_score", ["margin","d3","y_inception_score"], function(margin,d3,y_inception_score){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_inception_score))
)});
  main.variable(observer("y_intra_fid")).define("y_intra_fid", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_intra_fid")).define("yAxis_intra_fid", ["margin","d3","y_intra_fid"], function(margin,d3,y_intra_fid){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_intra_fid))
)});
  main.variable(observer("y_kid")).define("y_kid", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_kid")).define("yAxis_kid", ["margin","d3","y_kid"], function(margin,d3,y_kid){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_kid))
)});
  main.variable(observer("y_log_likelihood")).define("y_log_likelihood", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([1,10000])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_log_likelihood")).define("yAxis_log_likelihood", ["margin","d3","y_log_likelihood"], function(margin,d3,y_log_likelihood){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_log_likelihood))
)});
  main.variable(observer("y_map")).define("y_map", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_map")).define("yAxis_map", ["margin","d3","y_map"], function(margin,d3,y_map){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_map))
)});
  main.variable(observer("y_mask_ap")).define("y_mask_ap", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mask_ap")).define("yAxis_mask_ap", ["margin","d3","y_mask_ap"], function(margin,d3,y_mask_ap){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mask_ap))
)});
  main.variable(observer("y_mean_accuracy")).define("y_mean_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mean_accuracy")).define("yAxis_mean_accuracy", ["margin","d3","y_mean_accuracy"], function(margin,d3,y_mean_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mean_accuracy))
)});
  main.variable(observer("y_mean_iou")).define("y_mean_iou", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mean_iou")).define("yAxis_mean_iou", ["margin","d3","y_mean_iou"], function(margin,d3,y_mean_iou){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mean_iou))
)});
  main.variable(observer("y_mean_map")).define("y_mean_map", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mean_map")).define("yAxis_mean_map", ["margin","d3","y_mean_map"], function(margin,d3,y_mean_map){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mean_map))
)});
  main.variable(observer("y_mean_squared_error")).define("y_mean_squared_error", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mean_squared_error")).define("yAxis_mean_squared_error", ["margin","d3","y_mean_squared_error"], function(margin,d3,y_mean_squared_error){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mean_squared_error))
)});
  main.variable(observer("y_model_entrophy")).define("y_model_entrophy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,10])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_model_entrophyr")).define("yAxis_model_entrophyr", ["margin","d3","y_model_entrophy"], function(margin,d3,y_model_entrophy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_model_entrophy))
)});
  main.variable(observer("y_mota")).define("y_mota", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mota")).define("yAxis_mota", ["margin","d3","y_mota"], function(margin,d3,y_mota){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mota))
)});
  main.variable(observer("y_mpcp")).define("y_mpcp", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mpcp")).define("yAxis_mpcp", ["margin","d3","y_mpcp"], function(margin,d3,y_mpcp){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mpcp))
)});
  main.variable(observer("y_mrr")).define("y_mrr", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_mrr")).define("yAxis_mrr", ["margin","d3","y_mrr"], function(margin,d3,y_mrr){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_mrr))
)});
  main.variable(observer("y_ms")).define("y_ms", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,200])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_ms")).define("yAxis_ms", ["margin","d3","y_ms"], function(margin,d3,y_ms){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_ms))
)});
  main.variable(observer("y_negative_log_likelihood")).define("y_negative_log_likelihood", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_negative_log_likelihood")).define("yAxis_negative_log_likelihood", ["margin","d3","y_negative_log_likelihood"], function(margin,d3,y_negative_log_likelihood){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_negative_log_likelihood))
)});
  main.variable(observer("y_nll_test")).define("y_nll_test", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_nll_test")).define("yAxis_nll_test", ["margin","d3","y_nll_test"], function(margin,d3,y_nll_test){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_nll_test))
)});
  main.variable(observer("y_nme")).define("y_nme", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_nme")).define("yAxis_nme", ["margin","d3","y_nme"], function(margin,d3,y_nme){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_nme))
)});
  main.variable(observer("y_num_incorect_predict_examp")).define("y_num_incorect_predict_examp", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,2000])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_num_incorect_predict_exam")).define("yAxis_num_incorect_predict_exam", ["margin","d3","y_num_incorect_predict_examp"], function(margin,d3,y_num_incorect_predict_examp){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_num_incorect_predict_examp))
)});
  main.variable(observer("y_parameters")).define("y_parameters", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,5000000])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_parameters")).define("yAxis_parameters", ["margin","d3","y_parameters"], function(margin,d3,y_parameters){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_parameters))
)});
  main.variable(observer("y_pck")).define("y_pck", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pck")).define("yAxis_pck", ["margin","d3","y_pck"], function(margin,d3,y_pck){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pck))
)});
  main.variable(observer("y_pck02")).define("y_pck02", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pck02")).define("yAxis_pck02", ["margin","d3","y_pck02"], function(margin,d3,y_pck02){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pck02))
)});
  main.variable(observer("y_pck05")).define("y_pck05", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pck05")).define("yAxis_pck05", ["margin","d3","y_pck05"], function(margin,d3,y_pck05){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pck05))
)});
  main.variable(observer("y_pckh")).define("y_pckh", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pckh")).define("yAxis_pckh", ["margin","d3","y_pckh"], function(margin,d3,y_pckh){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pckh))
)});
  main.variable(observer("y_pckh05")).define("y_pckh05", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pckh05")).define("yAxis_pckh05", ["margin","d3","y_pckh05"], function(margin,d3,y_pckh05){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pckh05))
)});
  main.variable(observer("y_pcp")).define("y_pcp", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pcp")).define("yAxis_pcp", ["margin","d3","y_pcp"], function(margin,d3,y_pcp){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pcp))
)});
  main.variable(observer("y_pcp05")).define("y_pcp05", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pcp05")).define("yAxis_pcp05", ["margin","d3","y_pcp05"], function(margin,d3,y_pcp05){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pcp05))
)});
  main.variable(observer("y_pearson_correl")).define("y_pearson_correl", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pearson_correl")).define("yAxis_pearson_correl", ["margin","d3","y_pearson_correl"], function(margin,d3,y_pearson_correl){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pearson_correl))
)});
  main.variable(observer("y_percent_error")).define("y_percent_error", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_percent_error")).define("yAxis_percent_error", ["margin","d3"], function(margin,d3){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
)});
  main.variable(observer("y_perplexity")).define("y_perplexity", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_perplexity")).define("yAxis_perplexity", ["margin","d3","y_perplexity"], function(margin,d3,y_perplexity){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_perplexity))
)});
  main.variable(observer("y_pixel_accuracy")).define("y_pixel_accuracy", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_pixel_accuracy")).define("yAxis_pixel_accuracy", ["margin","d3","y_pixel_accuracy"], function(margin,d3,y_pixel_accuracy){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_pixel_accuracy))
)});
  main.variable(observer("y_precision")).define("y_precision", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_precision")).define("yAxis_precision", ["margin","d3","y_precision"], function(margin,d3,y_precision){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_precision))
)});
  main.variable(observer("y_rprecision")).define("y_rprecision", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rprecision")).define("yAxis_rprecision", ["margin","d3","y_rprecision"], function(margin,d3,y_rprecision){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rprecision))
)});
  main.variable(observer("y_rank1")).define("y_rank1", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rank1")).define("yAxis_rank1", ["margin","d3","y_rank1"], function(margin,d3,y_rank1){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rank1))
)});
  main.variable(observer("y_recall")).define("y_recall", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_recall")).define("yAxis_recall", ["margin","d3","y_recall"], function(margin,d3,y_recall){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_recall))
)});
  main.variable(observer("y_rmse")).define("y_rmse", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rmse")).define("yAxis_rmse", ["margin","d3","y_rmse"], function(margin,d3,y_rmse){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rmse))
)});
  main.variable(observer("y_rouge1")).define("y_rouge1", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rouge1")).define("yAxis_rouge1", ["margin","d3","y_rouge1"], function(margin,d3,y_rouge1){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rouge1))
)});
  main.variable(observer("y_rouge2")).define("y_rouge2", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rouge2")).define("yAxis_rouge2", ["margin","d3","y_rouge2"], function(margin,d3,y_rouge2){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rouge2))
)});
  main.variable(observer("y_rougel")).define("y_rougel", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_rougel")).define("yAxis_rougel", ["margin","d3","y_rougel"], function(margin,d3,y_rougel){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_rougel))
)});
  main.variable(observer("y_runtime")).define("y_runtime", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1000])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_runtime")).define("yAxis_runtime", ["margin","d3","y_runtime"], function(margin,d3,y_runtime){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_runtime))
)});
  main.variable(observer("y_score")).define("y_score", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,12000])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_score")).define("yAxis_score", ["margin","d3","y_score"], function(margin,d3,y_score){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_score))
)});
  main.variable(observer("y_spears_rank_correl")).define("y_spears_rank_correl", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_spears_rank_correl")).define("yAxis_spears_rank_correl", ["margin","d3","y_spears_rank_correl"], function(margin,d3,y_spears_rank_correl){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_spears_rank_correl))
)});
  main.variable(observer("y_time")).define("y_time", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_time")).define("yAxis_time", ["margin","d3","y_time"], function(margin,d3,y_time){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_time))
)});
  main.variable(observer("y_testscore")).define("y_testscore", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_testscore")).define("yAxis_testscore", ["margin","d3","y_testscore"], function(margin,d3,y_testscore){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_testscore))
)});
  main.variable(observer("y_top1_error_rate")).define("y_top1_error_rate", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_top1_error_rate")).define("yAxis_top1_error_rate", ["margin","d3","y_top1_error_rate"], function(margin,d3,y_top1_error_rate){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_top1_error_rate))
)});
  main.variable(observer("y_top5_error_rate")).define("y_top5_error_rate", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_top5_error_rate")).define("yAxis_top5_error_rate", ["margin","d3","y_top5_error_rate"], function(margin,d3,y_top5_error_rate){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_top5_error_rate))
)});
  main.variable(observer("y_training_time")).define("y_training_time", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,1300])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_training_time")).define("yAxis_training_time", ["margin","d3","y_training_time"], function(margin,d3,y_training_time){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_training_time))
)});
  main.variable(observer("y_word_error_rate")).define("y_word_error_rate", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_word_error_rate")).define("yAxis_word_error_rate", ["margin","d3","y_word_error_rate"], function(margin,d3,y_word_error_rate){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_word_error_rate))
)});
  main.variable(observer("y_word_error_rate_WER")).define("y_word_error_rate_WER", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0,100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("yAxis_word_error_rate_WER")).define("yAxis_word_error_rate_WER", ["margin","d3","y_word_error_rate_WER"], function(margin,d3,y_word_error_rate_WER){return(
(g,y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_word_error_rate_WER))
)});
  main.variable(observer("data2")).define("data2", ["data1"], function(data1){return(
data1.map (r => ( { ...r,  value: parseFloat(r.value), month: parseInt(r.month), year: parseInt(r.year) }  ) )
)});
  main.variable(observer("data_extract")).define("data_extract", ["data2"], function(data2){return(
data2.filter(function(d){ return  (d.metric == "mask AP") })
)});
  main.variable(observer("sorted_data")).define("sorted_data", ["data_extract","d3"], function(data_extract,d3){return(
data_extract.slice().sort((a, b) => d3.descending(a.value, b.value))
)});
  main.variable(observer()).define(["d3","data_extract"], function(d3,data_extract){return(
d3.min(data_extract, d => d.value)
)});
  main.variable(observer()).define(["d3","data_extract"], function(d3,data_extract){return(
d3.max(data_extract, d => d.value)
)});
  main.variable(observer()).define(["d3","data2"], function(d3,data2){return(
d3.group(data2, d => d.metric, d => d.dataset)
)});
  main.variable(observer()).define(["d3","data2"], function(d3,data2){return(
d3.group(data2, d => d.model)
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<big><b>Filter function based on selections</b></big>`
)});
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  const child2 = runtime.module(define1);
  main.import("select", child2);
  main.variable(observer("valuee")).define("valuee", function(){return(
function valuee(a){
  for (let i = 0; i < a.length; i++) { 
      //return a[i].fold
    if (a[i].fold == "speech_rec") {
      a[i].fold = "Speech Recognition"
    }
    else if (a[i].fold == "mt") {
      a[i].fold = "Machine Translation"
    }
    else if (a[i].fold == "object_det") {
      a[i].fold = "Object Detection"
    }
    else if (a[i].fold == "img_class") {
      a[i].fold = "Image Classification"
    }
     else if (a[i].fold == "img_gen") {
      a[i].fold = "Image Generation"
    }
    else if (a[i].fold == "sem_seg") {
      a[i].fold = "Semantic Segmentation"
    }
    else if (a[i].fold == "nli") {
      a[i].fold = "Natural Language Inference"
    }
    else if (a[i].fold == "misc") {
      a[i].fold = "Miscellaneous"
    }
    else if (a[i].fold == "pose_estim") {
      a[i].fold = "Pose Estimation"
    }
    else if (a[i].fold == "text_class") {
      a[i].fold = "Text Classification"
    }
    else if (a[i].fold == "qa") {
      a[i].fold = "Question Answering"
    }
  }
}
)});
  main.variable(observer()).define(["valuee","data1"], function(valuee,data1){return(
valuee(data1)
)});
  main.variable(observer()).define(["data1"], function(data1){return(
data1
)});
  main.variable(observer("data3")).define("data3", ["data1"], function(data1){return(
data1
)});
  main.variable(observer("folds")).define("folds", ["data3"], function(data3){return(
[...new Set(data3.map(d => d.fold))]
)});
  main.variable(observer("tasks")).define("tasks", ["data1"], function(data1){return(
[...new Set(data1.map(d => d.task))]
)});
  main.variable(observer("displayTasks")).define("displayTasks", ["filteredFoldData"], function(filteredFoldData){return(
[...new Set(filteredFoldData.map(d => d.task))]
)});
  main.variable(observer("models")).define("models", ["data1"], function(data1){return(
[...new Set(data1.map(d => d.model))]
)});
  main.variable(observer("displayModels")).define("displayModels", ["filteredFoldTaskDatasetData"], function(filteredFoldTaskDatasetData){return(
[...new Set(filteredFoldTaskDatasetData.map(d => d.model))]
)});
  main.variable(observer("datasets")).define("datasets", ["data1"], function(data1){return(
[...new Set(data1.map(d => d.dataset))]
)});
  main.variable(observer("metrics")).define("metrics", ["data1"], function(data1){return(
[...new Set(data1.map(d => d.metric))]
)});
  main.variable(observer("displayMetrics")).define("displayMetrics", ["filteredFoldTaskDatasetModelData"], function(filteredFoldTaskDatasetModelData){return(
[...new Set(filteredFoldTaskDatasetModelData.map(d => d.metric))]
)});
  main.variable(observer("displayDatasets")).define("displayDatasets", ["filteredFoldTaskData"], function(filteredFoldTaskData){return(
[...new Set(filteredFoldTaskData.map(d => d.dataset))]
)});
  main.variable(observer("filteredFoldData")).define("filteredFoldData", ["_","data1","filteredFolds"], function(_,data1,filteredFolds){return(
_.filter(data1, d => {
  // either the genre is in the filtered genres
  return (_.includes(filteredFolds, d.fold) 
         //&& (_.includes(filteredTasks, d.task))
    // OR the movie's genre isn't one of the top genres, and "Other" is toggled
    ) 
})
)});
  main.variable(observer("filteredFoldTaskData")).define("filteredFoldTaskData", ["_","data1","filteredFolds","filteredTasks"], function(_,data1,filteredFolds,filteredTasks){return(
_.filter(data1, d => {
  // either the genre is in the filtered genres
  return (_.includes(filteredFolds, d.fold) 
         && (_.includes(filteredTasks, d.task))
    // OR the movie's genre isn't one of the top genres, and "Other" is toggled
    ) 
})
)});
  main.variable(observer("filteredFoldTaskDatasetData")).define("filteredFoldTaskDatasetData", ["_","data1","filteredFolds","filteredTasks","filteredDatasets"], function(_,data1,filteredFolds,filteredTasks,filteredDatasets){return(
_.filter(data1, d => {
  // either the genre is in the filtered genres
  return (_.includes(filteredFolds, d.fold) 
         && (_.includes(filteredTasks, d.task))
          && (_.includes(filteredDatasets, d.dataset))
    // OR the movie's genre isn't one of the top genres, and "Other" is toggled
    ) 
})
)});
  main.variable(observer("filteredFoldTaskDatasetModelData")).define("filteredFoldTaskDatasetModelData", ["_","data1","filteredFolds","filteredTasks","filteredDatasets","filteredModels"], function(_,data1,filteredFolds,filteredTasks,filteredDatasets,filteredModels){return(
_.filter(data1, d => {
  // either the genre is in the filtered genres
  return (_.includes(filteredFolds, d.fold) 
         && (_.includes(filteredTasks, d.task))
          && (_.includes(filteredDatasets, d.dataset))
          && (_.includes(filteredModels, d.model))
    // OR the movie's genre isn't one of the top genres, and "Other" is toggled
    ) 
})
)});
  main.variable(observer("filteredFoldTaskDatasetModelMetricData")).define("filteredFoldTaskDatasetModelMetricData", ["_","data1","filteredFolds","filteredTasks","filteredDatasets","filteredModels","filteredMetrics"], function(_,data1,filteredFolds,filteredTasks,filteredDatasets,filteredModels,filteredMetrics){return(
_.filter(data1, d => {
  // either the genre is in the filtered genres
  return (_.includes(filteredFolds, d.fold) 
         && (_.includes(filteredTasks, d.task))
          && (_.includes(filteredDatasets, d.dataset))
          && (_.includes(filteredModels, d.model))
          && (_.includes(filteredMetrics, d.metric))
    // OR the movie's genre isn't one of the top genres, and "Other" is toggled
    ) 
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<big><b>Rollup function for frequency chart</b></big>`
)});
  main.variable(observer("frequencyData")).define("frequencyData", ["d3","filteredFoldTaskDatasetModelMetricData"], function(d3,filteredFoldTaskDatasetModelMetricData){return(
Array.from(d3.rollup(filteredFoldTaskDatasetModelMetricData, v => v.length, d => d.year)).map( r => ({year: r[0], value: r[1]}))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<big><b>Zoom function</b></big>`
)});
  main.variable(observer("setupZoom")).define("setupZoom", ["margin","width","height","d3","mutable transform","xDate","y","xAxisDate","yAxis"], function(margin,width,height,d3,$0,xDate,y,xAxisDate,yAxis){return(
function setupZoom(svg, circles, gx, gy) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(xDate);
    const yz = event.transform.rescaleY(y);

    // Moves the points based on the zoom
    circles.attr("cx", d => xz (d.Date))
        .attr("cy", d => yz (d.value));
    
    gx.call(xAxisDate, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.variable(observer("setupZoom_zero_to_one")).define("setupZoom_zero_to_one", ["margin","width","height","d3","mutable transform","xDate","y_zero_to_one","xAxisDate","yAxis"], function(margin,width,height,d3,$0,xDate,y_zero_to_one,xAxisDate,yAxis){return(
function setupZoom_zero_to_one(svg, circles, gx, gy) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(xDate);
    const yz = event.transform.rescaleY(y_zero_to_one);

    // Moves the points based on the zoom
    circles.attr("cx", d => xz (d.Date))
        .attr("cy", d => yz (d.value));
    
    gx.call(xAxisDate, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.variable(observer("setupZoom_zero_to_ten")).define("setupZoom_zero_to_ten", ["margin","width","height","d3","mutable transform","xDate","y_zero_to_ten","xAxisDate","yAxis"], function(margin,width,height,d3,$0,xDate,y_zero_to_ten,xAxisDate,yAxis){return(
function setupZoom_zero_to_ten(svg, circles, gx, gy) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(xDate);
    const yz = event.transform.rescaleY(y_zero_to_ten);

    // Moves the points based on the zoom
    circles.attr("cx", d => xz (d.Date))
        .attr("cy", d => yz (d.value));
    
    gx.call(xAxisDate, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.variable(observer("setupZoom_zero_to_hundred")).define("setupZoom_zero_to_hundred", ["margin","width","height","d3","mutable transform","xDate","y_zero_to_hundred","xAxisDate","yAxis"], function(margin,width,height,d3,$0,xDate,y_zero_to_hundred,xAxisDate,yAxis){return(
function setupZoom_zero_to_hundred(svg, circles, gx, gy) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(xDate);
    const yz = event.transform.rescaleY(y_zero_to_hundred);

    // Moves the points based on the zoom
    circles.attr("cx", d => xz (d.Date))
        .attr("cy", d => yz (d.value));
    
    gx.call(xAxisDate, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.variable(observer("setupZoom_other_scale")).define("setupZoom_other_scale", ["margin","width","height","d3","mutable transform","xDate","y_other_scale","xAxisDate","yAxis"], function(margin,width,height,d3,$0,xDate,y_other_scale,xAxisDate,yAxis){return(
function setupZoom_other_scale(svg, circles, gx, gy) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(xDate);
    const yz = event.transform.rescaleY(y_other_scale);

    // Moves the points based on the zoom
    circles.attr("cx", d => xz (d.Date))
        .attr("cy", d => yz (d.value));
    
    gx.call(xAxisDate, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.variable(observer("setupZoom2")).define("setupZoom2", ["margin","width","height","d3","mutable transform","x","xAxis","yAxis"], function(margin,width,height,d3,$0,x,xAxis,yAxis){return(
function setupZoom2(svg, circles, path, gx, gy,y) {
  // D3 Zoom API:
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.bottom]];
  const zoom = d3.zoom()
      .extent(extent)          // Where the interaction occurs
      .translateExtent(extent) // Limits panning to the original extent
      .scaleExtent([1, 32])    // Sets the maximum zoom factor
      .on("zoom", zooming);
  svg.call(zoom);
  
  function zooming(event) { 
    $0.value = event.transform;
    
    // Do zooming here, event.transform expresses the pan+zoom from original x & y scales
    const xz = event.transform.rescaleX(x);
    const yz = event.transform.rescaleY(y);

    // Moves points based on zoom
    circles.attr("cx", d => xz (d.year))
      .attr("cy", d => yz (d.value));
    
    // Moves line based on zoom
    path.attr("d", d3.line()
              .x(d => xz(d.year))
              .y(d => yz(d.value)))
  
    gx.call(xAxis, xz);
    gy.call(yAxis, yz);

  }
}
)});
  main.define("initial transform", function(){return(
null
)});
  main.variable(observer("mutable transform")).define("mutable transform", ["Mutable", "initial transform"], (M, _) => new M(_));
  main.variable(observer("transform")).define("transform", ["mutable transform"], _ => _.generator);
  main.variable(observer("margin")).define("margin", function(){return(
{top: 25, right: 20, bottom: 35, left: 40}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<big><b>Credits</b></big><br>
Phase 1:

  - Domain abstraction: Katrina <br>
  - Data abstraction: Sho Chun
  - Task abstraction: Han Jun, Purna

Phase 2:

  - Interviews(8) : Purna, Han Jun, Katrina, SHao Chun - 2 interviews each
  Edits to phase 1 report :
      - Data abstraction : Purna, Shao Chun, Han Jun, Katrina
      - Task abstraction: Purna , Shao Chun, Han Jun, Katrina
      - Domain Situation: Purna , Shao Chun, Han Jun, Katrina
      
  - Design:  
    - Design 1: Purna
    - Design 2: Han Jun
    - Design 3: Purna
    
  - Validation: Han Jun, Purna
  - Appendix: Han Jun
  
Phase 3:

Your final implemented solution:
Description of the design - 

Design 1 -

**Scatter Plot. **
In this design idiom we are placing year on x axis of a chart and score on y axis. The papers are the points on the chart. 
Marks -  The papers are encoded as point marks
Channels - Ordered attributes - 
The year attribute is placed on the x axis and the score attribute is placed on the y axis. 
Identity channels - categorical attributes -
The score type is encoded with a color hue. There are multiple score types (F1, Accuracy, Recall etc). The point(paper) is shown in the color of the score that the paper is reporting. 
The year and score information of each paper is thus represented by their position on an aligned scale(Y axis - Year, X axis - Score).
The size channel is still open for usage and a future addition of quantitative attributes(Eg - number of citations) can utilize the size channel.
Scalability
The scatter plot can accommodate hundreds of papers with distinguishability. Any more papers would lead to clustering and overlaying of one point over another. The chart can accommodate one more quantitative attribute through the size change

**Interactions. **
The user can filter on any of the categorical values - Model, Dataset, Task, Fold, Metric.  The user can hover on the paper(point mark) and additional details about the paper like Paper name, Arxiv_id would be displayed.
Navigation - 
The user can navigate using the Zoom plus pan method.

Design 2 - 

The second design is for frequency distribution and trend. X axis represents year and y axis represents frequency. The user will see the interaction bar (drop down menu) and interact with the visualization by selecting a fold and an attribute to filter by which includes dataset, model and task. For instance, if the user selects fold1, let’s say image classification, and wants to filter by dataset being used in fold1, they would see the figure above. The plot shows the frequency of each dataset being used in fold 1 which allows the user to see the popularity trend for dataset, model and task for any fold they hope to explore. The user can also hover over any point and see more details including fold #, the attribute used for filtering, and the frequency.  By giving the user power to zoom and pan, they can easily look up their target data points for any specific year. With this line graph, depending on the user interaction, the user can easily see the distribution and trend in use of dataset, model or task in any selected fold and perform comparison between them. Here, we are using points and lines as marks and color and shape as channels. As points and lines are encoded with different types of shapes (circle, triangle, and square) and colors (black, blue, red), we can see that the appearance of marks are controlled by visual channels.

Implementations: 

We implemented both the design on observable.

Description of downstream validations and any changes from Phase 2:
Validation Design 1 -

Tasks effectively performed -
Sort by date
Filter by categorical attributes( model, dataset, task, fold)
Distribution of categorical attributes
Sorting by relevance (result) of paper
Compare papers and results
See trends in research and results
Summarize the literature review


Validation design 2 -
I chose the above multi line chart design for finding distribution and trend because it can better address the given task compared to other alternative visualizations. As other chart types like bar chart or stacked bar charts weren’t the best to use when we displaying changes in a trend over time and also they had their own instinct issues such as standard bar chart’s inability to represent sub-categories of a whole all in one chart and stacked bar chart not giving a common baseline for all segments to be aligned on other than the first segment of each bar which results in difficulty in comparing a certain sub-category across the timeline. As the line graph does not have any of these problems and does a great job of showing the distribution and trend in use of dataset, model and task for any selected fold, we ended up choosing the above design. In terms of interactivity costs (ch.6.8.3), our design well uses the benefit of interaction properly which is to explore a larger information space than can be understood in a single static image. As our design lets the user select which fold and attribute (dataset, model, and task) to explore and depending on their selection, they can explore a large information space. At the same time, we are not requiring excessive interaction and that reduces human time and attention. Here, we are well balancing out the human efforts and automatable aspects. In addition, here we are making use of visual feedback to indicate that the operation has completed by showing detail when hovering over any data point and by naturally changing viewpoint in navigation (ch.6.8.1). Our design above is making use of a multi line chart and the line chart is an example of idioms that are arranged in a one-dimensional list alignment and the view itself covers a two-dimensional area (ch.7.5.1). It shows one quantitative value attribute and one ordered key attribute and is encoded by making connections between dots. The type of task abstraction it can be used for is showing trends which makes our design perfectly reasonable. As it is always better to get feedback from target users about abstraction and encoding idiom before implementing design, the first thing we did was to discuss our design with our target audience and they were totally satisfied with what the above design could do to show trends and frequency distribution. 

Changes from Phase 2:
Design 3 from phase 2 was discarded. 



Credits for phase 3:
  - Data Processing and Manipulation - Purna, Shao Chun, Han Jun
  - Chart for vis  - Katrina 
  - Zoom plus pan - Katrina
  - Input based filteringof data - Purna
  - X axis date scale - Purna
  - Color and legend - Katrina 
  - Hover interaction - Katrina
  - Y-axes scale change based on metrics - Han Jun, Shao Chun
  - Metric grouping - Han Jun, Shao Chun
  

`
)});
  return main;
}
