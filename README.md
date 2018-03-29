# debt-hotspots

Scan a git folder and gives a JSON output with the following data:
 * File name
 * Amount of commits
 * Amount of lines
 * Computed "score" (higher = lots of commits and lines), per file and folder

Files with a lot of lines and a lot of commits might be "technical debt hotspots". Improving these files should improve your situation.

Inspired by https://www.youtube.com/watch?v=SdUewLCHWvU (you should watch it!)


## Installation

You need node and either NPM or Yarn to run this. To install just run:
```
npm install // or yarn install
```

## Usage

May work on Windows (untested), best with Linux / Windows Linux Subsystem / GitBash. Just run:
```
node index.js /path/to/git/repo > output.json
```

# Visualization

You can view the results with `view/index.html`. A demo json file is provided. To visualize your results, just update the `index.html` file to read your generated json output.
```
d3.json("demo_graph.json", function(error, root) {
```
