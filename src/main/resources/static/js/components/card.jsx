import React from 'react';

class InfoCard extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <div className="info-card">
                <div className="card-title">
                    <h5>{item.title}</h5>
                </div>
                    {/*<div className="card-img">*/}
                    {/*    <img src="file/user.png" alt=""/>*/}
                    {/*</div>*/}
                    <div className="card-info">
                        <span>{item.count}</span>
                    </div>
            </div>
        );
    }
}

export default InfoCard;
