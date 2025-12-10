#!/bin/bash

set -e  # stoppe le script si une commande échoue

echo "Nettoyage des ancienx containers..."
docker-compose down

echo "Build des containers..."
docker-compose build

echo "Démarrage des containers..."
docker-compose up -d

echo "Attendre 10 secondes..."
sleep 10

MYIP=$(hostname -I | awk '{print $1}')

echo "Test du backend..."
curl http://$MYIP:5000/contacts

echo "Déploiement terminé avec succès !"
