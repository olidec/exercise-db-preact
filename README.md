# Math Exercise Database

## Seed Test Database

delete volume `db-postgres` on docker desktop

run `docker compose watch`

in server `exec` tab run

```bash
npx prisma migrate dev --name init
node seed-db/scripts/setup-db.cjs
```

## Running Test Environment

```bash
docker compose watch
```

## Setting Up Production

connect to server via ssh

```bash
ssh db-admin@172.104.225.199

# Navigate to project

cd execise-db-preact
git pull
```

create env files `.env` and `db.env`
change configuration to match the files in the `production-config` branch

### Set Up Certificates

```bash
sudo apt update
sudo apt install certbot

sudo certbot certonly --standalone -d letstalkaboutx.ch
sudo certbot certonly --standalone -d server.letstalkaboutx.ch
sudo certbot certonly --standalone -d prisma.letstalkaboutx.ch
# This is needed to access Prisma Studio
```

### Running for the First Time

```bash
docker compose up -d
docker exec -it server sh
npx prisma migrate dev --name init
node seed-db/scripts/setup-db.cjs
# Change `setup-db.cjs` for customized setup
exit
```
