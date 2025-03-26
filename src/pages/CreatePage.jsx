import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { createArchimon } from '../utils/api/api';
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const animatedComponents = makeAnimated();

const CreatePage = ({ backgroundColor = "#ff00ff", textColor = "#00ff00", buttonColor = "#ffcc00" }) => {
    const navigate = useNavigate();

    const [archimon, setArchimon] = useState({
        nom: '',
        description: '',
        types: [],
        pv: 0,
        atk: 0,
        spAtk: 0,
        def: 0,
        spDef: 0,
        spd: 0,
        urlImage: '',
        capacities: []
    });

    const [allTypes, setAllTypes] = useState([]);
    const [capacitesDisponibles, setCapacitesDisponibles] = useState([]);
    const [capacitesSelectionnees, setCapacitesSelectionnees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/types')
            .then(res => res.json())
            .then(data => setAllTypes(data))
            .catch(err => console.error("Erreur lors du chargement des types :", err));

        fetch('http://localhost:8080/capacities')
            .then(res => res.json())
            .then(data => setCapacitesDisponibles(data))
            .catch(err => console.error("Erreur lors du chargement des capacités :", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArchimon((prev) => ({
            ...prev,
            [name]: ['nom', 'description', 'urlImage'].includes(name) ? value : Number(value)
        }));
    };

    const handleTypesSelect = (selectedOptions) => {
        const selectedIds = selectedOptions.map(opt => opt.value);
        setArchimon(prev => ({
            ...prev,
            types: selectedIds
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const updatedArchimon = {
                ...archimon,
                capacities: capacitesSelectionnees.map(cap => cap.id)
            };
            console.log('Création de l\'Archimon :', updatedArchimon);
            await createArchimon(updatedArchimon);
            alert(`🔥 Un Archimon sauvage apparaît ! 🔥\nNom: ${archimon.nom}`);
            setTimeout(() => window.location.href = '/', 1000);
        } catch (error) {
            console.error('Erreur lors de la création de l\'Archimon :', error);
            alert("❌ Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceList = source.droppableId === 'disponibles' ? capacitesDisponibles : capacitesSelectionnees;
        const destList = destination.droppableId === 'disponibles' ? capacitesDisponibles : capacitesSelectionnees;
        const setSourceList = source.droppableId === 'disponibles' ? setCapacitesDisponibles : setCapacitesSelectionnees;
        const setDestList = destination.droppableId === 'disponibles' ? setCapacitesDisponibles : setCapacitesSelectionnees;

        const [movedItem] = sourceList.splice(source.index, 1);
        destList.splice(destination.index, 0, movedItem);

        setSourceList([...sourceList]);
        setDestList([...destList]);
    };

    const typeOptions = allTypes.map(type => ({
        value: type.id,
        label: type.libelle,
    }));

    // LOADER DISPLAY
    if (isLoading) {
        return (
            <div style={{
                backgroundColor,
                color: textColor,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Arial', sans-serif",
                animation: "flashy-bg 5s infinite alternate"
            }}>
                <div style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px black",
                    animation: "pulse 1s infinite"
                }}>
                    🌀 Création de ton Archimon en cours...
                </div>
                <div style={{
                    marginTop: "30px",
                    border: "5px solid #000",
                    borderTop: "5px solid #ffcc00",
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    animation: "spinner 1s linear infinite"
                }}></div>

                <style>
                    {`
                    @keyframes flashy-bg {
                        0% { background-color: #ff00ff; }
                        50% { background-color: #00ffff; }
                        100% { background-color: #ffff00; }
                    }
                    @keyframes spinner {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                    `}
                </style>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor,
            color: textColor,
            height: "100%",
            textAlign: "center",
            fontFamily: "'Arial', sans-serif",
            padding: "20px",
            transition: "background 0.5s ease",
            animation: "flashy-bg 5s infinite alternate",
        }}>

            <button onClick={() => navigate("/")} style={{
                backgroundColor: buttonColor,
                fontSize: "1.5rem",
                padding: "10px 20px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
            }}>
                🏠 RETOUR
            </button>

            <h1 style={{ fontSize: "3rem", textShadow: "3px 3px 0px #000", marginBottom: "20px" }}>⚡ CRÉE TON ARCHIMON WTF ⚡</h1>
            
            <div style={{ display: "grid", gap: "15px", maxWidth: "500px", margin: "auto" }}>
                <input type="text" name="nom" placeholder="📝 Nom" onChange={handleChange} style={inputStyle} />
                <input type="text" name="description" placeholder="📖 Description" onChange={handleChange} style={inputStyle} />
                <input type="number" name="pv" placeholder="❤️ PV" onChange={handleChange} style={inputStyle} />
                <input type="number" name="atk" placeholder="⚔️ Attaque" onChange={handleChange} style={inputStyle} />
                <input type="number" name="spAtk" placeholder="🔥 Vitesse Attaque" onChange={handleChange} style={inputStyle} />
                <input type="number" name="def" placeholder="🛡️ Défense" onChange={handleChange} style={inputStyle} />
                <input type="number" name="spDef" placeholder="💧 Vitesse Défense" onChange={handleChange} style={inputStyle} />
                <input type="number" name="spd" placeholder="⚡ Vitesse" onChange={handleChange} style={inputStyle} />
                
                <Select
                    id="types"
                    closeMenuOnSelect={false}
                    placeholder="🌈 Sélectionne un ou plusieurs types"
                    components={animatedComponents}
                    isMulti
                    options={typeOptions}
                    onChange={handleTypesSelect}
                    styles={{
                        control: (base) => ({
                            ...base,
                            border: "3px solid black",
                            borderRadius: "10px",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            width: "107%",
                        }),
                        multiValueLabel: (styles) => ({
                            ...styles,
                            fontWeight: "bold",
                        })
                    }}
                />
            </div>

            <h2 style={{ marginTop: "40px", fontSize: "2rem" }}>💥 Capacités 💥</h2>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px', flexWrap: 'wrap' , marginBottom: "50px" }}>
                    <Droppable droppableId="disponibles">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '10px',
                                    width: '250px',
                                    minHeight: '200px',
                                    border: '3px dashed black',
                                    borderRadius: '15px',
                                }}
                            >
                                <h3>📜 Disponibles</h3>
                                {capacitesDisponibles.map((cap, index) => (
                                    <Draggable key={cap.id.toString()} draggableId={cap.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: 'none',
                                                    padding: '10px',
                                                    margin: '5px 0',
                                                    backgroundColor: '#ffec99',
                                                    borderRadius: '10px',
                                                    border: '2px solid #000',
                                                    ...provided.draggableProps.style
                                                }}
                                            >
                                                {cap.nom}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="selectionnees">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '10px',
                                    width: '250px',
                                    minHeight: '200px',
                                    border: '3px dashed black',
                                    borderRadius: '15px',
                                }}
                            >
                                <h3>✅ Sélectionnées</h3>
                                {capacitesSelectionnees.map((cap, index) => (
                                    <Draggable key={cap.id.toString()} draggableId={cap.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: 'none',
                                                    padding: '10px',
                                                    margin: '5px 0',
                                                    backgroundColor: '#baffc9',
                                                    borderRadius: '10px',
                                                    border: '2px solid #000',
                                                    ...provided.draggableProps.style
                                                }}
                                            >
                                                {cap.nom}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

            <button onClick={handleSubmit} style={buttonStyle}
                onMouseOver={(e) => e.target.style.transform = "scale(1.2) rotate(10deg)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1) rotate(0deg)"}>
                🚀 CRÉER UN ARCHIMON !
            </button>

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
