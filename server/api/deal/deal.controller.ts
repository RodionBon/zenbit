import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import supabase from 'api/database';

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
