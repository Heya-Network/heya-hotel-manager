import { Controller, Get, Param } from '@nestjs/common';

@Controller('hotels')
export class HotelsController {

    @Get("/statuses/:ss58")
    getStatusRoute(@Param("ss58") ss58: string): string {
        return ss58;
    }
}
