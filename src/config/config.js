import dotenv from "dotenv";

dotenv.config();

const HOST_ADDRESS = process.env.HOST_ADDRESS || "";
const HOST_PORT = process.env.HOST_PORT || "";
const API_ADDRESS = process.env.API_ADDRESS || "";
const API_PORT = process.env.API_PORT || "";

export const config = {
  server: {
    address: HOST_ADDRESS,
    port: HOST_PORT,
  },
  api: {
    address: API_ADDRESS,
    port: API_PORT,
  },
};
