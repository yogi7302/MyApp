pipeline {
    agent any

    environment {
        NODE_ENV = 'development'  // Ensure devDependencies (like Vite) are installed
        IMAGE_NAME = 'digital-artist-app'
        IMAGE_TAG = 'latest'
        DOCKERHUB_REPO = '07yogesh/digital-artist-app'
        HOST_PORT = '3000'
        CONTAINER_PORT = '80'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yogi7302/MyApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat """
                ECHO Installing npm dependencies...
                REM Attempt npm ci; fallback to npm install if it fails
                cmd /c "npm ci" || (
                    ECHO ============================================
                    ECHO npm ci failed! Falling back to npm install...
                    ECHO ============================================
                    npm install
                )
                """
            }
        }

        stage('Build Vite App') {
            steps {
                bat """
                ECHO Verifying Vite installation...
                npm list vite
                ECHO Running Vite build...
                npx vite build || exit /b 1
                """
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_PASSWORD'
                    )
                ]) {
                    bat "echo %DOCKERHUB_PASSWORD% | docker login -u %DOCKERHUB_USERNAME% --password-stdin"
                    bat "docker push %DOCKERHUB_REPO%:%IMAGE_TAG%"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                bat "docker rm -f %IMAGE_NAME% || echo Container not found"
                bat "docker run -d --name %IMAGE_NAME% -p %HOST_PORT%:%CONTAINER_PORT% %DOCKERHUB_REPO%:%IMAGE_TAG%"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed: Docker image built, pushed, and running at http://localhost:3000'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
