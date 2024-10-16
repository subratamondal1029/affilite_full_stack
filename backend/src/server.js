import express from "express";
import cookieParser from "cookie-parser";
import fs from "fs/promises";
import { encryptPassword, decryptPassword } from "./bcrypt.js";
import { generateJwtToken, decodeToken } from "./jwt.js";

const port = 8080;
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const users = await JSON.parse(
      await fs.readFile("src/db/users.json", "utf-8")
    );

    // Checking for conflict
    const isUserNameAvailabe = users.some((user) => user.username === username);
    const isEmailAvailabe = users.some((user) => user.email === email);
    if (isUserNameAvailabe) {
      res.status(409).json({
        success: false,
        message: "username already exists",
      });
    } else if (isEmailAvailabe) {
      res.status(409).json({
        success: false,
        message: "email already exists",
      });
    } else {
      // create user
      const newUser = {
        id: crypto.randomUUID(),
        name,
        username,
        email,
        role: "user",
        password: await encryptPassword(password),
      };
      users.push(newUser);

      await fs.writeFile("src/db/users.json", JSON.stringify(users));
      const { password: p, ...data } = newUser;
      res.json({
        success: true,
        message: "Registation Successfull!",
        data,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { refferCode } = req.cookies;
    const { username, email, password } = req.body;

    let users = await JSON.parse(
      await fs.readFile("src/db/users.json", "utf-8")
    );

    if (refferCode) {
      users = users.map((user) =>
        user.username === username ? { ...user, refferCode } : user
      );
      await fs.writeFile("src/db/users.json", JSON.stringify(users));
    }

    const userData = users.find(
      (user) => user.username === username || user.email === email
    );
    if (userData) {
      const { password: hasPass, ...userInfo } = userData;
      const isCorrectPass = await decryptPassword(password, hasPass);
      if (isCorrectPass) {
        const token = generateJwtToken(userData);
        res
          .clearCookie("refferCode", { path: "/" })
          .cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
          })
          .json({
            success: true,
            message: "Login Successfully!",
            data: userInfo,
          });
      } else
        res.status(400).json({ success: false, message: "Wrong Password!" });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.get("/api/refferRedirect", async (req, res) => {
  try {
    const { token } = req.cookies;
    const { refferCode } = req.query;
    let users = await JSON.parse(
      await fs.readFile("src/db/users.json", "utf-8")
    );
    if (token) {
      const { username } = decodeToken(token);
      users = users.map((user) =>
        user.username === username ? { ...user, refferCode } : user
      );
      await fs.writeFile("src/db/users.json", JSON.stringify(users));
      res.json({
        success: true,
        isLogedin: true,
        message: "Redirect to the product page",
      });
    } else {
      res
        .cookie("refferCode", refferCode, {
          path: "/",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          isLogedin: false,
          message: "Redirect to Login Page",
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.get("/api/currentUser", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const users = await JSON.parse(
        await fs.readFile("src/db/users.json", "utf-8")
      );
      const { username } = decodeToken(token);
      const { password, ...userInfo } = users.find(
        (user) => user.username === username
      );
      res.json({
        success: true,
        isLogedin: true,
        data: userInfo,
      });
    } else {
      res.status(401).json({
        success: false,
        isLogedin: false,
        data: null,
        message: "User is Not Loged In",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.post("/api/buyProduct", async (req, res) => {
  try {
    const { productId, userId, refferCode } = req.body;
    let users = await JSON.parse(
      await fs.readFile("src/db/users.json", "utf-8")
    );
    const products = await JSON.parse(
      await fs.readFile("src/db/products.json", "utf-8")
    );

    const product = products.find((product) => product.id == productId);

    if (!refferCode) {
      const userRefferCode = users.find(
        (user) => user.id === userId
      )?.refferCode;
      if (userRefferCode) refferCode = userRefferCode;
    }

    if (product) {
      res.json({
        success: true,
        productDetail: {
          id: productId,
          name: product.name,
          price: product.price,
        },
      });

      if (refferCode) {
        users = users.map((user) => {
          if (user.refferId === refferCode) {
            const income = (product.price * 10) / 100;
            const totalIncome = income + Number(user.totalIncome);
            const refferUser = user.refferDetails.find((us) => {
              if (us.userId == userId) {
                us.income = Number(us.income)+income
                return true
              }else false
            });
            if (!refferUser) {
              user.refferDetails.push({ userId, income });
            }
            return { ...user, totalIncome };
          } else return user;
        });

        await fs.writeFile("src/db/users.json", JSON.stringify(users));
      }
    } else {
      res.status(404).json({ success: false, message: "Product Not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const { productId } = req.query;
    const products = await JSON.parse(
      await fs.readFile("src/db/products.json", "utf-8")
    );
    const product = products.find((product) => product.id == productId);

    if (product) {
      res.json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.get("/api/allProducts", async (req, res) => {
  try {
    const products = await JSON.parse(
      await fs.readFile("src/db/products.json", "utf-8")
    );
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error: Something went wrong on the server side.",
    });
  }
});

app.listen(port, () => {
  console.log("Server Started at port ", port);
});
