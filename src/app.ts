import express from "express";
import cors from 'cors';
import config from "./config";
import { connectDB } from "./database";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.router";
import taskRoutes from "./routes/task.router"; 
import logger from "./utils/logger";
// import serverless from "serverless-http"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes); 

app.use(errorMiddleware);

// export const handler = serverless(app);

// --- CORREÇÃO DA LÓGICA ASSÍNCRONA ---

// 1. Criamos uma função async 'startServer' para "embrulhar" o arranque
// const startServer = async () => {
//   try {
//     logger.info("🔍 Tentando conectar ao MongoDB...");
    
//     // 2. Usamos 'await' para garantir que a conexão termine
//     await connectDB({
//       serverSelectionTimeoutMS: 30000, 
//       socketTimeoutMS: 45000, 
//     });
    
//     // 3. Este log agora SÓ roda DEPOIS do 'await' ser bem-sucedido
//     logger.info("✅ Conexão com MongoDB estabelecida!");

//     // 4. O servidor SÓ começa a ouvir DEPOIS que o banco está pronto
//     app.listen(config.port, () =>
//       logger.info(`🚀 Servidor rodando na porta ${config.port}`)
//     );
//   } catch (error: any) {
//     // 5. O 'catch' agora apanha erros tanto do connectDB() como do app.listen()
//     logger.error("❌ Falha ao iniciar o servidor:", error.message || error);
//     process.exit(1); 
//   }
// };

// 6. Chamamos a função para arrancar tudo
// startServer();
export default app;