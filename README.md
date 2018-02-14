# debt-hotspots

Scan a git folder and gives a CSV output with the following data:
 * File name
 * Amount of commits
 * Amount of lines

Files with a lot of lines and a lot of commits might be "technical debt hotspots". Improving these files should improve your situation.

Inspired by https://www.youtube.com/watch?v=SdUewLCHWvU (you should watch it!)


## Usage

May work on Windows (untested), best with Linux / Windows Linux Subsystem / GitBash. Just run:
```
node index.js /path/to/git/repo > output.csv
```
