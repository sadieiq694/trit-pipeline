import './App.css';
import FilteredDisplay from './components/FilteredDisplay.js'
import FormEx from './components/FormEx.js'
import { ForceGraph } from "./components/ForceGraph.js";

//import TopGraph from './components/TopGraph.js';
//import { notEqual } from 'assert';

/*var cpuData = require('./data/cpu-new.json')
var opsData = require('./data/ops-new.json')
var latencyData = require('./data/latency-new.json')
var eventData = require('./data/events-new.json')
var errorData = require('./data/err-new.json')
var memData = require('./data/memory-new.json')*/
//var edgeData = require('./data/edges-new.json')
//var nodeData = require('./data/nodes-new.json')
var misData = require('./data/miserables.json')


var misDataFiltered2 = misData.nodes.filter( item => {
  return item.group === 2
});


function App() {
  /*const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.group}</div>`;
  }, []);*/

  return (
    <div className="App">
        <FormEx data={misData}/>
        <ForceGraph linksData={misData.links} nodesData={misData.nodes}/> 
    </div>
  );
}

//</div></header><TopGraph data={graphData}/>  <FilteredDisplay data={misDataFiltered2}/> <!-- nodeHoverTooltip={nodeHoverTooltip} />-->

export default App;
