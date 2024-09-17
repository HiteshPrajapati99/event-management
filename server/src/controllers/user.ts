import { db } from "../services/prisma";
import { TryCatch } from "../utils/TryCatch";
import { userSchema } from "../validations/user";
import bcrypt from "bcrypt";



export const login = TryCatch(async (req, res) => {
    const validate = userSchema.safeParse(req.body);
  
    if (validate.error) {
      const errors = validate.error.flatten().fieldErrors;
      const errorMessages = Object.values(errors).flat().join(" AND ");
  
      return res.json({ s: 0, m: errorMessages });
    }
    const { email, password } = req.body;
  
    const user = await db.user.findFirst({
        where : {email}
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ s: 0, m: "Invalid credentials" });
    }
  
    
  
    res.json({ s: 1, m: "Login success.", r: user });
  });
  
  export const register = TryCatch(async (req, res) => {
  
    const validate = userSchema.safeParse(req.body);
  
    if (validate.error) {
      const errors = validate.error.flatten().fieldErrors;
      const errorMessages = Object.values(errors).flat().join(" AND ");
  
      return res.json({ s: 0, m: errorMessages });
    }
    const { email, password } = req.body;
  
    const existingUser = await db.user.findFirst({
      where: { email },
    });
  
    if (existingUser) {
      return res.json({ s: 0, m: "User with this email already exists!" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await db.user.create( {
        data : {email ,password : hashedPassword}
    });
  
    res.json({ s: 1, m: "Registration successful. Please try to login." });
  });