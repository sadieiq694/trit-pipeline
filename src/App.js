import './App.css';
//import FilteredDisplay from './components/FilteredDisplay.js'
import FormEx from './components/FormEx.js'
import { ForceGraph } from "./components/ForceGraph.js";
import CPUGraph from './components/CPUGraph.js';
import LatencyGraph from './components/LatencyGraph.js'
import ErrorGraph from './components/ErrorGraph.js'
import MemGraph from './components/MemGraph.js'
import OpsGraph from './components/OpsGraph.js'
import EventGraph from './components/EventGraph.js'


//import TopGraph from './components/TopGraph.js';
//import { notEqual } from 'assert';

var cpuData = require('./data/cpu-new.json')
cpuData = {"values": cpuData}
var opsData = require('./data/ops-new.json')
opsData = {"values": opsData}
var latencyData = require('./data/latency-new.json')
latencyData = {"values": latencyData}
var eventData = require('./data/events-new.json')
eventData = {"values": eventData}
var errorData = require('./data/err-new.json')
errorData = {"values": errorData}
var memData = require('./data/memory-new.json')
memData = {"values": memData}
var edgeData = require('./data/edges-new.json')
var nodeData = require('./data/nodes-new.json')
//var misData = require('./data/miserables.json')


//var misDataFiltered2 = misData.nodes.filter( item => {
//  return item.group === 2
//});



function App() {
  /*const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.group}</div>`;
  }, []);*/

  return (
    <div className="App">
        <FormEx linksData={edgeData} nodeData={nodeData}/>
        <ForceGraph linksData={edgeData} nodesData={nodeData}/> 
        <CPUGraph data={cpuData} />
        <MemGraph data={memData} />
        <ErrorGraph data={errorData} />
        <LatencyGraph data={latencyData} />
        <OpsGraph data={opsData} />
        <EventGraph data={eventData} />
    </div>
  );
}

//</div></header><TopGraph data={graphData}/>  <FilteredDisplay data={misDataFiltered2}/> <!-- nodeHoverTooltip={nodeHoverTooltip} />-->

export default App;
