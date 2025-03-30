import React from 'react';

const ArchimonCard = ({ archimon, isSelected, onSelect, disabled }) => {
    return (
        <div
            onClick={() => !disabled && onSelect(archimon)}
            style={{
                backgroundColor: isSelected ? "#00cc88" : "#333",
                padding: "15px",
                borderRadius: "15px",
                cursor: disabled ? "default" : "pointer",
                width: "180px",
                margin: "10px auto",
                boxShadow: isSelected ? "0 0 15px #00ffcc" : "0 0 10px rgba(0,0,0,0.5)",
                opacity: disabled && !isSelected ? 0.3 : 1,
                transition: "all 0.3s ease"
            }}
        >
            <h3>{archimon.nom}</h3>
            <img src={archimon.urlImage} alt={archimon.nom} style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>PV :</strong> {archimon.pv}</p>
            <p><strong>ATK :</strong> {archimon.atk}</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "5px" }}>
                {archimon.types.map(type => (
                    <img key={type.id} src={type.image} alt={type.libelle} title={type.libelle} style={{ width: "25px", height: "25px" }} />
                ))}
            </div>
        </div>
    );
};

export default ArchimonCard;
