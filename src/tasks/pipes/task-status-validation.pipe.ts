import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
   readonly allowedStatuse = [
       TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE
   ];
   
   transform(value : any) {
        value = value.toUpperCase();
          if(!this.isStatusValid(value)){
              throw new BadRequestException(`${value} is an Invalid Status!`);
          } 
        return value;
    }

    private isStatusValid(status :any): boolean{
        return this.allowedStatuse.includes(status);
    }
}