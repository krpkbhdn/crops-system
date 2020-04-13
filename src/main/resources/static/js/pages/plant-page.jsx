import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getPagePlants, getAllCrops, addPlant, updatePlant, deletePlant } from 'api/api'
import Dropdown from "components/dropdown.jsx";

class PlantPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            modelIsOpen: true,
            plants: [],
            crops:[],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}
            ],
            column: ["#", "Назва", ""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            name: '',
            description: '',
            modalModeIsEdit: false,
            selectedItem: null,
        }
    }
    componentDidMount() {
        getPagePlants(this.state.activePage, this.state.size).then(res => res.data).then( data => (
            this.setState({
                plants: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
         getAllCrops().then(res => (this.setState({crops: res})));
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

    addPlant() {
        if (this.state.name.length > 0 && this.state.description.length > 0) {
            addPlant(this.state.name, this.state.description).then(res => this.setState({
                plants: this.state.plants.concat(res)
            }));
            this._modal.current.closeModal();
        }
    }

    editPlant() {
        if (this.state.name.length > 0 && this.state.description.length > 0) {
            updatePlant(this.state.selectedItem.id ,this.state.name, this.state.description).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deletePlant(item) {
        deletePlant(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.plants];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                plants: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.plants]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ plants: array });
        }
    }

    openModal () {
        this.setState({
            name: '',
            description: '',
            modalModeIsEdit: false,
        });
        this._modal.current.openModal()
    }

    openEditModel (item) {
        this.setState({
            selectedItem: item,
            name: item.name,
            description: item.description,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal()
    }

    handlerName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handlerDescription(e) {
        this.setState({
            description: e.target.value
        })
    }


    render() {
        const {control, column, crops, plants, name, description, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div>

                <div className="page-section">
                    <ModalWindow ref={this._modal}>
                        <div className="m-title">
                            Рослини
                        </div>
                        <div className="m-content">
                            <input type="text" value={name} onChange={e => this.handlerName(e)}/>

                            <textarea value={description}  onChange={e => this.handlerDescription(e)} />
                        </div>
                        <div className="m-control">
                            <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                            {
                                modalModeIsEdit ?
                                    <button className="m-btn info" onClick={() => this.editPlant()}>Змінити</button> :
                                    <button className="m-btn success" onClick={() => this.addPlant()}>Добавити</button>
                            }

                        </div>

                    </ModalWindow>
                    <Table control={control} column={column} title={"Рослини"}>

                        <tbody>
                        {plants.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1 + (size * activePage)}</td>
                                <td>{item.name}</td>

                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                    <button onClick={() => this.deletePlant(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                        <div className="pagination"><ReactPaginate
                            pageCount={this.state.pageCount}
                            nextLabel='&#10095;'
                            previousLabel='&#10094;'
                            onPageChange={this.handlePageChange.bind(this)}
                        /><Dropdown/></div>
                    </Table>
                </div>

            </div>
        );
    }
}

export { PlantPage };
