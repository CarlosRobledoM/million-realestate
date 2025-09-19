# million-realestate
Fullstack project using next in front and .net in backend

## Requirements
- Node.js >= 18
- pnpm >= 9  (instalar: `npm i -g pnpm`)
- .NET SDK >= 8
- Docker y Docker Compose

## Frontend
Frontend project create in nextjs

### Run web 
- pnpm run web:i
- pnpm run web:dev

## Database
Mongodb using docker compose

### Emulate bd
- pnpm run bd:create
- pnpm run bd:dev

## Backend
Backend project to create api .net

### Run api .net
- pnpm run api:build
- pnpm run api:dev