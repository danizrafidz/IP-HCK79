const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, Team } = require('../models')
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require('dotenv').config();

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// "//" = NOT YET
// "//*" = DONE
class UserController {
  static async register(req, res, next) { //* 1. POST /register
    try {
      // Request (body)
      const { fullName, email, password, avatarUrl, TeamId } = req.body

      // Response (400 - Bad Request)
      let user = await User.create({ fullName, email, password, avatarUrl, TeamId })

      // Response (201 - Created)
      res.status(201).json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        TeamId: user.TeamId,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) { //* 2. POST /login
    try {
      // Request (body)
      const { email, password } = req.body

      // Response (400 - Bad Request)
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" }
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" }
      }

      // Response (401 - Unauthorized)
      let user = await User.findOne({ where: { email } })
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" }
      }
      let isValidatePassword = comparePassword(password, user.password)
      if (!isValidatePassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" }
      }

      let access_token = signToken({ id: user.id })

      // Response (200 - OK)
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }

  static async loginGoogle(req, res, next) { //* 3. POST /login/google
    try {
      // hooks option
      const { googleToken } = req.body;
      console.log(googleToken, "<<< INI");


      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });


      const payload = ticket.getPayload();
      console.log(payload, "<<< INI");

      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await User.create(
          {
            fullName: payload.name,
            email: payload.email,
            password: "google_id",
            avatarUrl: payload.picture,
            TeamId: 3 //default team is general
          },
          {
            hooks: false,
          }
        );
      } else {
        if (user.password !== "google_id") {
          throw { name: "Conflict", message: "You already registered with our app" };
        }
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err)
    }
  };

  static async getUser(req, res, next) { //* 3. GET /user
    try {
      const userId = +req.user.id

      // Response (400 - Bad Request)
      let user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: {
          model: Team,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
      })

      // Response (200 - OK)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }

  static async updateUserAvatar(req, res, next) { //* 4. PATCH /user/cover-avatar
    try {
      const userId = +req.user.id
      const avatarUrl = req.file

      // Response (400 - Bad Request)
      if (!avatarUrl) {
        throw { name: 'BadRequest', message: 'Image is required' }
      }

      const mimeType = avatarUrl.mimetype
      const base64Image = avatarUrl.buffer.toString("base64")

      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          folder: 'hackthegrid_img',
          public_id: avatarUrl.originalname,
        }
      )

      await User.update(
        { avatarUrl: result.secure_url },
        { where: { id: userId } }
      )

      // Response (200 - OK)
      res.status(200).json({ message: "User avatar successfully updated" })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController