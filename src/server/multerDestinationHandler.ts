import { promises, existsSync } from 'fs';

const basePath = './static';

export const multerDestinationHandler = async (req, file, cb) => {
  const uploadPath = `${basePath}/${req.params.id}`;
  const dirExists = existsSync(uploadPath);

  if (!dirExists) {
    await promises.mkdir(uploadPath);
  }

  cb(null, `./static/${req.params.id}/`);
};
