import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { games } from '@/lib/api/public/games';

export default async function gamesApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case HttpMethod.GET:
            return await games(req, res);

        default:
            res.setHeader("Allow", [HttpMethod.GET]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
