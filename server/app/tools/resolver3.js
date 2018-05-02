module.exports = class BaseResolver {
  constructor (config) {
    {
      // validate configuration. bracket scope


    }
    return async (root, args, context, info) => {
      let
        { ac, session } = context,
        { input, filter, action } = args,
        permission = null

      if (this.config.authorize) {
        permission = ac.authorize(session, this.config.resource,  this.config.action)
      }
      else if (this.config.authenticate) {
        ac.authenticate(session)
      }



      let params = {
        // filtered input object
        query: () => filterQuery(model.query()),
        eager: () => filterEager(info),
        filterData: data => data,
        filterInput: () => input,
        filterQuery: query => query
      }
      let data = await this.config.method(params)

      data = filterData(data)
    }
  }
}

function filterEager({ info, model, session, ac, permissionCache }) {
  // return filtered eager expression
  // maybe just eager expression
}

function filterQuery() {
  // use available filters
}

function filterData () {

}

function filterInput () {

}

// notes to self
// use allow eager, if requested data surpasses bounds then reauthorize at that level
// no nested filter
// 
// use allow graph. stop endless loops by using relation types.