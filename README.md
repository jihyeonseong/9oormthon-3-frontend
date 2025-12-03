# 9oormthon-3 Frontend

Frontend 웹 애플리케이션 (React)

## 구조

```
/
├── Dockerfile          # Docker 이미지 빌드 파일
├── package.json       # Node.js 의존성
├── nginx.conf         # Nginx 설정
├── src/               # React 소스 코드
├── public/            # 정적 파일
├── k8s/                # Kubernetes 배포 설정
│   ├── frontend.yaml  # Frontend Deployment & Service
│   ├── ingress.yaml   # Ingress 설정
│   ├── kustomization.yaml
│   └── config/        # ConfigMap 설정
└── .gitignore
```

## 빌드

```bash
docker build -t frontend:latest .
```

## 실행

```bash
docker run -p 80:80 frontend:latest
```

## 환경 변수

- `REACT_APP_API_URL`: Backend API URL

## Kubernetes 배포

### ArgoCD 사용

```bash
kubectl apply -f argocd/applications/frontend-app.yaml
```

### Kustomize 사용

```bash
kubectl apply -k k8s/
```

## 관련 저장소

- **Backend**: `9oormthon-3-backend` - Backend 소스 코드 및 배포 설정

