import fp from 'fastify-plugin';
import throttle from '@fastify/throttle';

export default fp(async (fastify) => {
  // fastify.register(throttle, {
  //   bytesPerSecond: 1024, // 1MB/s
  //   streamPayloads: true, // throttle the payload if it is a stream
  //   bufferPayloads: true, // throttle the payload if it is a Buffer
  //   stringPayloads: true, // throttle the payload if it is a string
  // });
});
