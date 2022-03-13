<div>
<img width = "100%" align="center" alt="PIC" height="200px" src="https://www.linkpicture.com/q/d3_js_topic.png" />
<div/>
  
# Literature Visualization Tool
A visualization tool that allow users to organize **1591** of papers by score, frequency, and year. The interactive visualizations makes literature review much more efficient due to its many functionalities.

https://observablehq.com/d/94783b7756ead148@3099

## Getting Started
View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/94783b7756ead148@3099.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "94783b7756ead148";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~

## Key Features
* Data Cleaning - Used Python for data preprocessing on Google Colaboratory (preprocess_dataset_shao.ipynb)
  - Inner join three different datasets and remove data rows with null value
  - Extract data from .json file and reorganize it
* Literature Review 
  - Easy to know the performance of thousands of AI papers
* Research Trend - Easy to know the research topics in each year
* Zoom in and out to prevent data overlap
* Filters for folds, tasks, metrics, datasets, models and can be applied based on user preferences
  - There are 11 folds, 56 tasks, 88 metrics, 245 datasets, 393 models
* Mouse Hover
  - Display paper details by hovering over the data
* Y scale varies with filtered data for a better data visualization
  
## Results
<p align="center">
  <img width="100%" height="500" src="https://www.linkpicture.com/q/score_vs_year.png">
  <img width="100%" height="500" src="https://www.linkpicture.com/q/freq_vs_year.png">
</p>

