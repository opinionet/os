import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class BootstrapOrganizationDto {
  @IsString()
  @Length(2, 120)
  organizationName!: string;

  @IsString()
  @Matches(/^[a-z0-9-]+\.[a-z0-9.-]+$/)
  organizationDomain!: string;

  @IsString()
  @Length(2, 120)
  region!: string;

  @IsEmail()
  adminEmail!: string;

  @IsString()
  @Length(8, 255)
  adminPasswordHash!: string;

  @IsString()
  @Length(1, 80)
  adminFirstName!: string;

  @IsString()
  @Length(1, 80)
  adminLastName!: string;
}
