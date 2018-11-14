module.exports = prisma => Promise.all([
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_TIME_WORK',
    description: 'Tiempo Laboral Standar',
    backgroundColor: '#51b054',
    foregroundColor: '#000000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_TIME_EXTRA',
    description: 'Tiempo Laboral Extra',
    backgroundColor: '#d9bc52',
    foregroundColor: '#000000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_TIME_MATERNAL',
    description: 'Tiempo Lactancia',
    backgroundColor: '#cfa5d4',
    foregroundColor: '#000000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_TIME_LEAVE',
    description: 'Tiempo Permiso',
    backgroundColor: '#adadad',
    foregroundColor: '#000000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_REST_LUNCH',
    description: 'Almuerzo',
    backgroundColor: '#b8b646',
    foregroundColor: '#000000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_OFF',
    description: 'Libre',
    backgroundColor: '#74cadb',
    foregroundColor: '#000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_VACATION',
    description: 'Vacacion',
    backgroundColor: '#5a84d1',
    foregroundColor: '#000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_HOLIDAY',
    description: 'Feriado',
    backgroundColor: '#807dd4',
    foregroundColor: '#000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_SICK',
    description: 'Baja Medica',
    backgroundColor: '#a1774d',
    foregroundColor: '#000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_PAID',
    description: 'Permiso Sin Descuento',
    backgroundColor: '#cccccc',
    foregroundColor: '#000'
  } }, `{ id }`),
  prisma.bindings.mutation.createScheduleCategoryConfig({ data: {
    category: 'SCH_DAY_UNPAID',
    description: 'Permiso Con Descuento',
    backgroundColor: '#7d7d7d',
    foregroundColor: '#000'
  } }, `{ id }`)
])
