// import jwt from "jsonwebtoken";
// import config from "../config/index.js";
import axios from "axios";


export async function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  // Option A: Local JWT verification (fastest)
  // try {
  //   const decoded = jwt.verify(token, config.jwtSecret);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(403).json({ error: "Invalid or expired token" });
  // }

      // Option B: Call Auth Service to verify
   try {
    const response = await axios.post(process.env.AUTH_SERVICE_URL, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.valid) {
      req.user = response.data.user;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

// The SECRET_KEY is known only to your services (auth + posts).
// Nobody else can generate a valid signature without it.
// That’s why any service with the same SECRET_KEY can trust the JWT without calling the auth service.
// just by giving the same secret key to both auth_micro and post_micro, you don’t need anything else for local verification.
