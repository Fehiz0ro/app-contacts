#!/bin/bash

set -e  # stoppe le script si une commande échoue

echo "Nettoyage des ancienx containers..."
docker-compose down

echo "Build des containers..."
docker-compose build

echo "Démarrage des containers..."
docker-compose up -d

echo "Attendre 35 secondes..."
sleep 35

echo "Test du backend..."
curl http://192.168.3.173:5000/contacts

echo "Déploiement terminé avec succès !"
