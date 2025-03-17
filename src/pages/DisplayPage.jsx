import React, { useEffect, useState } from 'react';
import { getArchimon } from '../utils/api/api';

const DisplayPage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const [archimons, setArchimons] = useState([]);

    useEffect(() => {
        const fetchArchimon = async () => {
            try {
                const response = await getArchimon();
                setArchimons(response);
                console.log('Archimons récupérés avec succès :', response);
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

                <button onClick={() => window.location.href = "/create"} style={{
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
                        <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-CHR2TDfocQTL9DabkzkDxA1A/user-Cvl5ioxKMALAMNnNS07SQFk8/img-fRjqrT6VHItE2wKanifXQnWV.png?st=2025-03-12T15%3A13%3A03Z&se=2025-03-12T17%3A13%3A03Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-11T23%3A24%3A38Z&ske=2025-03-12T23%3A24%3A38Z&sks=b&skv=2024-08-04&sig=3URJUNiqUm/3rYNhHLnIgmwAUgCsCSUQJ8CycBNjpHg%3D" alt="archimon" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                        
                        <h2 style={{ color: "#ffcc00", fontSize: "1.5rem", marginBottom: "10px" }}>🔥 {archimon.nom.toUpperCase()} 🔥</h2>
                        <p>❤️ PV: {archimon.pv}</p>
                        <p>⚔️ Attaque: {archimon.attaque}</p>
                        <p>🛡️ Défense: {archimon.defense}</p>
                        <p>⚡ Vitesse: {archimon.vitesse}</p>
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
