import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate"
import {getAllParameters, getResearchById, updateResearch} from "api/api"

class ResultsPage extends React.Component{
    constructor() {
        super();
        this.state = {
            tableTitle: "Активні дослідження",
            column: ["#", "Назва параметру", "Значення", "Одиниця вимірювання", ""],
            control: [
                {type: "success", event: () => this.addRecord(), content: <FontAwesomeIcon icon={faPlus}/>},
            ],
            tableItems: [],
            parameters: [],
            research: null,
        }
    }

    componentDidMount() {
        this.getParameters();
        this.getResearch();
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
        this.state.tableItems.map(item =>
            item !== undefined
            && item._select.current.state.values[0] !== undefined
            && item._input.current.value.length > 0 ? (
                updateResearch(this.props.match.params.id, {
                    parameter: item._select.current.state.values[0].id,
                    value: item._input.current.value
                })) : null );
        this.updateState();
    }

    updateState() {
        this.setState({tableItems: []});
        this.getResearch();
    }

    getParameters() {
        getAllParameters().then(res => (
            this.setState({
                parameters: res
            })
        ))
    }

    getResearch() {
        getResearchById(this.props.match.params.id).then(res => this.setState({
            research: res
        }));
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
            tableItems,
            research
        } = this.state;
        return (
            <div>
                <div className="page-section">
                    <div className="card">
                        <div className="card-title">
                            <h5>Інформація про дослідження</h5>
                        </div>
                        <div className="card-section">
                            {research !== null ?
                                <div className="card-container">
                                    <div className="card-item">
                                        <span>Кліматична зона: </span>
                                        <span> {research.station.climateZone.name}</span>
                                    </div>
                                    <div className="card-item">
                                        <span>Станція: </span>
                                        <span>{research.station.name}</span>
                                    </div>
                                </div>
                                : "" }
                            {research !== null ?
                                <div className="card-container">

                                    <div className="card-item">
                                        <span>Культура: </span>
                                        <span>{research.sort.plant.crop.name}</span>
                                    </div>
                                    <div className="card-item">
                                        <span>Рослина: </span>
                                        <span>{research.sort.plant.name}</span>
                                    </div>
                                    <div className="card-item">
                                        <span>Сорт: </span>
                                        <span>{research.sort.name}</span>
                                    </div>
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="page-section">
                    <Table title={"Внести результати дослідження"} column={column} control={control}>
                        <tbody >
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

                <div className="page-section">
                    <Table title={"Результати дослідження"} column={column} >
                        <tbody >
                        {research !== null ? research.results.map((item, index) => (
                            item !== undefined ?
                                <tr key={index} >
                                    <td style={{width: "5rem"}}>{index + 1}</td>
                                    <td style={{width: "30%"}}>{item.parameter.name}</td>
                                    <td style={{width: "15rem"}}>{item.value}</td>
                                    <td style={{width: "30%"}}>{item.parameter.unit.name} </td>
                                    <td></td>
                                </tr> : null
                        )) : null}

                        </tbody>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>

                        </div>
                    </Table>
                </div>
            </div>
        );
    }
}

export {ResultsPage}
