export const seedData = {
    users: {
      _model: "User",
      gráinne: {
        firstName: "Gráinne",
        lastName: "O' Connor",
        email: "grawnya@gmail.com",
        password: "secret"
      },
      joan: {
        firstName: "Joan",
        lastName: "Russell",
        email: "joan@yahoo.com",
        password: "secret"
      },
      thomas: {
        firstName: "Thomas",
        lastName: "Lawrance",
        email: "tomh@outlook.com",
        password: "secret"
      }
    },
    trails: {
      _model: "Trail",
      greenway: {
        title: "Blackrock Greenway",
        location: "Cork",
        userid: "->users.thomas"
      }
    },
    results: {
      _model : "Result",
      testresult : {
        distance: 8,
        duration: 45,
        date: "20/02/2025",
        trailid: "->trails.greenway"
      },
    }
}
  