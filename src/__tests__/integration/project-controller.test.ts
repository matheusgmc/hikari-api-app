import { app } from "../../server";
import request from "supertest";

jest.setTimeout(10000);

describe("Controller - Project", () => {
  describe("getProjects", () => {
    it("Deve obter todos os projetos", async () => {
      const response = await request(app.app).get("/projects/");
      expect(response.status).toBe(200);
      expect(response.body.releases).toHaveLength(10);
    });

    it("Deve obter todos os projetos da pagina - 2", async () => {
      const response = await request(app.app)
        .get("/projects/")
        .query({ page: 2 });
      expect(response.status).toBe(200);
      expect(response.body.releases).toHaveLength(10);
    });

    it("Deve falhar por informa um valor de page inválido", async () => {
      const response = await request(app.app)
        .get("/projects/")
        .query({ page: "A" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("InvalidParams");
    });
  });

  describe("getChapters", () => {
    it("Deve obter todos os capitulos", async () => {
      const response = await request(app.app).get("/projects/chapters").query({
        slug: "kimi-ga-shinu-made-ato-100nichi",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
    });

    it("Deve falhar na ausência do slug", async () => {
      const response = await request(app.app).get("/projects/chapters").query({
        slug: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("MissingParams");
    });

    it("Deve falhar na ausência do slug", async () => {
      const response = await request(app.app).get("/projects/chapters").query({
        slug: "pao-de-arroz",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Não foi encontrado nenhum resultado para esse slug"
      );
    });
  });

  describe("getFavorites", () => {
    it("Deve obter todos os capitulos favoritos", async () => {
      const response = await request(app.app).get("/projects/favorites").query({
        id: "10054",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Deve falhar na ausência de um id inválido", async () => {
      const response = await request(app.app).get("/projects/favorites").query({
        id: "",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("MissingParams");
    });
  });
});