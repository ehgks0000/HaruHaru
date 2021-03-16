# Server ( Backend )

## Javascript && Express

## Sequelize + Mysql

## Docker && Docker-compose

## 초기 설정

node 실행 중 sequelize seed 실행이 안됌

```
2. docker 프로그램에서 `server -> server_server_1의 CLI 클릭 -> npx sequelize-cli db:seed:all 입력`
```

### 도커 초기 설정

현재 디렉토리에서 `docker-compose up --build` 입력 하면 컨테이너 환경에서 개발 할 수 있다.

컨테이너 종료  
`ctrl + c` 또는 `docker-compose down && docker-compose up --build` 입력

돌아가고 있는 mysql 컨테이너에 직접 접속해서 정보를 보고 싶다면 다른 터미널 창을 열어서 `docker ps`를 쳐서 postgres 컨테이너의 `CONTAINER ID`를 찾고 복사한다. 그리고 `docker exec -it <container-id> bash`를 입력하면 컨테이너 shell에 연결이 된다.

`mysql -u root -p` 입력 후 패스워드 입력하면 mysql에 접속된다.

---

### mysql-cli

DB 보기
`show databases`

DB 선택
`use DB이름`

테이블 보기
`show tables`

테이블 내용 보기
`select * from 테이블명` 테이블명 대소문자 구분한다.

docker-compose에서 대소문자 구분안하도록 설정

### phpmyadmin으로 mysql 확인하기

localhost:8081로 접속 후  
ID: `root`  
PassWord: `haruharu`  
입력해서 로그인

### 초기데이터 삽입 오류 시

1. docker 컨테이너, 이미지 삭제 후 다시 `docker-compose up --build` 입력

or

2. docker 프로그램에서 `server -> server_server_1의 CLI 클릭 -> npx sequelize-cli db:seed:all 입력`
