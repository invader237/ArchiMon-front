import React, { useState } from 'react';
import { createArchimon } from '../utils/api/api';

const CreatePage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const [archimon, setArchimon] = useState({
        nom: '',
        pv: 0,
        attaque: 0,
        defense: 0,
        vitesse: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArchimon((prev) => ({
            ...prev,
            [name]: name === 'nom' ? value : Number(value)
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createArchimon(archimon);
            console.log('Archimon créé avec succès :', archimon);
            alert(`🔥 Un Archimon sauvage apparaît ! 🔥\nNom: ${archimon.nom}`);
            setTimeout(() => window.location.href = '/', 1000);
        } catch (error) {
            console.error('Erreur lors de la création de l\'Archimon :', error);
        }
    };

    return (
        <div style={{
            backgroundColor,
            color: textColor,
            height: "100vh",
            textAlign: "center",
            fontFamily: "'Arial', sans-serif", // Police plus lisible
            padding: "20px",
            transition: "background 0.5s ease",
            animation: "flashy-bg 5s infinite alternate",
        }}>
            <h1 style={{ fontSize: "3rem", textShadow: "3px 3px 0px #000", marginBottom: "20px" }}>⚡ CRÉE TON ARCHIMON WTF ⚡</h1>
            
            <div style={{ display: "grid", gap: "15px", maxWidth: "400px", margin: "auto" }}>
                <input type="text" name="nom" placeholder="📝 Nom" onChange={handleChange} style={inputStyle} />
                <input type="number" name="pv" placeholder="❤️ PV" onChange={handleChange} style={inputStyle} />
                <input type="number" name="attaque" placeholder="⚔️ Attaque" onChange={handleChange} style={inputStyle} />
                <input type="number" name="defense" placeholder="🛡️ Défense" onChange={handleChange} style={inputStyle} />
                <input type="number" name="vitesse" placeholder="⚡ Vitesse" onChange={handleChange} style={inputStyle} />
                
                <button onClick={handleSubmit} style={buttonStyle}
                onMouseOver={(e) => e.target.style.transform = "scale(1.2) rotate(10deg)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1) rotate(0deg)"}>
                    🚀 CRÉER UN ARCHIMON !
                </button>
            </div>

            <style>
                {`
                @keyframes flashy-bg {
                    0% { background-color: #ff00ff; }
                    50% { background-color: #00ffff; }
                    100% { background-color: #ffff00; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

const inputStyle = {
    padding: "12px",
    border: "3px solid black",
    borderRadius: "10px",
    fontSize: "1.2rem",
    textAlign: "center",
    width: "100%",
    transition: "border 0.3s ease",
};

const buttonStyle = {
    backgroundColor: "#ffcc00",
    fontSize: "1.5rem",
    padding: "12px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "5px 5px 0px black",
    animation: "spin 2s linear infinite",
};

export default CreatePage;
