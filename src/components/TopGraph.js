import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from 'd3'

class TopGraph extends Component {
    constructor(props){
       super(props)
       this.createTopGraph = this.createTopGraph.bind(this)
    }
    componentDidMount() {
       this.createTopGraph()
    }
    componentDidUpdate() {
       this.createTopGraph()
    }
    createTopGraph() {
        const links = this.props.data.edges
        const verts = this.props.data.vertices
        const simulation = d3.forceSimulation(verts)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .nodes(verts);


       const node = this.node
       const dataMax = max(this.props.data)
       const yScale = scaleLinear()
          .domain([0, dataMax])
          .range([0, this.props.size[1]])
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .enter()
       .append('rect')
    
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .exit()
       .remove()
    
    select(node)
       .selectAll('rect')
       .data(this.props.data)
       .style('fill', '#fe9922')
       .attr('x', (d,i) => i * 25)
       .attr('y', d => this.props.size[1] - yScale(d))
       .attr('height', d => yScale(d))
       .attr('width', 25)
    }
 render() {
       return <svg ref={node => this.node = node}
       width={500} height={500}>
       </svg>
    }
 }

export default TopGraph