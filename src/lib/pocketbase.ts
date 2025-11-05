import PocketBase from "pocketbase"

// Initialize PocketBase client
// You can set POCKETBASE_URL in your environment variables
const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090")

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false)

export default pb
