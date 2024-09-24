# Math Exercise Database

## Seed Database

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


## Running Production

connect to server via ssh

```bash
ssh db-admin@139.162.166.227

# Navigate to project

cd execise-db-preact
git pull
```

create env files `.env` and `db.env`

run 

```bash
docker compose up -d
```
