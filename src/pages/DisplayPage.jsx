import React, { useEffect, useState } from 'react';
import { getArchimon } from '../utils/api/api';
import { useNavigate } from "react-router-dom";


const DisplayPage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const navigate = useNavigate();

    const [archimons, setArchimons] = useState([]);

    useEffect(() => {
        const fetchArchimon = async () => {
            try {
                const response = await getArchimon();
                console.log(response);
                if (response) {
                    setArchimons(response);
                }
                else {
                    console.error('Erreur lors de la récupération des données :', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des Archimons :', error);
            }
        };

        fetchArchimon();
    }, []);

    return (
        <div style={{
            backgroundColor,
            color: textColor,
            height: "100vh",
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",  // Changement de police
            padding: "20px",
            overflowY: "auto",
            animation: "glitch 1s infinite alternate",
        }}>
            <h1 style={{
                fontSize: "3rem",
                textShadow: "3px 3px 0px #000, -3px -3px 0px cyan",
                animation: "shake 0.5s infinite alternate",
                marginBottom: "20px"
            }}>
                💀🔥 LISTE DES ARCHIMONS 🔥💀
            </h1>

            <div style={{ marginBottom: "30px" }}>
                <button onClick={() => window.location.reload()} style={{
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
                    🔄 Rafraîchir
                </button>

                <button onClick={() => navigate("/create")} style={{
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
                }}>Création d'Archimon</button>
            </div>

            <button onClick={() => navigate("/chooseTeam")} style={{
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
                🛡️ Créer un combat
            </button>


            <div style={{
                display: "grid",
                gap: "20px",
                marginTop: "20px",
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Ajusté pour plus de flexibilité
            }}>
                {archimons.length > 0 ? archimons.map((archimon, index) => (
                    <div key={index} style={{
                        background: "#000",
                        padding: "15px",
                        width: "300px",
                        borderRadius: "20px",
                        boxShadow: "0 0 20px white",
                        border: "2px solid " + buttonColor,
                        transition: "transform 0.3s",
                        cursor: "pointer",
                        animation: "floaty 2s infinite alternate",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                        <img src={archimon.urlImage} alt="archimon" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                        <h2 style={{ color: "#ffcc00", fontSize: "1.5rem", marginBottom: "10px" }}>🔥 {archimon.nom.toUpperCase()} 🔥</h2>
                        <p>📜 {archimon.description}</p>                      
                        <p>❤️ PV: {archimon.pv}</p>
                        <div className="type-badges">
                            {archimon.types.map((type) => (
                                <div key={type.id} className="type-badge">
                                <img src={type.image} alt={type.libelle} />
                                </div>
                            ))}
                            </div>
                        <p>⚔️ Attaque: {archimon.atk}</p>
                        <p>🔥 Vitesse attaque: {archimon.spAtk}</p>
                        <p>🛡️ Défense: {archimon.def}</p>
                        <p>💧 Vitesse défense: {archimon.spDef}</p>
                        <p>⚡ Vitesse: {archimon.spd}</p>
                    </div>
                )) : <p>Aucun Archimon trouvé... 🧐</p>}
            </div>

            <style>
                {`
                @keyframes glitch {
                    0% { background-color: #ff00ff; }
                    50% { background-color: #00ffff; }
                    100% { background-color: #ffff00; }
                }
                @keyframes shake {
                    0% { transform: translateX(-5px); }
                    100% { transform: translateX(5px); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes floaty {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(10px); }
                }
                `}
            </style>
        </div>
    );
};

export default DisplayPage;
