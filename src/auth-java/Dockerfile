## For Production
#FROM maven:3.9-amazoncorretto-21-al2023 AS builder
#WORKDIR /app
#COPY pom.xml .
## Download dependencies separately (better caching)
#RUN mvn dependency:go-offline
#
#COPY src ./src
#RUN mvn package -DskipTests
#
#FROM amazoncorretto:21-alpine
#WORKDIR /app
#COPY --from=builder /app/target/*.jar app.jar
#EXPOSE 8080
#CMD ["java", "-jar", "app.jar"]

# For Development
# STAGE 1: Build the application (The "Builder")
FROM maven:3.9-amazoncorretto-21-al2023 AS builder
WORKDIR /app

# 1. Copy only pom.xml to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy source and build the JAR
COPY src ./src
RUN mvn package -DskipTests

# STAGE 2: Run the application (The "Runtime")
# We use Alpine because it's tiny
FROM amazoncorretto:21-alpine
WORKDIR /app

# 3. Create a non-root user (Senior DevOps Security Move)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# 4. Copy only the compiled JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# 5. Standard Spring Boot port
EXPOSE 8080

# 6. Optimized JVM flags for containers
# Use '-XX:MaxRAMPercentage' so Java respects K8s resource limits!
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
