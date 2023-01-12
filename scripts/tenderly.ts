import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export const anAxiosOnTenderly = () =>
  axios.create({
      baseURL: "https://api.tenderly.co/api/v1",
      headers: {
          "X-Access-Key": process.env.TENDERLY_ACCESS_KEY || "",
          "Content-Type": "application/json",
      },
  });

async function main() {
    const { TENDERLY_USER, TENDERLY_PROJECT } = process.env
    const tAxios = anAxiosOnTenderly();
    const projectBase = `account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}`;
    const resp = await tAxios.get(`${projectBase}/simulations`);

    console.log(resp.data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});