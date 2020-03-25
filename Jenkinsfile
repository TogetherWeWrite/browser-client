pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: "MINUTES")
    }
    environment {
        CommitSha = %GIT_COMMIT%
        ImageVersion = '0.1'
        ImageName = "frontend"
        RegistryUrl = "http://dockerregistry.stijnbaltessen.digital"
    }
    stages {
        stage ("env echos"){
            steps{
                sh "echo ${CommitSha}"
                sh "echo ${ImageVersion}"
                sh "echo ${ImageName}"
                sh "echo ${RegistryUrl}"
            }
        }
        stage("verification docker versions") {
            steps {
                sh "docker-compose --version"
                sh "which docker-compose"
                sh "docker -v"
                sh "which docker"
            }
        }
        // stage ("build") {
        //     steps {
        //         sh "docker-compose -f docker-compose.build.yml build"
        //     }
        // }
        // stage ("Push Image to Registry") {
        //     steps {
        //         sh "docker  "
        //         sh "docker push ${RegistryUrl}/${ImageName}"
        //     }
        // }
        // stage ("run") {
        //     steps {
        //         sh "kubectl apply deployment.yaml"
        //         sh "kubectl apply service.yaml"
        //         sh "kubectl apply ingress.yaml"
        //     }
        // }
    }
}