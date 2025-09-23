FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

# Health check for dev mode
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD if [ "$HOT_RELOAD" = "1" ]; then curl -f http://localhost:5173/ || exit 1; else curl -f http://localhost:80/ || exit 1; fi

# Development mode: run Vite dev server, Production mode: build and serve with nginx
CMD ["sh", "-c", "if [ \"$HOT_RELOAD\" = '1' ]; then npm run dev -- --host 0.0.0.0; else npm run build && npx serve -s dist -l 80; fi"]