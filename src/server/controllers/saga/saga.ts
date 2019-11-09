import { Request, Response } from 'express';
import { sagaSamples } from '../../responseSchema';

export function getAll(req: Request, res: Response) {
  const maxLength = (req.query.maxLength as string) || sagaSamples.length;

  return res.json({ body: sagaSamples.slice(0, Number(maxLength)) });
}

export function post(req: Request, res: Response) {
  const { id } = req.params;
  const item = sagaSamples.find(({ id: fileId }) => Number(id) === fileId);

  if (item) {
    ++item.likeCount;

    return res.json({ body: item });
  } else {
    return res.status(404);
  }
}
