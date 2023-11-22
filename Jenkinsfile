// Pipeline configurations
//def ENV_NAME = 'TEST'
//def CONFIG_REPO_NAME = "BAAS-ACCOUNTS-CONFIG"
//def CONFIG_REPO_BRANCH = "test"
//def CONFIG_REPO_FOLDER = "BAAS-ACCOUNTS-WEB-CLIENT"
//def CONFIG_REPO_URL = "https://harishraj:lucd2yqw4dkmnvg25c34pk74fno5mf4poptxtq2e4cyjxgp3a3na@dev.azure.com/goveindia/Baas-360/_git/BAAS-ACCOUNTS-CONFIG"


pipeline {
    agent { label "test" }
    stages {
        stage('CLONE CONFIG REPOSITORY') {
            steps {
                script{
                    catchError {
                        sh "git clone https://github.com/sankar0812/baas-accounts-webclient.git"
                    }
                }
            }
        }
        stage('SETTING UP ALL THE CONFIGURATIONS') {
            steps {
                script {
                        def sourcePath = sh(script: 'pwd', returnStdout: true).trim()
                        def targetPath = sh(script: 'pwd', returnStdout: true).trim()
                        sh "rm -rf ${sourcePath}/package-lock.json"
                        sh "cp -r ${sourcePath}/package.json ${targetPath}"
                        sh "cp -r ${sourcePath}/appstorefile.js ${targetPath}"
                        sh "cp -r ${sourcePath}/post.deployment.email.sh ${targetPath}"
                        sh "cp -r ${sourcePath}/pre.deployment.email.sh ${targetPath}"
                        sh "cp -r ${sourcePath}/test.report.email.sh ${targetPath}"
                        sh "cp -r ${sourcePath}/.npmrc ${targetPath}"
                        sh "cp -r ${sourcePath}/Dockerfile ${targetPath}"
                        sh "cp -r ${sourcePath}/config.js ${targetPath}"
                        //sh "rm -rf ${sourcePath}/${CONFIG_REPO_NAME}"
                }
            }
        }
        /**stage('PRE-DEPLOYMENT EMAIL') {
            steps {
                script {
                    sh 'chmod +x pre.deployment.email.sh'
                     sh './pre.deployment.email.sh'
                }
            }
        }**/
        stage('STOPPING THE CURRENTLY RUNNING CONTAINER') {
            steps {
                script{
                    catchError {
                        sh 'echo admin | sudo -S docker stop baasaccountswebclient-container'
                    }
                }
            }
        }
        stage('DELETING THE STOPPED CONTAINER') {
            steps{
                script{
                    catchError {
                        sh 'echo admin | sudo -S docker rm baasaccountswebclient-container'
                    }
                }
            }
        }
        stage('DELETING THE IMAGE OF THE CONTAINER') {
            steps{
                script{
                    catchError {
                        sh 'echo admin | sudo -S docker rmi baasaccountswebclient-image'
                    }
                }
            }
        }
       stage('BUILDING A NEW IMAGE FROM SOURCE CODE') {
            steps{
                script{
                    catchError{
                        sh 'echo admin | sudo -S docker build -t baasaccountswebclient-image .' 
                    }
                 }
            }
            }
        stage('RUNNING A NEW CONATINER FROM NEW IMAGE') {
            steps{
                script{
                    catchError{
                        sh 'echo admin | sudo -S docker run --memory-reservation=120m -m 240m -d -p 3003:3003 --net test-network --name baasaccountswebclient-container baasaccountswebclient-image'
                    }
                }
            }
        }
        /**stage('POST-DEPLOYMENT EMAIL') {
            steps{
                script{
                   sh 'chmod +x post.deployment.email.sh'
                     sh './post.deployment.email.sh'
                }
            }
        }**/
    }
}
