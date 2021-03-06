import * as d3 from "d3";
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import styles from "./forceGraph.module.css";


const imgScale = d3.scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
    .domain(["node", "container", "pod", "service", "deployment"])
    .range(['https://cdn2.iconfinder.com/data/icons/mixd/512/21_kubernetes-512.png', 'https://cdn4.iconfinder.com/data/icons/vectory-symbols/40/hexagon-512.png', 'https://image.flaticon.com/icons/svg/73/73326.svg','https://static.thenounproject.com/png/32460-200.png', 'https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-9/24/018_343_insignia_badge_shape_triangle-512.png'])


export function runForceGraph(
  container,
  linksData,
  nodeData,
) {
  console.log("IN GRAPHGENERATOR", nodeData)
  const links = linksData.map((d) => Object.assign({}, d));
  const nodes = nodeData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const color = () => { return "#9D79A0"; };

  /*const icon = (d) => {
    return d.gender === "male" ? "\uf222" : "\uf221";
  }*/

  /*const getClass = (d) => {
    return d.gender === "male" ? styles.male : styles.female;
  };*/

  const drag = (simulation) => {
    function dragsubject(event) {
      return simulation.find(event.x, event.y);
    }
  
    const dragstarted = (d) => {
      if (!d.active) simulation.alphaTarget(0.3).restart();
      d.subject.fx = d.subject.x;
      d.subject.fy = d.subject.y;
    }
    
    const dragged = (d) => {
      d.subject.fx = d.x;
      d.subject.fy = d.y;
    }
    
    const dragended = (d) => {
      if (!d.active) simulation.alphaTarget(0);
      d.subject.fx = null;
      d.subject.fy = null;
    }
    
    return d3.drag()
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

  // Add the tooltip element to the graph
  /*const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0);
  };*/

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);
    //.call(d3.zoom().on("zoom", function () {
      //svg.attr("transform", d3.zoomTransform);//event.transform);
    //});

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r",5)
    // .style("fill", d => colorScale(d.group))
    .style("fill", "#ffffff");

  const img = svg.append("g")
    .attr("class", "image")
    .selectAll("image")
    .data(nodes)
    .enter().append("image")
    .attr("xlink:href",d => imgScale(d.group) )
    .attr("width", 30)
    .attr("height", 30)
    //.on("click", clickNode)
    .call(drag(simulation));

  /*const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr("class", d => `fa ${getClass(d)}`)
    .text(d => {return icon(d);})
    .call(drag(simulation));*/

    const text = svg.append("g") // deleting this gets rid of images 
    .attr("class", "text")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 15)
    .text(d => d.name)
    .call(drag(simulation));;


  /*label.on("mouseover", (d) => {
    addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
  })
    .on("mouseout", () => {
      removeTooltip();
    });*/

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // update node positions
    //node
    //  .attr("cx", d => d.x)
    //  .attr("cy", d => d.y);
    img
      .attr("x", d => d.x-15) //position of the lower left point of the text
      .attr("y", d => d.y-15); //position of the lower left point of the text

    // update label positions
    //label
    //  .attr("x", d => { return d.x; })
    //  .attr("y", d => { return d.y; })
    text
      .attr("x", d => d.x + 15) //position of the lower left point of the text
      .attr("y", d => d.y + 5); //position of the lower left point of the text
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}