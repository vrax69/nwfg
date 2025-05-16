

---

---

## 🟦 1. **README para FRONTEND (Next.js, carpeta `/var/www/nwfg`)**

````markdown
# NWFG - Frontend

**Framework:** Next.js  
**Carpeta:** `/var/www/nwfg`  
**Puerto desarrollo:** `3000`  
**URL Producción:** https://nwfg.net

---

## 🚀 Comandos básicos

```bash
# Desarrollar localmente:
pnpm dev         # o npm run dev

# Build de producción:
pnpm build       # o npm run build

# Arrancar en producción:
pnpm start       # o npm run start
````

---

## 🛠️ Flujo de despliegue en producción

1. **Sube tus cambios al repo:**

   ```bash
   git add .
   git commit -m "feat: tu cambio"
   git push origin main
   ```

2. **En el servidor:**

   ```bash
   cd /var/www/nwfg
   git pull origin main
   pnpm install             # si cambiaste dependencias
   pnpm build               # genera el build de producción
   pm2 restart frontend-nwfg
   ```

---

## 🌐 Variables de entorno

**Nunca subas tus archivos `.env` al repo.**
Ejemplo de `.env.production`:

```
NEXT_PUBLIC_API_RATES=/api/rates
NEXT_PUBLIC_API_AUTH=/api/auth
NEXT_PUBLIC_API_UPLOAD=/api/upload
```

En local, normalmente:

```
NEXT_PUBLIC_API_RATES=http://localhost:3002/api/rates
NEXT_PUBLIC_API_AUTH=http://localhost:3003/api/auth
NEXT_PUBLIC_API_UPLOAD=http://localhost:3001/api/upload
```

---

## 📦 Estructura recomendada

```
/var/www/nwfg/
  ├─ .env.local
  ├─ .env.production
  ├─ package.json
  ├─ app/
  └─ ...
```

---

## 🐳 Extras

* **Gestor de procesos:** [PM2](https://pm2.keymetrics.io/)
* **Servidor web:** [NGINX](https://nginx.org/)
* **Build en producción:** Usar siempre `pnpm build && pnpm start` o equivalente.

---

## 🛑 ¡Nunca olvides!

* El build de Next.js **solo es necesario en producción**.
* Siempre haz `git pull` y `pnpm install` antes de un build.
* `.env*` debe estar en `.gitignore`.

---

````

---

---

## 🟩 2. **README para cada BACKEND (server-rates, user-auth, upload-files)**

```markdown
# NWFG - [Nombre del backend] (server-rates / user-auth / upload-files)

**Framework:** Node.js / Express  
**Carpeta:** `~/node_apps/[NOMBRE]`  
**Puerto:** (ejemplo, server-rates: `3002`)

---

## 🚀 Comandos básicos

```bash
# Arrancar local:
pnpm dev      # si tienes nodemon y script "dev"
node app.js   # o node server_rates.cjs, etc.

# Producción con PM2:
pm2 restart [nombre-pm2]
pm2 logs [nombre-pm2]
````

---

## 🛠️ Flujo de despliegue en producción

1. **Sube tus cambios al repo:**

   ```bash
   git add .
   git commit -m "fix: mejora api"
   git push origin main
   ```

2. **En el servidor:**

   ```bash
   cd ~/node_apps/[NOMBRE]
   git pull origin main
   pnpm install        # o npm install, si cambiaste dependencias
   pm2 restart [nombre-pm2]
   ```

---

## 🌐 Variables de entorno

**Nunca subas tu `.env`** (conexión DB, JWT, etc.)
Ejemplo de `.env`:

```
PORT=3002
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=clave
DB_NAME=rates_db
JWT_SECRET=secreto
NODE_ENV=production
```

* **Recuerda:**

  * El archivo `.env` nunca debe subirse.
  * En `.gitignore` asegúrate que diga:

    ```
    .env
    ```

---

## 📦 Estructura recomendada

```
~/node_apps/server_rates/
  ├─ .env
  ├─ package.json
  ├─ server_rates.cjs
  └─ ...
```

---

## 🐳 Extras

* **PM2:** Comando para ver estado:

  ```bash
  pm2 status
  pm2 logs [nombre-pm2]
  ```

---

## 🛑 ¡Nunca olvides!

* **No hagas push en el server**, solo pull.
* **No edites directamente en el server.**
* **Siempre actualiza dependencias y reinicia el proceso con PM2 tras un pull.**

---

```

---

## **Consejo general para todos los proyectos**

- **SIEMPRE**:  
  1. Sube desde local con commit/push.
  2. Ve al server, haz `git pull`, instala dependencias, build (si es frontend), y reinicia con PM2.

- **Mantén los archivos de entorno fuera del repo.**

---

¿Quieres que te arme un template para cada repo (ejemplo ya personalizado para `server_rates`, `user-auth` y `nwfg`), listo para copiar/pegar y ajustar solo el puerto o nombre?  
¿O prefieres el resumen general que tienes arriba?  
¡Dímelo y te los armo en segundos, listos para que los pongas como README.md!
```
