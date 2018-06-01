// pair types:

// entry-exit
fixed = {
  start: '08:30',
  end: '12:30',
  alocation: {
    workDay: 0.5,
    dayOff: 0.5
  },
  surplusBefore // where extra time before designated sign in goes
  surplusAfter // where extra time AFTER sign out goes
  extra

}

// span in range

flexible = {
  rangeStart: Date,
  rangeEnd: Date,
  duration: Date
}



budget: [
  {
    amount: 0.5,
    account: ID
  }
]


block = {
  accounts: [
    {
      account: dayoff,
      amount: 0.5
    },
    {
      acount: workday,
      amount: 0.5
    }
  ],
  timeTable: [
    {
      type: flexible,
      start: '11:00',
      end: '14:30',
      duration: '00:30',
      name: 'lunch',
    }
  ]
}


block: {
  expect: [
    {
      start:
      800
    }
  ]
}

// day

day = {
  begin
  end
  begin
  end
  begin
  end
  break

}


entry/exit pairs

/*
 * two separate  things: alocation of standard time, and alocation of extra/mising time
 * 
 * 
 * 
 * keep tracks of days owned/due
 * vacations
 * holidays
 * 
 */

