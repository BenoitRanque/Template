module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAttendanceCycle {
  count: Int!
}

type AggregateDepartment {
  count: Int!
}

type AggregateDirectCredit {
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

type AggregateFieldOptionLabel {
  count: Int!
}

type AggregateHoliday {
  count: Int!
}

type AggregateSchedule {
  count: Int!
}

type AggregateScheduleCategoryConfig {
  count: Int!
}

type AggregateScheduleCredit {
  count: Int!
}

type AggregateScheduleDebit {
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

type AggregateUserRole {
  count: Int!
}

type AttendanceCycle {
  id: ID!
  name: String!
  startDate: DateTime!
  endDate: DateTime!
}

type AttendanceCycleConnection {
  pageInfo: PageInfo!
  edges: [AttendanceCycleEdge]!
  aggregate: AggregateAttendanceCycle!
}

input AttendanceCycleCreateInput {
  name: String!
  startDate: DateTime!
  endDate: DateTime!
}

type AttendanceCycleEdge {
  node: AttendanceCycle!
  cursor: String!
}

enum AttendanceCycleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AttendanceCyclePreviousValues {
  id: ID!
  name: String!
  startDate: DateTime!
  endDate: DateTime!
}

type AttendanceCycleSubscriptionPayload {
  mutation: MutationType!
  node: AttendanceCycle
  updatedFields: [String!]
  previousValues: AttendanceCyclePreviousValues
}

input AttendanceCycleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AttendanceCycleWhereInput
  AND: [AttendanceCycleSubscriptionWhereInput!]
  OR: [AttendanceCycleSubscriptionWhereInput!]
  NOT: [AttendanceCycleSubscriptionWhereInput!]
}

input AttendanceCycleUpdateInput {
  name: String
  startDate: DateTime
  endDate: DateTime
}

input AttendanceCycleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  AND: [AttendanceCycleWhereInput!]
  OR: [AttendanceCycleWhereInput!]
  NOT: [AttendanceCycleWhereInput!]
}

input AttendanceCycleWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Department {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  supervisors: UserCreateManyWithoutDepartmentsInput
}

input DepartmentCreateManyWithoutSupervisorsInput {
  create: [DepartmentCreateWithoutSupervisorsInput!]
  connect: [DepartmentWhereUniqueInput!]
}

input DepartmentCreateOneWithoutSubordinatesInput {
  create: DepartmentCreateWithoutSubordinatesInput
  connect: DepartmentWhereUniqueInput
}

input DepartmentCreateWithoutSubordinatesInput {
  name: String!
  supervisors: UserCreateManyWithoutDepartmentsInput
}

input DepartmentCreateWithoutSupervisorsInput {
  name: String!
  subordinates: EmployeeCreateManyWithoutDepartmentInput
}

type DepartmentEdge {
  node: Department!
  cursor: String!
}

enum DepartmentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type DepartmentPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  supervisors: UserUpdateManyWithoutDepartmentsInput
}

input DepartmentUpdateManyWithoutSupervisorsInput {
  create: [DepartmentCreateWithoutSupervisorsInput!]
  delete: [DepartmentWhereUniqueInput!]
  connect: [DepartmentWhereUniqueInput!]
  disconnect: [DepartmentWhereUniqueInput!]
  update: [DepartmentUpdateWithWhereUniqueWithoutSupervisorsInput!]
  upsert: [DepartmentUpsertWithWhereUniqueWithoutSupervisorsInput!]
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
  supervisors: UserUpdateManyWithoutDepartmentsInput
}

input DepartmentUpdateWithoutSupervisorsDataInput {
  name: String
  subordinates: EmployeeUpdateManyWithoutDepartmentInput
}

input DepartmentUpdateWithWhereUniqueWithoutSupervisorsInput {
  where: DepartmentWhereUniqueInput!
  data: DepartmentUpdateWithoutSupervisorsDataInput!
}

input DepartmentUpsertWithoutSubordinatesInput {
  update: DepartmentUpdateWithoutSubordinatesDataInput!
  create: DepartmentCreateWithoutSubordinatesInput!
}

input DepartmentUpsertWithWhereUniqueWithoutSupervisorsInput {
  where: DepartmentWhereUniqueInput!
  update: DepartmentUpdateWithoutSupervisorsDataInput!
  create: DepartmentCreateWithoutSupervisorsInput!
}

input DepartmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  id: ID
}

type DirectCredit {
  id: ID!
  owner: User!
  employee: Employee!
  description: String
  credits(where: ScheduleCreditWhereInput, orderBy: ScheduleCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleCredit!]
}

type DirectCreditConnection {
  pageInfo: PageInfo!
  edges: [DirectCreditEdge]!
  aggregate: AggregateDirectCredit!
}

input DirectCreditCreateInput {
  owner: UserCreateOneInput!
  employee: EmployeeCreateOneInput!
  description: String
  credits: ScheduleCreditCreateManyWithoutSourceDirectInput
}

input DirectCreditCreateOneWithoutCreditsInput {
  create: DirectCreditCreateWithoutCreditsInput
  connect: DirectCreditWhereUniqueInput
}

input DirectCreditCreateWithoutCreditsInput {
  owner: UserCreateOneInput!
  employee: EmployeeCreateOneInput!
  description: String
}

type DirectCreditEdge {
  node: DirectCredit!
  cursor: String!
}

enum DirectCreditOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DirectCreditPreviousValues {
  id: ID!
  description: String
}

type DirectCreditSubscriptionPayload {
  mutation: MutationType!
  node: DirectCredit
  updatedFields: [String!]
  previousValues: DirectCreditPreviousValues
}

input DirectCreditSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DirectCreditWhereInput
  AND: [DirectCreditSubscriptionWhereInput!]
  OR: [DirectCreditSubscriptionWhereInput!]
  NOT: [DirectCreditSubscriptionWhereInput!]
}

input DirectCreditUpdateInput {
  owner: UserUpdateOneRequiredInput
  employee: EmployeeUpdateOneRequiredInput
  description: String
  credits: ScheduleCreditUpdateManyWithoutSourceDirectInput
}

input DirectCreditUpdateOneWithoutCreditsInput {
  create: DirectCreditCreateWithoutCreditsInput
  update: DirectCreditUpdateWithoutCreditsDataInput
  upsert: DirectCreditUpsertWithoutCreditsInput
  delete: Boolean
  disconnect: Boolean
  connect: DirectCreditWhereUniqueInput
}

input DirectCreditUpdateWithoutCreditsDataInput {
  owner: UserUpdateOneRequiredInput
  employee: EmployeeUpdateOneRequiredInput
  description: String
}

input DirectCreditUpsertWithoutCreditsInput {
  update: DirectCreditUpdateWithoutCreditsDataInput!
  create: DirectCreditCreateWithoutCreditsInput!
}

input DirectCreditWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  owner: UserWhereInput
  employee: EmployeeWhereInput
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
  credits_every: ScheduleCreditWhereInput
  credits_some: ScheduleCreditWhereInput
  credits_none: ScheduleCreditWhereInput
  AND: [DirectCreditWhereInput!]
  OR: [DirectCreditWhereInput!]
  NOT: [DirectCreditWhereInput!]
}

input DirectCreditWhereUniqueInput {
  id: ID
}

type Employee {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean!
  personaConDiscapacidad: Boolean!
  tutorPersonaConDiscapacidad: Boolean!
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean!
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: Department
  shifts(where: ShiftWhereInput, orderBy: ShiftOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Shift!]
  exceptions(where: ExceptionWhereInput, orderBy: ExceptionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Exception!]
  credits(where: ScheduleCreditWhereInput, orderBy: ScheduleCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleCredit!]
  debits(where: ScheduleDebitWhereInput, orderBy: ScheduleDebitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleDebit!]
}

enum EmployeeAFPEnum {
  OPTION_1
  OPTION_2
}

enum EmployeeCajaDeSaludEnum {
  OPTION_1
  OPTION_2
  OPTION_3
  OPTION_4
  OPTION_5
  OPTION_6
  OPTION_7
  OPTION_8
  OPTION_9
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
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  shifts: ShiftCreateManyWithoutEmployeeInput
  exceptions: ExceptionCreateManyWithoutEmployeeInput
  credits: ScheduleCreditCreateManyWithoutEmployeeInput
  debits: ScheduleDebitCreateManyWithoutEmployeeInput
}

input EmployeeCreateManyWithoutDepartmentInput {
  create: [EmployeeCreateWithoutDepartmentInput!]
  connect: [EmployeeWhereUniqueInput!]
}

input EmployeeCreateOneInput {
  create: EmployeeCreateInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateOneWithoutCreditsInput {
  create: EmployeeCreateWithoutCreditsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateOneWithoutDebitsInput {
  create: EmployeeCreateWithoutDebitsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateOneWithoutExceptionsInput {
  create: EmployeeCreateWithoutExceptionsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateOneWithoutShiftsInput {
  create: EmployeeCreateWithoutShiftsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeCreateWithoutCreditsInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  shifts: ShiftCreateManyWithoutEmployeeInput
  exceptions: ExceptionCreateManyWithoutEmployeeInput
  debits: ScheduleDebitCreateManyWithoutEmployeeInput
}

input EmployeeCreateWithoutDebitsInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  shifts: ShiftCreateManyWithoutEmployeeInput
  exceptions: ExceptionCreateManyWithoutEmployeeInput
  credits: ScheduleCreditCreateManyWithoutEmployeeInput
}

input EmployeeCreateWithoutDepartmentInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  shifts: ShiftCreateManyWithoutEmployeeInput
  exceptions: ExceptionCreateManyWithoutEmployeeInput
  credits: ScheduleCreditCreateManyWithoutEmployeeInput
  debits: ScheduleDebitCreateManyWithoutEmployeeInput
}

input EmployeeCreateWithoutExceptionsInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  shifts: ShiftCreateManyWithoutEmployeeInput
  credits: ScheduleCreditCreateManyWithoutEmployeeInput
  debits: ScheduleDebitCreateManyWithoutEmployeeInput
}

input EmployeeCreateWithoutShiftsInput {
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
  department: DepartmentCreateOneWithoutSubordinatesInput
  exceptions: ExceptionCreateManyWithoutEmployeeInput
  credits: ScheduleCreditCreateManyWithoutEmployeeInput
  debits: ScheduleDebitCreateManyWithoutEmployeeInput
}

enum EmployeeDocumentTypeEnum {
  CI
  PASSAPORTE
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
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  nameFirst: String!
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean!
  personaConDiscapacidad: Boolean!
  tutorPersonaConDiscapacidad: Boolean!
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean!
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int!
}

enum EmployeeSexEnum {
  F
  M
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
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
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

input EmployeeUpdateOneRequiredWithoutCreditsInput {
  create: EmployeeCreateWithoutCreditsInput
  update: EmployeeUpdateWithoutCreditsDataInput
  upsert: EmployeeUpsertWithoutCreditsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateOneRequiredWithoutDebitsInput {
  create: EmployeeCreateWithoutDebitsInput
  update: EmployeeUpdateWithoutDebitsDataInput
  upsert: EmployeeUpsertWithoutDebitsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateOneRequiredWithoutExceptionsInput {
  create: EmployeeCreateWithoutExceptionsInput
  update: EmployeeUpdateWithoutExceptionsDataInput
  upsert: EmployeeUpsertWithoutExceptionsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateOneRequiredWithoutShiftsInput {
  create: EmployeeCreateWithoutShiftsInput
  update: EmployeeUpdateWithoutShiftsDataInput
  upsert: EmployeeUpsertWithoutShiftsInput
  connect: EmployeeWhereUniqueInput
}

input EmployeeUpdateWithoutCreditsDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithoutDebitsDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithoutDepartmentDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  shifts: ShiftUpdateManyWithoutEmployeeInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithoutExceptionsDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  shifts: ShiftUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithoutShiftsDataInput {
  nameFirst: String
  nameMiddle: String
  namePaternal: String
  nameMaternal: String
  documentType: EmployeeDocumentTypeEnum
  documentNumber: String
  sex: EmployeeSexEnum
  dateOfBirth: DateTime
  nationality: String
  jubilado: Boolean
  personaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  aportaAFP: Boolean
  AFP: EmployeeAFPEnum
  cargo: String
  zkTimePin: Int
  department: DepartmentUpdateOneWithoutSubordinatesInput
  exceptions: ExceptionUpdateManyWithoutEmployeeInput
  credits: ScheduleCreditUpdateManyWithoutEmployeeInput
  debits: ScheduleDebitUpdateManyWithoutEmployeeInput
}

input EmployeeUpdateWithWhereUniqueWithoutDepartmentInput {
  where: EmployeeWhereUniqueInput!
  data: EmployeeUpdateWithoutDepartmentDataInput!
}

input EmployeeUpsertNestedInput {
  update: EmployeeUpdateDataInput!
  create: EmployeeCreateInput!
}

input EmployeeUpsertWithoutCreditsInput {
  update: EmployeeUpdateWithoutCreditsDataInput!
  create: EmployeeCreateWithoutCreditsInput!
}

input EmployeeUpsertWithoutDebitsInput {
  update: EmployeeUpdateWithoutDebitsDataInput!
  create: EmployeeCreateWithoutDebitsInput!
}

input EmployeeUpsertWithoutExceptionsInput {
  update: EmployeeUpdateWithoutExceptionsDataInput!
  create: EmployeeCreateWithoutExceptionsInput!
}

input EmployeeUpsertWithoutShiftsInput {
  update: EmployeeUpdateWithoutShiftsDataInput!
  create: EmployeeCreateWithoutShiftsInput!
}

input EmployeeUpsertWithWhereUniqueWithoutDepartmentInput {
  where: EmployeeWhereUniqueInput!
  update: EmployeeUpdateWithoutDepartmentDataInput!
  create: EmployeeCreateWithoutDepartmentInput!
}

input EmployeeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  documentType: EmployeeDocumentTypeEnum
  documentType_not: EmployeeDocumentTypeEnum
  documentType_in: [EmployeeDocumentTypeEnum!]
  documentType_not_in: [EmployeeDocumentTypeEnum!]
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
  sex: EmployeeSexEnum
  sex_not: EmployeeSexEnum
  sex_in: [EmployeeSexEnum!]
  sex_not_in: [EmployeeSexEnum!]
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
  jubilado: Boolean
  jubilado_not: Boolean
  personaConDiscapacidad: Boolean
  personaConDiscapacidad_not: Boolean
  tutorPersonaConDiscapacidad: Boolean
  tutorPersonaConDiscapacidad_not: Boolean
  cajaDeSalud: EmployeeCajaDeSaludEnum
  cajaDeSalud_not: EmployeeCajaDeSaludEnum
  cajaDeSalud_in: [EmployeeCajaDeSaludEnum!]
  cajaDeSalud_not_in: [EmployeeCajaDeSaludEnum!]
  aportaAFP: Boolean
  aportaAFP_not: Boolean
  AFP: EmployeeAFPEnum
  AFP_not: EmployeeAFPEnum
  AFP_in: [EmployeeAFPEnum!]
  AFP_not_in: [EmployeeAFPEnum!]
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
  exceptions_every: ExceptionWhereInput
  exceptions_some: ExceptionWhereInput
  exceptions_none: ExceptionWhereInput
  credits_every: ScheduleCreditWhereInput
  credits_some: ScheduleCreditWhereInput
  credits_none: ScheduleCreditWhereInput
  debits_every: ScheduleDebitWhereInput
  debits_some: ScheduleDebitWhereInput
  debits_none: ScheduleDebitWhereInput
  AND: [EmployeeWhereInput!]
  OR: [EmployeeWhereInput!]
  NOT: [EmployeeWhereInput!]
}

input EmployeeWhereUniqueInput {
  id: ID
}

type Exception {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  employee: Employee!
  description: String
  slots(where: ExceptionSlotWhereInput, orderBy: ExceptionSlotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExceptionSlot!]
  authorization: ExceptionAuthorization
  owner: User!
  credits(where: ScheduleCreditWhereInput, orderBy: ScheduleCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleCredit!]
  debits(where: ScheduleDebitWhereInput, orderBy: ScheduleDebitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleDebit!]
}

type ExceptionAuthorization {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  granted: Boolean!
  exception: Exception!
  owner: User!
}

type ExceptionAuthorizationConnection {
  pageInfo: PageInfo!
  edges: [ExceptionAuthorizationEdge]!
  aggregate: AggregateExceptionAuthorization!
}

input ExceptionAuthorizationCreateInput {
  granted: Boolean!
  exception: ExceptionCreateOneWithoutAuthorizationInput!
  owner: UserCreateOneInput!
}

input ExceptionAuthorizationCreateOneWithoutExceptionInput {
  create: ExceptionAuthorizationCreateWithoutExceptionInput
  connect: ExceptionAuthorizationWhereUniqueInput
}

input ExceptionAuthorizationCreateWithoutExceptionInput {
  granted: Boolean!
  owner: UserCreateOneInput!
}

type ExceptionAuthorizationEdge {
  node: ExceptionAuthorization!
  cursor: String!
}

enum ExceptionAuthorizationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  granted_ASC
  granted_DESC
}

type ExceptionAuthorizationPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  exception: ExceptionUpdateOneRequiredWithoutAuthorizationInput
  owner: UserUpdateOneRequiredInput
}

input ExceptionAuthorizationUpdateOneWithoutExceptionInput {
  create: ExceptionAuthorizationCreateWithoutExceptionInput
  update: ExceptionAuthorizationUpdateWithoutExceptionDataInput
  upsert: ExceptionAuthorizationUpsertWithoutExceptionInput
  delete: Boolean
  disconnect: Boolean
  connect: ExceptionAuthorizationWhereUniqueInput
}

input ExceptionAuthorizationUpdateWithoutExceptionDataInput {
  granted: Boolean
  owner: UserUpdateOneRequiredInput
}

input ExceptionAuthorizationUpsertWithoutExceptionInput {
  update: ExceptionAuthorizationUpdateWithoutExceptionDataInput!
  create: ExceptionAuthorizationCreateWithoutExceptionInput!
}

input ExceptionAuthorizationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  granted: Boolean
  granted_not: Boolean
  exception: ExceptionWhereInput
  owner: UserWhereInput
  AND: [ExceptionAuthorizationWhereInput!]
  OR: [ExceptionAuthorizationWhereInput!]
  NOT: [ExceptionAuthorizationWhereInput!]
}

input ExceptionAuthorizationWhereUniqueInput {
  id: ID
}

type ExceptionConnection {
  pageInfo: PageInfo!
  edges: [ExceptionEdge]!
  aggregate: AggregateException!
}

input ExceptionCreateInput {
  employee: EmployeeCreateOneWithoutExceptionsInput!
  description: String
  slots: ExceptionSlotCreateManyInput
  authorization: ExceptionAuthorizationCreateOneWithoutExceptionInput
  owner: UserCreateOneInput!
  credits: ScheduleCreditCreateManyWithoutSourceExceptionInput
  debits: ScheduleDebitCreateManyWithoutExceptionInput
}

input ExceptionCreateManyWithoutEmployeeInput {
  create: [ExceptionCreateWithoutEmployeeInput!]
  connect: [ExceptionWhereUniqueInput!]
}

input ExceptionCreateOneWithoutAuthorizationInput {
  create: ExceptionCreateWithoutAuthorizationInput
  connect: ExceptionWhereUniqueInput
}

input ExceptionCreateOneWithoutCreditsInput {
  create: ExceptionCreateWithoutCreditsInput
  connect: ExceptionWhereUniqueInput
}

input ExceptionCreateOneWithoutDebitsInput {
  create: ExceptionCreateWithoutDebitsInput
  connect: ExceptionWhereUniqueInput
}

input ExceptionCreateWithoutAuthorizationInput {
  employee: EmployeeCreateOneWithoutExceptionsInput!
  description: String
  slots: ExceptionSlotCreateManyInput
  owner: UserCreateOneInput!
  credits: ScheduleCreditCreateManyWithoutSourceExceptionInput
  debits: ScheduleDebitCreateManyWithoutExceptionInput
}

input ExceptionCreateWithoutCreditsInput {
  employee: EmployeeCreateOneWithoutExceptionsInput!
  description: String
  slots: ExceptionSlotCreateManyInput
  authorization: ExceptionAuthorizationCreateOneWithoutExceptionInput
  owner: UserCreateOneInput!
  debits: ScheduleDebitCreateManyWithoutExceptionInput
}

input ExceptionCreateWithoutDebitsInput {
  employee: EmployeeCreateOneWithoutExceptionsInput!
  description: String
  slots: ExceptionSlotCreateManyInput
  authorization: ExceptionAuthorizationCreateOneWithoutExceptionInput
  owner: UserCreateOneInput!
  credits: ScheduleCreditCreateManyWithoutSourceExceptionInput
}

input ExceptionCreateWithoutEmployeeInput {
  description: String
  slots: ExceptionSlotCreateManyInput
  authorization: ExceptionAuthorizationCreateOneWithoutExceptionInput
  owner: UserCreateOneInput!
  credits: ScheduleCreditCreateManyWithoutSourceExceptionInput
  debits: ScheduleDebitCreateManyWithoutExceptionInput
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
  description_ASC
  description_DESC
}

type ExceptionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
}

type ExceptionSlot {
  id: ID!
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
  id: ID!
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  id: ID
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
  employee: EmployeeUpdateOneRequiredWithoutExceptionsInput
  description: String
  slots: ExceptionSlotUpdateManyInput
  authorization: ExceptionAuthorizationUpdateOneWithoutExceptionInput
  owner: UserUpdateOneRequiredInput
  credits: ScheduleCreditUpdateManyWithoutSourceExceptionInput
  debits: ScheduleDebitUpdateManyWithoutExceptionInput
}

input ExceptionUpdateManyWithoutEmployeeInput {
  create: [ExceptionCreateWithoutEmployeeInput!]
  delete: [ExceptionWhereUniqueInput!]
  connect: [ExceptionWhereUniqueInput!]
  disconnect: [ExceptionWhereUniqueInput!]
  update: [ExceptionUpdateWithWhereUniqueWithoutEmployeeInput!]
  upsert: [ExceptionUpsertWithWhereUniqueWithoutEmployeeInput!]
}

input ExceptionUpdateOneRequiredWithoutAuthorizationInput {
  create: ExceptionCreateWithoutAuthorizationInput
  update: ExceptionUpdateWithoutAuthorizationDataInput
  upsert: ExceptionUpsertWithoutAuthorizationInput
  connect: ExceptionWhereUniqueInput
}

input ExceptionUpdateOneRequiredWithoutDebitsInput {
  create: ExceptionCreateWithoutDebitsInput
  update: ExceptionUpdateWithoutDebitsDataInput
  upsert: ExceptionUpsertWithoutDebitsInput
  connect: ExceptionWhereUniqueInput
}

input ExceptionUpdateOneWithoutCreditsInput {
  create: ExceptionCreateWithoutCreditsInput
  update: ExceptionUpdateWithoutCreditsDataInput
  upsert: ExceptionUpsertWithoutCreditsInput
  delete: Boolean
  disconnect: Boolean
  connect: ExceptionWhereUniqueInput
}

input ExceptionUpdateWithoutAuthorizationDataInput {
  employee: EmployeeUpdateOneRequiredWithoutExceptionsInput
  description: String
  slots: ExceptionSlotUpdateManyInput
  owner: UserUpdateOneRequiredInput
  credits: ScheduleCreditUpdateManyWithoutSourceExceptionInput
  debits: ScheduleDebitUpdateManyWithoutExceptionInput
}

input ExceptionUpdateWithoutCreditsDataInput {
  employee: EmployeeUpdateOneRequiredWithoutExceptionsInput
  description: String
  slots: ExceptionSlotUpdateManyInput
  authorization: ExceptionAuthorizationUpdateOneWithoutExceptionInput
  owner: UserUpdateOneRequiredInput
  debits: ScheduleDebitUpdateManyWithoutExceptionInput
}

input ExceptionUpdateWithoutDebitsDataInput {
  employee: EmployeeUpdateOneRequiredWithoutExceptionsInput
  description: String
  slots: ExceptionSlotUpdateManyInput
  authorization: ExceptionAuthorizationUpdateOneWithoutExceptionInput
  owner: UserUpdateOneRequiredInput
  credits: ScheduleCreditUpdateManyWithoutSourceExceptionInput
}

input ExceptionUpdateWithoutEmployeeDataInput {
  description: String
  slots: ExceptionSlotUpdateManyInput
  authorization: ExceptionAuthorizationUpdateOneWithoutExceptionInput
  owner: UserUpdateOneRequiredInput
  credits: ScheduleCreditUpdateManyWithoutSourceExceptionInput
  debits: ScheduleDebitUpdateManyWithoutExceptionInput
}

input ExceptionUpdateWithWhereUniqueWithoutEmployeeInput {
  where: ExceptionWhereUniqueInput!
  data: ExceptionUpdateWithoutEmployeeDataInput!
}

input ExceptionUpsertWithoutAuthorizationInput {
  update: ExceptionUpdateWithoutAuthorizationDataInput!
  create: ExceptionCreateWithoutAuthorizationInput!
}

input ExceptionUpsertWithoutCreditsInput {
  update: ExceptionUpdateWithoutCreditsDataInput!
  create: ExceptionCreateWithoutCreditsInput!
}

input ExceptionUpsertWithoutDebitsInput {
  update: ExceptionUpdateWithoutDebitsDataInput!
  create: ExceptionCreateWithoutDebitsInput!
}

input ExceptionUpsertWithWhereUniqueWithoutEmployeeInput {
  where: ExceptionWhereUniqueInput!
  update: ExceptionUpdateWithoutEmployeeDataInput!
  create: ExceptionCreateWithoutEmployeeInput!
}

input ExceptionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  employee: EmployeeWhereInput
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
  slots_every: ExceptionSlotWhereInput
  slots_some: ExceptionSlotWhereInput
  slots_none: ExceptionSlotWhereInput
  authorization: ExceptionAuthorizationWhereInput
  owner: UserWhereInput
  credits_every: ScheduleCreditWhereInput
  credits_some: ScheduleCreditWhereInput
  credits_none: ScheduleCreditWhereInput
  debits_every: ScheduleDebitWhereInput
  debits_some: ScheduleDebitWhereInput
  debits_none: ScheduleDebitWhereInput
  AND: [ExceptionWhereInput!]
  OR: [ExceptionWhereInput!]
  NOT: [ExceptionWhereInput!]
}

input ExceptionWhereUniqueInput {
  id: ID
}

type FieldOptionLabel {
  id: ID!
  field: String!
  value: String!
  label: String
}

type FieldOptionLabelConnection {
  pageInfo: PageInfo!
  edges: [FieldOptionLabelEdge]!
  aggregate: AggregateFieldOptionLabel!
}

input FieldOptionLabelCreateInput {
  field: String!
  value: String!
  label: String
}

type FieldOptionLabelEdge {
  node: FieldOptionLabel!
  cursor: String!
}

enum FieldOptionLabelOrderByInput {
  id_ASC
  id_DESC
  field_ASC
  field_DESC
  value_ASC
  value_DESC
  label_ASC
  label_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FieldOptionLabelPreviousValues {
  id: ID!
  field: String!
  value: String!
  label: String
}

type FieldOptionLabelSubscriptionPayload {
  mutation: MutationType!
  node: FieldOptionLabel
  updatedFields: [String!]
  previousValues: FieldOptionLabelPreviousValues
}

input FieldOptionLabelSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FieldOptionLabelWhereInput
  AND: [FieldOptionLabelSubscriptionWhereInput!]
  OR: [FieldOptionLabelSubscriptionWhereInput!]
  NOT: [FieldOptionLabelSubscriptionWhereInput!]
}

input FieldOptionLabelUpdateInput {
  field: String
  value: String
  label: String
}

input FieldOptionLabelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  field: String
  field_not: String
  field_in: [String!]
  field_not_in: [String!]
  field_lt: String
  field_lte: String
  field_gt: String
  field_gte: String
  field_contains: String
  field_not_contains: String
  field_starts_with: String
  field_not_starts_with: String
  field_ends_with: String
  field_not_ends_with: String
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  AND: [FieldOptionLabelWhereInput!]
  OR: [FieldOptionLabelWhereInput!]
  NOT: [FieldOptionLabelWhereInput!]
}

input FieldOptionLabelWhereUniqueInput {
  id: ID
}

type Holiday {
  id: ID!
  date: DateTime!
  name: String!
}

type HolidayConnection {
  pageInfo: PageInfo!
  edges: [HolidayEdge]!
  aggregate: AggregateHoliday!
}

input HolidayCreateInput {
  date: DateTime!
  name: String!
}

input HolidayCreateOneInput {
  create: HolidayCreateInput
  connect: HolidayWhereUniqueInput
}

type HolidayEdge {
  node: Holiday!
  cursor: String!
}

enum HolidayOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HolidayPreviousValues {
  id: ID!
  date: DateTime!
  name: String!
}

type HolidaySubscriptionPayload {
  mutation: MutationType!
  node: Holiday
  updatedFields: [String!]
  previousValues: HolidayPreviousValues
}

input HolidaySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HolidayWhereInput
  AND: [HolidaySubscriptionWhereInput!]
  OR: [HolidaySubscriptionWhereInput!]
  NOT: [HolidaySubscriptionWhereInput!]
}

input HolidayUpdateDataInput {
  date: DateTime
  name: String
}

input HolidayUpdateInput {
  date: DateTime
  name: String
}

input HolidayUpdateOneInput {
  create: HolidayCreateInput
  update: HolidayUpdateDataInput
  upsert: HolidayUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: HolidayWhereUniqueInput
}

input HolidayUpsertNestedInput {
  update: HolidayUpdateDataInput!
  create: HolidayCreateInput!
}

input HolidayWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
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
  AND: [HolidayWhereInput!]
  OR: [HolidayWhereInput!]
  NOT: [HolidayWhereInput!]
}

input HolidayWhereUniqueInput {
  id: ID
  date: DateTime
}

scalar Long

type Mutation {
  createAttendanceCycle(data: AttendanceCycleCreateInput!): AttendanceCycle!
  updateAttendanceCycle(data: AttendanceCycleUpdateInput!, where: AttendanceCycleWhereUniqueInput!): AttendanceCycle
  updateManyAttendanceCycles(data: AttendanceCycleUpdateInput!, where: AttendanceCycleWhereInput): BatchPayload!
  upsertAttendanceCycle(where: AttendanceCycleWhereUniqueInput!, create: AttendanceCycleCreateInput!, update: AttendanceCycleUpdateInput!): AttendanceCycle!
  deleteAttendanceCycle(where: AttendanceCycleWhereUniqueInput!): AttendanceCycle
  deleteManyAttendanceCycles(where: AttendanceCycleWhereInput): BatchPayload!
  createDepartment(data: DepartmentCreateInput!): Department!
  updateDepartment(data: DepartmentUpdateInput!, where: DepartmentWhereUniqueInput!): Department
  updateManyDepartments(data: DepartmentUpdateInput!, where: DepartmentWhereInput): BatchPayload!
  upsertDepartment(where: DepartmentWhereUniqueInput!, create: DepartmentCreateInput!, update: DepartmentUpdateInput!): Department!
  deleteDepartment(where: DepartmentWhereUniqueInput!): Department
  deleteManyDepartments(where: DepartmentWhereInput): BatchPayload!
  createDirectCredit(data: DirectCreditCreateInput!): DirectCredit!
  updateDirectCredit(data: DirectCreditUpdateInput!, where: DirectCreditWhereUniqueInput!): DirectCredit
  updateManyDirectCredits(data: DirectCreditUpdateInput!, where: DirectCreditWhereInput): BatchPayload!
  upsertDirectCredit(where: DirectCreditWhereUniqueInput!, create: DirectCreditCreateInput!, update: DirectCreditUpdateInput!): DirectCredit!
  deleteDirectCredit(where: DirectCreditWhereUniqueInput!): DirectCredit
  deleteManyDirectCredits(where: DirectCreditWhereInput): BatchPayload!
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
  createFieldOptionLabel(data: FieldOptionLabelCreateInput!): FieldOptionLabel!
  updateFieldOptionLabel(data: FieldOptionLabelUpdateInput!, where: FieldOptionLabelWhereUniqueInput!): FieldOptionLabel
  updateManyFieldOptionLabels(data: FieldOptionLabelUpdateInput!, where: FieldOptionLabelWhereInput): BatchPayload!
  upsertFieldOptionLabel(where: FieldOptionLabelWhereUniqueInput!, create: FieldOptionLabelCreateInput!, update: FieldOptionLabelUpdateInput!): FieldOptionLabel!
  deleteFieldOptionLabel(where: FieldOptionLabelWhereUniqueInput!): FieldOptionLabel
  deleteManyFieldOptionLabels(where: FieldOptionLabelWhereInput): BatchPayload!
  createHoliday(data: HolidayCreateInput!): Holiday!
  updateHoliday(data: HolidayUpdateInput!, where: HolidayWhereUniqueInput!): Holiday
  updateManyHolidays(data: HolidayUpdateInput!, where: HolidayWhereInput): BatchPayload!
  upsertHoliday(where: HolidayWhereUniqueInput!, create: HolidayCreateInput!, update: HolidayUpdateInput!): Holiday!
  deleteHoliday(where: HolidayWhereUniqueInput!): Holiday
  deleteManyHolidays(where: HolidayWhereInput): BatchPayload!
  createSchedule(data: ScheduleCreateInput!): Schedule!
  updateSchedule(data: ScheduleUpdateInput!, where: ScheduleWhereUniqueInput!): Schedule
  updateManySchedules(data: ScheduleUpdateInput!, where: ScheduleWhereInput): BatchPayload!
  upsertSchedule(where: ScheduleWhereUniqueInput!, create: ScheduleCreateInput!, update: ScheduleUpdateInput!): Schedule!
  deleteSchedule(where: ScheduleWhereUniqueInput!): Schedule
  deleteManySchedules(where: ScheduleWhereInput): BatchPayload!
  createScheduleCategoryConfig(data: ScheduleCategoryConfigCreateInput!): ScheduleCategoryConfig!
  updateScheduleCategoryConfig(data: ScheduleCategoryConfigUpdateInput!, where: ScheduleCategoryConfigWhereUniqueInput!): ScheduleCategoryConfig
  updateManyScheduleCategoryConfigs(data: ScheduleCategoryConfigUpdateInput!, where: ScheduleCategoryConfigWhereInput): BatchPayload!
  upsertScheduleCategoryConfig(where: ScheduleCategoryConfigWhereUniqueInput!, create: ScheduleCategoryConfigCreateInput!, update: ScheduleCategoryConfigUpdateInput!): ScheduleCategoryConfig!
  deleteScheduleCategoryConfig(where: ScheduleCategoryConfigWhereUniqueInput!): ScheduleCategoryConfig
  deleteManyScheduleCategoryConfigs(where: ScheduleCategoryConfigWhereInput): BatchPayload!
  createScheduleCredit(data: ScheduleCreditCreateInput!): ScheduleCredit!
  updateScheduleCredit(data: ScheduleCreditUpdateInput!, where: ScheduleCreditWhereUniqueInput!): ScheduleCredit
  updateManyScheduleCredits(data: ScheduleCreditUpdateInput!, where: ScheduleCreditWhereInput): BatchPayload!
  upsertScheduleCredit(where: ScheduleCreditWhereUniqueInput!, create: ScheduleCreditCreateInput!, update: ScheduleCreditUpdateInput!): ScheduleCredit!
  deleteScheduleCredit(where: ScheduleCreditWhereUniqueInput!): ScheduleCredit
  deleteManyScheduleCredits(where: ScheduleCreditWhereInput): BatchPayload!
  createScheduleDebit(data: ScheduleDebitCreateInput!): ScheduleDebit!
  updateScheduleDebit(data: ScheduleDebitUpdateInput!, where: ScheduleDebitWhereUniqueInput!): ScheduleDebit
  updateManyScheduleDebits(data: ScheduleDebitUpdateInput!, where: ScheduleDebitWhereInput): BatchPayload!
  upsertScheduleDebit(where: ScheduleDebitWhereUniqueInput!, create: ScheduleDebitCreateInput!, update: ScheduleDebitUpdateInput!): ScheduleDebit!
  deleteScheduleDebit(where: ScheduleDebitWhereUniqueInput!): ScheduleDebit
  deleteManyScheduleDebits(where: ScheduleDebitWhereInput): BatchPayload!
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
  createUserRole(data: UserRoleCreateInput!): UserRole!
  updateUserRole(data: UserRoleUpdateInput!, where: UserRoleWhereUniqueInput!): UserRole
  updateManyUserRoles(data: UserRoleUpdateInput!, where: UserRoleWhereInput): BatchPayload!
  upsertUserRole(where: UserRoleWhereUniqueInput!, create: UserRoleCreateInput!, update: UserRoleUpdateInput!): UserRole!
  deleteUserRole(where: UserRoleWhereUniqueInput!): UserRole
  deleteManyUserRoles(where: UserRoleWhereInput): BatchPayload!
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
  attendanceCycle(where: AttendanceCycleWhereUniqueInput!): AttendanceCycle
  attendanceCycles(where: AttendanceCycleWhereInput, orderBy: AttendanceCycleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AttendanceCycle]!
  attendanceCyclesConnection(where: AttendanceCycleWhereInput, orderBy: AttendanceCycleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AttendanceCycleConnection!
  department(where: DepartmentWhereUniqueInput!): Department
  departments(where: DepartmentWhereInput, orderBy: DepartmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Department]!
  departmentsConnection(where: DepartmentWhereInput, orderBy: DepartmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DepartmentConnection!
  directCredit(where: DirectCreditWhereUniqueInput!): DirectCredit
  directCredits(where: DirectCreditWhereInput, orderBy: DirectCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DirectCredit]!
  directCreditsConnection(where: DirectCreditWhereInput, orderBy: DirectCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DirectCreditConnection!
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
  fieldOptionLabel(where: FieldOptionLabelWhereUniqueInput!): FieldOptionLabel
  fieldOptionLabels(where: FieldOptionLabelWhereInput, orderBy: FieldOptionLabelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FieldOptionLabel]!
  fieldOptionLabelsConnection(where: FieldOptionLabelWhereInput, orderBy: FieldOptionLabelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FieldOptionLabelConnection!
  holiday(where: HolidayWhereUniqueInput!): Holiday
  holidays(where: HolidayWhereInput, orderBy: HolidayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Holiday]!
  holidaysConnection(where: HolidayWhereInput, orderBy: HolidayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HolidayConnection!
  schedule(where: ScheduleWhereUniqueInput!): Schedule
  schedules(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Schedule]!
  schedulesConnection(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleConnection!
  scheduleCategoryConfig(where: ScheduleCategoryConfigWhereUniqueInput!): ScheduleCategoryConfig
  scheduleCategoryConfigs(where: ScheduleCategoryConfigWhereInput, orderBy: ScheduleCategoryConfigOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleCategoryConfig]!
  scheduleCategoryConfigsConnection(where: ScheduleCategoryConfigWhereInput, orderBy: ScheduleCategoryConfigOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleCategoryConfigConnection!
  scheduleCredit(where: ScheduleCreditWhereUniqueInput!): ScheduleCredit
  scheduleCredits(where: ScheduleCreditWhereInput, orderBy: ScheduleCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleCredit]!
  scheduleCreditsConnection(where: ScheduleCreditWhereInput, orderBy: ScheduleCreditOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleCreditConnection!
  scheduleDebit(where: ScheduleDebitWhereUniqueInput!): ScheduleDebit
  scheduleDebits(where: ScheduleDebitWhereInput, orderBy: ScheduleDebitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleDebit]!
  scheduleDebitsConnection(where: ScheduleDebitWhereInput, orderBy: ScheduleDebitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleDebitConnection!
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
  userRole(where: UserRoleWhereUniqueInput!): UserRole
  userRoles(where: UserRoleWhereInput, orderBy: UserRoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserRole]!
  userRolesConnection(where: UserRoleWhereInput, orderBy: UserRoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserRoleConnection!
  node(id: ID!): Node
}

type Schedule {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  baseTime: Int!
  isPreset: Boolean
  timeline(where: ScheduleTimelineElementWhereInput, orderBy: ScheduleTimelineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleTimelineElement!]
  restline(where: ScheduleRestlineElementWhereInput, orderBy: ScheduleRestlineElementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleRestlineElement!]
  offline1: ScheduleOfflineElement
  offline2: ScheduleOfflineElement
}

enum ScheduleCategory {
  SCH_TIME_WORK
  SCH_TIME_EXTRA
  SCH_TIME_MATERNAL
  SCH_TIME_LEAVE
  SCH_REST_LUNCH
  SCH_DAY_OFF
  SCH_DAY_VACATION
  SCH_DAY_HOLIDAY
  SCH_DAY_SICK
  SCH_DAY_PAID
  SCH_DAY_UNPAID
}

type ScheduleCategoryConfig {
  id: ID!
  category: ScheduleCategory
  color: String!
  label: String
}

type ScheduleCategoryConfigConnection {
  pageInfo: PageInfo!
  edges: [ScheduleCategoryConfigEdge]!
  aggregate: AggregateScheduleCategoryConfig!
}

input ScheduleCategoryConfigCreateInput {
  category: ScheduleCategory
  color: String
  label: String
}

type ScheduleCategoryConfigEdge {
  node: ScheduleCategoryConfig!
  cursor: String!
}

enum ScheduleCategoryConfigOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  color_ASC
  color_DESC
  label_ASC
  label_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleCategoryConfigPreviousValues {
  id: ID!
  category: ScheduleCategory
  color: String!
  label: String
}

type ScheduleCategoryConfigSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleCategoryConfig
  updatedFields: [String!]
  previousValues: ScheduleCategoryConfigPreviousValues
}

input ScheduleCategoryConfigSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleCategoryConfigWhereInput
  AND: [ScheduleCategoryConfigSubscriptionWhereInput!]
  OR: [ScheduleCategoryConfigSubscriptionWhereInput!]
  NOT: [ScheduleCategoryConfigSubscriptionWhereInput!]
}

input ScheduleCategoryConfigUpdateInput {
  category: ScheduleCategory
  color: String
  label: String
}

input ScheduleCategoryConfigWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  category: ScheduleCategory
  category_not: ScheduleCategory
  category_in: [ScheduleCategory!]
  category_not_in: [ScheduleCategory!]
  color: String
  color_not: String
  color_in: [String!]
  color_not_in: [String!]
  color_lt: String
  color_lte: String
  color_gt: String
  color_gte: String
  color_contains: String
  color_not_contains: String
  color_starts_with: String
  color_not_starts_with: String
  color_ends_with: String
  color_not_ends_with: String
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  AND: [ScheduleCategoryConfigWhereInput!]
  OR: [ScheduleCategoryConfigWhereInput!]
  NOT: [ScheduleCategoryConfigWhereInput!]
}

input ScheduleCategoryConfigWhereUniqueInput {
  id: ID
}

type ScheduleConnection {
  pageInfo: PageInfo!
  edges: [ScheduleEdge]!
  aggregate: AggregateSchedule!
}

input ScheduleCreateInput {
  description: String
  baseTime: Int!
  isPreset: Boolean
  timeline: ScheduleTimelineElementCreateManyInput
  restline: ScheduleRestlineElementCreateManyInput
  offline1: ScheduleOfflineElementCreateOneInput
  offline2: ScheduleOfflineElementCreateOneInput
}

input ScheduleCreateOneInput {
  create: ScheduleCreateInput
  connect: ScheduleWhereUniqueInput
}

type ScheduleCredit {
  id: ID!
  employee: Employee!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceException: Exception
  sourceDirect: DirectCredit
  sourceConcurentHoliday: Holiday
  sourceDate: DateTime!
  debit: ScheduleDebit
}

type ScheduleCreditConnection {
  pageInfo: PageInfo!
  edges: [ScheduleCreditEdge]!
  aggregate: AggregateScheduleCredit!
}

input ScheduleCreditCreateInput {
  employee: EmployeeCreateOneWithoutCreditsInput!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceException: ExceptionCreateOneWithoutCreditsInput
  sourceDirect: DirectCreditCreateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayCreateOneInput
  sourceDate: DateTime!
  debit: ScheduleDebitCreateOneWithoutCreditInput
}

input ScheduleCreditCreateManyWithoutEmployeeInput {
  create: [ScheduleCreditCreateWithoutEmployeeInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
}

input ScheduleCreditCreateManyWithoutSourceDirectInput {
  create: [ScheduleCreditCreateWithoutSourceDirectInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
}

input ScheduleCreditCreateManyWithoutSourceExceptionInput {
  create: [ScheduleCreditCreateWithoutSourceExceptionInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
}

input ScheduleCreditCreateOneWithoutDebitInput {
  create: ScheduleCreditCreateWithoutDebitInput
  connect: ScheduleCreditWhereUniqueInput
}

input ScheduleCreditCreateWithoutDebitInput {
  employee: EmployeeCreateOneWithoutCreditsInput!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceException: ExceptionCreateOneWithoutCreditsInput
  sourceDirect: DirectCreditCreateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayCreateOneInput
  sourceDate: DateTime!
}

input ScheduleCreditCreateWithoutEmployeeInput {
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceException: ExceptionCreateOneWithoutCreditsInput
  sourceDirect: DirectCreditCreateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayCreateOneInput
  sourceDate: DateTime!
  debit: ScheduleDebitCreateOneWithoutCreditInput
}

input ScheduleCreditCreateWithoutSourceDirectInput {
  employee: EmployeeCreateOneWithoutCreditsInput!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceException: ExceptionCreateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayCreateOneInput
  sourceDate: DateTime!
  debit: ScheduleDebitCreateOneWithoutCreditInput
}

input ScheduleCreditCreateWithoutSourceExceptionInput {
  employee: EmployeeCreateOneWithoutCreditsInput!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceDirect: DirectCreditCreateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayCreateOneInput
  sourceDate: DateTime!
  debit: ScheduleDebitCreateOneWithoutCreditInput
}

type ScheduleCreditEdge {
  node: ScheduleCredit!
  cursor: String!
}

enum ScheduleCreditOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  sourceType_ASC
  sourceType_DESC
  sourceDate_ASC
  sourceDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleCreditPreviousValues {
  id: ID!
  category: ScheduleOfflineCategory!
  sourceType: ScheduleCreditSourceEnum!
  sourceDate: DateTime!
}

enum ScheduleCreditSourceEnum {
  EXCEPTION
  CONCURENT_HOLIDAY
  DIRECT_CREDIT
}

type ScheduleCreditSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleCredit
  updatedFields: [String!]
  previousValues: ScheduleCreditPreviousValues
}

input ScheduleCreditSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleCreditWhereInput
  AND: [ScheduleCreditSubscriptionWhereInput!]
  OR: [ScheduleCreditSubscriptionWhereInput!]
  NOT: [ScheduleCreditSubscriptionWhereInput!]
}

input ScheduleCreditUpdateInput {
  employee: EmployeeUpdateOneRequiredWithoutCreditsInput
  category: ScheduleOfflineCategory
  sourceType: ScheduleCreditSourceEnum
  sourceException: ExceptionUpdateOneWithoutCreditsInput
  sourceDirect: DirectCreditUpdateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayUpdateOneInput
  sourceDate: DateTime
  debit: ScheduleDebitUpdateOneWithoutCreditInput
}

input ScheduleCreditUpdateManyWithoutEmployeeInput {
  create: [ScheduleCreditCreateWithoutEmployeeInput!]
  delete: [ScheduleCreditWhereUniqueInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
  disconnect: [ScheduleCreditWhereUniqueInput!]
  update: [ScheduleCreditUpdateWithWhereUniqueWithoutEmployeeInput!]
  upsert: [ScheduleCreditUpsertWithWhereUniqueWithoutEmployeeInput!]
}

input ScheduleCreditUpdateManyWithoutSourceDirectInput {
  create: [ScheduleCreditCreateWithoutSourceDirectInput!]
  delete: [ScheduleCreditWhereUniqueInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
  disconnect: [ScheduleCreditWhereUniqueInput!]
  update: [ScheduleCreditUpdateWithWhereUniqueWithoutSourceDirectInput!]
  upsert: [ScheduleCreditUpsertWithWhereUniqueWithoutSourceDirectInput!]
}

input ScheduleCreditUpdateManyWithoutSourceExceptionInput {
  create: [ScheduleCreditCreateWithoutSourceExceptionInput!]
  delete: [ScheduleCreditWhereUniqueInput!]
  connect: [ScheduleCreditWhereUniqueInput!]
  disconnect: [ScheduleCreditWhereUniqueInput!]
  update: [ScheduleCreditUpdateWithWhereUniqueWithoutSourceExceptionInput!]
  upsert: [ScheduleCreditUpsertWithWhereUniqueWithoutSourceExceptionInput!]
}

input ScheduleCreditUpdateOneRequiredWithoutDebitInput {
  create: ScheduleCreditCreateWithoutDebitInput
  update: ScheduleCreditUpdateWithoutDebitDataInput
  upsert: ScheduleCreditUpsertWithoutDebitInput
  connect: ScheduleCreditWhereUniqueInput
}

input ScheduleCreditUpdateWithoutDebitDataInput {
  employee: EmployeeUpdateOneRequiredWithoutCreditsInput
  category: ScheduleOfflineCategory
  sourceType: ScheduleCreditSourceEnum
  sourceException: ExceptionUpdateOneWithoutCreditsInput
  sourceDirect: DirectCreditUpdateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayUpdateOneInput
  sourceDate: DateTime
}

input ScheduleCreditUpdateWithoutEmployeeDataInput {
  category: ScheduleOfflineCategory
  sourceType: ScheduleCreditSourceEnum
  sourceException: ExceptionUpdateOneWithoutCreditsInput
  sourceDirect: DirectCreditUpdateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayUpdateOneInput
  sourceDate: DateTime
  debit: ScheduleDebitUpdateOneWithoutCreditInput
}

input ScheduleCreditUpdateWithoutSourceDirectDataInput {
  employee: EmployeeUpdateOneRequiredWithoutCreditsInput
  category: ScheduleOfflineCategory
  sourceType: ScheduleCreditSourceEnum
  sourceException: ExceptionUpdateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayUpdateOneInput
  sourceDate: DateTime
  debit: ScheduleDebitUpdateOneWithoutCreditInput
}

input ScheduleCreditUpdateWithoutSourceExceptionDataInput {
  employee: EmployeeUpdateOneRequiredWithoutCreditsInput
  category: ScheduleOfflineCategory
  sourceType: ScheduleCreditSourceEnum
  sourceDirect: DirectCreditUpdateOneWithoutCreditsInput
  sourceConcurentHoliday: HolidayUpdateOneInput
  sourceDate: DateTime
  debit: ScheduleDebitUpdateOneWithoutCreditInput
}

input ScheduleCreditUpdateWithWhereUniqueWithoutEmployeeInput {
  where: ScheduleCreditWhereUniqueInput!
  data: ScheduleCreditUpdateWithoutEmployeeDataInput!
}

input ScheduleCreditUpdateWithWhereUniqueWithoutSourceDirectInput {
  where: ScheduleCreditWhereUniqueInput!
  data: ScheduleCreditUpdateWithoutSourceDirectDataInput!
}

input ScheduleCreditUpdateWithWhereUniqueWithoutSourceExceptionInput {
  where: ScheduleCreditWhereUniqueInput!
  data: ScheduleCreditUpdateWithoutSourceExceptionDataInput!
}

input ScheduleCreditUpsertWithoutDebitInput {
  update: ScheduleCreditUpdateWithoutDebitDataInput!
  create: ScheduleCreditCreateWithoutDebitInput!
}

input ScheduleCreditUpsertWithWhereUniqueWithoutEmployeeInput {
  where: ScheduleCreditWhereUniqueInput!
  update: ScheduleCreditUpdateWithoutEmployeeDataInput!
  create: ScheduleCreditCreateWithoutEmployeeInput!
}

input ScheduleCreditUpsertWithWhereUniqueWithoutSourceDirectInput {
  where: ScheduleCreditWhereUniqueInput!
  update: ScheduleCreditUpdateWithoutSourceDirectDataInput!
  create: ScheduleCreditCreateWithoutSourceDirectInput!
}

input ScheduleCreditUpsertWithWhereUniqueWithoutSourceExceptionInput {
  where: ScheduleCreditWhereUniqueInput!
  update: ScheduleCreditUpdateWithoutSourceExceptionDataInput!
  create: ScheduleCreditCreateWithoutSourceExceptionInput!
}

input ScheduleCreditWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  employee: EmployeeWhereInput
  category: ScheduleOfflineCategory
  category_not: ScheduleOfflineCategory
  category_in: [ScheduleOfflineCategory!]
  category_not_in: [ScheduleOfflineCategory!]
  sourceType: ScheduleCreditSourceEnum
  sourceType_not: ScheduleCreditSourceEnum
  sourceType_in: [ScheduleCreditSourceEnum!]
  sourceType_not_in: [ScheduleCreditSourceEnum!]
  sourceException: ExceptionWhereInput
  sourceDirect: DirectCreditWhereInput
  sourceConcurentHoliday: HolidayWhereInput
  sourceDate: DateTime
  sourceDate_not: DateTime
  sourceDate_in: [DateTime!]
  sourceDate_not_in: [DateTime!]
  sourceDate_lt: DateTime
  sourceDate_lte: DateTime
  sourceDate_gt: DateTime
  sourceDate_gte: DateTime
  debit: ScheduleDebitWhereInput
  AND: [ScheduleCreditWhereInput!]
  OR: [ScheduleCreditWhereInput!]
  NOT: [ScheduleCreditWhereInput!]
}

input ScheduleCreditWhereUniqueInput {
  id: ID
}

type ScheduleDebit {
  id: ID!
  employee: Employee!
  category: ScheduleOfflineCategory!
  exception: Exception!
  credit: ScheduleCredit!
}

type ScheduleDebitConnection {
  pageInfo: PageInfo!
  edges: [ScheduleDebitEdge]!
  aggregate: AggregateScheduleDebit!
}

input ScheduleDebitCreateInput {
  employee: EmployeeCreateOneWithoutDebitsInput!
  category: ScheduleOfflineCategory!
  exception: ExceptionCreateOneWithoutDebitsInput!
  credit: ScheduleCreditCreateOneWithoutDebitInput!
}

input ScheduleDebitCreateManyWithoutEmployeeInput {
  create: [ScheduleDebitCreateWithoutEmployeeInput!]
  connect: [ScheduleDebitWhereUniqueInput!]
}

input ScheduleDebitCreateManyWithoutExceptionInput {
  create: [ScheduleDebitCreateWithoutExceptionInput!]
  connect: [ScheduleDebitWhereUniqueInput!]
}

input ScheduleDebitCreateOneWithoutCreditInput {
  create: ScheduleDebitCreateWithoutCreditInput
  connect: ScheduleDebitWhereUniqueInput
}

input ScheduleDebitCreateWithoutCreditInput {
  employee: EmployeeCreateOneWithoutDebitsInput!
  category: ScheduleOfflineCategory!
  exception: ExceptionCreateOneWithoutDebitsInput!
}

input ScheduleDebitCreateWithoutEmployeeInput {
  category: ScheduleOfflineCategory!
  exception: ExceptionCreateOneWithoutDebitsInput!
  credit: ScheduleCreditCreateOneWithoutDebitInput!
}

input ScheduleDebitCreateWithoutExceptionInput {
  employee: EmployeeCreateOneWithoutDebitsInput!
  category: ScheduleOfflineCategory!
  credit: ScheduleCreditCreateOneWithoutDebitInput!
}

type ScheduleDebitEdge {
  node: ScheduleDebit!
  cursor: String!
}

enum ScheduleDebitOrderByInput {
  id_ASC
  id_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleDebitPreviousValues {
  id: ID!
  category: ScheduleOfflineCategory!
}

type ScheduleDebitSubscriptionPayload {
  mutation: MutationType!
  node: ScheduleDebit
  updatedFields: [String!]
  previousValues: ScheduleDebitPreviousValues
}

input ScheduleDebitSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleDebitWhereInput
  AND: [ScheduleDebitSubscriptionWhereInput!]
  OR: [ScheduleDebitSubscriptionWhereInput!]
  NOT: [ScheduleDebitSubscriptionWhereInput!]
}

input ScheduleDebitUpdateInput {
  employee: EmployeeUpdateOneRequiredWithoutDebitsInput
  category: ScheduleOfflineCategory
  exception: ExceptionUpdateOneRequiredWithoutDebitsInput
  credit: ScheduleCreditUpdateOneRequiredWithoutDebitInput
}

input ScheduleDebitUpdateManyWithoutEmployeeInput {
  create: [ScheduleDebitCreateWithoutEmployeeInput!]
  delete: [ScheduleDebitWhereUniqueInput!]
  connect: [ScheduleDebitWhereUniqueInput!]
  disconnect: [ScheduleDebitWhereUniqueInput!]
  update: [ScheduleDebitUpdateWithWhereUniqueWithoutEmployeeInput!]
  upsert: [ScheduleDebitUpsertWithWhereUniqueWithoutEmployeeInput!]
}

input ScheduleDebitUpdateManyWithoutExceptionInput {
  create: [ScheduleDebitCreateWithoutExceptionInput!]
  delete: [ScheduleDebitWhereUniqueInput!]
  connect: [ScheduleDebitWhereUniqueInput!]
  disconnect: [ScheduleDebitWhereUniqueInput!]
  update: [ScheduleDebitUpdateWithWhereUniqueWithoutExceptionInput!]
  upsert: [ScheduleDebitUpsertWithWhereUniqueWithoutExceptionInput!]
}

input ScheduleDebitUpdateOneWithoutCreditInput {
  create: ScheduleDebitCreateWithoutCreditInput
  update: ScheduleDebitUpdateWithoutCreditDataInput
  upsert: ScheduleDebitUpsertWithoutCreditInput
  delete: Boolean
  disconnect: Boolean
  connect: ScheduleDebitWhereUniqueInput
}

input ScheduleDebitUpdateWithoutCreditDataInput {
  employee: EmployeeUpdateOneRequiredWithoutDebitsInput
  category: ScheduleOfflineCategory
  exception: ExceptionUpdateOneRequiredWithoutDebitsInput
}

input ScheduleDebitUpdateWithoutEmployeeDataInput {
  category: ScheduleOfflineCategory
  exception: ExceptionUpdateOneRequiredWithoutDebitsInput
  credit: ScheduleCreditUpdateOneRequiredWithoutDebitInput
}

input ScheduleDebitUpdateWithoutExceptionDataInput {
  employee: EmployeeUpdateOneRequiredWithoutDebitsInput
  category: ScheduleOfflineCategory
  credit: ScheduleCreditUpdateOneRequiredWithoutDebitInput
}

input ScheduleDebitUpdateWithWhereUniqueWithoutEmployeeInput {
  where: ScheduleDebitWhereUniqueInput!
  data: ScheduleDebitUpdateWithoutEmployeeDataInput!
}

input ScheduleDebitUpdateWithWhereUniqueWithoutExceptionInput {
  where: ScheduleDebitWhereUniqueInput!
  data: ScheduleDebitUpdateWithoutExceptionDataInput!
}

input ScheduleDebitUpsertWithoutCreditInput {
  update: ScheduleDebitUpdateWithoutCreditDataInput!
  create: ScheduleDebitCreateWithoutCreditInput!
}

input ScheduleDebitUpsertWithWhereUniqueWithoutEmployeeInput {
  where: ScheduleDebitWhereUniqueInput!
  update: ScheduleDebitUpdateWithoutEmployeeDataInput!
  create: ScheduleDebitCreateWithoutEmployeeInput!
}

input ScheduleDebitUpsertWithWhereUniqueWithoutExceptionInput {
  where: ScheduleDebitWhereUniqueInput!
  update: ScheduleDebitUpdateWithoutExceptionDataInput!
  create: ScheduleDebitCreateWithoutExceptionInput!
}

input ScheduleDebitWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  employee: EmployeeWhereInput
  category: ScheduleOfflineCategory
  category_not: ScheduleOfflineCategory
  category_in: [ScheduleOfflineCategory!]
  category_not_in: [ScheduleOfflineCategory!]
  exception: ExceptionWhereInput
  credit: ScheduleCreditWhereInput
  AND: [ScheduleDebitWhereInput!]
  OR: [ScheduleDebitWhereInput!]
  NOT: [ScheduleDebitWhereInput!]
}

input ScheduleDebitWhereUniqueInput {
  id: ID
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
  id: ID!
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
  id: ID!
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  category: ScheduleOfflineCategory
  category_not: ScheduleOfflineCategory
  category_in: [ScheduleOfflineCategory!]
  category_not_in: [ScheduleOfflineCategory!]
  AND: [ScheduleOfflineElementWhereInput!]
  OR: [ScheduleOfflineElementWhereInput!]
  NOT: [ScheduleOfflineElementWhereInput!]
}

input ScheduleOfflineElementWhereUniqueInput {
  id: ID
}

enum ScheduleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  baseTime_ASC
  baseTime_DESC
  isPreset_ASC
  isPreset_DESC
}

type SchedulePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  baseTime: Int!
  isPreset: Boolean
}

enum ScheduleRestlineCategory {
  SCH_REST_LUNCH
}

type ScheduleRestlineElement {
  id: ID!
  category: ScheduleRestlineCategory!
  duration: Int!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
}

type ScheduleRestlineElementConnection {
  pageInfo: PageInfo!
  edges: [ScheduleRestlineElementEdge]!
  aggregate: AggregateScheduleRestlineElement!
}

input ScheduleRestlineElementCreateInput {
  category: ScheduleRestlineCategory!
  duration: Int!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
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
  duration_ASC
  duration_DESC
  startTime_ASC
  startTime_DESC
  endTime_ASC
  endTime_DESC
  startEventRequired_ASC
  startEventRequired_DESC
  endEventRequired_ASC
  endEventRequired_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleRestlineElementPreviousValues {
  id: ID!
  category: ScheduleRestlineCategory!
  duration: Int!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
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
  duration: Int
  startTime: Int
  endTime: Int
  startEventRequired: Boolean
  endEventRequired: Boolean
}

input ScheduleRestlineElementUpdateInput {
  category: ScheduleRestlineCategory
  duration: Int
  startTime: Int
  endTime: Int
  startEventRequired: Boolean
  endEventRequired: Boolean
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  category: ScheduleRestlineCategory
  category_not: ScheduleRestlineCategory
  category_in: [ScheduleRestlineCategory!]
  category_not_in: [ScheduleRestlineCategory!]
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  startTime: Int
  startTime_not: Int
  startTime_in: [Int!]
  startTime_not_in: [Int!]
  startTime_lt: Int
  startTime_lte: Int
  startTime_gt: Int
  startTime_gte: Int
  endTime: Int
  endTime_not: Int
  endTime_in: [Int!]
  endTime_not_in: [Int!]
  endTime_lt: Int
  endTime_lte: Int
  endTime_gt: Int
  endTime_gte: Int
  startEventRequired: Boolean
  startEventRequired_not: Boolean
  endEventRequired: Boolean
  endEventRequired_not: Boolean
  AND: [ScheduleRestlineElementWhereInput!]
  OR: [ScheduleRestlineElementWhereInput!]
  NOT: [ScheduleRestlineElementWhereInput!]
}

input ScheduleRestlineElementWhereUniqueInput {
  id: ID
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
  id: ID!
  category: ScheduleTimelineCategory!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
}

type ScheduleTimelineElementConnection {
  pageInfo: PageInfo!
  edges: [ScheduleTimelineElementEdge]!
  aggregate: AggregateScheduleTimelineElement!
}

input ScheduleTimelineElementCreateInput {
  category: ScheduleTimelineCategory!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
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
  endTime_ASC
  endTime_DESC
  startEventRequired_ASC
  startEventRequired_DESC
  endEventRequired_ASC
  endEventRequired_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScheduleTimelineElementPreviousValues {
  id: ID!
  category: ScheduleTimelineCategory!
  startTime: Int!
  endTime: Int!
  startEventRequired: Boolean!
  endEventRequired: Boolean!
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
  endTime: Int
  startEventRequired: Boolean
  endEventRequired: Boolean
}

input ScheduleTimelineElementUpdateInput {
  category: ScheduleTimelineCategory
  startTime: Int
  endTime: Int
  startEventRequired: Boolean
  endEventRequired: Boolean
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  endTime: Int
  endTime_not: Int
  endTime_in: [Int!]
  endTime_not_in: [Int!]
  endTime_lt: Int
  endTime_lte: Int
  endTime_gt: Int
  endTime_gte: Int
  startEventRequired: Boolean
  startEventRequired_not: Boolean
  endEventRequired: Boolean
  endEventRequired_not: Boolean
  AND: [ScheduleTimelineElementWhereInput!]
  OR: [ScheduleTimelineElementWhereInput!]
  NOT: [ScheduleTimelineElementWhereInput!]
}

input ScheduleTimelineElementWhereUniqueInput {
  id: ID
}

input ScheduleUpdateDataInput {
  description: String
  baseTime: Int
  isPreset: Boolean
  timeline: ScheduleTimelineElementUpdateManyInput
  restline: ScheduleRestlineElementUpdateManyInput
  offline1: ScheduleOfflineElementUpdateOneInput
  offline2: ScheduleOfflineElementUpdateOneInput
}

input ScheduleUpdateInput {
  description: String
  baseTime: Int
  isPreset: Boolean
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  isPreset: Boolean
  isPreset_not: Boolean
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
  id: ID
}

type Shift {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  employee: Employee!
  startDate: DateTime!
  endDate: DateTime
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
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
}

type ShiftPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  startDate: DateTime!
  endDate: DateTime
}

type ShiftSlot {
  id: ID!
  index: Int!
  schedule: Schedule!
}

type ShiftSlotConnection {
  pageInfo: PageInfo!
  edges: [ShiftSlotEdge]!
  aggregate: AggregateShiftSlot!
}

input ShiftSlotCreateInput {
  index: Int!
  schedule: ScheduleCreateOneInput!
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
  id: ID!
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
  index: Int
  schedule: ScheduleUpdateOneRequiredInput
}

input ShiftSlotUpdateInput {
  index: Int
  schedule: ScheduleUpdateOneRequiredInput
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  index: Int
  index_not: Int
  index_in: [Int!]
  index_not_in: [Int!]
  index_lt: Int
  index_lte: Int
  index_gt: Int
  index_gte: Int
  schedule: ScheduleWhereInput
  AND: [ShiftSlotWhereInput!]
  OR: [ShiftSlotWhereInput!]
  NOT: [ShiftSlotWhereInput!]
}

input ShiftSlotWhereUniqueInput {
  id: ID
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
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  slots_every: ShiftSlotWhereInput
  slots_some: ShiftSlotWhereInput
  slots_none: ShiftSlotWhereInput
  owner: UserWhereInput
  AND: [ShiftWhereInput!]
  OR: [ShiftWhereInput!]
  NOT: [ShiftWhereInput!]
}

input ShiftWhereUniqueInput {
  id: ID
}

type Subscription {
  attendanceCycle(where: AttendanceCycleSubscriptionWhereInput): AttendanceCycleSubscriptionPayload
  department(where: DepartmentSubscriptionWhereInput): DepartmentSubscriptionPayload
  directCredit(where: DirectCreditSubscriptionWhereInput): DirectCreditSubscriptionPayload
  employee(where: EmployeeSubscriptionWhereInput): EmployeeSubscriptionPayload
  exception(where: ExceptionSubscriptionWhereInput): ExceptionSubscriptionPayload
  exceptionAuthorization(where: ExceptionAuthorizationSubscriptionWhereInput): ExceptionAuthorizationSubscriptionPayload
  exceptionSlot(where: ExceptionSlotSubscriptionWhereInput): ExceptionSlotSubscriptionPayload
  fieldOptionLabel(where: FieldOptionLabelSubscriptionWhereInput): FieldOptionLabelSubscriptionPayload
  holiday(where: HolidaySubscriptionWhereInput): HolidaySubscriptionPayload
  schedule(where: ScheduleSubscriptionWhereInput): ScheduleSubscriptionPayload
  scheduleCategoryConfig(where: ScheduleCategoryConfigSubscriptionWhereInput): ScheduleCategoryConfigSubscriptionPayload
  scheduleCredit(where: ScheduleCreditSubscriptionWhereInput): ScheduleCreditSubscriptionPayload
  scheduleDebit(where: ScheduleDebitSubscriptionWhereInput): ScheduleDebitSubscriptionPayload
  scheduleOfflineElement(where: ScheduleOfflineElementSubscriptionWhereInput): ScheduleOfflineElementSubscriptionPayload
  scheduleRestlineElement(where: ScheduleRestlineElementSubscriptionWhereInput): ScheduleRestlineElementSubscriptionPayload
  scheduleTimelineElement(where: ScheduleTimelineElementSubscriptionWhereInput): ScheduleTimelineElementSubscriptionPayload
  shift(where: ShiftSubscriptionWhereInput): ShiftSubscriptionPayload
  shiftSlot(where: ShiftSlotSubscriptionWhereInput): ShiftSlotSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userRole(where: UserRoleSubscriptionWhereInput): UserRoleSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  departments(where: DepartmentWhereInput, orderBy: DepartmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Department!]
  role: UserRoleEnum!
  roles(where: UserRoleWhereInput, orderBy: UserRoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserRole!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  password: String!
  departments: DepartmentCreateManyWithoutSupervisorsInput
  role: UserRoleEnum!
  roles: UserRoleCreateManyInput
}

input UserCreateManyWithoutDepartmentsInput {
  create: [UserCreateWithoutDepartmentsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutDepartmentsInput {
  username: String!
  password: String!
  role: UserRoleEnum!
  roles: UserRoleCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  role: UserRoleEnum!
}

type UserRole {
  id: ID!
  name: String!
  description: String
  privileges: [String!]!
}

type UserRoleConnection {
  pageInfo: PageInfo!
  edges: [UserRoleEdge]!
  aggregate: AggregateUserRole!
}

input UserRoleCreateInput {
  name: String!
  description: String
  privileges: UserRoleCreateprivilegesInput
}

input UserRoleCreateManyInput {
  create: [UserRoleCreateInput!]
  connect: [UserRoleWhereUniqueInput!]
}

input UserRoleCreateprivilegesInput {
  set: [String!]
}

type UserRoleEdge {
  node: UserRole!
  cursor: String!
}

enum UserRoleEnum {
  ADMIN
  MANAGER
  SUPERVISOR
  HR
}

enum UserRoleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserRolePreviousValues {
  id: ID!
  name: String!
  description: String
  privileges: [String!]!
}

type UserRoleSubscriptionPayload {
  mutation: MutationType!
  node: UserRole
  updatedFields: [String!]
  previousValues: UserRolePreviousValues
}

input UserRoleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserRoleWhereInput
  AND: [UserRoleSubscriptionWhereInput!]
  OR: [UserRoleSubscriptionWhereInput!]
  NOT: [UserRoleSubscriptionWhereInput!]
}

input UserRoleUpdateDataInput {
  name: String
  description: String
  privileges: UserRoleUpdateprivilegesInput
}

input UserRoleUpdateInput {
  name: String
  description: String
  privileges: UserRoleUpdateprivilegesInput
}

input UserRoleUpdateManyInput {
  create: [UserRoleCreateInput!]
  update: [UserRoleUpdateWithWhereUniqueNestedInput!]
  upsert: [UserRoleUpsertWithWhereUniqueNestedInput!]
  delete: [UserRoleWhereUniqueInput!]
  connect: [UserRoleWhereUniqueInput!]
  disconnect: [UserRoleWhereUniqueInput!]
}

input UserRoleUpdateprivilegesInput {
  set: [String!]
}

input UserRoleUpdateWithWhereUniqueNestedInput {
  where: UserRoleWhereUniqueInput!
  data: UserRoleUpdateDataInput!
}

input UserRoleUpsertWithWhereUniqueNestedInput {
  where: UserRoleWhereUniqueInput!
  update: UserRoleUpdateDataInput!
  create: UserRoleCreateInput!
}

input UserRoleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  AND: [UserRoleWhereInput!]
  OR: [UserRoleWhereInput!]
  NOT: [UserRoleWhereInput!]
}

input UserRoleWhereUniqueInput {
  id: ID
  name: String
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
  departments: DepartmentUpdateManyWithoutSupervisorsInput
  role: UserRoleEnum
  roles: UserRoleUpdateManyInput
}

input UserUpdateInput {
  username: String
  password: String
  departments: DepartmentUpdateManyWithoutSupervisorsInput
  role: UserRoleEnum
  roles: UserRoleUpdateManyInput
}

input UserUpdateManyWithoutDepartmentsInput {
  create: [UserCreateWithoutDepartmentsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutDepartmentsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutDepartmentsInput!]
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutDepartmentsDataInput {
  username: String
  password: String
  role: UserRoleEnum
  roles: UserRoleUpdateManyInput
}

input UserUpdateWithWhereUniqueWithoutDepartmentsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutDepartmentsDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithWhereUniqueWithoutDepartmentsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutDepartmentsDataInput!
  create: UserCreateWithoutDepartmentsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
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
  departments_every: DepartmentWhereInput
  departments_some: DepartmentWhereInput
  departments_none: DepartmentWhereInput
  role: UserRoleEnum
  role_not: UserRoleEnum
  role_in: [UserRoleEnum!]
  role_not_in: [UserRoleEnum!]
  roles_every: UserRoleWhereInput
  roles_some: UserRoleWhereInput
  roles_none: UserRoleWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`
      }
    