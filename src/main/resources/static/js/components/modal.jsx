import React from 'react'

class ModalWindow  extends React.Component {
    constructor() {
        super();
        this.modalRef = React.createRef();
        this.state = {
            isOpen: false,
        }
    }

    openModal() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    closeModal() {
        this.setState({ isOpen: false })
    }

    render() {
        const { isOpen } = this.state;
        return (
            <div className="modal-window" style={isOpen ? {display: 'block'} : {display: 'none'}}>
                <div className="modal-back" onClick={() => this.closeModal()}>

                </div>
                <div className="modal-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ModalWindow;
