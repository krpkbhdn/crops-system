import React from "react"

class Table extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-title">
                        <h5>
                            {this.props.title}
                        </h5>
                    </div>
                    <div className="table-control">
                        {this.props.control !== undefined ? this.props.control.map((item, index) => (
                            <button key={index} className={"fab " + item.type} onClick={() => item.event()}>{item.content}</button>
                        )) : null }
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        {this.props.column !== undefined ? this.props.column.map((item, index) => <th key={index}>{item}</th>) : <th>{""}</th>}
                    </tr>
                    </thead>

                    {this.props.children !== undefined ? this.props.children[0] : <tbody><tr><td>{""}</td></tr></tbody>}

                </table>
                <div className="table-bottom">
                    {this.props.children !== undefined ? this.props.children[1] : null}
                </div>
            </div>
        );
    }
}

export default Table;
