import { app, InvocationContext } from '@azure/functions';
import { v4 as uuidv4 } from 'uuid';
import { RedlockBuilder } from './redlock-builder';
import { TimeUtils } from './time-utils';

export async function serviceBusQueueTrigger(
  message: unknown,
  context: InvocationContext
): Promise<void> {
  const operationId = uuidv4();
  context.log(`${operationId} - Start...`);
  context.log(`${operationId} - Message: ${JSON.stringify(message)}`);

  const redisClient = RedlockBuilder.buildRedisClient();
  const redlock = RedlockBuilder.buildRedlock(redisClient);

  let lock = await redlock.acquire(['serviceBusMessage'], 30000);
  try {
    context.log(`${operationId} - Start locking...`);
    await TimeUtils.waitAsync(10);
    context.log(`${operationId} - Finish locking...`);
  } finally {
    // Release the lock.
    await lock.release();
  }

  context.log(`${operationId} - Finish...`);
}

app.serviceBusQueue('service-bus-queue-trigger', {
  connection: 'SERVICE_BUS_QUEUE_CONNECTION_STRING',
  queueName: 'function-app-concurrency-experiment-sbq',
  handler: serviceBusQueueTrigger,
});
