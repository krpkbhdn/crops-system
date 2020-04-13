import React from 'react';

class InfoCard extends React.Component {
    render() {
        return (
            <div className="info-card">
                <div className="card-title">
                    <h5>Кількість працівників</h5>
                </div>
                    <div className="card-img">
                        <img src="file/user.png" alt=""/>
                    </div>
                    <div className="card-info">
                        <span>1530000</span>
                    </div>
            </div>
        );
    }
}

export default InfoCard;
