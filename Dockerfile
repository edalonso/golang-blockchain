# Start from the latest golang base image
FROM golang:1.21.5-alpine3.19 as builder
# Add Maintainer Info
LABEL maintainer="Eduardo Alonso <eduardo.alonso@disashop.com>"

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies optimizing cache for dependencies dependencies -> https://github.com/montanaflynn/golang-docker-cache
RUN go mod graph | awk '{if ($1 !~ "@") print $2}' | xargs go get

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o main .

# Start from scratch image to optimized disk
FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

WORKDIR /app

COPY --from=builder /app/main /app
# Command to run the executable
ENTRYPOINT ["/app/main"]
