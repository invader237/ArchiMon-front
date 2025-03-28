import React from 'react';

const CapaciteList = ({ capacites = [], onUse, disabled = false }) => {
    if (!capacites || capacites.length === 0) {
        return <p style={{ color: "#aaa" }}>Aucune capacité disponible.</p>;
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
                opacity: disabled ? 0.6 : 1,
                pointerEvents: disabled ? "none" : "auto",
                transition: "opacity 0.3s ease"
            }}
        >
            {capacites.map(capacite => (
                <div
                    key={`${capacite.id}-${capacite.nom}`}
                    onClick={() => onUse(capacite)}
                    style={{
                        backgroundColor: "#222",
                        padding: "15px",
                        borderRadius: "10px",
                        width: "250px",
                        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        border: "1px solid transparent"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                    <h3 style={{ marginBottom: "5px" }}>{capacite.nom}</h3>

                    <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "8px" }}>
                        {capacite.description}
                    </p>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "5px"
                    }}>
                        <img
                            src={capacite.type.image}
                            alt={capacite.type.libelle}
                            title={capacite.type.libelle}
                            style={{ width: "30px", height: "30px" }}
                        />
                        <span><strong>{capacite.type.libelle}</strong></span>
                    </div>

                    <p><strong>Catégorie :</strong> {capacite.categorie}</p>
                    <p><strong>Puissance :</strong> {capacite.puissance ?? '—'}</p>
                    <p><strong>Précision :</strong> {capacite.precision ?? '—'}</p>
                </div>
            ))}
        </div>
    );
};

export default CapaciteList;
