import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: '38.242.236.239',
      port: 4002,
      password:
        '2K0deWYwfbrHPIqyE0J1PN7L8Q7NwSUTcaPC37FqJDV0UC4gbo9k8RX721rEulYS',
      db: 0,
      username: 'default',
    });

    this.redis.on('error', (err) => console.log('Redis Client Error', err));
    this.redis.on('connect', () => console.log('Redis connected'));
    this.redis.on('reconnecting', () => console.log('Redis reconnecting'));
    this.redis.on('ready', () => console.log('Redis ready'));
    this.redis.on('end', () => console.log('Redis end'));
  }

  async set(key: string, value: string, ttl: number) {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  async expire(key: string, ttl: number) {
    await this.redis.expire(key, ttl);
  }

  async keys(pattern: string) {
    return await this.redis.keys(pattern);
  }

  async flushall() {
    await this.redis.flushall();
  }

  pipeline() {
    return this.redis.pipeline();
  }
}
