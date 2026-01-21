import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "utils/enum";

export class UpdateRoleDto {
    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(Role, { message: 'Invalid role' })
    role: Role;
}