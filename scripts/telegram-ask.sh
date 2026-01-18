#!/bin/bash

# Configuration Telegram
BOT_TOKEN="8400249363:AAHr3GG8mIgPeVJ5xzEi7-elmprERP63O6Q"
CHAT_ID="5711316423"

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Message a envoyer (passe en argument)
MESSAGE="$1"

if [ -z "$MESSAGE" ]; then
    echo -e "${RED}Usage: ./telegram-ask.sh \"Votre question\"${NC}"
    exit 1
fi

# Recuperer le dernier update_id pour ignorer les anciens messages
LAST_UPDATE=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates" | grep -o '"update_id":[0-9]*' | tail -1 | grep -o '[0-9]*')

# Envoyer le message
echo -e "${YELLOW}Envoi de la question sur Telegram...${NC}"
SEND_RESULT=$(curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
    -d "chat_id=${CHAT_ID}" \
    -d "text=Claude Code demande:

${MESSAGE}

Repondez directement ici." \
    -d "parse_mode=HTML")

if echo "$SEND_RESULT" | grep -q '"ok":true'; then
    echo -e "${GREEN}Message envoye. En attente de reponse...${NC}"
else
    echo -e "${RED}Erreur d'envoi: $SEND_RESULT${NC}"
    exit 1
fi

# Polling pour attendre la reponse (timeout 10 minutes)
TIMEOUT=600
ELAPSED=0
INTERVAL=5

while [ $ELAPSED -lt $TIMEOUT ]; do
    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))

    # Recuperer les nouveaux messages
    UPDATES=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=$((LAST_UPDATE + 1))")

    # Verifier s'il y a un nouveau message
    if echo "$UPDATES" | grep -q '"text"'; then
        # Extraire le texte de la reponse
        RESPONSE=$(echo "$UPDATES" | grep -o '"text":"[^"]*"' | tail -1 | sed 's/"text":"//;s/"$//')

        if [ ! -z "$RESPONSE" ]; then
            echo -e "${GREEN}Reponse recue:${NC}"
            echo "$RESPONSE"

            # Marquer les messages comme lus
            NEW_UPDATE_ID=$(echo "$UPDATES" | grep -o '"update_id":[0-9]*' | tail -1 | grep -o '[0-9]*')
            curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=$((NEW_UPDATE_ID + 1))" > /dev/null

            exit 0
        fi
    fi

    echo -ne "\r${YELLOW}Attente... ${ELAPSED}s/${TIMEOUT}s${NC}  "
done

echo -e "\n${RED}Timeout - Pas de reponse recue apres ${TIMEOUT} secondes${NC}"
exit 1
