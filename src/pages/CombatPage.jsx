import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();

const CombatPage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [selectedTeam1, setSelectedTeam1] = useState(null);
    const [selectedTeam2, setSelectedTeam2] = useState(null);
    const [lockedTeam1, setLockedTeam1] = useState(false);
    const [lockedTeam2, setLockedTeam2] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/teams')
            .then(res => {
                const options = res.data.map(team => ({
                    value: team.id,
                    label: team.nom
                }));
                setTeams(options);
            })
            .catch(err => console.error(err));
    }, []);

    const resetTeam1 = () => {
        setSelectedTeam1(null);
        setLockedTeam1(false);
    };

    const resetTeam2 = () => {
        setSelectedTeam2(null);
        setLockedTeam2(false);
    };

    return (
        
        <div style={{
            backgroundColor,
            color: textColor,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Roboto', sans-serif",
            padding: "20px",
            animation: "glitch 1s infinite alternate",
        }}>
            <style>
                {`
                @keyframes glitch {
                    0% { background-color: #ff00ff; }
                    50% { background-color: #00ffff; }
                    100% { background-color: #ffff00; }
                }
                `}
            </style>

            <button onClick={() => navigate("/createTeam")} style={{
                backgroundColor: buttonColor,
                fontSize: "1.5rem",
                padding: "10px 20px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow: "5px 5px 0px black",
                animation: "spin 2s linear infinite",
                margin: "0 10px",
                transition: "transform 0.3s ease",
            }}>
                ➕ Création d'équipe
            </button>

            {/* Titre dynamique */}
            <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                textShadow: "2px 2px #000",
                marginBottom: "20px"
            }}>
                {
                    lockedTeam1 && lockedTeam2
                        ? `⚔️ ${selectedTeam1.label} VS ${selectedTeam2.label} ⚔️`
                        : '💀🔥 COMBAT DES ARCHIMONS 🔥💀'
                }
            </h1>

            {/* Deux colonnes */}
            <div style={{ display: "flex" }}>
                {/* Équipe 1 */}
                <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                    <h2 style={{ marginBottom: "20px" }}>⚔️ Équipe 1</h2>
                    <Select
                        components={animatedComponents}
                        options={teams}
                        value={selectedTeam1}
                        onChange={setSelectedTeam1}
                        placeholder="Choisir une équipe..."
                        isDisabled={lockedTeam1}
                    />
                    {!lockedTeam1 ? (
                        <button
                            onClick={() => selectedTeam1 && setLockedTeam1(true)}
                            disabled={!selectedTeam1}
                            style={{
                                marginTop: "20px",
                                backgroundColor: buttonColor,
                                fontSize: "1rem",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "15px",
                                cursor: selectedTeam1 ? "pointer" : "not-allowed",
                                opacity: selectedTeam1 ? 1 : 0.5,
                            }}
                        >
                            ✅ Sélectionner Équipe 1
                        </button>
                    ) : (
                        <button
                            onClick={resetTeam1}
                            style={{
                                marginTop: "20px",
                                backgroundColor: "#ff5555",
                                fontSize: "1rem",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "15px",
                                cursor: "pointer",
                            }}
                        >
                            ❌ Annuler Équipe 1
                        </button>
                    )}
                </div>

                {/* Équipe 2 */}
                <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                    <h2 style={{ marginBottom: "20px" }}>🛡️ Équipe 2</h2>
                    <Select
                        components={animatedComponents}
                        options={teams}
                        value={selectedTeam2}
                        onChange={setSelectedTeam2}
                        placeholder="Choisir une équipe..."
                        isDisabled={lockedTeam2}
                    />
                    {!lockedTeam2 ? (
                        <button
                            onClick={() => selectedTeam2 && setLockedTeam2(true)}
                            disabled={!selectedTeam2}
                            style={{
                                marginTop: "20px",
                                backgroundColor: buttonColor,
                                fontSize: "1rem",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "15px",
                                cursor: selectedTeam2 ? "pointer" : "not-allowed",
                                opacity: selectedTeam2 ? 1 : 0.5,
                            }}
                        >
                            ✅ Sélectionner Équipe 2
                        </button>
                    ) : (
                        <button
                            onClick={resetTeam2}
                            style={{
                                marginTop: "20px",
                                backgroundColor: "#ff5555",
                                fontSize: "1rem",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "15px",
                                cursor: "pointer",
                            }}
                        >
                            ❌ Annuler Équipe 2
                        </button>
                    )}
                </div>
            </div>

            {/* Bouton Lancer le combat */}
            {lockedTeam1 && lockedTeam2 && (
                <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <button
                        onClick={() => {
                            // Logique pour lancer le combat (ou naviguer vers la page de combat)
                            console.log("Combat lancé entre", selectedTeam1, selectedTeam2);
                            navigate('/battle', {
                                state: {
                                    team1: selectedTeam1,
                                    team2: selectedTeam2
                                }
                            });
                        }}
                        style={{
                            backgroundColor: "#ff4444",
                            color: "#fff",
                            fontSize: "1.5rem",
                            padding: "15px 30px",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        🔥 Lancer le combat 🔥
                    </button>
                </div>
            )}
        </div>
    );
};

export default CombatPage;
