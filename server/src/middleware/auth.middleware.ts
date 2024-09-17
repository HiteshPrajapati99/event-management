import { TryCatch } from '../utils/TryCatch';

export const authMiddleware = TryCatch(async (req, res, next) => {
    const userId   = req.headers["userid"] as string 
  
    if (!userId) {
      return res.status(401).json({ s: 0, m: "userId missing." });
    }
  
    req.user = parseInt(userId)
    next();
  });
