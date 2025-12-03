# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# yarn 설치
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# package.json 복사
COPY package*.json ./

# 의존성 설치
RUN yarn install

# 소스 코드 복사
COPY . .

# React 앱 빌드
RUN yarn build

# Production stage
FROM nginx:alpine

# 빌드된 파일을 nginx에 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]

