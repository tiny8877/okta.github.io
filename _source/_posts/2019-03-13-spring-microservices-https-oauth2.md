---
layout: blog_post
title: "Secure Service-to-Service Spring Microservices with HTTPS and OAuth 2.0"
author: mraible
description: "You've built a microservices architecture, but have you secured your service-to-service communication? This post shows you how."
tags: [microservices, spring boot, client credentials, spring security, https]
tweets:
- "Secure your service-to-service microservices using HTTPS and @oauth_2's client credentials."
- "Learn how to secure your Docker-based microservices architecture using HTTPS and @SpringSecurity."
- "Spring Security is awesome! Learn how it makes it possible to secure your microservice architecture's server-to-server communication." 
image: blog/microservices-service-to-service-security/boot-cloud-okta.jpg
---
:page-liquid:

Building a microservices architecture is possible with minimal code if you use Spring Boot, Spring Cloud, and Spring Cloud Config. Package everything up in Docker containers and you can run everything using Docker Compose. If you're communicating between services, you can ensure your services are somewhat secure by not exposing their ports in your `docker-compose.yml` file.

But what happens if someone accidentally exposes the ports of your microservice apps? Will they still be secure or can anyone access their data?

In this post, I'll show you how to use HTTPS, OAuth 2.0's client credentials, and scopes to secure service-to-service communication.

== Develop a Microservices Stack with Spring Boot, Spring Cloud, and Spring Cloud Config

I'm going to shortcut the process of building a full microservices stack with Spring Boot, Spring Cloud, Spring Cloud Config, and Spring Data. My buddy, Raphael, wrote a post on how to link:/blog/2019/02/28/spring-microservices-docker[build Spring microservices and Dockerize them for production]. Let's use his example app as a starting point. Clone the https://github.com/oktadeveloper/okta-spring-microservices-docker-example[okta-spring-microservices-docker-example] project:

[source,shell]
----
git clone https://github.com/oktadeveloper/okta-spring-microservices-docker-example.git 
cd okta-spring-microservices-docker-example
----

This project requires two OIDC apps on Okta, one for development and one for production. You'll need to create each app on Okta if you didn't run through the aforementioned tutorial.

=== Create OIDC Apps on Okta

You can register for a [free-forever developer account](https://developer.okta.com/signup/) that will allow you to have up to 1000 monthly active users for free. That should be plenty for this example. After creating your account, create a new Web Application in Okta's dashboard (**Applications** > **Add Application**). Give the app a name you'll remember (e.g., I used `Dev Microservices`), duplicate the existing Login redirect URI and make it use HTTPS. Click **Done**. The result should look similar to the screenshot below.

image::{% asset_path 'blog/microservices-service-to-service-security/oidc-web-app.png' %}[alt=OIDC App Settings,width=700,align=center]

Create another app for production. I called mine `Prod Microservices`. 

In the project you cloned, modify `config-data/school-ui.properties` to have the settings from your dev app.

[source,properties]
----
okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
okta.oauth2.clientId={devClientId}
okta.oauth2.clientSecret={devClientId}
----

These settings will be used when running your apps individually using Maven. The production settings are used when running with Docker Compose. Modify `config-data/school-ui-production.properties` to have the settings from your prod app.

[source,properties]
----
okta.oauth2.clientId={prodClientId}
okta.oauth2.clientSecret={prodClientId}
----

You can see that `spring.profiles.active` turns on the production profile in `docker-compose.yml`:

[source,yaml]
----
school-ui:
  image: developer.okta.com/microservice-docker-school-ui:0.0.1-SNAPSHOT
  environment:
    - JAVA_OPTS=
      -DEUREKA_SERVER=http://discovery:8761/eureka
      -Dspring.profiles.active=production
  restart: on-failure
  depends_on:
    - discovery
    - config
  ports:
    - 8080:8080
----

=== Start Your Microservices Stack with Docker Compose

This project has an aggregator `pom.xml` in its root directory that will allow you to build all the projects with one command. Run the following Maven commands to build, test, and build Docker images for each project.

[source,shell]
----
mvn clean install
----

TIP: If you don't have Maven installed, you can install it with https://sdkman.io/[SDKMAN!]: `sdk install maven`.

When the process completes, start all the apps { config, discovery, school-service, and school-ui } with Docker Compose. See [Install Docker Compose](https://docs.docker.com/compose/install/) if you don't have it installed.

[source,shell]
----
docker-compose up -d
----

TIP: You can use https://kitematic.com/[Kitematic] to watch the logs of each app as it starts up.

Navigate to `http://localhost:8080` in your favorite browser. You should be able to log in and see a list of school classes after doing so.

image::{% asset_path 'blog/microservices-service-to-service-security/school-ui.png' %}[alt=School UI,width=800,align=center]

=== Spring Security and OAuth 2.0

This example uses https://github.com/okta/okta-spring-boot[Okta's Spring Boot Starter], which is thin layer on top of Spring Security. The Okta starter simplifies configuration and does audience validation in the access token. It also allows you to specify the claim that will be used to create Spring Security authorities.

The `docker-compose.yml` file doesn't expose the `school-service` to the outside world. It does this by not specifying `ports`. 

The `school-ui` project has a `SchoolController` class that talks to the `school-service` using Spring's `RestTemplate`.

[source,java]
----
@GetMapping("/classes")
@PreAuthorize("hasAuthority('SCOPE_profile')")
public ResponseEntity<List<TeachingClassDto>> listClasses() {

    return restTemplate
            .exchange("http://school-service/class", HttpMethod.GET, null,
                    new ParameterizedTypeReference<List<TeachingClassDto>>() {});
}
----

You'll notice there is security on this class's endpoint, but no security exists between the services. I'll show you how to solve that in steps below.

First, let's expose the port of `school-service` to simulate someone fat-fingering the configuration. Change the `school-service` configuration in `docker-compose.yml` to expose its port.

[source,yaml
----
school-service:
  image: developer.okta.com/microservice-docker-school-service:0.0.1-SNAPSHOT
  environment:
    - JAVA_OPTS=
      -DEUREKA_SERVER=http://discovery:8761/eureka
  depends_on:
    - discovery
    - config
  ports:
    - 8081:8081
----

Restart everything with Docker Compose:

[source,shell]
----
docker-compose down
docker-compose up -d
----

NOTE: I tried to just `docker-compose restart school-service`, but it didn't work. 

You'll see that you don't need to authenticate to see data at `http://localhost:8081`. 

== HTTPS Everywhere!

HTTPS stands for "Secure" HTTP. HTTPS connections are encrypted and its contents are vastly more difficult to read than HTTP connections. 

https://letsencrypt.org/[Let's Encrypt] is a certificate authority that offers free HTTPS certificates. It also has APIs to automate their renewal. In short, it makes HTTPS so easy, there's no reason not to use it! See https://developer.okta.com/blog/2019/02/19/add-social-login-to-spring-boot#configure-the-custom-domain-name-for-your-spring-boot-app[Add Social Login to Your JHipster App] for instructions on how to use `certbot` with Let's Encrypt to generate certificates.

=== Make Local TLS Easy with mkcert

https://github.com/FiloSottile/mkcert[mkcert] is a tool for making `https://localhost` trusted for development. You can install it using Homebrew on macOS:

[source,shell]
----
brew install mkcert
brew install nss # Needed for Firefox
----

If you're on Linux, you'll need to install `certutil` first:

[source,shell]
----
sudo apt install libnss3-tools
----

Then run the `brew install mkcert` command using http://linuxbrew.sh/[Linuxbrew]. Windows users can https://github.com/FiloSottile/mkcert#windows[use Chocolately or Scoop].

Execute the following `mkcert` commands to generate a certificate for `localhost`, `127.0.0.1`, and your machine's name. 

[source,shell]
----
mkcert -install
mkcert localhost 127.0.0.1 ::1 `hostname`
----

If this generates files with a number in them, rename the files so they don't have a number.

[source,shell]
----
mv localhost+3.pem localhost.pem
mv localhost+3-key.pem localhost-key.pem
----

Spring Boot doesn't support certifcates with the https://tools.ietf.org/html/rfc1421[PEM] extension, but you can convert it to a `PKCS12` extension, which Spring Boot does support. You can use OpenSSL to convert the certificate and private key to PKCS12. This will be necessary for Let's Encrypt generated certificates too. Thanks to https://dzone.com/articles/spring-boot-secured-by-lets-encrypt[Spring Boot Secured By Let's Encrypt] for these tips.

Run `openssl` to convert the certificate:

[source,shell]
----
openssl pkcs12 -export -in localhost.pem -inkey localhost-key.pem -out keystore.p12 -name bootifulsecurity
----

Specify whatever password you like when promted. 

Open `discovery/src/main/resources/application.properties` and add the following properties to enable HTTPS.

[source,properties]
----
server.ssl.enabled=true
server.ssl.key-store=../keystore.p12
server.ssl.key-store-password: {yourPassword}
server.ssl.keyStoreType: PKCS12
server.ssl.keyAlias: bootifulsecurity
----

Start the `discovery` app (with Maven or your IDE) and confirm you can access it using HTTPS.

image::{% asset_path 'blog/microservices-service-to-service-security/secure-discovery.png' %}[alt=Secure Eureka Server,width=800,align=center]

Open `docker-compose.yml` and change all instances of `http` to `https`. Edit `school-ui/src/main/java/.../ui/controller/SchoolController.java` to change the call to `school-service` to use HTTPS.

[source,java]
----
return restTemplate
        .exchange("https://school-service/class", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<TeachingClassDto>>() {});
----

Update `discovery/src/main/resources/application.properties` to add properties that http://cloud.spring.io/spring-cloud-static/spring-cloud.html#_registering_a_secure_application[allow registering secure applications].

[source,properties]
----
eureka.instance.nonSecurePortEnabled=false
eureka.instance.securePortEnabled=true
eureka.instance.statusPageUrl=https://${eureka.hostname}/info
eureka.instance.healthCheckUrl=https://${eureka.hostname}/health
eureka.instance.homePageUrl=https://${eureka.hostname}/
----

Run `mvn clean install` to rebuild all the your Docker images. Then stop and restart all containers.

[source,shell]
----
docker-compose down
docker-compose up -d
----

While all 

https://github.com/creactiviti/spring-boot-starter-acme
https://piotrminkowski.wordpress.com/2018/05/21/secure-discovery-with-spring-cloud-netflix-eureka/
https://dzone.com/articles/spring-boot-secured-by-lets-encrypt

== HTTP Basic Auth 

Might be in 2018 Oktane preso 

== OAuth 2.0 Access Tokens 

== OAuth 2.0 Client Credentials

== Public / Private Keys (Juiser?)

== Wrap Up