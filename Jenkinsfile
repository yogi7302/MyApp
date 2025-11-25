pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'digital-artist-app'
        IMAGE_TAG = 'latest'
        DOCKERHUB_REPO = '07yogesh/digital-artist-app' // replace with your Docker Hub repo
        CONTAINER_PORT = '3000'  // internal app port in Docker
        HOST_PORT = '3000'       // host port you want to expose
    }

    tools {
        nodejs 'NodeJS' // Name of the NodeJS installation configured in Jenkins (Manage Jenkins → Global Tool Configuration)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yogi7302/MyApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Build Vite App') {
            steps {
                bat 'call npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %DOCKERHUB_REPO%:%IMAGE_TAG%"
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    bat "echo %DOCKERHUB_PASSWORD% | docker login -u %DOCKERHUB_USERNAME% --password-stdin"
                    bat "docker push %DOCKERHUB_REPO%:%IMAGE_TAG%"
                }
            }
        }

        stage('Pull and Run Docker Image') {
            steps {
                // Remove container if it exists
                bat "docker rm -f %IMAGE_NAME% || echo Container not found"
                bat "docker pull %DOCKERHUB_REPO%:%IMAGE_TAG%"
                bat "docker run -d --name %IMAGE_NAME% -p %HOST_PORT%:%CONTAINER_PORT% %DOCKERHUB_REPO%:%IMAGE_TAG%"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed: Docker image built, pushed, pulled, and container is running on localhost:3000!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
