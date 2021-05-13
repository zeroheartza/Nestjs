import { BadRequestException, Body, Controller, Delete, Get, Param, Post, ValidationPipe, Put, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ValidationError } from "class-validator";
import { UserDto } from "../dto/user.dto";
import { LeaveDto } from "../dto/leave.dto";
import { StaffService } from "../service/staff.service";
import { AdminService } from "../service/admin.service";
import { SuperService } from "../service/Supervisor.service";
import { Response, Request, response } from 'express';


@ApiTags('Administrator')
@Controller('api')
export class adminController {
   constructor(
     
      private readonly adminService: AdminService,
   
   ) { }


   @Post('adminLeave')
   @ApiOkResponse()
   async addleave(
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) leaveDto: LeaveDto, @Res() res: Response
   ) {

      return this.adminService.leaveAdmin(leaveDto,res);
   }

   @Post('addUser')
   @ApiOkResponse()
   async create(
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) userDto: UserDto
   ) {

      return this.adminService.addUser(userDto);
   }



   @Get('read')
   @ApiOkResponse()
   read() {
      return this.adminService.readUser();
   }

   @Get('readLeave')
   @ApiOkResponse()
   readLeave() {
      return this.adminService.readLeaveUser();
   }

   @Delete('delete/:userId')
   @ApiOkResponse()
   delete(
      @Param('userId') userId: string, @Res() res: Response
   ) {
      return this.adminService.deleteUser(userId, res);

   }

  

   @Put('editUser/:userId')
   @ApiOkResponse()
   edit(
      @Param('userId') userId: string,
      @Body(new ValidationPipe({
         exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
      })) userDto: UserDto, @Res() res: Response
   ) {
      return this.adminService.editUsers(userId, userDto, res);
   }

 
}