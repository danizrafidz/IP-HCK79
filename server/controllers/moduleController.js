const { User, Module, Team } = require('../models')
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// "//" = NOT YET
// "//*" = DONE
class ModuleController {
  static async getModules(req, res, next) { //* 5. GET /modules
    try {
      // Get all modules include team from database
      // ! Request (headers) - handled in authentication

      let modules = await Module.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Team,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      })
      // Response (200 - OK)
      res.status(200).json(modules)
    } catch (err) {
      next(err)
    }
  }

  static async getRecommendedModulesAi(req, res, next) { //* ?. GET /modules/recommended
    try {
      // const userId = +req.user.id

      // // Response (400 - Bad Request)
      // let user = await User.findByPk(userId, {
      //   attributes: ['TeamId'],
      //   include: {
      //     model: Team,
      //     attributes: ['name', 'task'],
      //   }
      // })
      // let team = user.Team

      const schema = {
        description: "List of modules",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            id: {
              type: SchemaType.NUMBER,
              description: "ID of the module",
              nullable: false,
            },
            title: {
              type: SchemaType.STRING,
              description: "Title of the module",
              nullable: false,
            },
          },
          required: ["id", "title"],
        },
      };

      let modules = await Module.findAll({
        attributes: {exclude: ["createdAt", "updatedAt"]},
      })

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });



      (async () => {
        const prompt = `
  You are a ${team.name} team enthusiast who loves ${team.task} cybersecurity.
  Give me top 3 modules recommendation based on following data:
      ${JSON.stringify(modules.map((module) => ({
          id: module.id,
          title: module.title,
        })), null, 2)}
  `;

        // console.log(prompt, "<<< prompt");

        const result = await model.generateContent(prompt);
        const rawRecModules = JSON.parse(result.response.text());

        console.log(rawRecModules, "<<< modules");

        const recModules = modules.filter((module) => rawRecModules.some((rec) => rec.id === module.id));
        console.log(recModules, "<<< recModules");

        res.status(200).json(recModules)
      })();
    } catch (err) {
      next(err)
    }
  }

  static async getModuleById(req, res, next) { //* 6. GET /modules/:id
    try {
      // Get one module by Id from database
      // ! Request (headers) - handled in authentication
      // Request (params)
      const moduleId = +req.params.id

      let module = await Module.findByPk(moduleId, {
        include: {
          model: Team,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      })
      if (!module) {
        throw { name: 'NotFound', message: 'Module not found' }
      }
      // Response (404 - Not Found)
      // Response (200 - OK)
      res.status(200).json(module)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ModuleController
