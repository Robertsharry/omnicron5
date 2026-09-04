export interface BreachEvent {
  code: string;
  headline: string;
  report: string;
  debris: readonly string[];
  resolution: string;
}

export const BREACH_EVENTS: readonly BreachEvent[] = [
  {
    code: "MANNERS-NULL",
    headline: "GRAVITY HAS BECOME A PERSONAL OPINION",
    report: "Down is now decided by committee. The committee is three raccoons and they are accepting bribes.",
    debris: ["SIDEWAYS", "ONE LOOSE SHOE", "RACCOON VOTE", "CEILING SOUP", "NO DOWN"],
    resolution: "Gravity has agreed to remain a law, pending mediation.",
  },
  {
    code: "MOON-DUPLEX",
    headline: "A SECOND MOON HAS CLOCKED IN",
    report: "It is larger, closer, and wearing a little paper badge that says HELLO, MY NAME IS GREG.",
    debris: ["GREG", "EXTRA TIDE", "MOON RECEIPT", "NIGHT 2", "UNSCHEDULED CRATER"],
    resolution: "Greg has been returned to the moon staffing agency.",
  },
  {
    code: "TUESDAY-AGAIN",
    headline: "IT IS NOW TUESDAY FOREVER",
    report: "Every clock reads 2:17 PM. Lunch is over but dinner refuses to begin. Morale has become theoretical.",
    debris: ["2:17 PM", "MORE TUESDAY", "STALE LUNCH", "NO WEEKEND", "CALENDAR SCREAM"],
    resolution: "Wednesday has been located and given a police escort.",
  },
  {
    code: "SELF-INVOICE",
    headline: "YOUR EVIL TWIN HAS SENT AN INVOICE",
    report: "Charges include dramatic entrances, mustache maintenance, and one premium monologue. Payment is already overdue.",
    debris: ["PAST DUE", "EVIL TAX", "MUSTACHE", "$8,404.12", "LATE FEE"],
    resolution: "The invoice was paid using money from an evil alternate Bureau.",
  },
  {
    code: "OBJECT-UNREST",
    headline: "THE FURNITURE KNOWS WHAT YOU DID",
    report: "Every chair is facing you. The lamps are taking notes. One ottoman has requested legal representation.",
    debris: ["CHAIR WITNESS", "LAMP NOTES", "HOSTILE SOFA", "OTTOMAN LAW", "SIT NOWHERE"],
    resolution: "The furniture accepted immunity in exchange for silence.",
  },
] as const;
