import { IsObject, IsString, Length } from 'class-validator';

export class CreateSimulationRunDto {
  @IsString()
  snapshotId!: string;

  @IsString()
  @Length(2, 120)
  scenarioName!: string;

  @IsObject()
  parameters!: Record<string, unknown>;

  @IsObject()
  results!: Record<string, unknown>;
}
