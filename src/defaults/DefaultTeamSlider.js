export class Defaults {
    static GetState() {
      return {
      teamsize: 3,
      teamcount:2,
      cost: 10000,
      projects: ([
        "Example small task - S",
        "*An important task - S",
        "An Extra Large task - XL",
        "An estimated task- 4"
      ].join("\n")),
      efficiency: 70,
      important: false
    }
  }
} 