import React from "react";

function DoctorCard(props) {
    return (
        <div className="dt-card">
            <img src={props.img} alt={props.name} className="dt-card-img" />
            <p className="dt-card-name">{props.name}</p>
            <p className="dt-card-phone">Phone: {props.phone}</p>
            <p className="dt-card-mail">Mail: {props.mail}</p>
        </div>
    );
}

export default DoctorCard;
