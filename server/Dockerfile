# ---------- Base ----------
FROM node:14.17-alpine AS base

WORKDIR /home/node/app



# ---------- Builder ----------
FROM base AS builder

COPY package*.json ./

# Install all dependencies, both production and development
RUN npm install

# Copy the source files
COPY . .

# Build the app
RUN npm run build



# ---------- Release ----------
FROM base AS release

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy the dependencies
COPY --from=builder /home/node/app/node_modules ./node_modules

COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/.env.production ./.env
COPY --from=builder /home/node/app/tsconfig*.json ./

# Copy the tests
# COPY --from=builder /home/node/app/test ./test

# Copy the compiled app
COPY --from=builder /home/node/app/build ./build

CMD ["node", "build/server"]