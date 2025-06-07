# --- Stage 1: Build with Bun ---
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy dependencies and install
COPY bun.lock package.json ./
RUN bun install

# Copy source files
COPY . .

# Build the SvelteKit app
RUN bun run build

# --- Stage 2: Runtime with Bun ---
FROM oven/bun:latest

WORKDIR /app

# Copy build output and dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./

# Install only production dependencies
RUN bun install --production

EXPOSE 3000

# Start the app
CMD ["bun", "build/index.js"]
