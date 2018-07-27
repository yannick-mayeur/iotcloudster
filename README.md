# Iotcloudster

This jhipster generated app allow you to visualise data of from your particle
cloud online. Events are read from a database making the history of events
persistent unlike the event visualisation of the
[particle console](https://console.particle.io/events).

## Dependencies

To be able to visualise events, you will first need a database. This database
can be filled using the ParticleToDatabase adapter: https://github.com/yannick-mayeur/particleToDatabase
The graphs are created using: https://www.primefaces.org/primereact/

For development you need to have following dependencies on your machine: 

 * Node.js
 * Yarn

## Development

Install all dependencies with:


```
$ yarn install
```

Then run the following commands in two separate terminals so that the browser
auto-refreshes when files are changed.

```
$ ./gradlew
$ yarn start
```

## Deploying to production: with rancher

First push to you Docker registry:

```
$ ./gradlew -Pprod bootWar buildDocker -x test
$ docker tag username/iotcloudster
$ docker push username/iotcloudster
```

Then setup your rancher stack according to the `docker-compose.yml` and
`rancher-compose.yml` files.

To fill the database do not forget to also add the ParticleToDatabase adapter
to the stack.
