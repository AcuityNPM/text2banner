import type { Core } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import { createCanvas } from 'canvas';
import * as fs from 'fs';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async generateBanner(ctx) {
    try {
      const post = ctx.request.body;
      const canvas = createCanvas(post.bannerWidth, post.bannerHeight);
      const context = canvas.getContext('2d');
      let numNext = post.title.split('\n').length;
          numNext = (numNext > 0) ? numNext - 1 : 0;

      context.fillStyle = post.backgroundColor;
      context.fillRect(0, 0, post.bannerWidth, post.bannerHeight);

      context.fillStyle = post.fontColor;
      context.font = post.fontSize + 'px Menlo';
      context.textAlign = 'center';
      context.fillText(post.title, (post.bannerWidth - (numNext * post.fontSize)) / 2, (post.bannerHeight - (numNext * post.fontSize)) / 2);


      const rootDir = process.cwd();
      const genFileName = post.bannerName + '.jpg';
      const genFilePath = `${rootDir}/public/uploads/${genFileName}`
      const file = await fs.writeFile(
        genFilePath,
        canvas.toBuffer('image/jpeg'),
        (err: any) => {
          if (err) {
            throw new errors.ApplicationError(err);
            return;
          }
          return 'File Saved!';
        }
      );

      //uploading it directly to upload services.
      const uploadResponse = await strapi.plugins.upload.services.upload.upload({
        data:{},
        files: {
          filepath: genFilePath,
          originalFilename: genFileName,
          mimetype: 'image/jpeg',
        }, 
      });

      // Remove the source file
      const remove = await fs.unlink(genFilePath, (err: any) => {
        if (err) {
          throw new errors.ApplicationError(err);
          return;
        }
        return 'Successfully removed!';
      });

      ctx.body = "ok";
    } catch (error) {
      console.log(error);
    }
  },
  
  index(ctx) {
    ctx.body = strapi
      .plugin('text2banner')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
});

export default controller;