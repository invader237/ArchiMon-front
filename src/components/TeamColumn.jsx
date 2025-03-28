import React, { useState } from 'react';
import ArchimonCard from './ArchimonCard';

const TeamColumn = ({ team, onValidated, activeArchimon }) => {
    const [selected, setSelected] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleValidate = () => {
        if (selected) {
            setValidated(true);
            onValidated(selected);
        }
    };

    const displayedArchimon = validated ? activeArchimon : selected;

    return (
        <div style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "2px solid #444"
        }}>
            <h2 style={{ marginBottom: "10px" }}>{team.nom}</h2>

            {!validated ? (
                <>
                    <p>Sélectionne ton Archimon</p>
                    <div style={{ overflowY: "auto", flexGrow: 1, padding: "10px", width: "100%" }}>
                        {team.archimons.map(archimon => (
                            <ArchimonCard
                                key={archimon.id}
                                archimon={archimon}
                                isSelected={selected?.id === archimon.id}
                                onSelect={setSelected}
                                disabled={validated}
                            />
                        ))}
                    </div>
                    {selected && (
                        <button
                            onClick={handleValidate}
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                fontSize: "1rem",
                                borderRadius: "10px",
                                backgroundColor: "#00cc88",
                                border: "none",
                                color: "#000",
                                cursor: "pointer"
                            }}
                        >
                            ✅ Valider {selected.nom}
                        </button>
                    )}
                </>
            ) : (
                displayedArchimon && (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <h3>{displayedArchimon.nom}</h3>
                        <img
                            src={displayedArchimon.urlImage}
                            alt={displayedArchimon.nom}
                            style={{ width: "250px", borderRadius: "20px", boxShadow: "0 0 20px #00cc88" }}
                        />
                        <div style={{ marginTop: "15px", fontSize: "1rem" }}>
                            <p><strong>PV :</strong> {displayedArchimon.pv}</p>
                            <p><strong>ATK :</strong> {displayedArchimon.atk}</p>
                            <p><strong>SPD :</strong> {displayedArchimon.spd}</p>

                            {/* Barre de PV */}
                            <div style={{ marginTop: "10px", width: "100%", maxWidth: "220px" }}>
                                <div style={{
                                    backgroundColor: "#333",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    height: "20px",
                                    boxShadow: "inset 0 0 5px #000"
                                }}>
                                    <div style={{
                                        width: `${Math.max(0, displayedArchimon.pv)}%`,
                                        height: "100%",
                                        backgroundColor:
                                            displayedArchimon.pv > 50 ? "#00cc88"
                                            : displayedArchimon.pv > 20 ? "#ffaa00"
                                            : "#ff4444",
                                        transition: "width 0.5s ease"
                                    }} />
                                </div>
                                <p style={{ marginTop: "5px" }}>
                                    ❤️ <strong>{displayedArchimon.pv} PV</strong>
                                </p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexWrap: "wrap" }}>
                                {displayedArchimon.types.map(type => (
                                    <img
                                        key={type.id}
                                        src={type.image}
                                        alt={type.libelle}
                                        title={type.libelle}
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default TeamColumn;
