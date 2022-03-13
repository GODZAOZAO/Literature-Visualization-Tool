# LitVis Final Project
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
* Data Cleaning - Used Python for data preprocessing
  - Inner join three different datasets and remove data rows with null value
  - Extract data from .json file and reorganize it
* Literature Review - Easy to know the performance of thousands of AI papers
* Research Trend - Easy to know the research topics in each year
* Zoom in and out to prevent data overlap
* Filters for folds, tasks, metrics, datasets, models and can be applied based on user preferences
  - There are 11 folds, 56 tasks, 88 metrics, 245 datasets, 393 models
