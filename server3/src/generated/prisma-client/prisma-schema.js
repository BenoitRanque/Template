module.exports = {
        typeDefs: /* GraphQL */ `type AggregateDepartment {
  count: Int!
}

type AggregateEmployee {
  count: Int!
}

type AggregateException {
  count: Int!
}

type AggregateExceptionAuthorization {
  count: Int!
}

type AggregateExceptionSlot {
  count: Int!
}

type AggregateSchedule {
  count: Int!
}

type AggregateScheduleOfflineElement {
  count: Int!
}

type AggregateScheduleRestlineElement {
  count: Int!
}

type AggregateScheduleTimelineElement {
  count: Int!
}

type AggregateShift {
  count: Int!
}

type AggregateShiftSlot {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Department {
  id: UUID!
  name: String!
  subordinates(where: EmployeeWhereInput, orderBy: EmployeeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Employee!]
  supervisors(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type DepartmentConnection {
  pageInfo: PageInfo!
  edges: [DepartmentEdge]!
  aggregate: AggregateDepartment!
}

input DepartmentCreateInput {
  name: String!
  subordinates: EmployeeCreateManyWithoutDepartmentInput
  supervisors: UserCreateManyInput
}

input DepartmentCreateOneWithoutSubordinatesInput {
  create: DepartmentCreateWithoutSubordinatesInput
  connect: DepartmentWhereUniqueInput
}

input DepartmentCreateWithoutSubordinatesInput {
  name: String!
  supervisors: UserCreateManyInput
}

type DepartmentEdge {
  node: Department!
  cursor: String!
}

enum DepartmentOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DepartmentPreviousValues {
  id: UUID!
  name: String!
}

type DepartmentSubscriptionPayload {
  mutation: MutationType!
  node: Department
  updatedFields: [String!]
  previousValues: DepartmentPreviousValues
}

input DepartmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DepartmentWhereInput
  AND: [DepartmentSubscriptionWhereInput!]
  OR: [DepartmentSubscriptionWhereInput!]
  NOT: [DepartmentSubscriptionWhereInput!]
}

input DepartmentUpdateInput {
  name: String
  subordinates: EmployeeUpdateManyWithoutDepartmentInput
  supervisors: UserUpdateManyInput
}

input DepartmentUpdateOneWithoutSubordinatesInput {
  create: DepartmentCreateWithoutSubordinatesInput
  update: DepartmentUpdateWithoutSubordinatesDataInput
  upsert: DepartmentUpsertWithoutSubordinatesInput
  delete: Boolean
  disconnect: Boolean
  connect: DepartmentWhereUniqueInput
}

input DepartmentUpdateWithoutSubordinatesDataInput {
  name: String
  supervisors: UserUpdateManyInput
}

input DepartmentUpsertWithoutSubordinatesInput {
  update: DepartmentUpdateWithoutSubordinatesDataInput!
  create: DepartmentCreateWithoutSubordinatesInput!
}

input DepartmentWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  subordinates_every: EmployeeWhereInput
  subordinates_some: EmployeeWhereInput
  subordinates_none: EmployeeWhereInput
  supervisors_every: UserWhereInput
  supervisors_some: UserWhereInput
  supervisors_none: UserWhereInput
  AND: [DepartmentWhereInput!]
  OR: [DepartmentWhereInput!]
  NOT: [DepartmentWhereInput!]
}

input DepartmentWhereUniqueInput {
  id: UUID
}

enum DocumentTypeEnum {
  CI
  PASSAPORTE
}

type Employee {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int!
  department: Department
  shifts(where: ShiftWhereInput, orderBy: ShiftOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Shift!]
}

type EmployeeConnection {
  pageInfo: PageInfo!
  edges: [EmployeeEdge]!
  aggregate: AggregateEmployee!
}

input EmployeeCreateInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  shifts: ShiftCreateManyWithoutEmployeeInput
}

input EmployeeCreateManyInput {
  create: [EmployeeCreateInput!]
  connect: [EmployeeWhereUniqueInput!]
}

input EmployeeCreateManyWithoutDepartmentInput {
  create: [EmployeeCreateWithoutDepartmentInput!]
  connect: [EmployeeWhereUniqueInput!]
}

input EmployeeCreateOneInput {
  create: EmployeeCreateInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateOneWithoutShiftsInput {
  create: EmployeeCreateWithoutShiftsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateWithoutDepartmentInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int!
  shifts: ShiftCreateManyWithoutEmployeeInput
}

input EmployeeCreateWithoutShiftsInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
}

type EmployeeEdge {
  node: Employee!
  cursor: String!
}

enum EmployeeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  nameFirst_ASC
  nameFirst_DESC
  nameMiddle_ASC
  nameMiddle_DESC
  namePaternal_ASC
  namePaternal_DESC
  nameMaternal_ASC
  nameMaternal_DESC
  documentType_ASC
  documentType_DESC
  documentNumber_ASC
  documentNumber_DESC
  sex_ASC
  sex_DESC
  dateOfBirth_ASC
  dateOfBirth_DESC
  nationality_ASC
  nationality_DESC
  jubilado_ASC
  jubilado_DESC
  personaConDiscapacidad_ASC
  personaConDiscapacidad_DESC
  tutorPersonaConDiscapacidad_ASC
  tutorPersonaConDiscapacidad_DESC
  cajaDeSalud_ASC
  cajaDeSalud_DESC
  aportaAFP_ASC
  aportaAFP_DESC
  AFP_ASC
  AFP_DESC
  cargo_ASC
  cargo_DESC
  zkTimePin_ASC
  zkTimePin_DESC
}

type EmployeePreviousValues {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int!
}

type EmployeeSubscriptionPayload {
  mutation: MutationType!
  node: Employee
  updatedFields: [String!]
  previousValues: EmployeePreviousValues
}

input EmployeeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EmployeeWhereInput
  AND: [EmployeeSubscriptionWhereInput!]
  OR: [EmployeeSubscriptionWhereInput!]
  NOT: [EmployeeSubscriptionWhereInput!]
}

input EmployeeUpdateDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateManyInput {
  create: [EmployeeCreateInput!]
  update: [EmployeeUpdateWithWhereUniqueNestedInput!]
  upsert: [EmployeeUpsertWithWhereUniqueNestedInput!]
  delete: [EmployeeWhereUniqueInput!]
  connect: [EmployeeWhereUniqueInput!]
  disconnect: [EmployeeWhereUniqueInput!]
}

input EmployeeUpdateManyWithoutDepartmentInput {
  create: [EmployeeCreateWithoutDepartmentInput!]
  delete: [EmployeeWhereUniqueInput!]
  connect: [EmployeeWhereUniqueInput!]
  disconnect: [EmployeeWhereUniqueInput!]
  update: [EmployeeUpdateWithWhereUniqueWithoutDepartmentInput!]
  upsert: [EmployeeUpsertWithWhereUniqueWithoutDepartmentInput!]
}

input EmployeeUpdateOneRequiredInput {
  create: EmployeeCreateInput
  update: EmployeeUpdateDataInput
  upsert: EmployeeUpsertNestedInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateOneRequiredWithoutShiftsInput {
  create: EmployeeCreateWithoutShiftsInput
  update: EmployeeUpdateWithoutShiftsDataInput
  upsert: EmployeeUpsertWithoutShiftsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateWithoutDepartmentDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int
  shifts: ShiftUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithoutShiftsDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: DocumentTypeEnum
  documentNumber: String
  sex: SexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Int
  personaConDiscapacidad: Int
  tutorPersonaConDiscapacidad: Int
  cajaDeSalud: Int
  aportaAFP: Int
  AFP: Int
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
}

input EmployeeUpdateWithWhereUniqueNestedInput {
  where: EmployeeWhereUniqueInput!
  data: EmployeeUpdateDataInput!
}

input EmployeeUpdateWithWhereUniqueWithoutDepartmentInput {
  where: EmployeeWhereUniqueInput!
  data: EmployeeUpdateWithoutDepartmentDataInput!
}

input EmployeeUpsertNestedInput {
  update: EmployeeUpdateDataInput!
  create: EmployeeCreateInput!
}

input EmployeeUpsertWithoutShiftsInput {
  update: EmployeeUpdateWithoutShiftsDataInput!
  create: EmployeeCreateWithoutShiftsInput!
}

input EmployeeUpsertWithWhereUniqueNestedInput {
  where: EmployeeWhereUniqueInput!
  update: EmployeeUpdateDataInput!
  create: EmployeeCreateInput!
}

input EmployeeUpsertWithWhereUniqueWithoutDepartmentInput {
  where: EmployeeWhereUniqueInput!
  update: EmployeeUpdateWithoutDepartmentDataInput!
  create: EmployeeCreateWithoutDepartmentInput!
}

input EmployeeWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  nameFirst: String
  nameFirst_not: String
  nameFirst_in: [String!]
  nameFirst_not_in: [String!]
  nameFirst_lt: String
  nameFirst_lte: String
  nameFirst_gt: String
  nameFirst_gte: String
  nameFirst_contains: String
  nameFirst_not_contains: String
  nameFirst_starts_with: String
  nameFirst_not_starts_with: String
  nameFirst_ends_with: String
  nameFirst_not_ends_with: String
  nameMiddle: String
  nameMiddle_not: String
  nameMiddle_in: [String!]
  nameMiddle_not_in: [String!]
  nameMiddle_lt: String
  nameMiddle_lte: String
  nameMiddle_gt: String
  nameMiddle_gte: String
  nameMiddle_contains: String
  nameMiddle_not_contains: String
  nameMiddle_starts_with: String
  nameMiddle_not_starts_with: String
  nameMiddle_ends_with: String
  nameMiddle_not_ends_with: String
  namePaternal: String
  namePaternal_not: String
  namePaternal_in: [String!]
  namePaternal_not_in: [String!]
  namePaternal_lt: String
  namePaternal_lte: String
  namePaternal_gt: String
  namePaternal_gte: String
  namePaternal_contains: String
  namePaternal_not_contains: String
  namePaternal_starts_with: String
  namePaternal_not_starts_with: String
  namePaternal_ends_with: String
  namePaternal_not_ends_with: String
  nameMaternal: String
  nameMaternal_not: String
  nameMaternal_in: [String!]
  nameMaternal_not_in: [String!]
  nameMaternal_lt: String
  nameMaternal_lte: String
  nameMaternal_gt: String
  nameMaternal_gte: String
  nameMaternal_contains: String
  nameMaternal_not_contains: String
  nameMaternal_starts_with: String
  nameMaternal_not_starts_with: String
  nameMaternal_ends_with: String
  nameMaternal_not_ends_with: String
  documentType: DocumentTypeEnum
  documentType_not: DocumentTypeEnum
  documentType_in: [DocumentTypeEnum!]
  documentType_not_in: [DocumentTypeEnum!]
  documentNumber: String
  documentNumber_not: String
  documentNumber_in: [String!]
  documentNumber_not_in: [String!]
  documentNumber_lt: String
  documentNumber_lte: String
  documentNumber_gt: String
  documentNumber_gte: String
  documentNumber_contains: String
  documentNumber_not_contains: String
  documentNumber_starts_with: String
  documentNumber_not_starts_with: String
  documentNumber_ends_with: String
  documentNumber_not_ends_with: String
  sex: SexEnum
  sex_not: SexEnum
  sex_in: [SexEnum!]
  sex_not_in: [SexEnum!]
  dateOfBirth: DateTime
  dateOfBirth_not: DateTime
  dateOfBirth_in: [DateTime!]
  dateOfBirth_not_in: [DateTime!]
  dateOfBirth_lt: DateTime
  dateOfBirth_lte: DateTime
  dateOfBirth_gt: DateTime
  dateOfBirth_gte: DateTime
  nationality: String
  nationality_not: String
  nationality_in: [String!]
  nationality_not_in: [String!]
  nationality_lt: String
  nationality_lte: String
  nationality_gt: String
  nationality_gte: String
  nationality_contains: String
  nationality_not_contains: String
  nationality_starts_with: String
  nationality_not_starts_with: String
  nationality_ends_with: String
  nationality_not_ends_with: String
  jubilado: Int
  jubilado_not: Int
  jubilado_in: [Int!]
  jubilado_not_in: [Int!]
  jubilado_lt: Int
  jubilado_lte: Int
  jubilado_gt: Int
  jubilado_gte: Int
  personaConDiscapacidad: Int
  personaConDiscapacidad_not: Int
  personaConDiscapacidad_in: [Int!]
  personaConDiscapacidad_not_in: [Int!]
  personaConDiscapacidad_lt: Int
  personaConDiscapacidad_lte: Int
  personaConDiscapacidad_gt: Int
  personaConDiscapacidad_gte: Int
  tutorPersonaConDiscapacidad: Int
  tutorPersonaConDiscapacidad_not: Int
  tutorPersonaConDiscapacidad_in: [Int!]
  tutorPersonaConDiscapacidad_not_in: [Int!]
  tutorPersonaConDiscapacidad_lt: Int
  tutorPersonaConDiscapacidad_lte: Int
  tutorPersonaConDiscapacidad_gt: Int
  tutorPersonaConDiscapacidad_gte: Int
  cajaDeSalud: Int
  cajaDeSalud_not: Int
  cajaDeSalud_in: [Int!]
  cajaDeSalud_not_in: [Int!]
  cajaDeSalud_lt: Int
  cajaDeSalud_lte: Int
  cajaDeSalud_gt: Int
  cajaDeSalud_gte: Int
  aportaAFP: Int
  aportaAFP_not: Int
  aportaAFP_in: [Int!]
  aportaAFP_not_in: [Int!]
  aportaAFP_lt: Int
  aportaAFP_lte: Int
  aportaAFP_gt: Int
  aportaAFP_gte: Int
  AFP: Int
  AFP_not: Int
  AFP_in: [Int!]
  AFP_not_in: [Int!]
  AFP_lt: Int
  AFP_lte: Int
  AFP_gt: Int
  AFP_gte: Int
  cargo: String
  cargo_not: String
  cargo_in: [String!]
  cargo_not_in: [String!]
  cargo_lt: String
  cargo_lte: String
  cargo_gt: String
  cargo_gte: String
  cargo_contains: String
  cargo_not_contains: String
  cargo_starts_with: String
  cargo_not_starts_with: String
  cargo_ends_with: String
  cargo_not_ends_with: String
  zkTimePin: Int
  zkTimePin_not: Int
  zkTimePin_in: [Int!]
  zkTimePin_not_in: [Int!]
  zkTimePin_lt: Int
  zkTimePin_lte: Int
  zkTimePin_gt: Int
  zkTimePin_gte: Int
  department: DepartmentWhereInput
  shifts_every: ShiftWhereInput
  shifts_some: ShiftWhereInput
  shifts_none: ShiftWhereInput
  AND: [EmployeeWhereInput!]
  OR: [EmployeeWhereInput!]
  NOT: [EmployeeWhereInput!]
}

input EmployeeWhereUniqueInput {
  id: UUID
}

type Exception {
  id: UUID!
  employee: Employee!
  slots(where: ExceptionSlotWhereInput, orderBy: ExceptionSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExceptionSlot!]
  owner: User!
}

type ExceptionAuthorization {
  id: UUID!
  granted: Boolean!
  user: User!
}

type ExceptionAuthorizationConnection {
  pageInfo: PageInfo!
  edges: [ExceptionAuthorizationEdge]!
  aggregate: AggregateExceptionAuthorization!
}

input ExceptionAuthorizationCreateInput {
  granted: Boolean!
  user: UserCreateOneInput!
}

type ExceptionAuthorizationEdge {
  node: ExceptionAuthorization!
  cursor: String!
}

enum ExceptionAuthorizationOrderByInput {
  id_ASC
  id_DESC
  granted_ASC
  granted_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ExceptionAuthorizationPreviousValues {
  id: UUID!
  granted: Boolean!
}

type ExceptionAuthorizationSubscriptionPayload {
  mutation: MutationType!
  node: ExceptionAuthorization
  updatedFields: [String!]
  previousValues: ExceptionAuthorizationPreviousValues
}

input ExceptionAuthorizationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ExceptionAuthorizationWhereInput
  AND: [ExceptionAuthorizationSubscriptionWhereInput!]
  OR: [ExceptionAuthorizationSubscriptionWhereInput!]
  NOT: [ExceptionAuthorizationSubscriptionWhereInput!]
}

input ExceptionAuthorizationUpdateInput {
  granted: Boolean
  user: UserUpdateOneRequiredInput
}

input ExceptionAuthorizationWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  granted: Boolean
  granted_not: Boolean
  user: UserWhereInput
  AND: [ExceptionAuthorizationWhereInput!]
  OR: [ExceptionAuthorizationWhereInput!]
  NOT: [ExceptionAuthorizationWhereInput!]
}

input ExceptionAuthorizationWhereUniqueInput {
  id: UUID
}

type ExceptionConnection {
  pageInfo: PageInfo!
  edges: [ExceptionEdge]!
  aggregate: AggregateException!
}

input ExceptionCreateInput {
  employee: EmployeeCreateOneInput!
  slots: ExceptionSlotCreateManyInput
  owner: UserCreateOneInput!
}

type ExceptionEdge {
  node: Exception!
  cursor: String!
}

enum ExceptionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ExceptionPreviousValues {
  id: UUID!
}

type ExceptionSlot {
  id: UUID!
  schedule: Schedule!
  date: DateTime!
}

type ExceptionSlotConnection {
  pageInfo: PageInfo!
  edges: [ExceptionSlotEdge]!
  aggregate: AggregateExceptionSlot!
}

input ExceptionSlotCreateInput {
  schedule: ScheduleCreateOneInput!
  date: DateTime!
}

input ExceptionSlotCreateManyInput {
  create: [ExceptionSlotCreateInput!]
  connect: [ExceptionSlotWhereUniqueInput!]
}

type ExceptionSlotEdge {
  node: ExceptionSlot!
  cursor: String!
}

enum ExceptionSlotOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ExceptionSlotPreviousValues {
  id: UUID!
  date: DateTime!
}

type ExceptionSlotSubscriptionPayload {
  mutation: MutationType!
  node: ExceptionSlot
  updatedFields: [String!]
  previousValues: ExceptionSlotPreviousValues
}

input ExceptionSlotSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ExceptionSlotWhereInput
  AND: [ExceptionSlotSubscriptionWhereInput!]
  OR: [ExceptionSlotSubscriptionWhereInput!]
  NOT: [ExceptionSlotSubscriptionWhereInput!]
}

input ExceptionSlotUpdateDataInput {
  schedule: ScheduleUpdateOneRequiredInput
  date: DateTime
}

input ExceptionSlotUpdateInput {
  schedule: ScheduleUpdateOneRequiredInput
  date: DateTime
}

input ExceptionSlotUpdateManyInput {
  create: [ExceptionSlotCreateInput!]
  update: [ExceptionSlotUpdateWithWhereUniqueNestedInput!]
  upsert: [ExceptionSlotUpsertWithWhereUniqueNestedInput!]
  delete: [ExceptionSlotWhereUniqueInput!]
  connect: [ExceptionSlotWhereUniqueInput!]
  disconnect: [ExceptionSlotWhereUniqueInput!]
}

input ExceptionSlotUpdateWithWhereUniqueNestedInput {
  where: ExceptionSlotWhereUniqueInput!
  data: ExceptionSlotUpdateDataInput!
}

input ExceptionSlotUpsertWithWhereUniqueNestedInput {
  where: ExceptionSlotWhereUniqueInput!
  update: ExceptionSlotUpdateDataInput!
  create: ExceptionSlotCreateInput!
}

input ExceptionSlotWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  schedule: ScheduleWhereInput
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  AND: [ExceptionSlotWhereInput!]
  OR: [ExceptionSlotWhereInput!]
  NOT: [ExceptionSlotWhereInput!]
}

input ExceptionSlotWhereUniqueInput {
  id: UUID
}

type ExceptionSubscriptionPayload {
  mutation: MutationType!
  node: Exception
  updatedFields: [String!]
  previousValues: ExceptionPreviousValues
}

input ExceptionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ExceptionWhereInput
  AND: [ExceptionSubscriptionWhereInput!]
  OR: [ExceptionSubscriptionWhereInput!]
  NOT: [ExceptionSubscriptionWhereInput!]
}

input ExceptionUpdateInput {
  employee: EmployeeUpdateOneRequiredInput
  slots: ExceptionSlotUpdateManyInput
  owner: UserUpdateOneRequiredInput
}

input ExceptionWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  employee: EmployeeWhereInput
  slots_every: ExceptionSlotWhereInput
  slots_some: ExceptionSlotWhereInput
  slots_none: ExceptionSlotWhereInput
  owner: UserWhereInput
  AND: [ExceptionWhereInput!]
  OR: [ExceptionWhereInput!]
  NOT: [ExceptionWhereInput!]
}

input ExceptionWhereUniqueInput {
  id: UUID
}

scalar Long

type Mutation {
  createDepartment(data: DepartmentCreateInput!): Department!
  updateDepartment(data: DepartmentUpdateInput!, where: DepartmentWhereUniqueInput!): Department
  updateManyDepartments(data: DepartmentUpdateInput!, where: DepartmentWhereInput): BatchPayload!
  upsertDepartment(where: DepartmentWhereUniqueInput!, create: DepartmentCreateInput!, update: DepartmentUpdateInput!): Department!
  deleteDepartment(where: DepartmentWhereUniqueInput!): Department
  deleteManyDepartments(where: DepartmentWhereInput): BatchPayload!
  createEmployee(data: EmployeeCreateInput!): Employee!
  updateEmployee(data: EmployeeUpdateInput!, where: EmployeeWhereUniqueInput!): Employee
  updateManyEmployees(data: EmployeeUpdateInput!, where: EmployeeWhereInput): BatchPayload!
  upsertEmployee(where: EmployeeWhereUniqueInput!, create: EmployeeCreateInput!, update: EmployeeUpdateInput!): Employee!
  deleteEmployee(where: EmployeeWhereUniqueInput!): Employee
  deleteManyEmployees(where: EmployeeWhereInput): BatchPayload!
  createException(data: ExceptionCreateInput!): Exception!
  updateException(data: ExceptionUpdateInput!, where: ExceptionWhereUniqueInput!): Exception
  updateManyExceptions(data: ExceptionUpdateInput!, where: ExceptionWhereInput): BatchPayload!
  upsertException(where: ExceptionWhereUniqueInput!, create: ExceptionCreateInput!, update: ExceptionUpdateInput!): Exception!
  deleteException(where: ExceptionWhereUniqueInput!): Exception
  deleteManyExceptions(where: ExceptionWhereInput): BatchPayload!
  createExceptionAuthorization(data: ExceptionAuthorizationCreateInput!): ExceptionAuthorization!
  updateExceptionAuthorization(data: ExceptionAuthorizationUpdateInput!, where: ExceptionAuthorizationWhereUniqueInput!): ExceptionAuthorization
  updateManyExceptionAuthorizations(data: ExceptionAuthorizationUpdateInput!, where: ExceptionAuthorizationWhereInput): BatchPayload!
  upsertExceptionAuthorization(where: ExceptionAuthorizationWhereUniqueInput!, create: ExceptionAuthorizationCreateInput!, update: ExceptionAuthorizationUpdateInput!): ExceptionAuthorization!
  deleteExceptionAuthorization(where: ExceptionAuthorizationWhereUniqueInput!): ExceptionAuthorization
  deleteManyExceptionAuthorizations(where: ExceptionAuthorizationWhereInput): BatchPayload!
  createExceptionSlot(data: ExceptionSlotCreateInput!): ExceptionSlot!
  updateExceptionSlot(data: ExceptionSlotUpdateInput!, where: ExceptionSlotWhereUniqueInput!): ExceptionSlot
  updateManyExceptionSlots(data: ExceptionSlotUpdateInput!, where: ExceptionSlotWhereInput): BatchPayload!
  upsertExceptionSlot(where: ExceptionSlotWhereUniqueInput!, create: ExceptionSlotCreateInput!, update: ExceptionSlotUpdateInput!): ExceptionSlot!
  deleteExceptionSlot(where: ExceptionSlotWhereUniqueInput!): ExceptionSlot
  deleteManyExceptionSlots(where: ExceptionSlotWhereInput): BatchPayload!
  createSchedule(data: ScheduleCreateInput!): Schedule!
  updateSchedule(data: ScheduleUpdateInput!, where: ScheduleWhereUniqueInput!): Schedule
  updateManySchedules(data: ScheduleUpdateInput!, where: ScheduleWhereInput): BatchPayload!
  upsertSchedule(where: ScheduleWhereUniqueInput!, create: ScheduleCreateInput!, update: ScheduleUpdateInput!): Schedule!
  deleteSchedule(where: ScheduleWhereUniqueInput!): Schedule
  deleteManySchedules(where: ScheduleWhereInput): BatchPayload!
  createScheduleOfflineElement(data: ScheduleOfflineElementCreateInput!): ScheduleOfflineElement!
  updateScheduleOfflineElement(data: ScheduleOfflineElementUpdateInput!, where: ScheduleOfflineElementWhereUniqueInput!): ScheduleOfflineElement
  updateManyScheduleOfflineElements(data: ScheduleOfflineElementUpdateInput!, where: ScheduleOfflineElementWhereInput): BatchPayload!
  upsertScheduleOfflineElement(where: ScheduleOfflineElementWhereUniqueInput!, create: ScheduleOfflineElementCreateInput!, update: ScheduleOfflineElementUpdateInput!): ScheduleOfflineElement!
  deleteScheduleOfflineElement(where: ScheduleOfflineElementWhereUniqueInput!): ScheduleOfflineElement
  deleteManyScheduleOfflineElements(where: ScheduleOfflineElementWhereInput): BatchPayload!
  createScheduleRestlineElement(data: ScheduleRestlineElementCreateInput!): ScheduleRestlineElement!
  updateScheduleRestlineElement(data: ScheduleRestlineElementUpdateInput!, where: ScheduleRestlineElementWhereUniqueInput!): ScheduleRestlineElement
  updateManyScheduleRestlineElements(data: ScheduleRestlineElementUpdateInput!, where: ScheduleRestlineElementWhereInput): BatchPayload!
  upsertScheduleRestlineElement(where: ScheduleRestlineElementWhereUniqueInput!, create: ScheduleRestlineElementCreateInput!, update: ScheduleRestlineElementUpdateInput!): ScheduleRestlineElement!
  deleteScheduleRestlineElement(where: ScheduleRestlineElementWhereUniqueInput!): ScheduleRestlineElement
  deleteManyScheduleRestlineElements(where: ScheduleRestlineElementWhereInput): BatchPayload!
  createScheduleTimelineElement(data: ScheduleTimelineElementCreateInput!): ScheduleTimelineElement!
  updateScheduleTimelineElement(data: ScheduleTimelineElementUpdateInput!, where: ScheduleTimelineElementWhereUniqueInput!): ScheduleTimelineElement
  updateManyScheduleTimelineElements(data: ScheduleTimelineElementUpdateInput!, where: ScheduleTimelineElementWhereInput): BatchPayload!
  upsertScheduleTimelineElement(where: ScheduleTimelineElementWhereUniqueInput!, create: ScheduleTimelineElementCreateInput!, update: ScheduleTimelineElementUpdateInput!): ScheduleTimelineElement!
  deleteScheduleTimelineElement(where: ScheduleTimelineElementWhereUniqueInput!): ScheduleTimelineElement
  deleteManyScheduleTimelineElements(where: ScheduleTimelineElementWhereInput): BatchPayload!
  createShift(data: ShiftCreateInput!): Shift!
  updateShift(data: ShiftUpdateInput!, where: ShiftWhereUniqueInput!): Shift
  updateManyShifts(data: ShiftUpdateInput!, where: ShiftWhereInput): BatchPayload!
  upsertShift(where: ShiftWhereUniqueInput!, create: ShiftCreateInput!, update: ShiftUpdateInput!): Shift!
  deleteShift(where: ShiftWhereUniqueInput!): Shift
  deleteManyShifts(where: ShiftWhereInput): BatchPayload!
  createShiftSlot(data: ShiftSlotCreateInput!): ShiftSlot!
  updateShiftSlot(data: ShiftSlotUpdateInput!, where: ShiftSlotWhereUniqueInput!): ShiftSlot
  updateManyShiftSlots(data: ShiftSlotUpdateInput!, where: ShiftSlotWhereInput): BatchPayload!
  upsertShiftSlot(where: ShiftSlotWhereUniqueInput!, create: ShiftSlotCreateInput!, update: ShiftSlotUpdateInput!): ShiftSlot!
  deleteShiftSlot(where: ShiftSlotWhereUniqueInput!): ShiftSlot
  deleteManyShiftSlots(where: ShiftSlotWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  department(where: DepartmentWhereUniqueInput!): Department
  departments(where: DepartmentWhereInput, orderBy: DepartmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Department]!
  departmentsConnection(where: DepartmentWhereInput, orderBy: DepartmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DepartmentConnection!
  employee(where: EmployeeWhereUniqueInput!): Employee
  employees(where: EmployeeWhereInput, orderBy: EmployeeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Employee]!
  employeesConnection(where: EmployeeWhereInput, orderBy: EmployeeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EmployeeConnection!
  exception(where: ExceptionWhereUniqueInput!): Exception
  exceptions(where: ExceptionWhereInput, orderBy: ExceptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exception]!
  exceptionsConnection(where: ExceptionWhereInput, orderBy: ExceptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExceptionConnection!
  exceptionAuthorization(where: ExceptionAuthorizationWhereUniqueInput!): ExceptionAuthorization
  exceptionAuthorizations(where: ExceptionAuthorizationWhereInput, orderBy: ExceptionAuthorizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExceptionAuthorization]!
  exceptionAuthorizationsConnection(where: ExceptionAuthorizationWhereInput, orderBy: ExceptionAuthorizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExceptionAuthorizationConnection!
  exceptionSlot(where: ExceptionSlotWhereUniqueInput!): ExceptionSlot
  exceptionSlots(where: ExceptionSlotWhereInput, orderBy: ExceptionSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExceptionSlot]!
  exceptionSlotsConnection(where: ExceptionSlotWhereInput, orderBy: ExceptionSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExceptionSlotConnection!
  schedule(where: ScheduleWhereUniqueInput!): Schedule
  schedules(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Schedule]!
  schedulesConnection(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleConnection!
  scheduleOfflineElement(where: ScheduleOfflineElementWhereUniqueInput!): ScheduleOfflineElement
  scheduleOfflineElements(where: ScheduleOfflineElementWhereInput, orderBy: ScheduleOfflineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleOfflineElement]!
  scheduleOfflineElementsConnection(where: ScheduleOfflineElementWhereInput, orderBy: ScheduleOfflineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleOfflineElementConnection!
  scheduleRestlineElement(where: ScheduleRestlineElementWhereUniqueInput!): ScheduleRestlineElement
  scheduleRestlineElements(where: ScheduleRestlineElementWhereInput, orderBy: ScheduleRestlineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleRestlineElement]!
  scheduleRestlineElementsConnection(where: ScheduleRestlineElementWhereInput, orderBy: ScheduleRestlineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleRestlineElementConnection!
  scheduleTimelineElement(where: ScheduleTimelineElementWhereUniqueInput!): ScheduleTimelineElement
  scheduleTimelineElements(where: ScheduleTimelineElementWhereInput, orderBy: ScheduleTimelineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleTimelineElement]!
  scheduleTimelineElementsConnection(where: ScheduleTimelineElementWhereInput, orderBy: ScheduleTimelineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleTimelineElementConnection!
  shift(where: ShiftWhereUniqueInput!): Shift
  shifts(where: ShiftWhereInput, orderBy: ShiftOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Shift]!
  shiftsConnection(where: ShiftWhereInput, orderBy: ShiftOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ShiftConnection!
  shiftSlot(where: ShiftSlotWhereUniqueInput!): ShiftSlot
  shiftSlots(where: ShiftSlotWhereInput, orderBy: ShiftSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ShiftSlot]!
  shiftSlotsConnection(where: ShiftSlotWhereInput, orderBy: ShiftSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ShiftSlotConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Schedule {
  id: UUID!
  description: String
  baseTime: Int!
  custom: Boolean!
  timeline(where: ScheduleTimelineElementWhereInput, orderBy: ScheduleTimelineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleTimelineElement!]
  restline(where: ScheduleRestlineElementWhereInput, orderBy: ScheduleRestlineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleRestlineElement!]
  offline1: ScheduleOfflineElement
  offline2: ScheduleOfflineElement
}

type ScheduleConnection {
  pageInfo: PageInfo!
  edges: [ScheduleEdge]!
  aggregate: AggregateSchedule!
}

input ScheduleCreateInput {
  description: String
  baseTime: Int!
  custom: Boolean
  timeline: ScheduleTimelineElementCreateManyInput
  restline: ScheduleRestlineElementCreateManyInput
  offline1: ScheduleOfflineElementCreateOneInput
  offline2: ScheduleOfflineElementCreateOneInput
}

input ScheduleCreateOneInput {
  create: ScheduleCreateInput
  connect: ScheduleWhereUniqueInput
}

type ScheduleEdge {
  node: Schedule!
  cursor: String!
}

enum ScheduleOfflineCategory {
  SCH_DAY_OFF
  SCH_DAY_VACATION
  SCH_DAY_HOLIDAY
  SCH_DAY_SICK
  SCH_DAY_PAID
  SCH_DAY_UNPAID
}

type ScheduleOfflineElement {
  id: UUID!
  category: ScheduleOfflineCategory!
}

type ScheduleOfflineElementConnection {
  pageInfo: PageInfo!
  edges: [ScheduleOfflineElementEdge]!
  aggregate: AggregateScheduleOfflineElement!
}

input ScheduleOfflineElementCreateInput {
  category: ScheduleOfflineCategory!
}

input ScheduleOfflineElementCreateOneInput {
  create: ScheduleOfflineElementCreateInput
  connect: ScheduleOfflineElementWhereUniqueInput
}

type ScheduleOfflineElementEdge {
  node: ScheduleOfflineElement!
  cursor: String!
}

enum ScheduleOfflineElementOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleOfflineElementPreviousValues {
  id: UUID!
  category: ScheduleOfflineCategory!
}

type ScheduleOfflineElementSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleOfflineElement
  updatedFields: [String!]
  previousValues: ScheduleOfflineElementPreviousValues
}

input ScheduleOfflineElementSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleOfflineElementWhereInput
  AND: [ScheduleOfflineElementSubscriptionWhereInput!]
  OR: [ScheduleOfflineElementSubscriptionWhereInput!]
  NOT: [ScheduleOfflineElementSubscriptionWhereInput!]
}

input ScheduleOfflineElementUpdateDataInput {
  category: ScheduleOfflineCategory
}

input ScheduleOfflineElementUpdateInput {
  category: ScheduleOfflineCategory
}

input ScheduleOfflineElementUpdateOneInput {
  create: ScheduleOfflineElementCreateInput
  update: ScheduleOfflineElementUpdateDataInput
  upsert: ScheduleOfflineElementUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ScheduleOfflineElementWhereUniqueInput
}

input ScheduleOfflineElementUpsertNestedInput {
  update: ScheduleOfflineElementUpdateDataInput!
  create: ScheduleOfflineElementCreateInput!
}

input ScheduleOfflineElementWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  category: ScheduleOfflineCategory
  category_not: ScheduleOfflineCategory
  category_in: [ScheduleOfflineCategory!]
  category_not_in: [ScheduleOfflineCategory!]
  AND: [ScheduleOfflineElementWhereInput!]
  OR: [ScheduleOfflineElementWhereInput!]
  NOT: [ScheduleOfflineElementWhereInput!]
}

input ScheduleOfflineElementWhereUniqueInput {
  id: UUID
}

enum ScheduleOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  baseTime_ASC
  baseTime_DESC
  custom_ASC
  custom_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SchedulePreviousValues {
  id: UUID!
  description: String
  baseTime: Int!
  custom: Boolean!
}

enum ScheduleRestlineCategory {
  SCH_REST_LUNCH
}

type ScheduleRestlineElement {
  id: UUID!
  category: ScheduleRestlineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
  duration: Int!
}

type ScheduleRestlineElementConnection {
  pageInfo: PageInfo!
  edges: [ScheduleRestlineElementEdge]!
  aggregate: AggregateScheduleRestlineElement!
}

input ScheduleRestlineElementCreateInput {
  category: ScheduleRestlineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
  duration: Int!
}

input ScheduleRestlineElementCreateManyInput {
  create: [ScheduleRestlineElementCreateInput!]
  connect: [ScheduleRestlineElementWhereUniqueInput!]
}

type ScheduleRestlineElementEdge {
  node: ScheduleRestlineElement!
  cursor: String!
}

enum ScheduleRestlineElementOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  startTime_ASC
  startTime_DESC
  startRequireEvent_ASC
  startRequireEvent_DESC
  endTime_ASC
  endTime_DESC
  endRequireEvent_ASC
  endRequireEvent_DESC
  duration_ASC
  duration_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleRestlineElementPreviousValues {
  id: UUID!
  category: ScheduleRestlineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
  duration: Int!
}

type ScheduleRestlineElementSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleRestlineElement
  updatedFields: [String!]
  previousValues: ScheduleRestlineElementPreviousValues
}

input ScheduleRestlineElementSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleRestlineElementWhereInput
  AND: [ScheduleRestlineElementSubscriptionWhereInput!]
  OR: [ScheduleRestlineElementSubscriptionWhereInput!]
  NOT: [ScheduleRestlineElementSubscriptionWhereInput!]
}

input ScheduleRestlineElementUpdateDataInput {
  category: ScheduleRestlineCategory
  startTime: Int
  startRequireEvent: Boolean
  endTime: Int
  endRequireEvent: Boolean
  duration: Int
}

input ScheduleRestlineElementUpdateInput {
  category: ScheduleRestlineCategory
  startTime: Int
  startRequireEvent: Boolean
  endTime: Int
  endRequireEvent: Boolean
  duration: Int
}

input ScheduleRestlineElementUpdateManyInput {
  create: [ScheduleRestlineElementCreateInput!]
  update: [ScheduleRestlineElementUpdateWithWhereUniqueNestedInput!]
  upsert: [ScheduleRestlineElementUpsertWithWhereUniqueNestedInput!]
  delete: [ScheduleRestlineElementWhereUniqueInput!]
  connect: [ScheduleRestlineElementWhereUniqueInput!]
  disconnect: [ScheduleRestlineElementWhereUniqueInput!]
}

input ScheduleRestlineElementUpdateWithWhereUniqueNestedInput {
  where: ScheduleRestlineElementWhereUniqueInput!
  data: ScheduleRestlineElementUpdateDataInput!
}

input ScheduleRestlineElementUpsertWithWhereUniqueNestedInput {
  where: ScheduleRestlineElementWhereUniqueInput!
  update: ScheduleRestlineElementUpdateDataInput!
  create: ScheduleRestlineElementCreateInput!
}

input ScheduleRestlineElementWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  category: ScheduleRestlineCategory
  category_not: ScheduleRestlineCategory
  category_in: [ScheduleRestlineCategory!]
  category_not_in: [ScheduleRestlineCategory!]
  startTime: Int
  startTime_not: Int
  startTime_in: [Int!]
  startTime_not_in: [Int!]
  startTime_lt: Int
  startTime_lte: Int
  startTime_gt: Int
  startTime_gte: Int
  startRequireEvent: Boolean
  startRequireEvent_not: Boolean
  endTime: Int
  endTime_not: Int
  endTime_in: [Int!]
  endTime_not_in: [Int!]
  endTime_lt: Int
  endTime_lte: Int
  endTime_gt: Int
  endTime_gte: Int
  endRequireEvent: Boolean
  endRequireEvent_not: Boolean
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  AND: [ScheduleRestlineElementWhereInput!]
  OR: [ScheduleRestlineElementWhereInput!]
  NOT: [ScheduleRestlineElementWhereInput!]
}

input ScheduleRestlineElementWhereUniqueInput {
  id: UUID
}

type ScheduleSubscriptionPayload {
  mutation: MutationType!
  node: Schedule
  updatedFields: [String!]
  previousValues: SchedulePreviousValues
}

input ScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleWhereInput
  AND: [ScheduleSubscriptionWhereInput!]
  OR: [ScheduleSubscriptionWhereInput!]
  NOT: [ScheduleSubscriptionWhereInput!]
}

enum ScheduleTimelineCategory {
  SCH_TIME_WORK
  SCH_TIME_EXTRA
  SCH_TIME_MATERNAL
  SCH_TIME_LEAVE
}

type ScheduleTimelineElement {
  id: UUID!
  category: ScheduleTimelineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
}

type ScheduleTimelineElementConnection {
  pageInfo: PageInfo!
  edges: [ScheduleTimelineElementEdge]!
  aggregate: AggregateScheduleTimelineElement!
}

input ScheduleTimelineElementCreateInput {
  category: ScheduleTimelineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
}

input ScheduleTimelineElementCreateManyInput {
  create: [ScheduleTimelineElementCreateInput!]
  connect: [ScheduleTimelineElementWhereUniqueInput!]
}

type ScheduleTimelineElementEdge {
  node: ScheduleTimelineElement!
  cursor: String!
}

enum ScheduleTimelineElementOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  startTime_ASC
  startTime_DESC
  startRequireEvent_ASC
  startRequireEvent_DESC
  endTime_ASC
  endTime_DESC
  endRequireEvent_ASC
  endRequireEvent_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleTimelineElementPreviousValues {
  id: UUID!
  category: ScheduleTimelineCategory!
  startTime: Int!
  startRequireEvent: Boolean!
  endTime: Int!
  endRequireEvent: Boolean!
}

type ScheduleTimelineElementSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleTimelineElement
  updatedFields: [String!]
  previousValues: ScheduleTimelineElementPreviousValues
}

input ScheduleTimelineElementSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleTimelineElementWhereInput
  AND: [ScheduleTimelineElementSubscriptionWhereInput!]
  OR: [ScheduleTimelineElementSubscriptionWhereInput!]
  NOT: [ScheduleTimelineElementSubscriptionWhereInput!]
}

input ScheduleTimelineElementUpdateDataInput {
  category: ScheduleTimelineCategory
  startTime: Int
  startRequireEvent: Boolean
  endTime: Int
  endRequireEvent: Boolean
}

input ScheduleTimelineElementUpdateInput {
  category: ScheduleTimelineCategory
  startTime: Int
  startRequireEvent: Boolean
  endTime: Int
  endRequireEvent: Boolean
}

input ScheduleTimelineElementUpdateManyInput {
  create: [ScheduleTimelineElementCreateInput!]
  update: [ScheduleTimelineElementUpdateWithWhereUniqueNestedInput!]
  upsert: [ScheduleTimelineElementUpsertWithWhereUniqueNestedInput!]
  delete: [ScheduleTimelineElementWhereUniqueInput!]
  connect: [ScheduleTimelineElementWhereUniqueInput!]
  disconnect: [ScheduleTimelineElementWhereUniqueInput!]
}

input ScheduleTimelineElementUpdateWithWhereUniqueNestedInput {
  where: ScheduleTimelineElementWhereUniqueInput!
  data: ScheduleTimelineElementUpdateDataInput!
}

input ScheduleTimelineElementUpsertWithWhereUniqueNestedInput {
  where: ScheduleTimelineElementWhereUniqueInput!
  update: ScheduleTimelineElementUpdateDataInput!
  create: ScheduleTimelineElementCreateInput!
}

input ScheduleTimelineElementWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  category: ScheduleTimelineCategory
  category_not: ScheduleTimelineCategory
  category_in: [ScheduleTimelineCategory!]
  category_not_in: [ScheduleTimelineCategory!]
  startTime: Int
  startTime_not: Int
  startTime_in: [Int!]
  startTime_not_in: [Int!]
  startTime_lt: Int
  startTime_lte: Int
  startTime_gt: Int
  startTime_gte: Int
  startRequireEvent: Boolean
  startRequireEvent_not: Boolean
  endTime: Int
  endTime_not: Int
  endTime_in: [Int!]
  endTime_not_in: [Int!]
  endTime_lt: Int
  endTime_lte: Int
  endTime_gt: Int
  endTime_gte: Int
  endRequireEvent: Boolean
  endRequireEvent_not: Boolean
  AND: [ScheduleTimelineElementWhereInput!]
  OR: [ScheduleTimelineElementWhereInput!]
  NOT: [ScheduleTimelineElementWhereInput!]
}

input ScheduleTimelineElementWhereUniqueInput {
  id: UUID
}

input ScheduleUpdateDataInput {
  description: String
  baseTime: Int
  custom: Boolean
  timeline: ScheduleTimelineElementUpdateManyInput
  restline: ScheduleRestlineElementUpdateManyInput
  offline1: ScheduleOfflineElementUpdateOneInput
  offline2: ScheduleOfflineElementUpdateOneInput
}

input ScheduleUpdateInput {
  description: String
  baseTime: Int
  custom: Boolean
  timeline: ScheduleTimelineElementUpdateManyInput
  restline: ScheduleRestlineElementUpdateManyInput
  offline1: ScheduleOfflineElementUpdateOneInput
  offline2: ScheduleOfflineElementUpdateOneInput
}

input ScheduleUpdateOneRequiredInput {
  create: ScheduleCreateInput
  update: ScheduleUpdateDataInput
  upsert: ScheduleUpsertNestedInput
  connect: ScheduleWhereUniqueInput
}

input ScheduleUpsertNestedInput {
  update: ScheduleUpdateDataInput!
  create: ScheduleCreateInput!
}

input ScheduleWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  baseTime: Int
  baseTime_not: Int
  baseTime_in: [Int!]
  baseTime_not_in: [Int!]
  baseTime_lt: Int
  baseTime_lte: Int
  baseTime_gt: Int
  baseTime_gte: Int
  custom: Boolean
  custom_not: Boolean
  timeline_every: ScheduleTimelineElementWhereInput
  timeline_some: ScheduleTimelineElementWhereInput
  timeline_none: ScheduleTimelineElementWhereInput
  restline_every: ScheduleRestlineElementWhereInput
  restline_some: ScheduleRestlineElementWhereInput
  restline_none: ScheduleRestlineElementWhereInput
  offline1: ScheduleOfflineElementWhereInput
  offline2: ScheduleOfflineElementWhereInput
  AND: [ScheduleWhereInput!]
  OR: [ScheduleWhereInput!]
  NOT: [ScheduleWhereInput!]
}

input ScheduleWhereUniqueInput {
  id: UUID
}

enum SexEnum {
  M
  F
}

type Shift {
  id: UUID!
  description: String
  employee: Employee!
  startDate: DateTime!
  endDate: DateTime
  startIndex: Int!
  slots(where: ShiftSlotWhereInput, orderBy: ShiftSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ShiftSlot!]
  owner: User!
}

type ShiftConnection {
  pageInfo: PageInfo!
  edges: [ShiftEdge]!
  aggregate: AggregateShift!
}

input ShiftCreateInput {
  description: String
  employee: EmployeeCreateOneWithoutShiftsInput!
  startDate: DateTime!
  endDate: DateTime
  startIndex: Int!
  slots: ShiftSlotCreateManyInput
  owner: UserCreateOneInput!
}

input ShiftCreateManyWithoutEmployeeInput {
  create: [ShiftCreateWithoutEmployeeInput!]
  connect: [ShiftWhereUniqueInput!]
}

input ShiftCreateWithoutEmployeeInput {
  description: String
  startDate: DateTime!
  endDate: DateTime
  startIndex: Int!
  slots: ShiftSlotCreateManyInput
  owner: UserCreateOneInput!
}

type ShiftEdge {
  node: Shift!
  cursor: String!
}

enum ShiftOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
  startIndex_ASC
  startIndex_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ShiftPreviousValues {
  id: UUID!
  description: String
  startDate: DateTime!
  endDate: DateTime
  startIndex: Int!
}

type ShiftSlot {
  id: UUID!
  schedule: Schedule!
  index: Int!
}

type ShiftSlotConnection {
  pageInfo: PageInfo!
  edges: [ShiftSlotEdge]!
  aggregate: AggregateShiftSlot!
}

input ShiftSlotCreateInput {
  schedule: ScheduleCreateOneInput!
  index: Int!
}

input ShiftSlotCreateManyInput {
  create: [ShiftSlotCreateInput!]
  connect: [ShiftSlotWhereUniqueInput!]
}

type ShiftSlotEdge {
  node: ShiftSlot!
  cursor: String!
}

enum ShiftSlotOrderByInput {
  id_ASC
  id_DESC
  index_ASC
  index_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ShiftSlotPreviousValues {
  id: UUID!
  index: Int!
}

type ShiftSlotSubscriptionPayload {
  mutation: MutationType!
  node: ShiftSlot
  updatedFields: [String!]
  previousValues: ShiftSlotPreviousValues
}

input ShiftSlotSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ShiftSlotWhereInput
  AND: [ShiftSlotSubscriptionWhereInput!]
  OR: [ShiftSlotSubscriptionWhereInput!]
  NOT: [ShiftSlotSubscriptionWhereInput!]
}

input ShiftSlotUpdateDataInput {
  schedule: ScheduleUpdateOneRequiredInput
  index: Int
}

input ShiftSlotUpdateInput {
  schedule: ScheduleUpdateOneRequiredInput
  index: Int
}

input ShiftSlotUpdateManyInput {
  create: [ShiftSlotCreateInput!]
  update: [ShiftSlotUpdateWithWhereUniqueNestedInput!]
  upsert: [ShiftSlotUpsertWithWhereUniqueNestedInput!]
  delete: [ShiftSlotWhereUniqueInput!]
  connect: [ShiftSlotWhereUniqueInput!]
  disconnect: [ShiftSlotWhereUniqueInput!]
}

input ShiftSlotUpdateWithWhereUniqueNestedInput {
  where: ShiftSlotWhereUniqueInput!
  data: ShiftSlotUpdateDataInput!
}

input ShiftSlotUpsertWithWhereUniqueNestedInput {
  where: ShiftSlotWhereUniqueInput!
  update: ShiftSlotUpdateDataInput!
  create: ShiftSlotCreateInput!
}

input ShiftSlotWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  schedule: ScheduleWhereInput
  index: Int
  index_not: Int
  index_in: [Int!]
  index_not_in: [Int!]
  index_lt: Int
  index_lte: Int
  index_gt: Int
  index_gte: Int
  AND: [ShiftSlotWhereInput!]
  OR: [ShiftSlotWhereInput!]
  NOT: [ShiftSlotWhereInput!]
}

input ShiftSlotWhereUniqueInput {
  id: UUID
}

type ShiftSubscriptionPayload {
  mutation: MutationType!
  node: Shift
  updatedFields: [String!]
  previousValues: ShiftPreviousValues
}

input ShiftSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ShiftWhereInput
  AND: [ShiftSubscriptionWhereInput!]
  OR: [ShiftSubscriptionWhereInput!]
  NOT: [ShiftSubscriptionWhereInput!]
}

input ShiftUpdateInput {
  description: String
  employee: EmployeeUpdateOneRequiredWithoutShiftsInput
  startDate: DateTime
  endDate: DateTime
  startIndex: Int
  slots: ShiftSlotUpdateManyInput
  owner: UserUpdateOneRequiredInput
}

input ShiftUpdateManyWithoutEmployeeInput {
  create: [ShiftCreateWithoutEmployeeInput!]
  delete: [ShiftWhereUniqueInput!]
  connect: [ShiftWhereUniqueInput!]
  disconnect: [ShiftWhereUniqueInput!]
  update: [ShiftUpdateWithWhereUniqueWithoutEmployeeInput!]
  upsert: [ShiftUpsertWithWhereUniqueWithoutEmployeeInput!]
}

input ShiftUpdateWithoutEmployeeDataInput {
  description: String
  startDate: DateTime
  endDate: DateTime
  startIndex: Int
  slots: ShiftSlotUpdateManyInput
  owner: UserUpdateOneRequiredInput
}

input ShiftUpdateWithWhereUniqueWithoutEmployeeInput {
  where: ShiftWhereUniqueInput!
  data: ShiftUpdateWithoutEmployeeDataInput!
}

input ShiftUpsertWithWhereUniqueWithoutEmployeeInput {
  where: ShiftWhereUniqueInput!
  update: ShiftUpdateWithoutEmployeeDataInput!
  create: ShiftCreateWithoutEmployeeInput!
}

input ShiftWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  employee: EmployeeWhereInput
  startDate: DateTime
  startDate_not: DateTime
  startDate_in: [DateTime!]
  startDate_not_in: [DateTime!]
  startDate_lt: DateTime
  startDate_lte: DateTime
  startDate_gt: DateTime
  startDate_gte: DateTime
  endDate: DateTime
  endDate_not: DateTime
  endDate_in: [DateTime!]
  endDate_not_in: [DateTime!]
  endDate_lt: DateTime
  endDate_lte: DateTime
  endDate_gt: DateTime
  endDate_gte: DateTime
  startIndex: Int
  startIndex_not: Int
  startIndex_in: [Int!]
  startIndex_not_in: [Int!]
  startIndex_lt: Int
  startIndex_lte: Int
  startIndex_gt: Int
  startIndex_gte: Int
  slots_every: ShiftSlotWhereInput
  slots_some: ShiftSlotWhereInput
  slots_none: ShiftSlotWhereInput
  owner: UserWhereInput
  AND: [ShiftWhereInput!]
  OR: [ShiftWhereInput!]
  NOT: [ShiftWhereInput!]
}

input ShiftWhereUniqueInput {
  id: UUID
}

type Subscription {
  department(where: DepartmentSubscriptionWhereInput): DepartmentSubscriptionPayload
  employee(where: EmployeeSubscriptionWhereInput): EmployeeSubscriptionPayload
  exception(where: ExceptionSubscriptionWhereInput): ExceptionSubscriptionPayload
  exceptionAuthorization(where: ExceptionAuthorizationSubscriptionWhereInput): ExceptionAuthorizationSubscriptionPayload
  exceptionSlot(where: ExceptionSlotSubscriptionWhereInput): ExceptionSlotSubscriptionPayload
  schedule(where: ScheduleSubscriptionWhereInput): ScheduleSubscriptionPayload
  scheduleOfflineElement(where: ScheduleOfflineElementSubscriptionWhereInput): ScheduleOfflineElementSubscriptionPayload
  scheduleRestlineElement(where: ScheduleRestlineElementSubscriptionWhereInput): ScheduleRestlineElementSubscriptionPayload
  scheduleTimelineElement(where: ScheduleTimelineElementSubscriptionWhereInput): ScheduleTimelineElementSubscriptionPayload
  shift(where: ShiftSubscriptionWhereInput): ShiftSubscriptionPayload
  shiftSlot(where: ShiftSlotSubscriptionWhereInput): ShiftSlotSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: UUID!
  username: String!
  password: String!
  departments(where: EmployeeWhereInput, orderBy: EmployeeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Employee!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  password: String!
  departments: EmployeeCreateManyInput
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: UUID!
  username: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  username: String
  password: String
  departments: EmployeeUpdateManyInput
}

input UserUpdateInput {
  username: String
  password: String
  departments: EmployeeUpdateManyInput
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: UUID
  id_not: UUID
  id_in: [UUID!]
  id_not_in: [UUID!]
  id_lt: UUID
  id_lte: UUID
  id_gt: UUID
  id_gte: UUID
  id_contains: UUID
  id_not_contains: UUID
  id_starts_with: UUID
  id_not_starts_with: UUID
  id_ends_with: UUID
  id_not_ends_with: UUID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  departments_every: EmployeeWhereInput
  departments_some: EmployeeWhereInput
  departments_none: EmployeeWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: UUID
  username: String
}

scalar UUID
`
      }
    