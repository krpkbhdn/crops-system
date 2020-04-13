import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { getPageCrops, addCrop, updateCrop, deleteCrop } from 'api/api'
import ReactPaginate from 'react-paginate';
import {addUnit, deleteUnit, getPageUnits, updateUnit} from "../api/api-unit";

class UnitPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            units: [],
            modelIsOpen: false,
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}],
            column: ["#", "Повна назва", "Скорочення", ""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            inputName: '',
            inputShortName: '',
            modalModeIsEdit: false,
            selectedItem: null,
        }
    }

    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageUnits(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                units: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addUnit() {
        if (this.state.inputName.length > 0 && this.state.inputShortName.length > 0) {
            addUnit(this.state.inputName, this.state.inputShortName).then(res => this.setState({
                units: this.state.units.concat(res)
            }));
            this._modal.current.closeModal();
        }
    }

    editUnit() {
        if (this.state.inputName.length > 0 && this.state.inputShortName.length > 0) {
            updateUnit(this.state.selectedItem.id, this.state.inputName, this.state.inputShortName)
                .then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteUnit(item) {
        deleteUnit(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.units];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                units: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.units]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ units: array });
        }
    }

    openModal () {
        this.setState({
            inputName: '',
            inputShortName: '',
            modalModeIsEdit: false,
        })
        this._modal.current.openModal()
    }

    openEditModel (item) {
        this.setState({
            selectedItem: item,
            inputName: item.name,
            inputShortName: item.shortName,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal()
    }

    handlerInputName(e) {
        this.setState({
            inputName: e.target.value
        })
    }

    handlerInputShortName(e) {
        this.setState({
            inputShortName: e.target.value
        })
    }

    render() {
        const {control, column, units, inputName, inputShortName, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div className="page-section">
                <ModalWindow ref={this._modal}>
                    <div className="m-title">
                        Одиниця вимірювання
                    </div>
                    <div className="m-content">
                        <input type="text" placeholder={"Повна назва"} value={inputName} onChange={e => this.handlerInputName(e)}/>
                        <input type="text" placeholder={"Скорочення"} value={inputShortName} onChange={e => this.handlerInputShortName(e)}/>
                    </div>
                    <div className="m-control">
                        <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                        {
                            modalModeIsEdit ?
                                <button className="m-btn info" onClick={() => this.editUnit()}>Змінити</button> :
                                <button className="m-btn success" onClick={() => this.addUnit()}>Добавити</button>
                        }

                    </div>

                </ModalWindow>
                <Table control={control} column={column} title={"Одиниці вимірювання"}>
                    <tbody>
                    {units.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1 + (size * activePage)}</td>
                            <td>{item.name}</td>
                            <td>{item.shortName}</td>
                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                <button onClick={() => this.deleteUnit(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <div className="pagination"><ReactPaginate
                        pageCount={this.state.pageCount}
                        nextLabel='&#10095;'
                        previousLabel='&#10094;'
                        onPageChange={this.handlePageChange.bind(this)}
                    /></div>
                </Table>
            </div>


        );
    }
}

export { UnitPage };
