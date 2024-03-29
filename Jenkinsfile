pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/jessicamelo2015/Automacao-API.git'
                bat 'npm install'
                bat 'npx serverest -y'
            }
        }
        stage('Test') {
            steps {
                bat '''set NO_COLOR=1
npm test'''
                
            }
        }
    }
}
