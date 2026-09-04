import type { Choice, Incident } from "./types";

export const INCIDENTS: readonly Incident[] = [
  { title: "The Moon Has Filed a Complaint", dispatch: "At 08:14, the moon submitted a formal noise complaint against Earth. It has requested one representative. Unfortunately, it asked for you by name.", location: "Roof of an IKEA", threat: "Passive-aggressive", witnesses: "2 owls, one lawyer", sigil: "◒" },
  { title: "All the Shadows Are Late", dispatch: "Every shadow in the city is now moving eleven seconds behind its owner. One of them has stopped following altogether and is waiting outside your door.", location: "Your general vicinity", threat: "Unfashionably high", witnesses: "Everyone, technically", sigil: "◩" },
  { title: "The Vending Machine Knows Too Much", dispatch: "A vending machine on Platform 6 is dispensing snacks from people's childhoods and whispering the exact date of their next terrible haircut.", location: "Platform 6½", threat: "Crunchy", witnesses: "14 commuters", sigil: "▦" },
  { title: "Tuesday Is Missing", dispatch: "Tuesday has vanished from all calendars. Citizens are proceeding directly from Monday into Wednesday and reporting a vague sense of unfinished laundry.", location: "Temporal Records", threat: "Chronological", witnesses: "7.9 billion", sigil: "⌁" },
  { title: "The Pigeons Have Unionized", dispatch: "The pigeons have formed a bargaining unit. Their demands include better breadcrumbs, statue access, and one seat on the city council.", location: "Civic Plaza", threat: "Collective", witnesses: "A nervous mayor", sigil: "◇" },
  { title: "Gravity Is Feeling Experimental", dispatch: "Gravity has begun working sideways in one laundromat. Socks are orbiting the dryers. A small crowd is selling tickets.", location: "Spin Cycle Laundry", threat: "Approximately left", witnesses: "23 + one terrier", sigil: "↯" },
  { title: "A Door Appeared in the Ocean", dispatch: "A perfectly ordinary red door is standing six miles offshore. It is dry, unlocked, and somebody on the other side keeps knocking politely.", location: "Pacific Ocean", threat: "Well-mannered", witnesses: "3 confused dolphins", sigil: "▯" },
  { title: "Your Future Self Wants a Refund", dispatch: "A version of you from seventeen years in the future is at reception demanding a refund. They refuse to specify what for, but brought a very angry plant.", location: "Bureau lobby", threat: "Personal", witnesses: "The plant", sigil: "⧖" },
];

export const PHASES = ["INITIAL CONTACT", "FIELD RESPONSE", "COMPLICATION", "CRITICAL DECISION", "FINAL MANEUVER"] as const;

export const CHOICES: readonly (readonly Choice[])[] = [
  [
    { text: "Ask the obvious question with unreasonable confidence.", delta: [14, 4, 2], log: "Asked something obvious. Sounded authoritative." },
    { text: "Disguise yourself as an unrelated professional and walk in.", delta: [7, 15, 3], log: "Deployed a deeply questionable disguise." },
    { text: "Complete Form 8-B: Permission to Acknowledge the Unusual.", delta: [-2, -4, 18], log: "Established a defensible paper trail." },
  ],
  [
    { text: "Offer it a tiny coffee and hear its side of the story.", delta: [6, 8, 4], log: "Attempted beverage-based diplomacy." },
    { text: "Poke it with the Bureau's official long stick.", delta: [12, 13, 1], log: "Used the stick. The stick is now evidence." },
    { text: "Declare the area a pop-up museum and charge admission.", delta: [9, 17, 7], log: "Monetized the inexplicable." },
  ],
  [
    { text: "Call your future self. Pretend this is normal for both of you.", delta: [4, 19, 2], log: "Future self declined to comment." },
    { text: "Initiate Protocol: Dramatic Lighting.", delta: [10, 11, 5], log: "Situation became 40% more cinematic." },
    { text: "Blame Mercury retrograde in an extremely official tone.", delta: [3, 8, 14], log: "Celestial scapegoat successfully assigned." },
  ],
  [
    { text: "Say “I know what you're doing” and hope that becomes true.", delta: [18, 7, 1], log: "Bluffed at an interdimensional level." },
    { text: "Release a decoy problem that is slightly more interesting.", delta: [8, 21, 6], log: "Problem distracted by newer problem." },
    { text: "Request a supervisor, then become the supervisor.", delta: [11, 5, 16], log: "Promoted self during active crisis." },
  ],
  [
    { text: "Press the button labeled ABSOLUTELY PROBABLY.", delta: [16, 15, 0], log: "Pressed it. No one can say you didn't." },
    { text: "Deliver a monologue so moving that physics reconsiders.", delta: [12, 18, 3], log: "Physics appeared emotionally affected." },
    { text: "File the anomaly under ‘Not Our Department’ and leave.", delta: [2, -3, 24], log: "Weaponized administrative boundaries." },
  ],
];

export const COMPLICATIONS = [
  "A fax arrives from 1997 warning you not to trust the color beige.",
  "The anomaly asks whether this will be on the exam.",
  "Someone nearby begins playing ominous jazz on a recorder.",
  "Your official badge now reads ‘probably an adult.’",
  "A goose in a necktie claims jurisdiction.",
  "For reasons nobody can explain, the floor is now emotionally unavailable.",
  "Headquarters texts: ‘lol good luck.’",
] as const;
