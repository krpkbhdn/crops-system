import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Select from "react-dropdown-select";
import {addParameter, deleteParameter, getPageParameters, updateParameter, getAllUnits} from "api/api";

class ParameterPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            modelIsOpen: true,
            units: [],
            parameters:[],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}
            ],
            column: ["#", "Назва", "Одиниця вимірювання",""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            name: '',
            modalModeIsEdit: false,
            selectedItem: null,
            selectedUnit: null,
        }
    }
    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageParameters(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                parameters: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addParameter() {
        if (this.state.name.length > 0 && this.state.selectedUnit !== null) {
            addParameter(this.state.name, this.state.selectedUnit.id)
                .then(res => this.setState({
                    parameters: this.state.parameters.concat(res)
                }));
            this._modal.current.closeModal();
        }
    }

    editParameter() {
        if (this.state.name.length > 0) {
            updateParameter(this.state.selectedItem.id ,this.state.name).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteParameter(item) {
        deleteParameter(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.parameters];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                parameters: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.parameters]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ parameters: array });
        }
    }

    openModal () {
        getAllUnits().then(res => (this.setState({units: res})));
        this.setState({
            name: '',
            selectedUnit: [{}],
            modalModeIsEdit: false,
        });
        this._modal.current.openModal();
    }

    openEditModel (item) {
        getAllUnits().then(res => (this.setState({units: res})));
        this.setState({
            selectedItem: item,
            selectedUnit: [item.unit],
            name: item.name,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal();
    }

    handlerName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handlerSelectUnit(e) {
        this.setState({
            selectedUnit: e[0]
        });
    }

    render() {
        const {control, selectedUnit, column, parameters, units, name, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div className="page-section">
                <ModalWindow ref={this._modal}>
                    <div className="m-title">
                        Параметр
                    </div>
                    <div className="m-content">
                        <input type="text" placeholder={"Назва"} value={name} onChange={e => this.handlerName(e)}/>
                        {
                            !modalModeIsEdit ?
                                <Select

                                    placeholder={"Одиниця вимірювання"}
                                    value={selectedUnit}
                                    searchBy={ "name"}
                                    labelField= {"name"}
                                    valueField= {"id"}
                                    dropdownHeight= {"300px" }
                                    options={units}
                                    onChange={(values) => this.handlerSelectUnit(values)}
                                    multi={false} /> : null}
                    </div>
                    <div className="m-control">
                        <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                        {
                            modalModeIsEdit ?
                                <button className="m-btn info" onClick={() => this.editParameter()}>Змінити</button> :
                                <button className="m-btn success" onClick={() => this.addParameter()}>Добавити</button>
                        }

                    </div>

                </ModalWindow>
                <Table control={control} column={column} title={"Параметри"}>

                    <tbody>
                    {parameters.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1 + (size * activePage)}</td>
                            <td>{item.name !== null ? item.name : null}</td>
                            <td>{item.unit.name !== null ? item.unit.name : null}</td>
                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                <button onClick={() => this.deleteParameter(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <div className="pagination"><ReactPaginate
                        pageCount={this.state.pageCount}
                        nextLabel='&#10095;'
                        previousLabel='&#10094;'
                        onPageChange={this.handlePageChange.bind(this)}
                    />

                    </div>
                </Table>
            </div>

        );
    }
}

export { ParameterPage };
