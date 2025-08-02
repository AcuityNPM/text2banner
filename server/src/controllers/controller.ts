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

      // Background color of banner
      context.fillStyle = post.backgroundColor;
      context.fillRect(0, 0, post.bannerWidth, post.bannerHeight);

      // Fill the text to banner
      if (!post.title) {
        let textArr = post.title.split('\n');
        let numNext = textArr.length;
            numNext = (numNext > 0) ? numNext - 1 : 0;
        // For Text line-height
        let textHig = post.fontSize * 1.2;
        context.fillStyle = post.fontColor;
        context.font = post.fontSize + 'px Menlo';
        context.textAlign = 'center';
        for (let i = 0; i <= numNext; i++) {
          if (i == 0) {
            context.fillText(textArr[i], post.bannerWidth / 2, (post.bannerHeight - (numNext * textHig)) / 2);
          } else {
            context.fillText(textArr[i], post.bannerWidth / 2, (post.bannerHeight - ((numNext - (i * 2)) * textHig)) / 2);
          }
        }
      }

      // Create a banner and temp to store in folder
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

      // Uploading it directly to upload services.
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