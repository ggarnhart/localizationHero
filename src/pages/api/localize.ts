// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import axios from "axios";

const redis = new Redis({
  url: "https://us1-classic-scorpion-39454.upstash.io",
  token: process.env.REDIS!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let count = await redis.incr("localizationCount");
  console.log(count);

  let { prompt } = req.body;

  if (count > 500) {
    res.status(500).json({ error: "Too many requests" });
  } else if (prompt.length > 100) {
    res.status(500).json({ error: "Prompt is too long" });
  } else {
    let { data } = await axios.post(
      "https://n5060mjo26.execute-api.us-east-1.amazonaws.com/default/lambdaLocale",
      {
        key: process.env.KEY,
        prompt: prompt,
      }
    );
    res.status(200).json(data);
  }
}
