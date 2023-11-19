import Client from 'ioredis';
import Redlock from 'redlock';

export class RedlockBuilder {
  public static buildRedisClient(): Client {
    const redisClient = new Client({
      password: process.env.REDIS_PASSWORD,
      tls: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    });

    return redisClient;
  }

  public static buildRedlock(redisClient: Client): Redlock {
    const redlock = new Redlock([redisClient], {
      // The expected clock drift; for more details see:
      // http://redis.io/topics/distlock
      driftFactor: 0.01, // multiplied by lock ttl to determine drift time

      // The max number of times Redlock will attempt to lock a resource
      // before erroring.
      retryCount: 10,

      // the time in ms between attempts
      retryDelay: 5000, // time in ms

      // the max time in ms randomly added to retries
      // to improve performance under high contention
      // see https://www.awsarchitectureblog.com/2015/03/backoff.html
      retryJitter: 200, // time in ms

      // The minimum remaining time on a lock before an extension is automatically
      // attempted with the `using` API.
      automaticExtensionThreshold: 500, // time in ms
    });

    return redlock;
  }
}
