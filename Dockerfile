# Stage 1: build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.15.9

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the project
COPY . .

# Build Next.js
RUN pnpm build

# Stage 2: production image
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm@9.15.9
RUN pnpm install --prod --frozen-lockfile

# Copy built Next.js files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Run Next.js
CMD ["pnpm", "start"]
