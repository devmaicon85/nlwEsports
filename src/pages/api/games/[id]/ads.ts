import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { games } from "@/lib/api/public/games";
import { gameAds } from "@/lib/api/public/gameAds";
import { addAds } from "@/lib/api/private/addAds";

export default async function gameAdsApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case HttpMethod.GET:
            return await gameAds(req, res);

        case HttpMethod.POST:
            return await addAds(req,res);

        default:
            res.setHeader("Allow", [HttpMethod.GET]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
