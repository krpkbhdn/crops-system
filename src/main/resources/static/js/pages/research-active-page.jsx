import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import Select from "react-dropdown-select";
import {getAllParameters} from "api/api"

class ResearchActivePage extends React.Component{
    constructor() {
        super();
        this._tbody = React.createRef();
        this.state = {
            tableTitle: "Активні дослідження",
            column: ["#", "Назва параметру", "Значення", "Одиниця вимірювання", ""],
            control: [
                {type: "success", event: () => this.addRecord(), content: <FontAwesomeIcon icon={faPlus}/>},
            ],
            tableItems: [],
            parameters: [],
        }
    }

    componentDidMount() {
        this.getParameters()
    }

    addRecord() {
        const _select = React.createRef();
        const _input = React.createRef();
        const key = this.state.tableItems.length;
        this.setState({
            tableItems: this.state.tableItems.concat(
                {
                    _select: _select,
                    _input: _input,
                    parameter:
                        <Select
                            ref={_select}
                            placeholder={"Параметр"}
                            searchBy={ "name"}
                            labelField= {"name"}
                            valueField= {"id"}
                            dropdownHeight= {"300px" }
                            options={this.state.parameters}
                            onChange={(value) => this.handlerSelect(value[0], key)}
                            multi={false} />,
                    input: <input type="number" ref={_input} />,
                    unit: ""
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

    getParameters() {
        getAllParameters().then(res => (
            this.setState({
                parameters: res
            })
        ))
    }

    handlerSelect(value, key) {
        this.state.tableItems[key].unit = value.unit.name + ", " + value.unit.shortName;
        this.setState({
            tableItems: this.state.tableItems
        });
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
                                <td style={{width: "5rem"}}>{index + 1}</td>
                                <td style={{width: "30%"}}>{item.parameter}</td>
                                <td style={{width: "15rem"}}>{item.input}</td>
                                <td style={{width: "30%"}}>{item.unit} </td>
                                <td style={{textAlign: "-webkit-right"}}>

                                        <button onClick={() => this.removeItem(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                                </td>
                            </tr> : null
                    ) : null}

                    </tbody>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <button className="btn success" onClick={() => this.save()}>Зберегти</button>
                    </div>
                </Table>
            </div>
        );
    }
}

export {ResearchActivePage}
