const Employee = require('@models/hr/Employee')
const Schedule = require('@models/hr/Schedule')
const { ATT_WORK, ATT_TIMEOFF,  ATT_BREAKTIME } = require('@tools/attType')

function time(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
  const d = new Date()
  d.setHours(hours, minutes, seconds, milliseconds)
  return d
}

const LUNCH = {
  timetype_id: ATT_BREAKTIME,
  description: 'Almuerzo',
  start_time: time(11, 0),
  start_require_event: true,
  end_time: time(14, 30),
  end_require_event: true,
  duration: time(0, 30)
}

const HALFDAYOFF = {
  description: 'Medio Dia Libre',
  timetype_id: ATT_TIMEOFF,
  value: 0.5
}

exports.seed = async function(knex, Promise) {
  const schedules = await Schedule.query().insertGraph([
    {
      schedule_name: 'Dia Libre',
      description: '',
      uptime: [],
      breaktime: [],
      downtime: [
        {
          description: 'Dia Libre',
          timetype_id: ATT_TIMEOFF,
          value: 1
        }
      ]
    },
    {
      schedule_name: 'Dia Laboral Continuo 08:30 - 16:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 08:30 - 16:30',
          start_time: time(8, 30),
          start_require_event: true,
          end_time: time(16, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo 09:30 - 17:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 09:30 - 17:30',
          start_time: time(9, 30),
          start_require_event: true,
          end_time: time(17, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo 10:30 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 10:30 - 18:30',
          start_time: time(10, 30),
          start_require_event: true,
          end_time: time(18, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo 07:00 - 15:00',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 07:00 - 15:00',
          start_time: time(7, 0),
          start_require_event: true,
          end_time: time(15, 0),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo Huerta 08:00 - 18:00',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo Huerta 08:00 - 18:00',
          start_time: time(8, 0),
          start_require_event: true,
          end_time: time(18, 0),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo Con Hora de Lactancia 09:30 - 16:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo Con Hora de Lactancia 09:30 - 16:30',
          start_time: time(9, 30),
          start_require_event: true,
          end_time: time(16, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo Con Hora de Lactancia 10:30 - 17:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo Con Hora de Lactancia 10:30 - 17:30',
          start_time: time(10, 30),
          start_require_event: true,
          end_time: time(17, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Discontinuo 08:30 - 12:00 14:00 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Mañana Laboral 08:30 - 12:00',
          start_time: time(8, 30),
          start_require_event: true,
          end_time: time(12, 0),
          end_require_event: true,
          value: 0.4375
        },
        {
          timetype_id: ATT_WORK,
          description: 'Tarde Laboral 14:00 - 18:30',
          start_time: time(14, 0),
          start_require_event: true,
          end_time: time(18, 30),
          end_require_event: true,
          value: 0.5625
        }
      ],
      breaktime: [],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo Bus 11:30 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo Bus 11:30 - 18:30',
          start_time: time(11, 30),
          start_require_event: true,
          end_time: time(18, 30),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Medio Dia Laboral 08:30 - 12:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 08:30 - 12:30',
          start_time: time(8, 30),
          start_require_event: true,
          end_time: time(12, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 09:30 - 13:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 09:30 - 13:30',
          start_time: time(9, 30),
          start_require_event: true,
          end_time: time(13, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 10:30 - 14:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 10:30 - 14:30',
          start_time: time(10, 30),
          start_require_event: true,
          end_time: time(14, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 12:30 - 16:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 12:30 - 16:30',
          start_time: time(12, 30),
          start_require_event: true,
          end_time: time(16, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 13:30 - 17:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 13:30 - 17:30',
          start_time: time(13, 30),
          start_require_event: true,
          end_time: time(17, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 14:30 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 14:30 - 18:30',
          start_time: time(14, 30),
          start_require_event: true,
          end_time: time(18, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 07:00 - 11:00',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 07:00 - 11:00',
          start_time: time(7, 0),
          start_require_event: true,
          end_time: time(11, 0),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 11:00 - 15:00',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 11:00 - 15:00',
          start_time: time(11, 0),
          start_require_event: true,
          end_time: time(15, 0),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral Con Hora de Lactancia 10:30 - 13:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral Con Hora de Lactancia 10:30 - 13:30',
          start_time: time(10, 30),
          start_require_event: true,
          end_time: time(13, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral Bus 07:30 - 11:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral Bus 07:30 - 11:30',
          start_time: time(7, 30),
          start_require_event: true,
          end_time: time(11, 30),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    }
  ])



};

const employess = [
{ zktime_pin: 113, document_type: 'CI', document_number: '6360586', name_first: 'DANIELA', name_middle: '', name_paternal: 'VACA', name_maternal: 'MENDEZ', sex: 'F', date_of_birth: '02-10-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'ASESOR DE VENTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 114, document_type: 'CI', document_number: '5404101', name_first: 'MARIA', name_middle: 'FERNANDA', name_paternal: 'FERNANDEZ', name_maternal: 'RENGEL', sex: 'F', date_of_birth: '07-06-1996', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'AGENTE DE VENTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 115, document_type: 'CI', document_number: '5229530', name_first: 'SARAH', name_middle: 'BETSCY', name_paternal: 'ENRIQUEZ', name_maternal: 'COCA', sex: 'F', date_of_birth: '17-11-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GERENTE COMERCIAL', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 117, document_type: 'CI', document_number: '7825881', name_first: 'CARLA', name_middle: 'FERNANDA', name_paternal: 'CALDERON', name_maternal: 'MENDOZA', sex: 'F', date_of_birth: '25-04-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'RECEPCIONISTA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 222, document_type: 'CI', document_number: '5411245', name_first: 'MARIELA', name_middle: '', name_paternal: 'MONTAÑO', name_maternal: 'ARRAZOLA', sex: 'F', date_of_birth: '31-03-1989', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CALL CENTER', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 301, document_type: 'CI', document_number: '9659339', name_first: 'DELCY', name_middle: '', name_paternal: 'AIRUARE', name_maternal: 'VACA', sex: 'F', date_of_birth: '19-03-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'MUCAMAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 314, document_type: 'CI', document_number: '5347296', name_first: 'BETHI', name_middle: '', name_paternal: 'PACO', name_maternal: 'PACO', sex: 'F', date_of_birth: '17-01-1979', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'MUCAMAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 325, document_type: 'CI', document_number: '8074511', name_first: 'KAREN', name_middle: 'MELISSA', name_paternal: 'LEON', name_maternal: 'POICHEE', sex: 'F', date_of_birth: '16-03-1993', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'RECEPCIONISTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 501, document_type: 'CI', document_number: '11337178', name_first: 'RAUL', name_middle: '', name_paternal: 'BALCAZAR', name_maternal: 'TOLEDO', sex: 'M', date_of_birth: '09-08-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GUARDAFAUNA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 502, document_type: 'CI', document_number: '6321943', name_first: 'YVAN', name_middle: '', name_paternal: 'CASTRO', name_maternal: 'ROJAS', sex: 'M', date_of_birth: '29-04-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GUIA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 504, document_type: 'CI', document_number: '9586571', name_first: 'YOSELIN', name_middle: 'ZELMA', name_paternal: 'FIGUEREDO', name_maternal: 'VILLCA', sex: 'F', date_of_birth: '10-02-1991', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'RESPONSABLE DE FAUNA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 506, document_type: 'CI', document_number: '5320774', name_first: 'NOEL', name_middle: 'FERNANDO', name_paternal: 'HUARACHI', name_maternal: 'LOPEZ', sex: 'M', date_of_birth: '11-04-1984', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GUIA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 508, document_type: 'CI', document_number: '9044848', name_first: 'MILTON', name_middle: '', name_paternal: 'MELGAR', name_maternal: 'CASTRO', sex: 'M', date_of_birth: '10-05-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO BIOLOGICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 511, document_type: 'CI', document_number: '9049933', name_first: 'ORLANDO', name_middle: '', name_paternal: 'MORENO', name_maternal: 'MELGAR', sex: 'M', date_of_birth: '20-01-1992', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'GUARDAFAUNA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 512, document_type: 'CI', document_number: '11358381', name_first: 'WILVER', name_middle: '', name_paternal: 'MORENO', name_maternal: 'MELGAR', sex: 'M', date_of_birth: '10-03-1999', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO BIOLOGICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 513, document_type: 'CI', document_number: 'E-13513808', name_first: 'BENOIT', name_middle: 'YVES PATRICK', name_paternal: 'RANQUE', name_maternal: '', sex: 'M', date_of_birth: '09-01-1996', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, 'GUIA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 514, document_type: 'CI', document_number: '14137069', name_first: 'SANTOS', name_middle: '', name_paternal: 'RODA', name_maternal: 'SALVATIERRA', sex: 'M', date_of_birth: '02-11-1966', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MARIPOSAS Y DE INFRAESTRUCTURA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 517, document_type: 'CI', document_number: '5885105', name_first: 'RONALD', name_middle: '', name_paternal: 'TAPIA', name_maternal: 'MENDOZA', sex: 'M', date_of_birth: '27-02-1981', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JARDINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 519, document_type: 'CI', document_number: '6392390', name_first: 'FREDY', name_middle: '', name_paternal: 'VEIZAGA', name_maternal: 'COSIO', sex: 'M', date_of_birth: '05-10-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'RESPONSABLE DE FLORA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 522, document_type: 'CI', document_number: '6332656', name_first: 'BORRIES', name_middle: 'PAOLA YVANNA', name_paternal: 'MONTENEGRO', name_maternal: 'VON', sex: 'F', date_of_birth: '29-07-1987', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JEFE DE BIOLOGÍA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 523, document_type: 'CI', document_number: '6308044', name_first: 'JOSE', name_middle: 'EDUARDO', name_paternal: 'BURGOS', name_maternal: 'BALCAZAR', sex: 'M', date_of_birth: '03-10-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO BIOLOGICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 524, document_type: 'CI', document_number: '6293517', name_first: 'FELIX', name_middle: '', name_paternal: 'MORENO', name_maternal: 'MELGAR', sex: 'M', date_of_birth: '12-07-1958', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO BIOLOGICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 525, document_type: 'CI', document_number: '9602173', name_first: 'ROSELY', name_middle: '', name_paternal: 'LIJERON', name_maternal: 'ARTEAGA', sex: 'F', date_of_birth: '08-01-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GUIA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 701, document_type: 'CI', document_number: '3382355', name_first: 'BENTURA', name_middle: '', name_paternal: 'BLANCO', name_maternal: 'HUANCA', sex: 'M', date_of_birth: '10-08-1967', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE EQUIPO PESADO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 702, document_type: 'CI', document_number: '3006670', name_first: 'JOSE', name_middle: 'LUIS', name_paternal: 'CARDOZO', name_maternal: 'RODRIGUEZ', sex: 'M', date_of_birth: '20-08-1963', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 704, document_type: 'CI', document_number: '5334606', name_first: 'JIMY', name_middle: '', name_paternal: 'CESPEDES', name_maternal: 'BALCAZAR', sex: 'M', date_of_birth: '10-09-1978', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 705, document_type: 'CI', document_number: '6268378', name_first: 'JOSE', name_middle: 'CARLOS', name_paternal: 'EGUEZ', name_maternal: 'MARTINEZ', sex: 'M', date_of_birth: '22-09-1983', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 706, document_type: 'CI', document_number: '9646854-1G', name_first: 'EDWARD', name_middle: '', name_paternal: 'GUZMAN', name_maternal: 'PADILLA', sex: 'M', date_of_birth: '16-10-1993', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 709, document_type: 'CI', document_number: '11377414', name_first: 'LUIS', name_middle: 'ALBERTO', name_paternal: 'MELGAR', name_maternal: 'HURTADO', sex: 'M', date_of_birth: '07-06-1990', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 710, document_type: 'CI', document_number: '4714843', name_first: 'MAXIMO', name_middle: '', name_paternal: 'PORCO', name_maternal: 'PACARA', sex: 'M', date_of_birth: '15-05-1976', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JEFE DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 711, document_type: 'CI', document_number: '9827755', name_first: 'BENJAMIN', name_middle: '', name_paternal: 'ROMERO', name_maternal: 'MONTAÑO', sex: 'M', date_of_birth: '31-03-1981', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 718, document_type: 'CI', document_number: '6321230', name_first: 'JAIME', name_middle: '', name_paternal: 'MENDEZ', name_maternal: 'SERIZO', sex: 'M', date_of_birth: '01-06-1980', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 720, document_type: 'CI', document_number: '7796740', name_first: 'BERNABE', name_middle: '', name_paternal: 'QUINO', name_maternal: 'SURUBI', sex: 'M', date_of_birth: '11-06-1987', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE MANTENIMIENTO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 723, document_type: 'CI', document_number: '9749730', name_first: 'MIGUEL', name_middle: '', name_paternal: 'AYALA', name_maternal: 'PEREZ', sex: 'M', date_of_birth: '25-08-1989', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, AUX.cargo: ' ELECTRICIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 902, document_type: 'CI', document_number: '5857578', name_first: 'MARIANO', name_middle: '', name_paternal: 'CESPEDES', name_maternal: 'BALCAZAR', sex: 'M', date_of_birth: '09-05-1983', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE COMPOSTAJE', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 903, document_type: 'CI', document_number: '6385432', name_first: 'EDIL', name_middle: '', name_paternal: 'CESPEDES', name_maternal: 'BALCAZAR', sex: 'M', date_of_birth: '18-06-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE COMPOSTAJE', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 905, document_type: 'CI', document_number: '8987288', name_first: 'GABRIELA', name_middle: '', name_paternal: 'CHAVEZ', name_maternal: 'VARGAS', sex: 'F', date_of_birth: '03-07-1989', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GARZONES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 907, document_type: 'CI', document_number: '7842649', name_first: 'ALCIBIADES', name_middle: '', name_paternal: 'MELGAR', name_maternal: 'CASTRO', sex: 'M', date_of_birth: '28-03-1983', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JARDINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 908, document_type: 'CI', document_number: '5837063', name_first: 'JORGE', name_middle: '', name_paternal: 'MELGAR', name_maternal: 'CASTRO', sex: 'M', date_of_birth: '30-10-1981', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'CABALLERIZO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 909, document_type: 'CI', document_number: '9665263', name_first: 'LUIS', name_middle: 'ALBERTO', name_paternal: 'MELGAR', name_maternal: 'HEREDIA', sex: 'M', date_of_birth: '06-05-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIOS DE PISCINAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 911, document_type: 'CI', document_number: '9621588', name_first: 'MARIA', name_middle: 'YOLANDA', name_paternal: 'URACOY', name_maternal: 'ARTEAGA', sex: 'F', date_of_birth: '07-09-1990', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JARDINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 913, document_type: 'CI', document_number: '7804335', name_first: 'ADA', name_middle: 'PATRICIA', name_paternal: 'VASQUEZ', name_maternal: 'PEÑARANDA', sex: 'F', date_of_birth: '19-05-1982', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JARDINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 915, document_type: 'CI', document_number: '5834082', name_first: 'JOSEFA', name_middle: 'GABY', name_paternal: 'CESPEDES', name_maternal: 'BALCAZAR', sex: 'F', date_of_birth: '31-05-1974', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JARDINERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 918, document_type: 'CI', document_number: '13078257', name_first: 'JAVIER', name_middle: '', name_paternal: 'DIEZ', name_maternal: 'YANAMO', sex: 'M', date_of_birth: '29-10-1993', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JARDINERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1001, document_type: 'CI', document_number: '11383479', name_first: 'MARIA', name_middle: 'BELEN', name_paternal: 'CHAVEZ', name_maternal: 'VARGAS', sex: 'F', date_of_birth: '09-04-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE LIMPIEZA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1002, document_type: 'CI', document_number: '6270486', name_first: 'YOLANDA', name_middle: '', name_paternal: 'MELGAR', name_maternal: 'SILEZ', sex: 'F', date_of_birth: '28-10-1970', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'OPERARIO DE LIMPIEZA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1005, document_type: 'CI', document_number: '11300946', name_first: 'DORA', name_middle: '', name_paternal: 'TOLEDO', name_maternal: 'SALAS', sex: 'F', date_of_birth: '06-10-1976', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JARDINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1101, document_type: 'CI', document_number: '9727812', name_first: 'CINTHYA', name_middle: 'MARLENE', name_paternal: 'FERNANDEZ', name_maternal: 'ARCANI', sex: 'F', date_of_birth: '29-03-1997', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CAJEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1105, document_type: 'CI', document_number: '6299701', name_first: 'AMERICA', name_middle: '', name_paternal: 'YOVIO', name_maternal: 'MENDOZA', sex: 'F', date_of_birth: '03-03-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'ASESOR DE VENTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1201, document_type: 'CI', document_number: '6355934', name_first: 'RENE', name_middle: '', name_paternal: 'ARERUMA', name_maternal: 'PINTO', sex: 'M', date_of_birth: '11-02-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'PARAMEDICOS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1203, document_type: 'CI', document_number: '9619238', name_first: 'GUSTAVO', name_middle: '', name_paternal: 'CASTRO', name_maternal: 'COSSIO', sex: 'M', date_of_birth: '19-02-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SALVAVIDAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1205, document_type: 'CI', document_number: '5338012', name_first: 'GUTIMBERG', name_middle: '', name_paternal: 'GUTIERREZ', name_maternal: 'ARTEAGA', sex: 'M', date_of_birth: '22-03-1980', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JEFE DE SEGURIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1206, document_type: 'CI', document_number: '6314311', name_first: 'CARLOS', name_middle: 'EDUARDO', name_paternal: 'GUTIERREZ', name_maternal: 'BANEGAS', sex: 'M', date_of_birth: '19-05-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'PARAMEDICOS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1207, document_type: 'CI', document_number: '2945739', name_first: 'SANTOS', name_middle: '', name_paternal: 'GUTIERREZ', name_maternal: 'RIBERA', sex: 'M', date_of_birth: '16-06-1958', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIOS DE PISCINAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1208, document_type: 'CI', document_number: '13111352', name_first: 'WILSON', name_middle: '', name_paternal: 'MORENO', name_maternal: 'MELGAR', sex: 'M', date_of_birth: '27-05-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE PISCINAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1209, document_type: 'CI', document_number: '8159987', name_first: 'EDWIN', name_middle: 'OLIVER', name_paternal: 'MORENO', name_maternal: 'PADILLA', sex: 'M', date_of_birth: '13-12-1987', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE PISCINAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1210, document_type: 'CI', document_number: '6348651', name_first: 'MODESTO', name_middle: '', name_paternal: 'RIVADINEIRA', name_maternal: 'PACO', sex: 'M', date_of_birth: '12-01-1985', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'MEDICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1211, document_type: 'CI', document_number: '6381551', name_first: 'RONALD', name_middle: '', name_paternal: 'ROCHA', name_maternal: 'VARGAS', sex: 'M', date_of_birth: '30-10-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SALVAVIDAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1212, document_type: 'CI', document_number: '9001667', name_first: 'YORYI', name_middle: '', name_paternal: 'RODRIGUEZ', name_maternal: 'RIBERA', sex: 'M', date_of_birth: '07-03-1992', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SALVAVIDAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1213, document_type: 'CI', document_number: '7743176', name_first: 'FLOR', name_middle: 'ROLICO', name_paternal: 'SALAS', name_maternal: 'VACA', sex: 'M', date_of_birth: '13-09-1981', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SALVAVIDAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1218, document_type: 'CI', document_number: '5338006', name_first: 'BEYKER', name_middle: 'SANTOS', name_paternal: 'GUTIERREZ', name_maternal: 'ARTEAGA', sex: 'M', date_of_birth: '31-03-1981', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SALVAVIDAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1503, document_type: 'CI', document_number: '6299904', name_first: 'GLADYS', name_middle: '', name_paternal: 'BARRON', name_maternal: 'DURAN', sex: 'F', date_of_birth: '05-10-1984', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'AYUDANTE DE COCINA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1506, document_type: 'CI', document_number: '3164168', name_first: 'FELIX', name_middle: '', name_paternal: 'GUZMAN', name_maternal: 'MORALES', sex: 'M', date_of_birth: '02-05-1957', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'COCINERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1511, document_type: 'CI', document_number: '4623586', name_first: 'MARCELO', name_middle: 'WILFREDO', name_paternal: 'PINTO', name_maternal: 'MENDOZA', sex: 'M', date_of_birth: '16-10-1978', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'BACHERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1513, document_type: 'CI', document_number: '6389544', name_first: 'ADEMAR', name_middle: '', name_paternal: 'SERRANO', name_maternal: 'SERRANO', sex: 'M', date_of_birth: '23-03-1977', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'COCINEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1520, document_type: 'CI', document_number: '8197498', name_first: 'MARIA', name_middle: 'CECILIA', name_paternal: 'EGUEZ', name_maternal: 'SUAREZ', sex: 'F', date_of_birth: '12-08-1970', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'AYUDANTE DE COCINA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1521, document_type: 'CI', document_number: '8156086', name_first: 'GABRIELA', name_middle: '', name_paternal: 'EGUEZ', name_maternal: 'SUAREZ', sex: 'F', date_of_birth: '07-08-1971', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'COCINERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1523, document_type: 'CI', document_number: '7666318', name_first: 'JOSE', name_middle: 'LUIS', name_paternal: 'AGUILAR', name_maternal: 'ESCOBAR', sex: 'M', date_of_birth: '10-10-1988', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'COCINERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1524, document_type: 'CI', document_number: '4836858', name_first: 'PABLO', name_middle: 'ANDRES', name_paternal: 'BURKE', name_maternal: 'ALFARO', sex: 'M', date_of_birth: '25-02-1979', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'CHEF EJECUTIVO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1528, document_type: 'CI', document_number: '8139632', name_first: 'RUTH', name_middle: '', name_paternal: 'ARERUMA', name_maternal: 'PINTO', sex: 'F', date_of_birth: '11-10-1990', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'AYUDANTE DE COCINA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1532, document_type: 'CI', document_number: '8911297', name_first: 'EVELIN', name_middle: '', name_paternal: 'CLAURE', name_maternal: 'TORRICO', sex: 'F', date_of_birth: '08-02-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'AYUDANTE DE COCINA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1535, document_type: 'CI', document_number: '8123492', name_first: 'DAVID', name_middle: '', name_paternal: 'ARICOMA', name_maternal: 'YALUSQUI', sex: 'M', date_of_birth: '24-06-1996', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'AYUDANTE DE COCINA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1536, document_type: 'CI', document_number: '4999398', name_first: 'ROSARIO', name_middle: 'ANDREA', name_paternal: 'JIMENEZ', name_maternal: 'DAGA', sex: 'F', date_of_birth: '28-12-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'PASTELERA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1603, document_type: 'CI', document_number: '7684655', name_first: 'CARLA', name_middle: 'PATRICIA', name_paternal: 'CAPOBIANCO', name_maternal: 'RODRIGUEZ', sex: 'F', date_of_birth: '01-09-1987', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CAJERAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1615, document_type: 'CI', document_number: '9847997', name_first: 'BRICELA', name_middle: 'PAOLA', name_paternal: 'SAUCEDO', name_maternal: 'PARAPAINO', sex: 'F', date_of_birth: '25-08-1992', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'CAJEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1616, document_type: 'CI', document_number: '9588266', name_first: 'JUAN', name_middle: 'GABRIEL', name_paternal: 'SAUCEDO', name_maternal: 'PARAPAINO', sex: 'M', date_of_birth: '27-12-1990', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'BARMAN Y BARISTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1628, document_type: 'CI', document_number: '8091513', name_first: 'JUAN', name_middle: 'CARLOS', name_paternal: 'GUTIERREZ', name_maternal: 'CORTEZ', sex: 'M', date_of_birth: '08-10-1983', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'GARZONES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1642, document_type: 'CI', document_number: '8144635', name_first: 'OSCAR', name_middle: '', name_paternal: 'SILVA', name_maternal: 'DELGADILLO', sex: 'M', date_of_birth: '31-10-1991', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'BARMAN Y BARISTAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1644, document_type: 'CI', document_number: '8223437', name_first: 'RAYMI', name_middle: 'SANTIAGO', name_paternal: 'OILO', name_maternal: 'ROJAS', sex: 'M', date_of_birth: '06-08-1997', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GARZONES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1650, document_type: 'CI', document_number: '9833116', name_first: 'LUIS', name_middle: 'GERARDO', name_paternal: 'COIMBRA', name_maternal: 'FERNANDEZ', sex: 'M', date_of_birth: '24-09-1997', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GARZONES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1653, document_type: 'CI', document_number: '13704724', name_first: 'EMANUEL', name_middle: '', name_paternal: 'SAAVEDRA', name_maternal: 'TOMICHA', sex: 'M', date_of_birth: '29-04-2018', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'GARZONES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1654, document_type: 'CI', document_number: '8921261', name_first: 'ROMINA', name_middle: '', name_paternal: 'SOLETO', name_maternal: 'ORELLANA', sex: 'F', date_of_birth: '11-08-1997', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'LIMPIEZA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1656, document_type: 'CI', document_number: '9713227', name_first: 'JANETH', name_middle: '', name_paternal: 'BARRON', name_maternal: 'DURAN', sex: 'F', date_of_birth: '12-08-1992', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'OPERARIO DE LIMPIEZA', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1802, document_type: 'CI', document_number: '3811864', name_first: 'RENE', name_middle: 'RAMBERT', name_paternal: 'GUZMAN', name_maternal: 'SORIA', sex: 'M', date_of_birth: '07-10-1974', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CHOFER DE BUS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1803, document_type: 'CI', document_number: '4737337', name_first: 'CLAUDIA', name_middle: '', name_paternal: 'SOLETO', name_maternal: 'PEREZ', sex: 'F', date_of_birth: '19-01-1979', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JEFE DE CALIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1902, document_type: 'CI', document_number: '6232650', name_first: 'LUIS', name_middle: 'ALFONSO', name_paternal: 'YUPANQUI', name_maternal: 'MACHUCA', sex: 'M', date_of_birth: '01-02-1987', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'JEFE DE SISTEMAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 1905, document_type: 'CI', document_number: '4639478', name_first: 'ALEXANDER', name_middle: '', name_paternal: 'CASTRO', name_maternal: 'VELASCO', sex: 'M', date_of_birth: '14-07-1980', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'ENCARGADO  SAP Y SOPORTE TECNICO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2003, document_type: 'CI', document_number: '9595242', name_first: 'YENNY', name_middle: '', name_paternal: 'CESPEDES', name_maternal: 'ORTIZ', sex: 'F', date_of_birth: '26-02-1991', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'RECEPCIONISTAS CAJEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2005, document_type: 'CI', document_number: '7706199', name_first: 'JENNY', name_middle: 'MAITE', name_paternal: 'JIMENEZ', name_maternal: 'MONTAÑO', sex: 'F', date_of_birth: '24-08-1989', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'AUXILIAR DE RECURSOS HUMANOS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2006, document_type: 'CI', document_number: '5875478', name_first: 'RAUL', name_middle: '', name_paternal: 'PAZ', name_maternal: 'ORTIZ', sex: 'M', date_of_birth: '26-11-1979', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'RECEPCIONISTAS CAJEROS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2007, document_type: 'CI', document_number: '3919511', name_first: 'FABIOLA', name_middle: '', name_paternal: 'PEREZ', name_maternal: 'PAZ', sex: 'F', date_of_birth: '04-12-1974', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'GERENCIA DE PARQUE', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2011, document_type: 'CI', document_number: '6218962', name_first: 'FIDEL', name_middle: '', name_paternal: 'SALVATIERRA', name_maternal: 'CASANOVA', sex: 'M', date_of_birth: '19-11-1976', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, MENSAJERO -cargo: ' COMPRADOR', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2031, document_type: 'CI', document_number: '9797702', name_first: 'CLAUDIA', name_middle: 'NINET', name_paternal: 'ALTAMIRANO', name_maternal: 'PERALTA', sex: 'F', date_of_birth: '17-06-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CAJERAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2217, document_type: 'CI', document_number: '6352849', name_first: 'ALFREDO', name_middle: 'ANGEL', name_paternal: 'MOJICA', name_maternal: 'MONTAÑO', sex: 'M', date_of_birth: '28-01-1986', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JEFE DE RECURSOS HUMANOS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2221, document_type: 'CI', document_number: '5360753', name_first: 'ARMINDA', name_middle: 'ALEJANDRINA', name_paternal: 'ROCHA', name_maternal: 'LOAYZA', sex: 'F', date_of_birth: '14-12-1976', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, TESORERÍcargo: 'A', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2224, document_type: 'CI', document_number: '7474855', name_first: 'SARIEL', name_middle: '', name_paternal: 'MENDOZA', name_maternal: 'PADILLA', sex: 'F', date_of_birth: '20-06-1988', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'JEFE DE CONTABILIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2227, document_type: 'CI', document_number: '9039282', name_first: 'LIZETH', name_middle: 'YANDIRA', name_paternal: 'ALTAMIRANO', name_maternal: 'MENDOZA', sex: 'F', date_of_birth: '15-06-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'AUXILIAR DE CONTABILIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2229, document_type: 'CI', document_number: '8909165', name_first: 'LUCIA', name_middle: '', name_paternal: 'CONDORI', name_maternal: 'CHOQUE', sex: 'F', date_of_birth: '11-01-1990', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'CAJERAS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2232, document_type: 'CI', document_number: '4296115', name_first: 'CHRISTIAN', name_middle: 'WALTER', name_paternal: 'LOPEZ', name_maternal: 'TITO', sex: 'M', date_of_birth: '21-11-1976', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'GERENTE FINANCIERO', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2235, document_type: 'CI', document_number: '5860793', name_first: 'HERLAN', name_middle: '', name_paternal: 'DURAN', name_maternal: 'PAZ', sex: 'M', date_of_birth: '21-08-1980', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'CHOFER DE BUS', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2237, document_type: 'CI', document_number: '7847090', name_first: 'FABIOLA', name_middle: '', name_paternal: 'SOLIZ', name_maternal: 'LIMPIAS', sex: 'F', date_of_birth: '11-05-1992', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'SERVICIOS GENERALES', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2238, document_type: 'CI', document_number: '8112646', name_first: 'ANGEL', name_middle: 'RONALDO', name_paternal: 'PARADA', name_maternal: 'HERRERA', sex: 'M', date_of_birth: '16-09-1989', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'ENCARGADO DE ALMACEN', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2239, document_type: 'CI', document_number: '3791166', name_first: 'IVAN', name_middle: 'EDUARDO', name_paternal: 'CARVALLO', name_maternal: 'GUMUCIO', sex: 'M', date_of_birth: '22-09-1978', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'ADMINISTRADOR RESTAURANTE', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2240, document_type: 'CI', document_number: '9850890', name_first: 'FREDDY', name_middle: 'BECHER', name_paternal: 'CABRERA', name_maternal: 'AYALA', sex: 'M', date_of_birth: '27-09-1995', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'ENCARGADO DE ALMACEN', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2241, document_type: 'CI', document_number: '9848952', name_first: 'EDILSON', name_middle: '', name_paternal: 'ARNEZ', name_maternal: 'ACOSTA', sex: 'M', date_of_birth: '19-03-1994', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 2, cargo: 'AUXILIAR DE CONTABILIDAD', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},
{ zktime_pin: 2242, document_type: 'CI', document_number: '3387479', name_first: 'JUAN', name_middle: 'PABLO', name_paternal: 'REYEZ', name_maternal: 'RIOS', sex: 'M', date_of_birth: '13-02-1984', nationality: 'Boliviana', jubilado: 0, aporta_afp: 1, persona_con_discapacidad: 0, tutor_persona_con_discapacidad: 0, caja_de_salud: 2, afp: 1, cargo: 'ENCARGADO DE ALMACEN', slots: [{ index: 0, schedule: schedules[2] }, { index: 1, schedule: schedules[4] }, { index: 2, schedule: schedules[6] }, { index: 3, schedule: schedules[8] }, { index: 4, schedule: schedules[10] }, { index: 5, schedule: schedules[12] }, { index: 6, schedule: schedules[14] }]},

]