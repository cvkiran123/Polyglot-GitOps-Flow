# # For Production
# FROM golang:1.24-alpine AS builder
# WORKDIR /app
#
# # Install necessary build tools
# RUN apk add --no-cache git
#
# # Copy go.mod and go.sum files
# COPY go.mod go.sum* ./
# RUN go mod download
#
# # Copy source code
# COPY . .
#
# # Build the application
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-w -s" -o main .
#
# # Use a minimal alpine image
# FROM alpine:3.19
# RUN apk --no-cache add ca-certificates
# WORKDIR /app
#
# # Copy the binary from builder
# COPY --from=builder /app/main .
#
# EXPOSE 8081
# CMD ["./main"]

# For Development
# --- STAGE 1: Build ---
FROM golang:1.24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-w -s" -o main .

# --- STAGE 2: Final Run (Hardened) ---
FROM alpine:3.19
# 1. Install CA certificates for HTTPS calls
RUN apk --no-cache add ca-certificates

# 2. Create a specific non-root user and group
RUN addgroup -S devopsgroup && adduser -S devopsuser -G devopsgroup -u 1000

WORKDIR /app

# 3. Copy the binary and ensure the non-root user owns it
COPY --from=builder /app/main .
RUN chown devopsuser:devopsgroup /app/main

# 4. Switch to the non-root user
USER 1000

EXPOSE 8081
CMD ["./main"]