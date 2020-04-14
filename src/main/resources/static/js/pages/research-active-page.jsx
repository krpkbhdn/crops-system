import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import Select from "react-dropdown-select";

class ResearchActivePage extends React.Component{
    constructor() {
        super();
        this._tbody = React.createRef();
        this.state = {
            tableTitle: "Активні дослідження",
            column: ["#", "Parameter name", "Parameter Value", "Parameter Unit", "Parameter Control"],
            control: [
                {type: "success", event: () => this.addRecord(), content: <FontAwesomeIcon icon={faPlus}/>},
                {type: "info", event: () => this.save(), content: <FontAwesomeIcon icon={faSave}/>}
            ],
            tableItems: []
        }
    }

    addRecord() {
        const _select = React.createRef();
        const _input = React.createRef();
        this.setState({
            tableItems: this.state.tableItems.concat(
                {
                    key: this.state.tableItems.length,
                    _select: _select,
                    _input: _input,
                    parameter:
                        <Select
                            ref={_select}
                        placeholder={"Культура"}
                        searchBy={ "name"}
                        labelField= {"name"}
                        valueField= {"id"}
                        dropdownHeight= {"300px" }
                        options={[{id: 1, name: "123"}, {id: 2, name: "123"}]}
                        multi={false} />,
                    input: <input type="text" ref={_input} />,
                    unit: "unit"
                }
            )
        })
    }

    save() {

        // this.state.tableItems[0].ref.current.clearAll();
        this.state.tableItems.map(item => item !== undefined ? (
            console.log({ parameter: item._select.current.state.values[0],
            value: item._input.current.value})
        ) : null )
    }

    removeItem(item) {
        let array = [...this.state.tableItems]; // make a separate copy of the array
        const index = array.indexOf(item)
        if (index !== -1) {
            delete array[index]
        }
        this.setState({tableItems: array})

    }

    render() {
        const {
            tableTitle,
            column,
            control,
            tableItems
        } = this.state;
        return (
            <div className="page-section">
                <Table title={tableTitle} column={column} control={control}>
                    <tbody ref={this._tbody}>
                    {tableItems !== undefined ? tableItems.map((item, index) =>
                        item !== undefined ?
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{item.parameter}</td>
                            <td>{item.input}</td>
                            <td>{item.unit}</td>
                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => this.removeItem(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr> : null
                    ) : null}

                    </tbody>
                    <div></div>
                </Table>
            </div>
        );
    }
}

export {ResearchActivePage}
