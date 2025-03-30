import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CapaciteList from '../components/CapaciteList';
import TeamColumn from '../components/TeamColumn';

const BattlePage = () => {
    const location = useLocation();
    const { combat } = location.state || {};

    const [combatData, setCombatData] = useState(null);
    const [selectedArchimon1, setSelectedArchimon1] = useState(null);
    const [selectedArchimon2, setSelectedArchimon2] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Chargement initial
    useEffect(() => {
        if (!combat?.id) return;
        axios.get(`http://localhost:8080/combat/${combat.id}`)
            .then(res => setCombatData(res.data))
            .catch(err => console.error("Erreur récupération combat :", err));
    }, [combat]);

    // Archimon actif = celui de la team du tour
    const getCurrentFighter = () => {
        if (!combatData || !selectedArchimon1 || !selectedArchimon2) return null;

        const currentTeamId = combatData.teamTurn === 1
            ? combatData.firstTeam.id
            : combatData.secondTeam.id;

        const currentId = currentTeamId === combatData.firstTeam.id
            ? selectedArchimon1?.id
            : selectedArchimon2?.id;

        const currentArchimonList = currentTeamId === combatData.firstTeam.id
            ? combatData.firstTeam.archimons
            : combatData.secondTeam.archimons;

        return currentArchimonList.find(a => a.id === currentId);
    };

    // Archimon ennemi
    const getEnemyFighter = () => {
        if (!combatData || !selectedArchimon1 || !selectedArchimon2) return null;

        const enemyTeam = combatData.teamTurn === 1
            ? combatData.secondTeam
            : combatData.firstTeam;

        const enemyId = combatData.teamTurn === 1
            ? selectedArchimon2?.id
            : selectedArchimon1?.id;

        return enemyTeam.archimons.find(a => a.id === enemyId);
    };

    const refreshCombatData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/combat/${combatData.id}`);
            setCombatData(res.data);
        } catch (err) {
            console.error("Erreur de rafraîchissement :", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUseCapacity = async (capacity) => {
        const fighter = getCurrentFighter();
        const enemy = getEnemyFighter();

        if (!combatData || !fighter || !enemy) return;

        const teamId = combatData.teamTurn === 1
            ? combatData.firstTeam.id
            : combatData.secondTeam.id;

        try {
            await axios.post(`http://localhost:8080/combat/${combatData.id}/play`, {
                teamId,
                archimonId: fighter.id,
                archimonEnemyId: enemy.id,
                capacityId: capacity.id
            });

            await refreshCombatData();
        } catch (error) {
            console.error("Erreur durant l'action :", error);
            alert("Une erreur est survenue pendant l'action.");
        }
    };

    if (!combatData) {
        return <div style={{ color: "#fff", padding: "20px" }}>Chargement...</div>;
    }

    const currentFighter = getCurrentFighter();

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            backgroundColor: "#111",
            color: "#fff",
            fontFamily: "'Orbitron', sans-serif",
            position: "relative",
            flexDirection: "row"
        }}>
            <TeamColumn
                team={combatData.firstTeam}
                onValidated={setSelectedArchimon1}
                activeArchimon={combatData.firstTeam.archimons.find(a => a.id === selectedArchimon1?.id)}
            />
            <TeamColumn
                team={combatData.secondTeam}
                onValidated={setSelectedArchimon2}
                activeArchimon={combatData.secondTeam.archimons.find(a => a.id === selectedArchimon2?.id)}
            />

            {currentFighter && !isLoading && (
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#1e1e1e",
                    borderTop: "2px solid #444",
                    padding: "20px",
                    textAlign: "center",
                    zIndex: 100
                }}>
                    <h2>🕹️ {currentFighter.nom} joue !</h2>
                    <CapaciteList
                        key={currentFighter?.id} // 🔄 force le changement de capacité quand le tour change
                        capacites={currentFighter?.capacities}
                        onUse={handleUseCapacity}
                        disabled={isLoading}
                    />
                </div>
            )}
        </div>
    );
};

export default BattlePage;
