FROM amazoncorretto:17-alpine-jdk

ARG JAR_FILE=./backend/build/libs/carffeine-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
