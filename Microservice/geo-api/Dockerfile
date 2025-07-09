FROM golang:1.23.4
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o geoapi .
EXPOSE 8004
CMD ["./geoapi"]
