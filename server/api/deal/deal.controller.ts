import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const camelCase = (snakeCaseString: string): string => {
  return snakeCaseString
    .split('_')
    .reduce(
      (prev, current) =>
        prev + current[0].toUpperCase() + current.slice(1, current.length),
    );
};

export const objectToCamel = (obj: Record<string, any>): object => {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    newObj[camelCase(key)] = obj[key];
  });
  return newObj;
};

@Controller('deal')
export class DealController {
  @Get('/')
  async getDeal() {
    const { data: dealData } = await supabase.from('deal').select('*');

    const response = await Promise.all(
      dealData.map(async (deal) => {
        const filePath = await supabase.storage
          .from('images')
          .getPublicUrl(deal['file_path']).data.publicUrl;

        return {
          ...objectToCamel(deal),
          filePath,
        };
      }),
    );

    return response;
  }
}
