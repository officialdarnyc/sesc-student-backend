// import { createClient as createRedisClient, RedisClientType } from 'redis';
// import { createBullBoard } from '@bull-board/api';
// import BullQueue, { Job, JobOptions, Queue } from 'bull';
// import { ExpressAdapter } from '@bull-board/express';
// import { BullAdapter } from '@bull-board/api/bullAdapter';
// import { logger } from './logger';
// import { InternalServerError } from '../errors';
// import config from '../config';

// export enum Queues {
//   Github = 'Github'
// }

// export const queueDashboardUrlPath = '/admin/queues';

// const { password, host, port } = config.get('redis');

// const connectionOptions = {
//   host,
//   port: +port,
//   ...(password && { password }),
//   maxRetriesPerRequest: null,
//   enableReadyCheck: false
// };
// let client: RedisClientType;
// let subscriber: RedisClientType;

// const queueOptions: BullQueue.QueueOptions = {
//   createClient: (type: string): any => {
//     switch (type) {
//       case 'client':
//         logger.info('[CLIENT]');
//         if (!client) {
//           client = createRedisClient(connectionOptions);
//         }
//         return client;
//       case 'subscriber':
//         logger.info('[SUBSCRIBER]');
//         if (!subscriber) {
//           subscriber = createRedisClient(connectionOptions);
//         }
//         return subscriber;
//       case 'bclient':
//         logger.info('[BCLIENT]');
//         return createRedisClient(connectionOptions);
//       default:
//         throw new InternalServerError(`Unexpected connection type: ${type}`);
//     }
//   }
// };

// export const getQueue = (queue: Queues): Queue => {
//   return new BullQueue(queue, queueOptions);
// };

// export const createDashboard = (): any => {
//   const serverAdapter = new ExpressAdapter();
//   const queues = Object.values(Queues).map((queue) => {
//     const queueInstance = new BullQueue(queue, queueOptions);
//     return new BullAdapter(queueInstance);
//   });

//   createBullBoard({
//     queues,
//     serverAdapter
//   });

//   serverAdapter.setBasePath(queueDashboardUrlPath);

//   return serverAdapter.getRouter();
// };

// export const addJob = <T>({
//   queue,
//   name,
//   message,
//   options
// }: {
//   queue: Queues;
//   name?: string;
//   message: T;
//   options?: JobOptions;
// }): Promise<Job<any>> => {
//   const queueInstance = getQueue(queue);
//   if (name) {
//     return queueInstance.add(name, message, { ...options });
//   }

//   return queueInstance.add(message, options);
// };
