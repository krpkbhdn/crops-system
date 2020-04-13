import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { getPageCrops, addCrop, updateCrop, deleteCrop } from 'api/api'
import ReactPaginate from 'react-paginate';

class CropPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            modelIsOpen: false,
            crops: [],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}],
            column: ["#", "Назва", ""],
            activePage: 0,
            size: 5,
            pageCount: 0,
            inputValue: '',
            modalModeIsEdit: false,
            selectedItem: null,
        }
    }

    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageCrops(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                crops: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addCrop() {
        if (this.state.inputValue.length > 0) {
            addCrop(this.state.inputValue).then(res => this.setState({
                crops: this.state.crops.concat(res)
            }));
            this._modal.current.closeModal();
        }
    }

    editCrop() {
        if (this.state.inputValue.length > 0) {
            updateCrop(this.state.selectedItem.id ,this.state.inputValue).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteCrop(item) {
        deleteCrop(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.crops];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                crops: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.crops]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ crops: array });
        }
    }

    openModal () {
        this.setState({
            inputValue: '',
            modalModeIsEdit: false,
        })
        this._modal.current.openModal()
    }

    openEditModel (item) {
        this.setState({
            selectedItem: item,
            inputValue: item.name,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal()
    }

    handlerInput(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const {control, column, crops, inputValue, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div>

                <div className="page-section">
                    <ModalWindow ref={this._modal}>
                        <div className="m-title">
                            Культура
                        </div>
                        <div className="m-content">
                            <input type="text" value={inputValue} onChange={e => this.handlerInput(e)}/>
                        </div>
                        <div className="m-control">
                            <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                            {
                                modalModeIsEdit ?
                                    <button className="m-btn info" onClick={() => this.editCrop()}>Змінити</button> :
                                    <button className="m-btn success" onClick={() => this.addCrop()}>Добавити</button>
                            }

                        </div>

                    </ModalWindow>
                    <Table control={control} column={column} title={"Культури"}>
                        <tbody>
                        {crops.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1 + (size * activePage)}</td>
                                <td>{item.name}</td>
                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                    <button onClick={() => this.deleteCrop(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
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

            </div>
        );
    }
}

export { CropPage };
