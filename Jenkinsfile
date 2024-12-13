pipeline {
    agent any
    environment {
        // registry = "https://us-central1-docker.pkg.dev"
        // registryCredential = 'gcp-registry'
        // dockerImage = 'us-central1-docker.pkg.dev/expertis-classroom/docker-repository/backend-test'
        dockerImage = 'localhost:8080'
        // NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        USERNAME = "guret"
    }
    stages{
        stage("build"){
            agent {
                docker {
                    label 'contenedores'
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages{
                stage('Install'){
                    steps{
                        sh 'npm install'
                    }
                }
                stage('Test'){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage('Build'){
                    steps{
                        sh 'npm run build'
                    }
                }
            }
        }
//        stage("pipeline de construcion en docker"){
//           steps{
//               script{
//                   docker.withRegistry( "${registry}", registryCredential ){
//                        sh "docker build -t ${dockerImage}:latest ."
//                        sh "docker tag ${dockerImage}:latest ${dockerImage}:cmd-${BUILD_NUMBER}"
//                        sh "docker push ${dockerImage}:latest"
//                        sh "docker push ${dockerImage}:cmd-${BUILD_NUMBER}"
//                   }
//               }
//           }
//        }
           stage("Quality assurance"){
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages{
                stage("Quality assurance - sonarqube"){
                    steps{
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage("Quality assurance - quality gate"){
                    steps{
                        script{
                            timeout(time: 1, unit: 'MINUTES') {
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK') {
                                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                        }
                    }
                }
            }
        }
        stage("delivery - subida a nexus"){
            steps{
              script {
                docker.withRegistry("http://localhost:8082", "registry"){
                    sh 'docker build -t backend-test .'
                    sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                    sh 'docker push localhost:8082/backend-test:latest'
                }
              }

            }
        }
    }
}

        
//        stage("pipeline de despliegue en kubernetes"){
//            agent {
//                docker {
//                    image 'alpine/k8s:1.30.2'
//                    reuseNode true
//                }
//            }
//            steps{
//                withKubeConfig([credentialsId: 'gcp-kubeconfig', serverUrl: env.k8Server]) {
//                    script{
//                        sh "kubectl -n devops set image deployment/backend-base-deployment backend-base=${dockerImage}:cmd-${BUILD_NUMBER}"
//                    }
//                }
//            }
//        }
//    }
//}