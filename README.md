<div align="center">
  <h1>Finlabs</h1>
</div>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6ba981da305e4a03b6f1ac18645a7ce1)](https://app.codacy.com/gh/aseerkt/finlabs/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

> Streamline your projects - the flexible project management tool for modern teams

### Getting Started

- Install dependencies

```bash
pnpm i
```

- Spin up Docker Postgres in detached mode

```bash
docker-compose up -d
# OR

docker compose up -d
```

- Copy env files

```
cp .env.example .env
```

- Run dev server

```bash
pnpm dev
```

- Additionaly, you can seed data

```bash
pnpm seed
```

### Features

- [x] Manage profile and bio
- [x] Create project
- [x] Create tasks
- [x] Drag and drop (tasks/columns) accross board
- [x] Assign and manage priority of tasks
- [x] Manage collaborators with access control (ADMIN / WRITE / READ)
- [x] Restrict access based on collaborator role
- [ ] CRUD columns
- [ ] `#` Mention task
- [ ] `@` Mention collaborators
- [ ] Track task history
- [ ] Add comments on task with reactions
- [ ] Notification system

### Tech Stacks

- Next.js App Router
- Prisma - PostgreSQL
- ShadCN - TailwindCSS
- React Hook Form
- NextAuth

### Screenshots

![Home page](/assets/finlabs-home.png)
![User page](/assets/finlabs-user.png)
![Projects page](/assets/finlabs-projects.png)
![Board page](/assets/finlabs-board.png)
