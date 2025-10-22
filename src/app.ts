import express from "express";
import config from "./config";
import { connectDB } from "./database";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import taskRoutes from "./routes/task.router"; // 1. IMPORTE AS NOVAS ROTAS
import logger from "./utils/logger";

const app = express();
app.use(express.json());

// Suas rotas
app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes); // 2. ADICIONE A NOVA ROTA AQUI

app.use(errorMiddleware);

try {
  logger.info("🔍 Tentando conectar ao MongoDB...");
  connectDB({
    serverSelectionTimeoutMS: 30000, // espera até 30s para o cluster responder
    socketTimeoutMS: 45000, // previne desconexões rápidas
  });
  logger.info("✅ Conexão com MongoDB estabelecida!");

  app.listen(config.port, () =>
    logger.info(`🚀 Servidor rodando na porta ${config.port}`)
  );
} catch (error: any) {
  logger.error("❌ Falha ao conectar ao MongoDB:", error.message || error);
  process.exit(1); // encerra o app se não conectar
}
