import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { getDiscord } from "@/lib/api/public/getDiscord";

export default async function discord(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case HttpMethod.GET:
            return await getDiscord(req, res);

        default:
            res.setHeader("Allow", [HttpMethod.GET]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
