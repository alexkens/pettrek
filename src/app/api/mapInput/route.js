import Cors from 'micro-cors';

// Initialize CORS middleware
const cors = Cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Allow specific HTTP methods
});

export default async function handler(req, res) {
    // Run the cors middleware
    await cors(req, res);

    // Handle the GET request to /api/sendmessage
    if (req.method === "GET") {
        res.status(200).json({ message: "Hello from the API route!" });
    } else {
        // If the request method is not GET, return a 405 Method Not Allowed status
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}