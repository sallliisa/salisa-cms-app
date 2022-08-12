import dotenv from "dotenv";

dotenv.config();

const HOST_ADDRESS = process.env.HOST_ADDRESS || "";
const HOST_PORT = process.env.HOST_PORT || "";

export const config = {
  server: {
    address: HOST_ADDRESS,
    port: HOST_PORT,
  },
};
