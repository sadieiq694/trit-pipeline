import React from 'react'
import { throws } from 'assert';
import { ForceGraph } from './ForceGraph';

class FormEx extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {value: 1594755686000,
                      showMenu: false }; 
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.showMenu = this.showMenu.bind(this);
}

handleChange(event) {
    this.setState({value: event.target.value});
}

handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
}

showMenu(event) {
    event.preventDefault();
    console.log("button press!")
    
    this.setState({showMenu: true,});
  }

render() {
    var nodes = this.props.nodeData; 
    var edges = this.props.linksData;
    console.log(this.props)
    //var misDataFiltered2 = nodes.filter( item => {
    //    return item.group == this.state.value
    //  });
    //console.log("NODES:", misDataFiltered2)
    //const listItems = misDataFiltered2.map((node) => <li>{node.name}</li>);

    
    var filtered_vertices_snapshot = nodes.filter( item => { 
        return item["activation_time"] <= this.state.value && item["termination_time"] > this.state.value
    });

    /*var filtered_vertices_snapshot = nodes.filter( item => {
        return (item["activation_time"] <= graph_snapshot_time[1] && item["termination_time"] > graph_snapshot_time[0])
        && ( ((checked_boxes.includes(item['group']) || checked_boxes.includes('all'))) || (checked_boxes.includes('topology') && top_resources.includes(item['group']) ) || (checked_boxes.includes('call graph') && serv_resources.includes(item['group']) ))
      });*/

    var verts = filtered_vertices_snapshot.map(a => a.id);


    var filtered_edges_snapshot = edges.filter( item => {
        return item["activation_time"] <= this.state.value && item["termination_time"] > this.state.value && (verts.includes(item['source']) && verts.includes(item['target']))
      });

    console.log(filtered_edges_snapshot, filtered_vertices_snapshot)

    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <h1>Current state: {this.state.value}</h1>
            <h1>NODE LIST</h1>
            <div>
                <button onClick={this.showMenu}>
                    Show menu
                </button> {
                    this.state.showMenu ? (
                        <div className='menu'>
                            <button> Menu item 1 </button>
                            <button> Menu item 2 </button>
                            <button> Menu item 3 </button>
                        </div> 
                ) : (null)
                }
            
            </div>
        </div>
    );
}

}

export default FormEx

/* class ParentComponent extends Component {
    state = {
        // ..
    }
    render() {
        return <ExampleComponent data={this.state}>
    }
}*/