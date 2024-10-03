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

import { objectToCamel } from 'api/helpers/object-case';

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
