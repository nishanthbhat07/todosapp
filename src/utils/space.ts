/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import Axios from "axios";
import { BASEURL } from "../apis";

export class Space {
  constructor(private readonly fetchHost: string) {}

  public async exists(spaceID: string): Promise<boolean> {
    const spaceExistRes = await this.fetchJSON("spaceExists", spaceID);
    if (
      spaceExistRes &&
      typeof spaceExistRes === "object" &&
      typeof spaceExistRes.spaceExists === "boolean"
    ) {
      return spaceExistRes.spaceExists;
    }
    throw new Error("Bad response from spaceExists");
  }

  public async create(spaceID?: string): Promise<string> {
    const createSpaceRes = await this.fetchJSON("createSpace", spaceID);
    if (
      createSpaceRes &&
      typeof createSpaceRes === "object" &&
      typeof createSpaceRes.spaceID === "string"
    ) {
      return createSpaceRes.spaceID;
    }
    throw new Error("Bad response from createSpace");
  }

  private async fetchJSON(apiName: string, spaceID: string | undefined) {
    try {
      const res = await Axios.post(
        `/api/replicache/${apiName}`,
        spaceID &&
          JSON.stringify({
            spaceID,
          }),
        {
          baseURL: `${this.fetchHost}`,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    } catch (e) {
      console.error(e);
    }
    return "";
  }
}

export const space = new Space(BASEURL);
