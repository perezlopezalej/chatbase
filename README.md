# ChatBase 🤖

> Plataforma SaaS para crear chatbots personalizados con IA y añadirlos a cualquier web en minutos.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)

## 🚀 ¿Qué es ChatBase?

ChatBase permite a cualquier negocio crear su propio asistente virtual con IA. El usuario configura el bot con la información de su negocio — horarios, servicios, precios — y obtiene un widget para instalarlo en su web con una sola línea de código.

## ✨ Funcionalidades

- 🔐 **Autenticación completa** — Registro, login y sesiones con NextAuth v5
- 🤖 **Chatbots con IA** — Powered by Groq (Llama 3.1) con memoria de conversación
- 📊 **Dashboard** — Gestión completa de chatbots con estadísticas
- 🎨 **Widget embebible** — Una línea de código para instalar en cualquier web
- ⚙️ **Configuración avanzada** — Instrucciones personalizadas por bot
- 🛡️ **Rate limiting** — Protección de la API del chat
- 🗄️ **Base de datos** — PostgreSQL con Prisma ORM en Supabase

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend + Backend | Next.js 16 (App Router) |
| Estilos | Tailwind CSS + shadcn/ui |
| Autenticación | NextAuth v5 |
| Base de datos | PostgreSQL (Supabase) |
| ORM | Prisma 5 |
| IA | Groq API (Llama 3.1) |
| Despliegue | Vercel |

## 📦 Instalación local

### Requisitos
- Node.js 18+
- pnpm
- Cuenta en [Supabase](https://supabase.com)
- API key de [Groq](https://console.groq.com)

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/perezlopezalej/chatbase.git
cd chatbase
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Crea el archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Rellena las variables en `.env`:
```env
DATABASE_URL="tu-url-de-supabase"
DIRECT_URL="tu-url-directa-de-supabase"
AUTH_SECRET="tu-secret-aleatorio"
GROQ_API_KEY="tu-api-key-de-groq"
NEXTAUTH_URL="http://localhost:3000"
```

5. Ejecuta las migraciones:
```bash
npx prisma migrate dev
```

6. Arranca el servidor:
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Demo

[chatbase-perezlopezalej.vercel.app](https://chatbase-perezlopezalej.vercel.app) *(disponible próximamente)*

## 👨‍💻 Autor

**Alejandro Pérez López**  
[GitHub](https://github.com/perezlopezalej)

## 📄 Licencia

MIT