import { Controller } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RolesService } from './roles.service';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: RoleEntity,
  },
})
@Controller('roles')
// @Roles(Role.Admin)
export class RolesController implements CrudController<RoleEntity> {
  constructor(public service: RolesService) {}
}
