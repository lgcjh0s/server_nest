import { Module } from "@nestjs/common";
import { LighthouseController } from "./lighthouse.controller";

@Module({
    controllers:[LighthouseController]
})
export class LighthouseModule {}