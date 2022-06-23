import {ProjectDetailsRepository} from '../../repositories/implements/projects-details-repository';
import { app } from "../../server";
import request from "supertest";

const projectDetailRepository = new ProjectDetailsRepository()

describe("Controller - Project Details", () => {

  afterAll(async()=>{
    await projectDetailRepository.cleandb()
  })

  describe("Create - Project Details", () => {
    it("deveria criar o detalhe de um projeto", async () => {
      const response = await request(app.app)
        .post("/v1/projects/details")
        .send({
          project_id: "test_id",
          project_slug: "test_slug",
        })
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });

    it("deveria falhar na ausência de algum parametro", async () => {
      const test1 = await request(app.app)
        .post("/v1/projects/details")
        .send({
          project_id: "",
          project_slug: "test_slug",
        })
      expect(test1.status).toBe(400);
      expect(test1.body).toHaveProperty("error.name","MissingParams");

      const test2 = await request(app.app)
      .post("/v1/projects/details")
      .send({
        project_id: "test_id",
        project_slug: "",
      })
    expect(test2.status).toBe(400);
    expect(test2.body).toHaveProperty("error.name","MissingParams");

    });
  });
});
