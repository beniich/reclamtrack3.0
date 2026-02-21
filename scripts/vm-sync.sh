#!/bin/bash
# ================================================================
# ReclamTrack - Script de synchronisation automatique VM ↔ GitHub
# Auteur: Tarik / Antigravity
# Usage: bash vm-sync.sh [branch]
# Exemple: bash vm-sync.sh main
# ================================================================

REPO_DIR="$HOME/reclamtrack"   # Dossier du projet dans la VM
REMOTE="terix85"               # Remote SSH GitHub
BRANCH="${1:-main}"            # Branche (par défaut: main)
LOG_FILE="$HOME/vm-sync.log"   # Fichier de log

echo "=================================================" | tee -a "$LOG_FILE"
echo " ReclamTrack - Sync VM ↔ GitHub - $(date)" | tee -a "$LOG_FILE"
echo "=================================================" | tee -a "$LOG_FILE"

# --- 1. Vérification SSH GitHub ---
echo "[1/4] Test connexion SSH GitHub..." | tee -a "$LOG_FILE"
ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"
if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Connexion SSH GitHub échouée." | tee -a "$LOG_FILE"
    echo "    Vérifiez votre clé SSH: ssh -T git@github.com" | tee -a "$LOG_FILE"
    exit 1
fi
echo "✅ Connexion SSH GitHub OK" | tee -a "$LOG_FILE"

# --- 2. Cloner ou aller dans le dossier ---
echo "[2/4] Vérification du dossier projet..." | tee -a "$LOG_FILE"
if [ ! -d "$REPO_DIR" ]; then
    echo "📦 Clonage du dépôt depuis GitHub..." | tee -a "$LOG_FILE"
    git clone git@github.com:terix85/reclamtrackvm.git "$REPO_DIR"
    if [ $? -ne 0 ]; then
        echo "❌ ERREUR: Clonage échoué." | tee -a "$LOG_FILE"
        exit 1
    fi
fi

cd "$REPO_DIR" || { echo "❌ ERREUR: Dossier introuvable: $REPO_DIR" | tee -a "$LOG_FILE"; exit 1; }

# --- 3. Pull des derniers changements ---
echo "[3/4] Synchronisation branche '$BRANCH'..." | tee -a "$LOG_FILE"
git fetch $REMOTE 2>&1 | tee -a "$LOG_FILE"
git checkout $BRANCH 2>&1 | tee -a "$LOG_FILE"
git pull $REMOTE $BRANCH 2>&1 | tee -a "$LOG_FILE"

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: git pull échoué (conflit?)." | tee -a "$LOG_FILE"
    exit 1
fi
echo "✅ Code synchronisé avec GitHub" | tee -a "$LOG_FILE"

# --- 4. Redémarrage de l'application (optionnel) ---
echo "[4/4] Mise à jour des dépendances..." | tee -a "$LOG_FILE"
if [ -f "package.json" ]; then
    npm install --silent 2>&1 | tee -a "$LOG_FILE"
    echo "✅ Dépendances mises à jour" | tee -a "$LOG_FILE"
fi

echo "" | tee -a "$LOG_FILE"
echo "✅ Synchronisation terminée ! $(date)" | tee -a "$LOG_FILE"
echo "=================================================" | tee -a "$LOG_FILE"
