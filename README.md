#### 뚜벅이 제주 여행자들을 위한, 
#### 버스를 기다리며 돌아댕기는 꿀잼 스팟 찾기 서비스, 댕기댕기🍊
<img width="927" height="521" alt="image" src="https://github.com/user-attachments/assets/e0ac963b-0aa6-4910-9072-3f382a0001df" />
<img width="917" height="508" alt="image" src="https://github.com/user-attachments/assets/e45274a5-ee7f-41ac-8d28-79c5a1063794" />
<img width="915" height="515" alt="image" src="https://github.com/user-attachments/assets/d4738131-6151-4007-bbff-b1b296673fb0" />
<img width="916" height="519" alt="image" src="https://github.com/user-attachments/assets/724c4be8-20c4-49ba-af78-75d81f85d6bf" />

<img width="911" height="509" alt="image" src="https://github.com/user-attachments/assets/09d9aa29-d35f-443a-a9d9-8cbff725d03e" />
<img width="911" height="510" alt="image" src="https://github.com/user-attachments/assets/8c22399e-3381-49c9-a3ed-ddce0ac06248" />
<img width="910" height="505" alt="image" src="https://github.com/user-attachments/assets/c238fadf-9909-464c-b268-b0fc40204549" />


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

