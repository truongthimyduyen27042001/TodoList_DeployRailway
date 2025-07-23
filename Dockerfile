# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files, migration script, and startup script
COPY package.json package-lock.json* migrate.js start.sh ./

# Install only production dependencies
RUN npm install --production && npm cache clean --force

# Copy built application
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app

# Make startup script executable
RUN chmod +x start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

# Remove the RUN npm run migrate line - we'll run it in CMD
# RUN npm run migrate

CMD ["./start.sh"]
