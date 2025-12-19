# Chọn base image Node LTS
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json và pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Cài pnpm nếu chưa có
RUN npm install -g pnpm

# Cài dependencies
RUN pnpm install

# Copy toàn bộ code
COPY . .

# Build Next.js
RUN pnpm build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy từ builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Set env production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "start"]
