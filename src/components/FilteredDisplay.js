import React from 'react'


class FilteredDisplay extends React.Component {
    render() {
        console.log(this.props.data)
        var nodes = this.props.data; 
        const listItems = nodes.map((node) => <li>{node.id}</li>)
        console.log('Nodes!!!', nodes)
        return (
            <div >
                <h1>NODE LIST</h1>
                <ul>{listItems}</ul>
            </div>
        )
    }
}

export default FilteredDisplay;