pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: "MINUTES")
    }
    stages {
        stage("verification") {
            steps {
                sh "echo test verification stage"
                sh "docker-compose --version"
                sh "which docker-compose"
            }
        }
        stage ("where are we") {
            steps {
                sh "ls"
                sh "pwd"
            }
        }
        stage ("build") {
            steps {
                sh "echo start build"
                sh "docker-compose -f docker-compose.build.yml build"
                sh "echo succesfull build"
            }
        }
        stage ("run") {
            steps {
                sh "docker-compose -f docker-compose.build.yml up"
            }
        }

    }
}