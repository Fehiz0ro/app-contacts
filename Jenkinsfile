pipeline {
    agent any

    environment {
        BACKEND_PORT = "5000"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Fehiz0ro/app-contacts'
            }
        }

        stage('Stop Containers') {
            steps {
                script {
                    sh 'docker-compose down || true'
                }
            }
        }

        stage('Build Containers') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    echo "Test du backend via curl..."
                    sh """
                    sleep 10
                    curl -f http://localhost:${BACKEND_PORT}/contacts
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline terminé"
        }
    }
}
