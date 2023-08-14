export interface DatabaseConfig {
  host: string;
  name: string;
  port: number;
  uri: string;
}

export const databaseConfig = () => ({
  database: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    uri: process.env.DATABASE_URI,
  },
});
