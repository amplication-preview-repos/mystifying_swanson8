/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { Scan } from "./Scan";
import { ScanCountArgs } from "./ScanCountArgs";
import { ScanFindManyArgs } from "./ScanFindManyArgs";
import { ScanFindUniqueArgs } from "./ScanFindUniqueArgs";
import { DeleteScanArgs } from "./DeleteScanArgs";
import { ScanService } from "../scan.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Scan)
export class ScanResolverBase {
  constructor(
    protected readonly service: ScanService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Scan",
    action: "read",
    possession: "any",
  })
  async _scansMeta(
    @graphql.Args() args: ScanCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Scan])
  @nestAccessControl.UseRoles({
    resource: "Scan",
    action: "read",
    possession: "any",
  })
  async scans(@graphql.Args() args: ScanFindManyArgs): Promise<Scan[]> {
    return this.service.scans(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Scan, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Scan",
    action: "read",
    possession: "own",
  })
  async scan(@graphql.Args() args: ScanFindUniqueArgs): Promise<Scan | null> {
    const result = await this.service.scan(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Scan)
  @nestAccessControl.UseRoles({
    resource: "Scan",
    action: "delete",
    possession: "any",
  })
  async deleteScan(@graphql.Args() args: DeleteScanArgs): Promise<Scan | null> {
    try {
      return await this.service.deleteScan(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}