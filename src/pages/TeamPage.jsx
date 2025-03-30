import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();

const CreateTeamPage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [archimons, setArchimons] = useState([]);
    const [selectedArchimons, setSelectedArchimons] = useState([]);

    // Récupération des archimons à afficher dans le select
    useEffect(() => {
        axios.get("http://localhost:8080/archimon")
            .then(res => {
                console.log("Archimons récupérés :", res.data);
                const options = res.data.map(archimon => ({
                    value: archimon.id,
                    label: archimon.nom
                }));
                setArchimons(options);
            })
            .catch(err => console.error("Erreur de récupération des Archimons :", err));
    }, []);

    const handleCreateTeam = () => {
        if (teamName.trim() === "") {
            alert("Le nom de l'équipe est requis.");
            return;
        }
        if (selectedArchimons.length < 2) {
            alert("Veuillez sélectionner au moins 2 Archimons.");
            return;
        }

        const payload = {
            nom: teamName,
            archimons: selectedArchimons.map(a => a.value)
        };

        axios.post("http://localhost:8080/teams", payload)
            .then(() => {
                alert("Équipe créée avec succès !");
                navigate("/"); // ou une autre route
            })
            .catch(err => {
                console.error("Erreur lors de la création de l’équipe :", err);
                alert("Erreur lors de la création de l’équipe.");
            });
    };

    return (
        <div style={{
            backgroundColor,
            color: textColor,
            minHeight: "100vh",
            fontFamily: "'Roboto', sans-serif",
            padding: "40px",
            textAlign: "center"
        }}>
            <h1 style={{ marginBottom: "30px", fontSize: "2rem" }}>🛠️ Création d’une Équipe</h1>

            {/* Champ nom équipe */}
            <input
                type="text"
                placeholder="Nom de l'équipe"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    width: "300px",
                    marginBottom: "20px"
                }}
            />

            {/* Sélection des archimons */}
            <div style={{ margin: "20px auto", width: "300px" }}>
                <Select
                    components={animatedComponents}
                    options={archimons}
                    value={selectedArchimons}
                    onChange={setSelectedArchimons}
                    isMulti
                    placeholder="Sélectionner des Archimons..."
                />
                <small style={{ color: "#fff", marginTop: "5px", display: "block" }}>
                    (Minimum 2 Archimons)
                </small>
            </div>

            {/* Bouton création */}
            <button
                onClick={handleCreateTeam}
                style={{
                    backgroundColor: buttonColor,
                    fontSize: "1.2rem",
                    padding: "10px 25px",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    marginTop: "20px"
                }}
            >
                ✅ Créer l’équipe
            </button>
        </div>
    );
};

export default CreateTeamPage;
