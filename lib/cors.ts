import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  origin: 'http://localhost:8501', // Allow requests from your Windows service
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to send cookies or authentication
});

// Helper function to run middleware
export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
