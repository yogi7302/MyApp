pipeline {
    agent any

    environment {
        NODE_ENV = 'development'  // Ensure devDependencies (like Vite) are installed
        IMAGE_NAME = 'digital-artist-app'
        IMAGE_TAG = 'latest'
        DOCKERHUB_REPO = '07yogesh/digital-artist-app'
        HOST_PORT = '3001'          // Changed host port to avoid conflict
        CONTAINER_PORT = '80'
    }

    tools {
        nodejs 'NodeJS'  // Make sure NodeJS tool is configured in Jenkins
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
                ECHO Installing npm dependencies with devDependencies...
                SET NODE_ENV=development

                REM First try npm ci, fallback to npm install
                cmd /c "npm ci" || (
                    ECHO npm ci failed, falling back to npm install...
                    npm install
                )

                REM List installed packages to verify
                npm list
                """
            }
        }

        stage('Build Vite App') {
            steps {
                bat """
                SET NODE_ENV=development
                ECHO Running Vite build with full logging...

                REM Run Vite build
                npx vite build --debug || (
                    ECHO ERROR: Vite build failed!
                    EXIT /B 1
                )

                REM Verify dist folder exists
                IF NOT EXIST dist (
                    ECHO ERROR: dist folder not found! Vite build failed.
                    EXIT /B 1
                ) ELSE (
                    ECHO dist folder successfully created.
                    DIR dist
                )
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
            echo 'Pipeline completed: Docker image built, pushed, and running at http://localhost:3001'
        }
        failure {
            echo 'Pipeline failed! Check the console output for errors.'
        }
    }
}
