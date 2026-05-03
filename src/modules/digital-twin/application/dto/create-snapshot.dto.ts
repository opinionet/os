import { IsObject, IsString, Length } from 'class-validator';

export class CreateSnapshotDto {
  @IsString()
  @Length(1, 64)
  version!: string;

  @IsObject()
  stateData!: Record<string, unknown>;
}
