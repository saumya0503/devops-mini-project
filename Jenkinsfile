pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        AWS_ACCOUNT_ID = "982081087008"
        REPO_NAME = "saumyaapp"
        IMAGE_TAG = "latest"
        ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"
        DEPLOY_SERVER = "ec2-user@13.234.35.187"
    }

    stages {
        stage('Checkout Code') { 
            steps {
                git branch: 'main', url: 'https://github.com/saumya0503/devops-mini-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${REPO_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                docker tag ${REPO_NAME}:${IMAGE_TAG} ${ECR_URI}:${IMAGE_TAG}
                docker push ${ECR_URI}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy on EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com &&
                        docker pull ${ECR_URI}:${IMAGE_TAG} &&
                        docker stop myapp || true &&
                        docker rm myapp || true &&
                        docker run -d --name myapp -p 80:80 ${ECR_URI}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }
    }
}

 

