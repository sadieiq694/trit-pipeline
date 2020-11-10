import React from 'react'

class FormEx extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {value: ''}; 
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
}

handleChange(event) {
    this.setState({value: event.target.value});
}

handleSubmit(event) {
    alert("A name was submittede: " + this.state.value);
    event.preventDefault();
}

render() {
    var nodes = this.props.data.nodes; 
    var misDataFiltered2 = nodes.filter( item => {
        return item.group == this.state.value
      });
    console.log("NODES:", misDataFiltered2)
    const listItems = misDataFiltered2.map((node) => <li>{node.id}</li>)

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
            <ul>{listItems}</ul>
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